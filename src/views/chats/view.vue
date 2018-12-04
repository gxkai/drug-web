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
              <div class="chat__item__content__message"
                   :style="{justifyContent:item.type=== 'ACCOUNT'? 'flex-start' : 'flex-end'}"
              >
                <div class="chat__item__content__message__text" v-if="item.chatMessageType === 'TEXT'"
                     :class="[item.type=== 'ACCOUNT'? 'chat__item__content__message__text--before' : 'chat__item__content__message__text--after']"
                     :style="{backgroundColor:item.type=== 'ACCOUNT'? 'white' : '#13C1FE',color:item.type=== 'ACCOUNT'? 'black' : 'white'}"
                >
                  {{item.message}}
                </div>
                <img v-lazy="getImgURL(item.message)" class="chat__item__content__message__image"
                     @click="onImage($event)" v-if="item.chatMessageType === 'PIC'">
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
          <van-icon name="jia03" size="4em" color="#13C1FE"></van-icon>
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
        &__avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        &__message {
          width: 450px;
          display: flex;
          align-items: center;
          &__text {
            max-width: 450px;
            font-size:24px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            word-break: break-all;
            word-wrap: break-word;
            padding: 20px 30px;
            background:rgba(255,255,255,1);
            box-shadow:0px 1px 1px 0px rgba(0, 0, 0, 0.18);
            border-radius:20px;
            display: flex;
            align-items: center;
            position: relative;
            &--after {
              &:after{
                position: absolute;
                content: "";
                width: 0;
                height: 0;
                left: 100%;
                top:15px;
                border-top: 0px solid transparent;
                border-left: 15px solid #13C1FE;
                border-bottom: 16px solid transparent;
              }
            }
            &--before {
              &:before{
                position: absolute;
                content: "";
                width: 0;
                height: 0;
                right: 100%;
                top:15px;
                border-top: 0px solid transparent;
                border-right: 15px solid white;
                border-bottom: 16px solid transparent;
              }
            }
          }
          &__image {
            width: 200px;
            height: 200px;
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
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hour}:${min}`;
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
        let chatPharmacist = await this.$http.post(`/chatPharmacists`, data);
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
        const data = await this.$http.get(`/chatPharmacistRecords`, params);
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
            let data = JSON.parse(res.body);
            if (data !== null) {
              this.text = '';
              this.list.push(data);
              this.loadToBottom();
            } else {
              this.$toast('网络异常');
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
        let data = await this.$http.post(`/chatPharmacistRecords`, json);
        this.send(data.id);
      },
      onRead(file) {
        let param = new FormData();
        param.append('fileType', 'PIC');
        param.append('file', file.file);
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        this.$http.post('/files', param, config).then(async res => {
          let json = {
            type: 'ACCOUNT',
            chatMessageType: 'PIC',
            message: res.data,
            chatId: this.chatId
          };
          let data = await this.$http.post(`/chatPharmacistRecords`, json);
          this.send(data.id);
        });
      }
    }
  };
</script>

<style scoped>

</style>
