<template>
  <div class="account-container">
    <!-- 头部 -->
    <mt-header>
      <router-link to="/messageTypes" slot="left">
        <i class=" iconfont ic-xiaoxi"></i>
      </router-link>

      <router-link to="/setting" slot="right">
        <i class=" iconfont ic-shezhi1"></i>
      </router-link>
    </mt-header>

    <div class="header all-center" v-if="isLogin">
      <img class="header-img" v-lazy="account.logoUrl"/>
      <span class="header-text">{{account.name}}</span>
    </div>

    <div class="header all-center" v-if="!isLogin">
      <router-link to="/login">
      <img class="header-img" src="../../assets/image/accounts/default_head.jpg"/>
      </router-link>
      <span class="header-text">登录/注册</span>
    </div>

    <div class="nav-bar">
      <router-link class="nav-bar-title flex-stream-sb" to="/orders?parameter=all">
        <span class="all-orders">全部订单</span>
        <div class="is-flex">
          <span>我的订单</span>
          <i class="iconfont ic-youjiantou"></i>
        </div>
      </router-link>
      <div class="nav-bar-content border-top-gray">
        <router-link class="flex-box nav-bar-content-margin" to="/orders?parameter=pendpay">
          <i class="iconfont ic-daishouhuo"></i>
          <span>代付款</span>
        </router-link>
        <router-link class="flex-box nav-bar-content-margin" to="/orders?parameter=goods">
          <i class="iconfont ic-daishouhuo"></i>
          <span>待发货</span>
        </router-link>
        <router-link class="flex-box nav-bar-content-margin" to="/orders?parameter=receivergoods">
          <i class="iconfont ic-daishouhuo"></i>
          <span>待收货</span>
        </router-link>
        <router-link class="flex-box nav-bar-content-margin" to="/orders?parameter=evalute">
          <i class="iconfont ic-daishouhuo"></i>
          <span>待评价</span>
        </router-link>
      </div>
    </div>
    <div class="account-content is-flex">
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/drugAppraises">
          <img src="../../assets/image/accounts/evaluation.png"/>
          <span class="mt-15">我的评价</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/chats">
          <img src="../../assets/image/accounts/consultation.png"/>
          <span class="mt-15">咨询</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/addresses" >
          <img src="../../assets/image/accounts/address.png"/>
          <span class="mt-15">地址</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-bottom-gray" to="/collects" >
          <img src="../../assets/image/accounts/coll.png"/>
          <span class="mt-15">收藏</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray" to="/orderRefunds">
          <img src="../../assets/image/accounts/refund.png"/>
          <span class="mt-15">退款</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray" to="/"
                     :to="null==this.account.medicalNumber?'/accounts/bind':'/accounts/unbind'" >
        <img src="../../assets/image/accounts/bind.png"/>
        <span class="mt-15">账户信息</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray" to="/accounts/view">
          <img src="../../assets/image/accounts/card.png"/>
          <span class="mt-15">医保卡信息</span>
        </router-link>
    </div>

    <router-link class=" foot-tag flex-stream-sb" to="/faqs">
      <span>常见问题</span>
      <i class="iconfont ic-youjiantou"></i>
    </router-link>

    <router-link class=" foot-tag flex-stream-sb" to="/feedbacks/create">
      <span>意见反馈</span>
      <i class="iconfont ic-youjiantou"></i>
    </router-link>
    <!--<allBottom></allBottom>-->

  </div>

</template>

<script>
  // import allBottom from '../../components/allBottom';

  export default {
    data() {
      return {
        countList: [],
        account: {},
        isLogin: false
      };
    },
    components: {
      // 'allBottom': allBottom
    },
    methods: {
      maxnumber(number) {
        if (number > 99) {
          return 99;
        } else {
          return number;
        }
      }
    },
    created() {
      if (this.$store.getters.account) {
        this.account = this.$store.getters.account;
        console.log(this.account);
        this.account.logoUrl = '/files/' + this.account.fileId + '/image?resolution=' + 'SMALL_LOGO';
        this.isLogin = !(typeof (this.account.username) === 'undefined');
        if (this.isLogin) {
          this.$http.get('/orders/count?', {
            headers: {
              'Authorization': JSON.parse(localStorage.account).token
            }
          })
            .then(res => {
              this.countList = res.data;
            });
        }
      }
    }
  }
  ;
</script>

<style scoped>
  .mint-header {
    background: #12b1f9 !important;
    color: black
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .is-flex{
    display: flex !important;
  }

  .border-left-gray{
    border-left:1px rgba(235,235,235,1) solid;
  }
  .border-right-gray{
    border-right: 1px rgba(235,235,235,1) solid;
  }
  .border-top-gray{
    border-top: 1px rgba(235,235,235,1) solid;
  }
  .border-bottom-gray{
    border-bottom: 1px rgba(235,235,235,1) solid;
  }

  .account-container{
    width: 720px;
    background: #f5f5f5;
    height: 100vh;
  }
  .all-center{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .flex-stream-sa{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header{
    width:720px;
    height:369px;
    background:#34cafe;
  }

  .header-img{
    width:150px;
    height:150px;
    border-radius: 50%;
  }
  .header-text{
    width:720px;
    height:28px;
    font-size:30px;
    color:rgba(255,255,255,1);
    line-height:40px;
    text-align: center;
    margin-top: 9px;
  }

  .nav-bar{
    width:719px;
    height:154px;
    background:rgba(255,255,255,1);
    margin-bottom: 14px;
    padding: 0px 15px;
    box-sizing: border-box;
  }
  .nav-bar-title{
    box-sizing: border-box;
    padding: 10px 0;
  }
  .nav-bar-content-margin{
    margin-top: 15px;
  }
  .all-orders{
    width:120px;
    font-size:24px;
    color:rgba(51,51,51,1);
    line-height:40px;
  }
  .nav-bar-content{
    display: flex;
    flex-direction: row;
    margin-bottom: 14px;
  }

  .account-content{
    width:720px;
    height:300px;
    background:rgba(255,255,255,1);
    flex-wrap: wrap;
  }

  .flex-box{
    box-sizing: border-box;
    width:25%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .account-content-padding{
    padding: 29px 48px;
  }
  .flex-box span{
    width:120px;
    height:20px;
    font-size:20px;
    color:rgba(51,51,51,1);
    line-height:36px;
    text-align: center;
  }
  .mt-15{
    margin-top: 15px;
  }
  .flex-box img{
    width: 42px;
    height: 42px;
  }

  .foot-tag{
    width:719px;
    height:70px;
    background:rgba(255,255,255,1);
    margin-top: 14px;
    padding: 24px 16px;
    box-sizing: border-box;

    color:rgba(102,102,102,1);
  }
</style>
