<template>
  <div class="chat__content">
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
              <img class="chat__item__content__avatar" v-lazy="getImgURL(account.fileId,'LARGE_LOGO')" :style="{visibility: item.type=== 'NOT_ACCOUNT'? 'visible' : 'hidden'}">
              <div class="chat__item__content__message"
                   :style="{justifyContent:item.type=== 'NOT_ACCOUNT'? 'flex-start' : 'flex-end'}"
              >
                <div class="chat__item__content__message__text" v-if="item.messageType === 'TEXT'"
                     :class="[item.type=== 'NOT_ACCOUNT'? 'chat__item__content__message__text--before' : 'chat__item__content__message__text--after']"
                     :style="{backgroundColor:item.type=== 'NOT_ACCOUNT'? 'white' : '#F60000',color:item.type=== 'NOT_ACCOUNT'? 'black' : 'white'}"
                >
                  {{item.message}}
                </div>
                <img v-lazy="getImgURL(item.message,'LARGE_PIC')" class="chat__item__content__message__image"
                     @click="onImage($event)" v-if="item.messageType === 'PIC'">
              </div>
              <img class="chat__item__content__avatar" v-lazy="getImgURL(user.fileId,'LARGE_LOGO')" :style="{visibility: item.type=== 'ACCOUNT'? 'visible' : 'hidden'}">
            </div>
          </div>
          </van-pull-refresh>
        </div>
      </template>
      <template slot="bottom">
        <div class="chat__text">
          <van-uploader :after-read="onRead">
            <van-icon name="jia03" size="4em" color="#F60000"></van-icon>
          </van-uploader>
          <textarea class="chat__text__textarea" v-model="text"/>
          <van-icon name="paper-airplane" size="4em"
                    @click="onMessage"
          ></van-icon>
        </div>
      </template>
    </new-layout>
    <van-popup v-model="show" >
        <img :src="popupSrc" class="chat__popup__image">
    </van-popup>
  </div>
</template>
<style scoped lang="scss" type="text/scss">
  .chat__content {
    width: 720px;
  }
  .chat {
    width: 720px;
    &__popup{
      &__image {
        width: 720px;
      }
    }
    height: 100%;
    overflow: scroll;
    &__text {
      width: 720px;
      height: 100px;
      background-color: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: normal;
      &__textarea {
        width: 500px;
        height: 60px;
        margin: 0 20px;
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
      width: 720px;
      &__time {
        width: 720px;
        text-align: center;
        font-size:inherit;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
        font-size: 20px;
        color:rgba(102,102,102,1);
      }
      &__content {
        width: 720px;
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
                border-left: 15px solid $themeColor;
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
  import { getToken, getAccount } from '@/storage';

  export default {
    data() {
      return {
        stompClient: null,
        timer: '',
        account: getAccount(),
        user: this.$route.params.user,
        show: false,
        popupSrc: '',
        text: '',
        message: '',
        chatId: this.$route.params.chatId,
        isLoading: false,
        pageNum: 0,
        pageSize: 5,
        list: [
          // {
          //   type: 'ACCOUNT',
          //   messageType: 'TEXT',
          //   message: '1111',
          //   time: '12:12'
          // },
          // {
          //   type: 'PHARMACIST',
          //   messageType: 'PIC',
          //   message: '1',
          //   time: '12:12'
          // }
        ]
      };
    },
    watch: {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.connection();
      });
    },
    async created() {
      await this.initData();
      console.log('chatId', this.chatId);
    },
    mounted() {
    },
    beforeDestroy() {
      this.disconnect();
    },
    filters: {
      time(date) {
        date = new Date(date);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${year}/${month}/${day} ${hour}:${min}`;
      }
    },
    methods: {
      loadToBottom() {
        let container = this.$el.querySelector('#chat');
        this.$nextTick(() => {
          console.log(container.scrollTop, container.scrollHeight, container.offsetHeight, container.clientTop);
          container.scrollTop = container.scrollHeight;
        });
      },
      async onRefresh() {
        await this.onLoad();
        this.isLoading = false;
      },
      async initData() {
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
        const data = await this.$http.get(`/chatRecords`, params);
        this.isLoading = false;
        this.list = this.list.concat(data.list);
        this.list = this.list.sort((a, b) => a.createdDate - b.createdDate);
      },
      connection(json) {
        let socket = new SockJS(`${process.env.WEBSOCKET_ROOT}/hello`);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe(`/user/${this.chatId}/message`, (res) => {
            let chatRecord = JSON.parse(res.body);
            this.list.push(chatRecord);
            this.loadToBottom();
            if (chatRecord.type === 'ACCOUNT') {
              this.text = '';
            }
          });
          console.log('连接成功');
          if (json !== undefined) {
            this.send(json);
          }
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
      send(json) {
        this.stompClient.send('/hello', { 'Authorization': getToken() }, JSON.stringify(json));
      },
      onImage(e) {
        this.show = true;
        this.popupSrc = e.currentTarget.src;
      },
      async onMessage() {
        if (this.text === '') {
          this.$toast('请输入内容');
          return;
        }
        let json = {
          type: 'ACCOUNT',
          messageType: 'TEXT',
          message: this.text,
          chatId: this.chatId
        };
        if (this.stompClient === null) {
          this.connection(json);
        } else {
          this.send(json);
        }
      },
      async onRead(file) {
        let param = new FormData();
        param.append('fileType', 'PIC');
        param.append('file', file.file);
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        let fileId = await this.$http.post(`/files`, param, config);
        console.log(fileId);
        let json = {
          type: 'ACCOUNT',
          messageType: 'PIC',
          message: fileId,
          chatId: this.chatId
        };
        if (this.stompClient === null) {
          this.connection(json);
        } else {
          this.send(json);
        }
      }
    }
  };
</script>

<style scoped>

</style>
