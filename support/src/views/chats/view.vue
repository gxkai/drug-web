<template>
  <div>
    <base-layout>
      <template slot="header">
        <van-nav-bar
          :title="chat.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <div class="chat" id="chat">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loosing-text="释放加载更多">

        <div class="chat__item"
             v-for="(item,key) in list"
             :key="key"
        >
          <div class="chat__item__time">
            {{item.createdDate | datetime}}
          </div>
          <div class="chat__item__content">
            <img class="chat__item__content__avatar" v-lazy="getImgURL(user.fileId,'LARGE_LOGO')" :style="{visibility: item.type=== 'ACCOUNT'? 'visible' : 'hidden'}">
            <div class="chat__item__content__message"
            :style="{justifyContent:item.type=== 'ACCOUNT'? 'flex-start' : 'flex-end'}"
            >
              <div class="chat__item__content__message__text" v-if="item.messageType === 'TEXT'"
                   :class="[item.type=== 'ACCOUNT'? 'chat__item__content__message__text--before' : 'chat__item__content__message__text--after']"
                   :style="{backgroundColor:item.type=== 'ACCOUNT'? 'white' : '#13C1FE',color:item.type=== 'ACCOUNT'? 'black' : 'white'}"
              >
                {{item.message}}
              </div>
              <img v-lazy="getImgURL(item.message,'LARGE_PIC')" class="chat__item__content__message__image" @click="onImage($event)" v-if="item.messageType === 'PIC'"
              >
            </div>
            <img class="chat__item__content__avatar" v-lazy="getImgURL(fileId, 'LARGE_LOGO')" :style="{visibility: item.type=== 'NOT_ACCOUNT'? 'visible' : 'hidden'}">
          </div>
        </div>
        </van-pull-refresh>
      </div>
      <template slot="footer">
        <!--<div class="chat__text">
          <van-uploader :after-read="onRead">
            <van-icon name="jia03" size="2em" color="#13C1FE"></van-icon>
          </van-uploader>
          <textarea class="chat__text__textarea" v-model="text"/>
          <van-icon name="paper-airplane" size="2em"
          @click="onMessage"
          ></van-icon>
        </div>-->
        <van-cell-group class="chat__footer">
          <van-uploader :after-read="onRead">
            <van-icon name="jia03" size="1em" color="grey" class="add"></van-icon>
          </van-uploader>
          <van-field
            v-model="text"
            type="textarea"
            rows="1"
            autosize
          />
          <van-icon name="paper-airplane" size="1em" class="airplane"
                    @click="onMessage"
          ></van-icon>
        </van-cell-group>
      </template>
    </base-layout>
    <van-popup v-model="show" >
      <img :src="popupSrc" class="chat__popup__image">
    </van-popup>
  </div>
</template>
<style scoped lang="less" type="text/less">
  /deep/.van-field__control {
    line-height: 1!important;
  }
</style>
<style scoped lang="scss" type="text/scss">
  .chat {
    &__popup{
      &__image {
        width: 720px;
      }
    }
    height: 100%;
    overflow: scroll;
    &__footer {
      display: flex;
      align-items: center;
      background-color: #f8f8f8;
      padding: 20px 0;
      .add, .airplane {
        margin: 10px;
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
        &__avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          padding: 10px;
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
  import {getAccount, getToken} from "../../storage";

  export default {
    data() {
      return {
        stompClient: null,
        timer: '',
        user: getAccount(),
        token: getToken(),
        show: false,
        popupSrc: '',
        text: '',
        message: '',
        chat: JSON.parse(this.$route.query.chat),
        chatId: '',
        fileId: this.$route.query.fileId,
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
    beforeRouteEnter(to, from ,next) {
      next(vm => {
        vm.connection();
        vm.initData();
      })
    },
    async created() {
      console.log(`chatId${this.chat.id}`);
    },
    mounted() {
    },
    beforeDestroy() {
      this.disconnect();
    },
    methods: {
      async onRefresh() {
        await this.onLoad();
        this.isLoading = false;
      },
      loadToBottom() {
        let container = this.$el.querySelector('#chat');
        this.$nextTick(() => {
          container.scrollTop = container.scrollHeight;
        });
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
          chatId: this.chat.id
        };
        const data = await this.$supervise.get('/api/supervise/chatRecords', params);
        this.isLoading = false;
        this.list = this.list.concat(data.list);
        this.list = this.list.sort((a, b) => a.createdDate - b.createdDate);
      },
      connection(json) {
        console.log("准备连接服务器");
        let socket = new SockJS(`${process.env.WEBSOCKET_ROOT}/hello`);
        this.stompClient = Stomp.over(socket);
        console.log('正在连接服务器...');
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe(`/user/${this.chat.id}/message`, (res) => {
            let chatRecord = JSON.parse(res.body);
            this.list.push(chatRecord);
            this.loadToBottom();
            if (chatRecord.type === 'NOT_ACCOUNT') {
              this.text = '';
            }
          });
          console.log('连接成功');
          console.log(json);
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
          console.log('Disconnected', this.stompClient);
        }
      },
      send(json) {
        console.log('send start');
        this.stompClient.send('/hello', { 'Authorization': this.token }, JSON.stringify(json));
      },
      onImage(e) {
        this.show = true;
        this.popupSrc = e.currentTarget.src;
      },
      async onMessage() {
        if (this.text === '') {
          this.$toast('发送内容不能为空');
          return;
        }
        console.log(this.stompClient);
        let json = {
          type: 'NOT_ACCOUNT',
          messageType: 'TEXT',
          message: this.text,
          chatId: this.chat.id
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
        let fileId = await this.$supervise.post(`${process.env.APP_ROOT}/api/files`, param, config);
        console.log(fileId);
        let json = {
          type: 'NOT_ACCOUNT',
          messageType: 'PIC',
          message: fileId,
          chatId: this.chat.id
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
