<template>
  <div class="account-container">
    <new-header height="low" ref="header">
      <div slot="left">
        <router-link tag="i" to="/messageTypes" class="iconfont ic-xiaoxi"></router-link>
      </div>
      <div slot="right">
        <router-link tag="i" to="/setting" class=" iconfont ic-shezhi1"></router-link>
      </div>
    </new-header>
    <div ref="body">
      <div class="header all-center" v-if="JSON.stringify(account) !== '{}'">
        <img class="header-img" :src="getImgURL(account.fileId,'LARGE_LOGO')"/>
        <!--<span class="everyday"-->
              <!--:style="{backgroundImage:'url('+require('../../assets/image/accounts/dayily.png')+')',backgroundSize:'100%'}"-->
              <!--@click="everyDay()">-->
        <!--每日签到-->
        <!--</span>-->
       </div>
      <div class="header all-center" v-else>
        <router-link to="/login">
          <img class="header-img" src="../../assets/image/accounts/default_head.jpg"/>
        </router-link>
        <span class="header-text">登录/注册</span>
      </div>
      <div class="nav-bar">
        <div class="nav-bar-title">
          <div class="nav-bar-title-left">全部订单</div>
          <div class="nav-bar-title-right" @click="$router.push('/orders')">
            <div>我的订单</div>
            <div>
              <i class="iconfont ic-youjiantou"></i>
            </div>
          </div>
        </div>
        <new-line></new-line>
        <div class="nav-bar-order">
          <router-link tag="div" to="/orders/toPay">
            <i class="iconfont ic-icon-test"></i>
            <p>待付款</p>
          </router-link>
          <router-link tag="div" to="/orders/toDeliver">
            <i class="iconfont ic-icon-test1"></i>
            <p>待发货</p>
          </router-link>
          <router-link tag="div" to="/orders/toReceive">
            <i class="iconfont ic-gerenzhongxindingdandaishouhuo"></i>
            <p>待收货</p>
          </router-link>
          <router-link tag="div" to="/orders/toAppraise">
            <i class="iconfont ic-daipingjia01"></i>
            <p>待评价</p>
          </router-link>
        </div>
      </div>
      <div class="account-content is-flex">
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/drugAppraises">
          <img src="../../assets/image/accounts/d-order.png"/>
          <span class="mt-15">我的评价</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/chats">
          <img src="../../assets/image/accounts/consultation.png"/>
          <span class="mt-15">我的咨询</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/addresses">
          <img src="../../assets/image/accounts/address.png"/>
          <span class="mt-15">地址</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-bottom-gray" to="/collects">
          <img src="../../assets/image/accounts/coll.png"/>
          <span class="mt-15">我的收藏</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/orderRefunds">
          <img src="../../assets/image/accounts/refund.png"/>
          <span class="mt-15">退款</span>
        </router-link>
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/accounts/view">
          <img src="../../assets/image/accounts/d-seeting.png"/>
          <span class="mt-15">账户设置</span>
        </router-link>
        <!--<router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/points">-->
          <!--<img src="../../assets/image/accounts/d-points.png"/>-->
          <!--<span class="mt-15">我的积分</span>-->
        <!--</router-link>-->
        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray"
                     :to="null==this.account.medicalNumber?'/accounts/card/bind':'/accounts/unbind'">
          <img src="../../assets/image/accounts/card.png"/>
          <span class="mt-15">医保卡信息</span>
        </router-link>

        <router-link class="flex-box account-content-padding border-right-gray border-bottom-gray" to="/faqs">
          <img src="../../assets/image/accounts/d-issue.png"/>
          <span class="text">常见问题</span>
        </router-link>

        <router-link class="flex-box account-content-padding border-right-gray" to="/feedbacks/create">
          <img src="../../assets/image/accounts/d-opinion.png"/>
          <span class="text">意见反馈</span>
        </router-link>
      </div>
    </div>
    <new-footer :urlRouter="$route.path" ref="footer"></new-footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        countList: [],
        account: this.$store.getters.account,
        show: true
      };
    },
    methods: {
      close() {
        this.show = !this.show;
      },
      coupon() {
        this.show = !this.show;
      },
      maxnumber(number) {
        if (number > 99) {
          return 99;
        } else {
          return number;
        }
      },
      everyDay() {
        this.$http.post('/pointRecords/signIn').then(res => {
          this.$store.state.account.point++;
          this.$http.get('/pointRecords/signInPoint').then(res => {
            this.$router.push('/points/signIn?points=' + res.data);
          }).then(error => {
            this.exception(error);
          });
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    created() {
      if (JSON.stringify(this.account) !== '{}') {
        this.$http.get('/orders/count?')
          .then(res => {
            this.countList = res.data;
          }).catch(error => {
            this.exception(error);
          });
      }
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight - this.$refs.footer.$el.clientHeight
      ) + 'px';
      this.$refs.body.style.overflow = 'scroll';
    }
  }
  ;
</script>
<style scoped>
  .everyday {
    padding: 5px 10px;
    position: absolute;
    top: 173px;
    right: 0;
    font-size:22px;
  }

  .is-flex {
    display: flex !important;
  }

  .border-left-gray {
    border-left: 1PX rgba(235, 235, 235, 1) solid;
  }

  .border-right-gray {
    border-right: 1PX rgba(235, 235, 235, 1) solid;
  }

  .border-top-gray {
    border-top: 1PX rgba(235, 235, 235, 1) solid;
  }

  .border-bottom-gray {
    border-bottom: 1PX rgba(235, 235, 235, 1) solid;
  }

  .account-container {
    width: 720px;
    background: #f5f5f5;
    height: 100vh;
  }

  .all-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .flex-stream-sa {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .flex-stream-sb {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    width: 720px;
    height: 369px;
    background: #34cafe;
  }

  .header-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .header-text {
    width: 720px;
    height: 28px;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    text-align: center;
    margin-top: 9px;
  }

  .nav-bar {
    background: rgba(255, 255, 255, 1);
    margin-bottom: 5px;
  }

  .nav-bar-order {
    padding-bottom: 10px;
    margin-top: 20px;
  }

  .account-content {
    width: 720px;
    height: 451px;
    background: rgba(255, 255, 255, 1);
    flex-wrap: wrap;
    margin-bottom: 20px;
    margin-top: 40px;
  }

  .flex-box {
    box-sizing: border-box;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .account-content-padding {
    padding: 29px 48px;
  }

  .flex-box span {
    width: 120px;
    height: 20px;
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    line-height: 36px;
    text-align: center;
  }

  .mt-15 {
    margin-top: 15px;
  }

  .flex-box img {
    width: 42px;
    height: 42px;
  }

  .nav-bar-order {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 720px;
    background: white;
  }

  .nav-bar-order div {
    text-align: center;
  }

  .nav-bar-order div p {
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
  }

  .nav-bar-order div i {
    font-size: 35px;
  }

  .foot-tag {
    margin-bottom: 20px;
    width: 719px;
    height: 70px;
    background: rgba(255, 255, 255, 1);
    margin-top: 14px;
    padding: 24px 16px;
    box-sizing: border-box;
    color: rgba(102, 102, 102, 1);
  }

  .text {
    height: 40px;
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
  }
  .nav-bar-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .nav-bar-title-left {
    font-size: 26px;
  }
  .nav-bar-title-right {
    color: #889092;
    display: flex;
    align-items: center;
  }
  .nav-bar-title-right>div {
    font-size: 24px;
  }
  .nav-bar-title-right .ic-youjiantou {
    font-size: 30px;
  }




</style>
