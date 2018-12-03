<template>
  <div>
    <new-layout>
      <template slot="top">
        <van-nav-bar
          :title="user.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center" >
        <div class="chat" id="chat">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loosing-text="释放加载更多">

          <div class="chat__item"
          v-for="(item,key) in list"
               :key="key"
          >
            <div class="chat__item__time">
              {{item.createdDate | time}}
            </div>
            <div class="chat__item__content">
              <img class="chat__item__content__avatar" v-lazy="" :style="{visibility: item.type=== 'ACCOUNT'? 'visible' : 'hidden'}">
              <div class="chat__item__content__message">
                <div class="chat__item__content__message__text" v-if="item.chatMessageType === 'TEXT'">
                  {{item.message}}
                </div>
                <img v-lazy="" class="chat__item__content__message__image" @click="onImage($event)" v-if="item.chatMessageType === 'PIC'">
              </div>
              <img class="chat__item__content__avatar" v-lazy="" :style="{visibility: item.type=== 'PHARMACIST'? 'visible' : 'hidden'}">
            </div>
          </div>
          </van-pull-refresh>
        </div>
      </template>
      <template slot="bottom">
        <div class="chat__text">
          <textarea class="chat__text__textarea" v-model="text" @keyup.enter="onMessage" id="text"/>
          <van-uploader :after-read="onRead">
          <van-icon name="jia03" size="5em" color="#13C1FE" class="mb-l-20"></van-icon>
          </van-uploader>
        </div>
      </template>
    </new-layout>
    <van-popup v-model="show" >
        <img :src="popupSrc" class="chat__popup__image">
    </van-popup>
  </div>
</template>
<style scoped lang="less" type="text/less">
  .chat {
    &__popup{
      &__image {
        width: 720px;
      }
    }
    height: 100%;
    overflow: scroll;
    &__text {
      height: 100px;
      background-color: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
      &__textarea {
        width: 500px;
        height: 60px;
        margin-right: 20px;
        font-size:20px;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
        color:rgba(102,102,102,1);
        padding: 0 5px;
        outline: none;
        border: none;
      }
    }
    &__item {
      margin-top: 20px;
      &__time {
        text-align: center;
        font-size:inherit;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
        font-size: 20px;
        color:rgba(102,102,102,1);
      }
      &__content {
        display: flex;
        justify-content: space-around;
        padding: 20px 0;
        background-color: white;
        &__avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        &__message {
          width: 450px;
          background:rgba(255,255,255,1);
          box-shadow:0px 1px 1px 0px rgba(0, 0, 0, 0.18);
          border-radius:5px;
          border: none;
          &__text {
            font-size:25px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(102,102,102,1);
            word-break: break-all;
            word-wrap: break-word;
            padding: 10px;
          }
          &__image {
            width: 200px;
            height: 200px;
            float: right;
          }
        }
      }
    }
  }
</style>
<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import { getToken } from '../../assets/js/auth';

  export default {
    data() {
      return {
        stompClient: '',
        timer: '',
        account: this.$store.getters.account,
        user: JSON.parse(this.$route.query.user),
        show: false,
        popupSrc: '',
        text: '',
        message: '',
        chatId: '',
        isLoading: false,
        pageNum: 0,
        pageSize: 5,
        list: [
          // {
          //   type: 'ACCOUNT',
          //   chatMessageType: 'TEXT',
          //   message: '1111',
          //   time: '12:12'
          // },
          // {
          //   type: 'PHARMACIST',
          //   chatMessageType: 'PIC',
          //   message: '1',
          //   time: '12:12'
          // }
        ]
      };
    },
    async created() {
      await this.initData();
      console.log('chatId', this.chatId);
    },
    mounted() {
      this.initWebSocket();
    },
    beforeDestroy() {
      this.disconnect();
    },
    filters: {
      // 将日期过滤为 hour:minutes
      time(date) {
        date = new Date(date);
        return date.getHours() + ':' + date.getMinutes();
      }
    },
    methods: {
      loadToBottom() {
        let container = this.$el.querySelector('#chat');
        this.$nextTick(() => {
          container.scrollTop = container.scrollHeight;
        });
      },
      async onRefresh() {
        await this.onLoad();
        this.isLoading = false;
      },
      async initData() {
        let data = {
          accountId: this.account.id,
          userId: this.user.id
        };
        let chatPharmacist = await this.$http.post('/chatPharmacists', data);
        this.chatId = chatPharmacist.id;
        await this.onLoad();
        this.loadToBottom();
      },
      async onLoad() {
        this.pageNum++;
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          chatId: this.chatId
        };
        const data = await this.$http.get('/chatPharmacistRecords', params);
        this.isLoading = false;
        this.list = this.list.concat(data.list);
        this.list = this.list.sort((a, b) => a.createdDate - b.createdDate);
      },
      initWebSocket() {
        this.connection();
      },
      connection() {
        let socket = new SockJS(`${process.env.SUPERVISE_ROOT}/hello`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe('/topic/greetings', (res) => {
            if (JSON.parse(res.body) === false) {
              this.$toast('非法用户');
            }
          });
          this.stompClient.subscribe(`/user/${this.account.id}/message`, (res) => {
            this.list.push(JSON.parse(res.body));
            this.loadToBottom();
          });
        }, (err) => {
          console.log(err);
        });
      },
      disconnect() {
        if (this.stompClient != null) {
          this.stompClient.disconnect();
          console.log('Disconnected');
        }
      },
      send(id) {
        this.stompClient.send('/hello', { 'Authorization': getToken() }, id);
      },
      onImage(e) {
        this.show = true;
        this.popupSrc = e.currentTarget.src;
      },
      async onMessage() {
        let json = {
          type: 'ACCOUNT',
          chatMessageType: 'TEXT',
          message: this.text,
          chatId: this.chatId
        };
        let data = await this.$http.post('/chatPharmacistRecords', json);
        this.list.push(data);
        this.loadToBottom();
        this.send(data.id);
        this.text = '';
      },
      onRead(file) {
        let param = new FormData();
        param.append('fileType', 'PIC');
        param.append('file', file.content);
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        this.$axios.post('/files/image', param, config).then(async res => {
          let json = {
            type: 'ACCOUNT',
            chatMessageType: 'PIC',
            message: res.data,
            chatId: this.chatId
          };
          let data = await this.$http.post('/chatPharmacistRecords', json);
          this.send(data.id);
        });
      }
    }
  };
</script>

<style scoped>

</style>
