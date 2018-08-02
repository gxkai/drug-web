<template>
  <div class="main">
    <new-header title="咨询">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>
    <div class="body">
      <div class="body1">
        <div><span>{{shopInfo.shopName}}</span></div>
        <div>
          <span v-if="shopInfo.isOnline">在线</span>
          <span v-else>离线</span>
        </div>
      </div>
    </div>
    <div class="body2">
      <div>
        <new-edit-line :name="shopInfo.name"></new-edit-line>
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <div class="content1" v-if="item.type === 'SHOP'">
              <img v-lazy="shopInfo.headImg">
              <div class="bubble">{{item.message}}</div>
            </div>
            <div class="content2" v-else>
              <div class="bubble2">{{item.message}}</div>
              <img v-lazy="account.headImg">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="center">
        <input v-model="value">
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
      this.account.headImg = this.getImgURL(this.account.fileId, 'SMALL_LOGO');
      /**
       * 获取chatId
       */
      this.chatId = this.$route.query.chatId;
      if (!this.chatId) {
        this.$http.get('/chats/id', {shopId: this.shopId}).then(res => {
          this.chatId = res.data;
        }).catch(error => {
          this.exception(error);
        });
      }
      /**
       * 获取聊天列表信息
       * @type {string}
       */
      let url = '/chats/' + this.chatId + '?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
      this.$http.get(url).then(res => {
        this.shopInfo = {
          'shopName': res.data.shopName,
          'headImg': this.getImgURL(res.data.shopFileId),
          'isOnline': res.data.isOnline,
          'time': this.getCurrentTime()
        };
        this.list = res.data.records.list;
      });
    },
    methods: {
      send() {
        if (!this.value) {
          let url = '/chats';
          this.$http.post(url, {
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
        } else {
          MessageBox('提示', '消息不能为空');
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

  .body1 {
    padding: 20px;
    background-color: white;
    height: 117px;
  }

  .body1 div:nth-child(1) {
    font-size: 34px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    text-align: center;
  }

  .body1 div:nth-child(2) {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    text-align: center;
  }

  .body2 {
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
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    line-height:22px;
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
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    line-height:22px;
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

  /*.mint-header {*/
  /*background: #12b1f9;*/
  /*color: white;*/
  /*}*/

  /*.mint-button--primary {*/
  /*background: #1AB6FD;*/
  /*color: #e2e2e2;*/
  /*}*/

  /*.f_advisory_title {*/
  /*margin-top: 1rem;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*}*/
  /*.f_advisory_title :first-child{*/
  /*font-size: 1.25rem;*/
  /*}*/

  /*.f_advisory_main {*/
  /*margin-top: 1rem;*/
  /*}*/

  /*.f_advisory_time {*/
  /*width: 100%;*/
  /*color: #a8a7a8;*/
  /*font-size: 0.65rem;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*}*/

  /*.f_advisory_title :first-child {*/

  /*}*/

  /*.f_advisory_title :nth-child(2) {*/
  /*font-size: 1rem;*/
  /*color: #6b6b6b;*/
  /*}*/

  /*.f_advisory_head_img img {*/
  /*width: 3rem;*/
  /*height: 3rem;*/
  /*border-radius: 50%;*/
  /*margin: 0.5rem;*/
  /*box-sizing: border-box;*/
  /*}*/

  /*.f_advisory_smile,*/
  /*.f_advisory_add {*/
  /*background: #1AB6FD;*/
  /*}*/

  /*.f_advisory_shop,*/
  /*.f_advisory_me {*/
  /*color: #808080;*/
  /*font-size: 1rem;*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*}*/

  /*.f_advisory_shop span,*/
  /*.f_advisory_me span {*/
  /*border-bottom: 1px #d6d4d5 solid;*/
  /*box-sizing: border-box;*/
  /*padding: 1rem 0;*/
  /*width: 23.5rem;*/
  /*}*/

  /*.f_advisory_me {*/
  /*float: right;*/
  /*}*/

  /*.f_advisory_shop {*/
  /*float: left;*/
  /*clear: both;*/
  /*}*/

  /*.f_advisory_input {*/
  /*position: fixed;*/
  /*left: 0;*/
  /*bottom: 0;*/
  /*width: 100%;*/
  /*background: white;*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: center;*/
  /*padding: 2rem;*/
  /*}*/

  /*.f_advisory_send {*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: center;*/
  /*}*/

  /*.f_advisory_send_icon {*/
  /*background: #1AB6FD;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*box-sizing: border-box;*/
  /*padding: 0 0.2rem;*/
  /*border-radius: 2px;*/
  /*}*/

  /*.f_advisory_smile,*/
  /*.f_advisory_add {*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*padding: 0.2rem;*/
  /*box-sizing: border-box;*/
  /*border-radius: 50%;*/
  /*}*/

  /*.f_advisory_smile {*/
  /*margin-right: 1rem;*/
  /*}*/

  /*.f_advisory_add {*/
  /*margin-left: 1rem;*/
  /*}*/

  /*.f_advisory_send input {*/
  /*background: #cccccc;*/
  /*border: none;*/
  /*outline: none;*/
  /*border-radius: 2px;*/
  /*padding-left: 0.5rem;*/
  /*}*/
</style>
