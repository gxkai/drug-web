<template>
  <div>
    <base-layout>
      <template slot="header">
        <van-nav-bar
          :title="$route.name"
          left-arrow
          @click-left="$router.push('/')"
        />
      </template>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div
          v-for="(item, key) in list"
          :key="key"
        >
          <div class="chat-account__item"
               @click="$router.push({path:'/chats/view', query: {chat: JSON.stringify(item), fileId: item.fileId}})"
          >
            <div class="chat-account__item__left">
              <img v-lazy="getImgURL(item.fileId,'LARGE_LOGO')" class="chat-account__item__left__image">
            </div>
            <div class="chat-account__item__center">
              <div class="chat-account__item__center__name">
                {{item.name}}
              </div>
              <div class="chat-account__item__center__message" v-if="item.chatRecord">
                {{item.chatRecord.messageType === 'TEXT'? item.chatRecord.message : '您有一条图片消息'}}
              </div>
            </div>
            <div class="chat-account__item__right">
              <div class="chat-account__item__right__time" v-if="item.chatRecord" >
                {{item.chatRecord.createdDate | datetime}}
              </div>
            </div>
          </div>
        </div>
        <no-data v-show="finished === true"></no-data>
      </van-list>
    </base-layout>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {getAccount} from "../../storage";

export default {
  name: '',
  mixins: [],
  watch: {
    stompClient(val) {
      if (val === null) {
        this.connection();
      }
    }
  },
  computed: {},
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      pageNum: 0,
      pageSize: 15,
      list: [],
      user: getAccount(),
      stompClient: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.connection();
    })
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
    this.disconnect();
  },
  methods: {
    async onRefresh() {
      this.loading = false;
      this.finished = false;
      this.isLoading = false;
      this.pageNum = 0;
      this.pageSize = 15;
      this.list.splice(0);
      await this.onLoad();
    },
    async onLoad() {
      this.pageNum++;
      const params = {
        'pageNum': this.pageNum,
        'pageSize': this.pageSize,
        'id': this.user.id
      };
      const data = await this.$supervise.get('/api/supervise/chats', params);
      this.isLoading = false;
      this.loading = false;
      this.list = this.list.concat(data.list);
      if (data.list.length === 0) {
        this.finished = true;
      }
    },
    connection() {
      let socket = new SockJS(`${process.env.WEBSOCKET_ROOT}/hello`);
      this.stompClient = Stomp.over(socket);
      console.log('正在连接服务器...');
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe(`/user/${this.user.id}/message`, async (res) => {
          this.$notify({
            message: `您有新的消息`,
            duration: 3000,
            background: '#1989fa'
          });
          this.onRefresh();
        });
        console.log('连接成功');
      }, (err) => {
        console.log(err);
      });
    },
    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log('Disconnected');
      }
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
  .chat-account {
    &__item {
      background-color: white;
      padding: 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      &__left {
        &__image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      &__center {
        flex: 1;
        overflow: hidden;
        padding: 0 20px;
        &__name {
          font-size: 25px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
        &__message {
          margin-top: 10px;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(133, 133, 133, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      &__right {
        &__time {
          font-size: 25px;
        }
      }
    }
  }
</style>
