<template>
  <!--<div class="f_body accountbody">-->

    <!--<mt-header>-->
      <!--<router-link to="/messageTypes" slot="left">-->
        <!--<i class="icon iconfont ic-xiaoxi"></i>-->
      <!--</router-link>-->

      <!--<router-link to="/setting" slot="right">-->
        <!--<i class="icon iconfont ic-shezhi1"></i>-->
      <!--</router-link>-->
    <!--</mt-header>-->

    <!--&lt;!&ndash;<div class="f_account_center_header" v-if="isLogin">&ndash;&gt;-->
    <!--<div class="f_account_center_header" >-->
      <!--<router-link to="/accounts/view">-->
        <!--&lt;!&ndash;<img v-lazy="account.logoUrl"/>&ndash;&gt;-->
        <!--<img src="1111"/>-->
      <!--</router-link>-->
      <!--&lt;!&ndash;<span>{{account.name}}</span>&ndash;&gt;-->
      <!--<span>xxxx</span>-->
    <!--</div>-->
    <!--&lt;!&ndash;<div class="f_account_center_header" v-if="!isLogin">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="f_account_center_header">&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="/login" onclick="javascript:location.reload();">&ndash;&gt;-->
        <!--&lt;!&ndash;<img src="../../assets/image/accounts/accounts/default_head.jpg"/>&ndash;&gt;-->
      <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<span>登录/注册</span>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--<div class="f_account_center_order">-->
      <!--<router-link class="f_account_center_orders" to="/orders?parameter=all">-->
        <!--<span class="all-orders">全部订单</span>-->
        <!--<span class="f_account_my_orders">我的订单<img src="../../assets/image/accounts/order/right.png"></span>-->
      <!--</router-link>-->
      <!--<div class="f_account_center_order_lists">-->
        <!--&lt;!&ndash;<router-link class="f_account_center_menu_list" to="/orders?parameter=pendpay">&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="icon iconfont icon-daifukuan01" style="color:#333333!important;">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="f_badge" v-if="countList.toPayCount !== 0 && countList.toPayCount !== undefined">&ndash;&gt;-->
              <!--&lt;!&ndash;<mt-badge size="small" type="error">{{maxnumber(countList.toPayCount)}}</mt-badge>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</i>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="f_badge" v-if="countList.toPayCount !== 0 && countList.toPayCount !== undefined">&ndash;&gt;-->
            <!--&lt;!&ndash;<mt-badge size="small" type="error" style="position: absolute;left: -3rem;top: -1rem;">&ndash;&gt;-->
              <!--&lt;!&ndash;{{countList.toPayCount}}&ndash;&gt;-->
            <!--&lt;!&ndash;</mt-badge>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<span>待付款</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->

        <!--&lt;!&ndash;<router-link class="f_account_center_menu_list" to="/orders?parameter=goods">&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="icon iconfont icon-wodedaifahuo3dtouchshangpinxiangqing" style="color:#333333!important;">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="f_badge" v-if="countList.toDeliveryCount !== 0 && countList.toDeliveryCount !== undefined">&ndash;&gt;-->
              <!--&lt;!&ndash;<mt-badge size="small" type="error">{{maxnumber(countList.toDeliveryCount)}}</mt-badge>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</i>&ndash;&gt;-->
          <!--&lt;!&ndash;<span>待发货</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->

        <!--&lt;!&ndash;<router-link class="f_account_center_menu_list" to="/orders?parameter=receivergoods">&ndash;&gt;-->

          <!--&lt;!&ndash;<i class="icon iconfont ic-daishouhuo" style="color:#333333!important;font-size: 2.7rem!important;">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="f_badge" v-if="countList.toReceivedCount !== 0 && countList.toReceivedCount !== undefined">&ndash;&gt;-->
              <!--&lt;!&ndash;<mt-badge size="small" type="error">{{maxnumber(countList.toReceivedCount)}}</mt-badge>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</i>&ndash;&gt;-->
          <!--&lt;!&ndash;<span>待收货</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->

        <!--&lt;!&ndash;<router-link class="f_account_center_menu_list" to="/orders?parameter=evalute">&ndash;&gt;-->

          <!--&lt;!&ndash;<i class="icon iconfont icon-daipingjia" style="color:#333333!important;">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="f_badge" v-if="countList.toAppraiseCount !== 0 && countList.toAppraiseCount !== undefined">&ndash;&gt;-->
              <!--&lt;!&ndash;<mt-badge size="small" type="error">{{maxnumber(countList.toAppraiseCount)}}</mt-badge>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</i>&ndash;&gt;-->
          <!--&lt;!&ndash;<span>待评价</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</router-link>&ndash;&gt;-->

      <!--</div>-->
    <!--</div>-->


    <!--<router-link class="f_account_center_questions" to="/faqs" style="margin-top:1rem;" >-->
      <!--<span>常见问题</span>-->
      <!--<img src="../../assets/image/accounts/order/right.png">-->
    <!--</router-link>-->

    <!--<router-link class="f_account_center_feedback" to="/feedbacks/create" style="margin-top:1rem;margin-bottom:8rem;" >-->
      <!--<span>意见反馈</span>-->
      <!--<img src="../../assets/image/accounts/order/right.png">-->
    <!--</router-link>-->
    <!--&lt;!&ndash;<allBottom></allBottom>&ndash;&gt;-->
  <!--</div>-->

  <div class="account-container">
    <div class="header all-center">
      <img class="header-img" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
      <span class="header-text">微恙</span>
    </div>
    <div class="nav-bar ">
      <div class="nav-bar-title flex-stream-sb">
        <span>全部订单</span>
        <div class="is-flex">
          <span>我的订单</span>
          <i class="icon" />
        </div>
      </div>

      <hr class="text-hr" >

    </div>
    <div class="account-content is-flex">
        <router-link class="flex-box" to="/drugAppraises">
          <img src="../../assets/image/accounts/evaluation.png"/>
          <span>我的评价</span>
        </router-link>
        <router-link class="flex-box" to="/chats">
          <img src="../../assets/image/accounts/consultation.png"/>
          <span>咨询</span>
        </router-link>
        <router-link class="flex-box" to="/addresses" >
          <img src="../../assets/image/accounts/address.png"/>
          <span>地址</span>
        </router-link>
        <router-link class="flex-box" to="/collects" >
          <img src="../../assets/image/accounts/coll.png"/>
          <span>收藏</span>
        </router-link>
        <router-link class="flex-box" to="/orderRefunds">
          <img src="../../assets/image/accounts/refund.png"/>
          <span>退款</span>
        </router-link>
        <!--<router-link class="flex-box"-->
        <!--:to="null==this.account.medicalNumber?'/accounts/bind':'/accounts/unbind'" style="margin-top:0px;border-bottom:0px;" >-->
        <!--<img src="../../assets/image/accounts/bind.png"/>-->
        <!--<span>账户信息</span>-->
        <!--</router-link>-->
        <router-link class="flex-box" to="/accounts/view">
          <img src="../../assets/image/accounts/card.png"/>
          <span>医保卡信息</span>
        </router-link>
    </div>
    <div class="foot-tag flex-row-sb-center">
      <span >常见问题</span>
      <i class="icon" />
    </div>
    <div class="foot-tag flex-row-sb-center">
      <span >意见反馈</span>
      <i class="icon" />
    </div>

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
      // if (this.$store.getters.account) {
      //   this.account = this.$store.getters.account;
      //   this.account.logoUrl = this.URL_PATH + '/files/' + this.account.fileId + '/image?resolution=' + 'SMALL_LOGO';
      //   this.isLogin = !(typeof (this.account.username) === 'undefined');
      //   if (this.isLogin) {
      //     this.$http.get(this.URL_PATH + '/orders/count?', {
      //       headers: {
      //         'Authorization': JSON.parse(localStorage.account).token
      //       }
      //     })
      //       .then(res => {
      //         this.countList = res.data;
      //       });
      //   }
      // }
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

  .all-center{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .flex-row-sb-center{
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    line-height:40px;
    text-align: center;
    margin-top: 9px;
  }

  .nav-bar{
    width:719px;
    height:154px;
    background:rgba(255,255,255,1);
    border: 1px black solid;
  }

  .text-hr{
    width:690px;
    height:1px;
    opacity:0.38;
    border:1px rgba(204,204,204,1) solid;
  }

  .account-content{
    width:720px;
    height:300px;
    background:rgba(255,255,255,1);
    flex-wrap: wrap;
  }

  .flex-box{
    padding: 29px 48px;
    box-sizing: border-box;
    width:25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border:
  }
  .flex-box span{
    width:100px;
    height:20px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(51,51,51,1);
    line-height:36px;
    text-align: center;
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

    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
  }

  /*.f_account_center_order .icon .mint-badge {*/
    /*position: absolute !important;*/
    /*right: -13% !important;*/
    /*top: -13% !important;*/
    /*height: 1.5rem !important;*/
    /*width: 1.5rem !important;*/
    /*font-size: 0.5rem !important;*/
    /*border-radius: 1.5rem !important;*/
    /*margin: 0 !important;*/
    /*text-align: center !important;*/
    /*line-height: 1.5rem !important;*/
    /*padding: 0 !important;*/
  /*}*/

  /*.f_body {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: #f5f5f5;*/
    /*color: #757575;*/
    /*text-align: left;*/
  /*}*/

  /*.f_account_center_header {*/
    /*width: 100%;*/
    /*text-align: center;*/
    /*box-sizing: border-box;*/
    /*padding: 2rem;*/
    /*background: #12b1f9;*/
    /*color: #e1f4f5;*/
  /*}*/

  /*.f_account_center_header img {*/
    /*width: 4rem;*/
    /*height: 4rem;*/
    /*border-radius: 50%;*/
  /*}*/

  /*.f_account_center_header > span {*/
    /*display: block;*/
  /*}*/

  /*.f_account_center_order .icon {*/
    /*font-size: 2.5rem;*/
    /*position: relative;*/
  /*}*/

  /*.f_account_center_orders {*/
    /*width: 100%;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
    /*box-sizing: border-box;*/
    /*padding: 1.2rem 1rem;*/
    /*background: white;*/
    /*border-bottom: 2px #f9f9f9 solid;*/
  /*}*/

  /*.f_account_center_orders :last-child {*/
    /*font-size: 1rem;*/
    /*color: #a5a5a5;*/
  /*}*/

  /*.f_account_my_orders {*/
    /*display: flex;*/
    /*justify-items: center*/
  /*}*/

  /*.f_account_center_order_lists {*/
    /*box-sizing: border-box;*/
    /*padding-bottom: 0.5rem;*/
    /*width: 100%;*/
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*background: white;*/
  /*}*/

  /*.f_account_center_menu_lists {*/
    /*width: 100%;*/
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*background: white;*/
    /*margin-top: 0.5rem;*/
    /*height: 15rem;*/
  /*}*/


   /*.f_account_center_menu_list {*/
    /*width: 25%;*/
    /*margin-top: 0.5rem;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*position: relative;*/

  /*}*/

  /*.f_account_center_menu_listd {*/
    /*width: 25%;*/
    /*padding-top: 0.5rem;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*position: relative;*/
    /*border-right: 1px solid #ebebeb;*/
    /*border-bottom: 1px solid #ebebeb;*/
  /*}*/
  /*.f_account_center_menu_listd:nth-child(4n){*/
    /*border-right: none;*/
  /*}*/

  /*.f_account_center_menu_list img {*/
    /*width: 2rem;*/
    /*height: 2rem;*/
  /*}*/

  /*.f_account_center_menu_list span {*/
    /*display: block;*/
    /*font-size: 1rem;*/
    /*margin-top: 0.5rem;*/
  /*}*/

  /*.f_account_center_questions, .f_account_center_feedback {*/
    /*margin-top: 0.5rem;*/
    /*background: white;*/
    /*padding: 1rem;*/
    /*box-sizing: border-box;*/
    /*display: flex;*/
    /*color: #969696;*/
    /*font-size: 1rem;*/
    /*justify-content: space-between;*/
  /*}*/

  /*.ic-xiaoxi, .ic-shezhi1 {*/
    /*color: white;*/
    /*font-size: 2rem;*/
  /*}*/

  /*.mint-badge.is-size-small {*/
    /*height: 15px;*/
    /*padding: 0px;*/
    /*width: 15px;*/
  /*}*/

  /*.accountbody {*/
    /*height: 100vh;*/
  /*}*/
</style>
