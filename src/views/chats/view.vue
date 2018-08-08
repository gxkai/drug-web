<template>
  <div class="main">
    <div ref="header">
      <new-header title="咨询">
        <div slot="left">
          <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
        </div>
      </new-header>
      <div class="header-state">
        <div><span>{{shopInfo.shopName}}</span></div>
        <div>
          <span v-if="shopInfo.isOnline">在线</span>
          <span v-else>离线</span>
        </div>
      </div>
      <new-edit-line :name="getCurrentTime()"></new-edit-line>
    </div>
    <div class="body">
      <div>
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <div class="content1" v-if="item.type === 'SHOP'">
              <img v-lazy="shopInfo.headImg">
              <div class="bubble">{{item.message}}</div>
            </div>
            <div class="content2" v-else>
              <div class="bubble2">{{item.message}}</div>
              <img v-lazy="getImgURL(account.fileId,'SMALL_LOGO')">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer ref="footer">
      <div class="center">
        <input v-model="value" @keyup.enter="send()">
        <button @click="send()">发送</button>
      </div>
    </footer>
  </div>

</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    data() {
      return {
        shopInfo: {},
        time: '',
        pageNum: 1,
        pageSize: 15,
        list: [],
        value: '',
        shopId: this.$route.query.shopId,
        chatId: this.$route.query.chatId,
        account: this.$store.getters.account
      };
    },
    created: function () {
      /**
       * 获取chatId
       */
      if (!this.chatId) {
        this.$http.get('/chats/id?shopId=' + this.shopId).then(res => {
          this.chatId = res.data;
          this.getChatInfo();
        }).catch(error => {
          this.exception(error);
        });
      } else {
        this.getChatInfo();
      }
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.footer.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    },
    methods: {
      getChatInfo() {
        /**
         * 获取聊天列表信息
         * @type {string}
         */
        let url = '/chats/' + this.chatId + '?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
        this.$http.get(url).then(res => {
          this.shopInfo = {
            'shopName': res.data.shopName,
            'headImg': this.getImgURL(res.data.shopFileId),
            'isOnline': res.data.isOnline
          };
          this.list = res.data.records.list;
        }).catch(error => {
          this.exception(error);
        });
      },
      send() {
        if (this.isBlank(this.value)) {
          MessageBox('提示', '消息不能为空');
        } else {
          this.$http.post('/chats', {
            'type': 'ACCOUNT',
            'message': this.value,
            'shopId': this.shopId
          }).then(res => {
            var chat = {
              message: this.value,
              type: 'ACCOUNT'
            };
            this.list.push(chat);
            this.value = '';
          });
        }
      }
    }
  };
</script>

<style scoped>
  .main {
    background: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }

  .header-state {
    padding: 20px;
    background-color: white;
    height: 117px;
  }

  .header-state div:nth-child(1) {
    font-size: 34px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    text-align: center;
  }

  .header-state div:nth-child(2) {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    text-align: center;
  }

  .body {
    height: calc(100vh - 130px - 140px - 117px);
    overflow: scroll;
  }

  ul li .content1 {
    display: inline-flex;
  }

  ul li .content1 img {
    height: 85px;
    border-radius: 50px;
    margin-left: 20px;
  }

  .bubble {
    position: relative;
    width: 455px;
    min-height: 100px;
    margin-left: 25px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    display: block;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
    padding: 20px;
  }

  .bubble:before {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    right: 100%;
    top: 38px;
    border-top: 13px solid transparent;
    border-right: 26px solid rgba(255, 255, 255, 1);
    border-bottom: 13px solid transparent;
  }

  ul li .content2 {
    display: flex;
    padding: 20px;
    flex-direction: row;
    justify-content: space-around;
  }

  ul li .content2 img {
    height: 85px;
    border-radius: 50px;
  }

  .bubble2 {
    position: relative;
    width: 455px;
    min-height: 100px;
    margin-left: 95px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    display: block;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
    padding: 20px;
  }

  .bubble2:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    right: 0;
    left: 100%;
    top: 38px;
    border-top: 13px solid transparent;
    border-left: 26px solid rgba(255, 255, 255, 1);
    border-bottom: 13px solid transparent;
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 720px;
    height: 140px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer .center input {
    width: 472px;
    height: 60px;
    background: rgba(220, 220, 220, 1);
    border-radius: 3px;
    border: 0;
    outline: none;
  }

  footer .center button {
    width: 97px;
    height: 60px;
    background: rgba(19, 193, 254, 1);
    border-radius: 3px;
  }
</style>
