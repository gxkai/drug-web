<template>
  <div class="chat__content">
    <new-layout>
      <template slot="center">
        <div id="chat" class="chat">
          <van-pull-refresh
            v-model="isLoading"
            loosing-text="释放加载更多"
            @refresh="onRefresh"
          >
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <div v-for="(item, key) in list" :key="key" class="chat__item">
                <div class="chat__item__time">
                  {{ item.createdDate | time }}
                </div>
                <div class="chat__item__content">
                  <img
                    v-lazy="getImgURL(account.fileId, 'LARGE_LOGO')"
                    :style="{
                      visibility:
                        item.type === 'NOT_ACCOUNT' ? 'visible' : 'hidden'
                    }"
                    class="chat__item__content__avatar"
                  />
                  <div
                    :style="{
                      justifyContent:
                        item.type === 'NOT_ACCOUNT' ? 'flex-start' : 'flex-end'
                    }"
                    class="chat__item__content__message"
                  >
                    <div
                      v-if="item.messageType === 'TEXT'"
                      :class="[
                        item.type === 'NOT_ACCOUNT'
                          ? 'chat__item__content__message__text--before'
                          : 'chat__item__content__message__text--after'
                      ]"
                      :style="{
                        backgroundColor:
                          item.type === 'NOT_ACCOUNT' ? 'white' : '#F60000',
                        color: item.type === 'NOT_ACCOUNT' ? 'black' : 'white'
                      }"
                      class="chat__item__content__message__text"
                    >
                      {{ item.message }}
                    </div>
                    <img
                      v-lazy="getImgURL(item.message, 'LARGE_PIC')"
                      v-if="item.messageType === 'PIC'"
                      class="chat__item__content__message__image"
                      @click="onImage($event)"
                    />
                  </div>
                  <img
                    v-lazy="getImgURL(user.fileId, 'LARGE_LOGO')"
                    :style="{
                      visibility: item.type === 'ACCOUNT' ? 'visible' : 'hidden'
                    }"
                    class="chat__item__content__avatar"
                  />
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </template>
      <template slot="bottom">
        <div class="chat__text">
          <van-uploader :after-read="onRead">
            <van-icon name="jia03" size=".6rem" color="#F60000"></van-icon>
          </van-uploader>
          <textarea v-model="text" class="chat__text__textarea" />
          <van-icon
            name="paper-airplane"
            size=".6rem"
            @click="onMessage"
          ></van-icon>
        </div>
      </template>
    </new-layout>
    <van-popup v-model="show">
      <img :src="popupSrc" class="chat__popup__image" />
    </van-popup>
  </div>
</template>

<style scoped lang="scss" type="text/scss">
.chat__content {
  width: 720px;
}
.chat {
  width: 720px;
  &__popup {
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
      font-size: 20px;
      font-family: HiraginoSansGB-W3;
      font-weight: normal;
      color: rgba(102, 102, 102, 1);
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
      font-size: inherit;
      font-family: HiraginoSansGB-W3;
      font-weight: normal;
      font-size: 20px;
      color: rgba(102, 102, 102, 1);
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
          font-size: 24px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          word-break: break-all;
          word-wrap: break-word;
          padding: 20px 30px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.18);
          border-radius: 20px;
          display: flex;
          align-items: center;
          position: relative;
          &--after {
            &:after {
              position: absolute;
              content: '';
              width: 0;
              height: 0;
              left: 100%;
              top: 15px;
              border-top: 0px solid transparent;
              border-left: 15px solid $theme;
              border-bottom: 16px solid transparent;
            }
          }
          &--before {
            &:before {
              position: absolute;
              content: '';
              width: 0;
              height: 0;
              right: 100%;
              top: 15px;
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
// import list from '@/mixins/list';
export default {
  // mixins: [list],
  name: 'ChatsView',
  data() {
    return {
      stompClient: null,
      timer: '',
      user: '',
      show: false,
      popupSrc: '',
      text: '',
      message: '',
      chatId: '',
      loading: false,
      finished: false,
      isLoading: false,
      pageNum: 0,
      pageSize: 15,
      list: []
    };
  },

  filters: {
    time(date) {
      date = new Date(date);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      let min =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${year}/${month}/${day} ${hour}:${min}`;
    }
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.connection();
    });
  },
  created() {
    this.chatId = this.$route.query.chatId
    this.user = JSON.parse(this.$route.query.user)
  },
  mounted() {
  },
  beforeDestroy() {
    this.disconnect();
  },
  methods: {
    loadToBottom() {
      let container = this.$el.querySelector('#chat');
      this.$nextTick(() => {
        // console.log(
        //   container.scrollTop,
        //   container.scrollHeight,
        //   container.offsetHeight,
        //   container.clientTop
        // );
        container.scrollTop = container.scrollHeight;
      });
    },

    onRefresh() {
      this.finished = false;
      this.list = [];
      this.pageNum = 0;
      this.onLoad();
    },

    pushToList(list) {
      this.isLoading = false;
      this.loading = false;
      this.list = this.list.concat(list);
      console.log(this.list);
      if (list.length === 0) {
        this.finished = true;
      }
    },
    loadMore() {
      this.pageNum++;
    },

    async onLoad() {
      this.loadMore();
      console.log(this.pageNum)
      console.log(this.pageSize)
      const params = {
        chatId: this.chatId,
        pageNum: 1,
        pageSize: 15
      };
      const data = await this.$http.get(
        `/api/app/chatRecords`,
        params
      );

      console.log('聊天记录:')
      console.log(data)
      if (data.list.length) {
        data.list = data.list.sort((a, b) => a.createdDate - b.createdDate);
        this.pushToList(data.list);
      }
      this.loadToBottom();
    },
    connection(json) {
      let socket = new SockJS(`${process.env.WEBSOCKET_ROOT}/hello`);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        () => {
          this.stompClient.subscribe(`/user/${this.chatId}/message`, res => {
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
        },
        err => {
          console.log(err);
        }
      );
    },
    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log('Disconnected');
      }
    },
    send(json) {
      this.stompClient.send(
        '/hello',
        { Authorization: this.token },
        JSON.stringify(json)
      );
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
      let fileId = await this.$http.post(`/api/app/files`, param, config);
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
