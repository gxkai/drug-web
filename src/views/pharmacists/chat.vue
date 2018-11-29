<template>
  <div>
    <new-layout>
      <template slot="top">
        <van-nav-bar
          :title="$route.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center" >
        <div class="chat" id="chat">
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
        </div>
      </template>
      <template slot="bottom">
        <div class="chat__text">
          <textarea class="chat__text__textarea" v-model="text" @keyup.enter="onMessage"/>
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
        font-size:20px;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
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
            font-size:20px;
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
    created() {
      this.initData();
    },
    mounted() {
      this.initWebSocket();
    },
    beforeDestroy() {
      this.disconnect();
    },
    watch: {
      list() {
        let container = this.$el.querySelector('#chat');
        this.$nextTick(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    },
    filters: {
      // 将日期过滤为 hour:minutes
      time(date) {
        date = new Date(date);
        return date.getHours() + ':' + date.getMinutes();
      }
    },
    methods: {
      async initData() {
        let data = {
          accountId: this.account.id,
          userId: this.user.id
        };
        let chatPharmacist = await this.$http.post('/chat-pharmacist', data);
        this.chatId = chatPharmacist.id;
        let params = {
          chatId: this.chatId
        };
        this.list = await this.$http.get('/chat-pharmacist-record', params);
      },
      initWebSocket() {
        this.connection();
      },
      connection() {
        let socket = new SockJS('http://127.0.0.1:8091/hello');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe('/topic/greetings', (greeting) => {
            alert(greeting.body);
          });
          this.stompClient.subscribe(`/user/${this.account.id}/message`, (greeting) => {
            this.list.push(JSON.parse(greeting.body));
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
        let data = await this.$http.post('/chat-pharmacist-record', json);
        this.list.push(data);
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
          let data = await this.$http.post('/chat-pharmacist-record', json);
          this.send(data.id);
        });
      }
    }
  };
</script>

<style scoped>

</style>
