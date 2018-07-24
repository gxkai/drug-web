<template>
  <div class="main">
    <div class="header1">
      <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      <span class="span1">咨询</span>
    </div>
    <div class="body">
      <div class="body1">
        <div><span>老百姓大药房</span></div>
        <div><span>在线</span></div>
      </div>
    </div>
    <div class="body2">
      <div>
        <div class="line1"><span>2017/11/8 11:20</span></div>
        <ul>
          <li>
            <div>
              <img src="../../assets/image/shopDrugs.png">
              <div class="bubble">
                <br>
                <br>
                <div class="trishadow"></div>
                <div class="tri"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="center">
        <input>
        <button>发送</button>
      </div>
    </footer>
    <!--<mt-header title="咨询">-->
      <!--<router-link to="/accounts" slot="left">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->

    <!--<div class="f_advisory_title">-->
      <!--<span>{{shopInfo.shopName}}</span>-->
      <!--<span v-if="shopInfo.isOnline">在线</span>-->
      <!--<span v-else="shopInfo.isOnline">离线</span>-->
    <!--</div>-->

    <!--<div class="f_advisory_main">-->
      <!--<div class="f_advisory_time">-->
        <!--<span>{{shopInfo.time}}</span>-->
      <!--</div>-->
      <!--<div class="f_advisory_shop">-->
        <!--<div class="f_advisory_head_img">-->
          <!--<img src="static/img/meisu.jpg"/>-->
        <!--</div>-->
        <!--<span>您好，欢迎咨询老百姓药房，请问有什么可以帮助您的么？您好，欢迎咨询老百姓药房，请问有什么可以帮助您的么？</span>-->
      <!--</div>-->
      <!--<div class="f_advisory_me" v-for="(list,index) in lists" >-->
        <!--<span style="text-align: right;">{{list.message}}</span>-->
        <!--<div class="f_advisory_head_img">-->
          <!--<img :src="account.imgUrl"/>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->

    <!--<div class="f_advisory_input">-->
      <!--<div class="f_advisory_smile">-->
        <!--<img src="static/img/advisory/smile.png"/>-->
      <!--</div>-->
      <!--<div class="f_advisory_send">-->
        <!--<input type="text" v-model="value"/>-->
        <!--<div class="f_advisory_send_icon" @click="send()">-->
          <!--<img src="static/img/advisory/send.png" alt=""/>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="f_advisory_add">-->
        <!--<img src="static/img/advisory/add.png"/>-->
      <!--</div>-->
    <!--</div>-->

  </div>

</template>

<script>
  export default {
    data() {
      return {
        shopInfo: {},
        time: '',
        pageNum: 1,
        pageSize: 15,
        lists: [{
          id: '3',
          chatId: '1',
          message: '有啥事？',
          account: [],
          isAccount: null,
          createdDate: 1525341047000
        }],
        value: '',
        shopId: '',
        account: {}
      };
    },
    created: function () {
      // this.shopId = this.$route.query.shopI;
      // this.account = this.$store.getters.account;
      // this.account.headImg = this.getImgURL(this.account.fileId, 'SMALL_LOGO');
      // var id = this.$route.query.chatId || this.$http.get('/chats/id', {shopId: this.shopId});
      // var url = '/chats/' + id + '?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
      // this.$http.get(url).then(res => {
      //   this.shopInfo.shopName = res.data.shopName;
      //   this.shopInfo.fileId = res.data.shopFileId;
      //   this.shopInfo.isOnline = res.data.isOnline;
      //   this.lists = res.data.records.list;
      //   this.shopInfo.time = this.getTime();
      // });
    },
    methods: {
      send: function () {
        if (this.value !== '') {
          var url = this.URL_PATH + '/chats';
          this.$http.post(url, {
            'isAccount': false,
            'message': this.value,
            'shopId': this.shopId
          }).then(res => {
            var chat = {
              message: this.value,
              account: this.account,
              shopId: 1
            };
            this.lists.push(chat);
            this.value = '';
          });
        } else {
          alert('发送消息不能为空！');
        }
      }
    }
  };
</script>

<style scoped>
  .main {
    background:rgba(241,239,240,1);
    height: 100vh;
  }
  .header1 {
    width: 720px;
    height: 130px;
    font-size: 36px;
    background: rgba(19, 193, 254, 1);
    font-family: HiraginoSansGB-W3;
    color: rgba(254, 254, 254, 1);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }
  .header1 span {
    margin-right: 320px;
  }
  .ic-arrow-right:before {
    font-size: 50px;
  }

  .body1{
    padding: 20px;
    background-color: white;
    height: 117px;
  }
  .body1 div:nth-child(1){
    font-size:34px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height:40px;
    text-align: center;
  }
  .body1 div:nth-child(2){
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    line-height:40px;
    text-align: center;
  }

  .body2 {
    height: calc(100vh - 130px - 140px - 117px);
    overflow: scroll;
  }

  .line1 {
    padding: 20px;
  }

  .line1 span {
    display: block;
    position: relative;
    color:rgba(153,153,153,1);
    font-size:16px;
    font-family:MicrosoftYaHei;
    text-align: center;
  }

  .line1 span:before, .line1 span:after {
    content: '';
    position: absolute;
    top: 50%;
    background:rgba(220,220,220,1);
    width: 297px;
    height: 1px;
  }

  .line1 span:before {
    left: 10px;
  }

  .line1 span:after {
    right: 10px;
  }

  ul li div:nth-child(1) {
    display: inline-flex;
    align-items: center;
  }

  ul li div:nth-child(1) img {
    height:85px;
    border-radius: 50px;
    margin-left: 20px;
  }


  .bubble{
    background-color: #e9f9f6;
    margin:10px auto;
    padding:10px;
    position:relative;
    width:455px;
    -moz-border-radius:10px;
    -webkit-border-radius:10px;
    -moz-box-shadow:0 0 5px #919191;
    -webkit-box-shadow:0 1px 5px #919191;
  }
  .tri{
    border-color: #e9f9f6 transparent transparent transparent;
    border-style: solid;
    border-width: 9px 11px 7px 8px;
    height: 0px;
    width: 0px;
    position:absolute;
    bottom:-16px;
    left:20px;
  }
  .trishadow{
    border-color: #dedede transparent transparent transparent;
    border-style: solid;
    border-width: 10px 12px 7px 9px;
    height: 0px;
    width: 0px;
    position:absolute;
    bottom: -19px;
    left:19px;
  }



  footer{
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
    background:rgba(220,220,220,1);
    border-radius:3px;
    border: 0;
    outline: none;
  }
  footer .center button {
    width:97px;
    height:60px;
    background:rgba(19,193,254,1);
    border-radius:3px;
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
