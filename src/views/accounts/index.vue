<template>
  <div class="account">
    <new-layout class="faqs">
      <template slot="center">
        <div class="account-header" :style="headerBg">
          <van-uploader :after-read="onRead">
            <div class="account--name">{{ account.name }}</div>
            <div class="logo-bg">
              <img v-lazy="getImgURL(account.fileId,'LARGE_LOGO')" class="account-header-logo"/>
            </div>
          </van-uploader>

          <van-icon name="lingdang"
                    class="lingdang"
                    @click="linkToMessageType"></van-icon>
          <!--<van-icon name="setting"-->
          <!--class="setting"-->
          <!--@click="$router.push('/setting')"></van-icon>-->
          <!--<div class="account-header-sign_in"-->
          <!--v-text="signIn === true ? '已签到' : '每日签到'"-->
          <!--:style="{backgroundColor: signIn === true ? 'Pink': ''}"-->
          <!--@click="$router.push('/points/signIn')">-->
          <!--</div>-->
          <div class="account-fixed-order">
            <div class="order__header">
              <router-link to="/orders">
                <div class="left__all-order">
                  <span>全部订单</span>
                </div>
                <div class="right__my-order">
                  <span>我的订单</span>
                  <van-icon name="youjiantou" />
                </div>
              </router-link>
            </div>

            <van-tabbar :fixed="Boolean(false)">

              <van-tabbar-item v-if="count.toPayCount === 0"
                               icon="daifukuan"
                               :to="{path:'/orders', query:{state: 'TO_PAY'}}">待付款
              </van-tabbar-item>

              <van-tabbar-item v-else
                               icon="daifukuan"
                               :info="count.toPayCount"
                               :to="{path:'/orders', query:{state: 'TO_PAY'}}">待付款
              </van-tabbar-item>

              <van-tabbar-item v-if="count.toDeliveryCount === 0"
                               icon="yaopin"
                               :to="{path:'/orders', query:{state: 'TO_DELIVERY'}}">调剂中
              </van-tabbar-item>

              <van-tabbar-item v-else
                               icon="yaopin"
                               :info="count.toDeliveryCount "
                               :to="{path:'/orders', query:{state: 'TO_DELIVERY'}}">调剂中
              </van-tabbar-item>


              <van-tabbar-item  v-if="count.toReceivedCount === 0"
                                icon="daishouhuo1"
                                :to="{path:'/orders', query:{state: 'TO_RECEIVED'}}">待收货
              </van-tabbar-item>

              <van-tabbar-item  v-else
                                icon="daishouhuo1"
                                :info="count.toReceivedCount"
                                :to="{path:'/orders', query:{state: 'TO_RECEIVED'}}">待收货
              </van-tabbar-item>

              <van-tabbar-item
                v-if="count.toAppraiseCount === 0"
                icon="wenjianjia"
                :to="{path:'/orders', query:{state: 'TO_APPRAISE'}}">待评价
              </van-tabbar-item>

              <van-tabbar-item v-else
                               icon="wenjianjia"
                               :info="count.toAppraiseCount"
                               :to="{path:'/orders', query:{state: 'TO_APPRAISE'}}">待评价
              </van-tabbar-item>
            </van-tabbar>
          </div>
        </div>
        <div class="account-content">
          <div class="account--grid">
            <ul>
              <li>
                <router-link
                  class="account--grid--item"
                  tag="div"
                  to="/accounts/info"
                >
                  <div class="left-icon-title">
                    <van-icon name="wode"></van-icon>
                    <span>我的账号</span>
                  </div>
                  <van-icon name="youjiantou"></van-icon>
                </router-link>
              </li>
              <li>
                <!--医保账单---待改-->
                <div
                  class="account--grid--item"
                  @click="routerToConsume"
                >
                  <div class="left-icon-title">
                    <van-icon name="tiyanjin"></van-icon>
                    <span>医保账单</span>
                  </div>
                  <van-icon name="youjiantou"></van-icon>
                </div>
              </li>
              <li>
                <router-link
                  class="account--grid--item"
                  tag="div"
                  to="/addresses"
                >
                  <div class="left-icon-title">
                    <van-icon name="wodedizhi"></van-icon>
                    <span>我的地址</span>
                  </div>
                  <van-icon name="youjiantou"></van-icon>
                </router-link>
              </li>
              <li>
                <router-link
                  class="account--grid--item"
                  tag="div"
                  to="/collects"
                >
                  <div class="left-icon-title">
                    <van-icon name="shoucang2"></van-icon>
                    <span>我的收藏</span>
                  </div>
                  <van-icon name="youjiantou"></van-icon>
                </router-link>
              </li>
              <li>
                <router-link
                  class="account--grid--item"
                  tag="div"
                  to="/drugAppraises"
                >
                  <div class="left-icon-title">
                    <van-icon name="pingjia1"></van-icon>
                    <span>我的评价</span>
                  </div>
                  <van-icon name="youjiantou"></van-icon>
                </router-link>
              </li>
              <li>
                <router-link
                  class="account--grid--item"
                  tag="div"
                  to="/faqs"
                >
                  <div class="left-icon-title">
                    <van-icon name="xiaoxi1"></van-icon>
                    <span>常见问题</span>
                  </div>
                  <van-icon name="youjiantou"></van-icon>
                </router-link>
              </li>
              <li>
                <router-link
                  class="account--grid--item"
                  tag="div"
                  to="/feedbacks/create"
                >
                  <div class="left-icon-title">
                    <van-icon name="tishi"></van-icon>
                    <span>意见反馈</span>
                  </div>
                  <van-icon name="youjiantou"></van-icon>
                </router-link>
              </li>
            </ul>
            <!--<router-link-->
            <!--class="account&#45;&#45;grid&#45;&#45;item"-->
            <!--tag="div"-->
            <!--to="/orders"-->
            <!--&gt;-->
            <!--<van-icon name="dingdan"></van-icon>-->
            <!--<div>我的订单</div>-->
            <!--</router-link>-->
            <!--<router-link-->
            <!--class="account&#45;&#45;grid&#45;&#45;item"-->
            <!--to="/chats"-->
            <!--&gt;-->
            <!--<van-icon name="kefu-tianchong"></van-icon>-->
            <!--<div>我的咨询</div>-->
            <!--</router-link>-->
            <!--<router-link-->
            <!--class="account&#45;&#45;grid&#45;&#45;item"-->
            <!--tag="div"-->
            <!--to="/accounts/insurance"-->
            <!--&gt;-->
            <!--<van-icon name="yibao-" color="#ff8400"></van-icon>-->
            <!--<div>我的医保</div>-->
            <!--</router-link>-->


            <!--<router-link-->
            <!--class="account&#45;&#45;grid&#45;&#45;item"-->
            <!--to="/points"-->
            <!--&gt;-->
            <!--<van-icon name="jifen1"></van-icon>-->
            <!--<div>我的积分</div>-->
            <!--</router-link>-->
          </div>
        </div>
      </template>

      <template slot="bottom">
        <van-tabbar
          :fixed="Boolean(false)"
          :value="4"
          id="footer"
        >
          <van-tabbar-item icon="icon"
                           to="/home">首页
          </van-tabbar-item>
          <van-tabbar-item icon="chufang"
                           to="/rxs">处方单
          </van-tabbar-item>
          <van-tabbar-item icon="fenlei"
                           to="/drugTypes">分类
          </van-tabbar-item>
          <van-tabbar-item icon="gouwuche2"
                           to="/carts">购物车
          </van-tabbar-item>
          <van-tabbar-item icon="wo"
                           to="/accounts">我
          </van-tabbar-item>
        </van-tabbar>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/less" lang="less">
  /deep/ .van-icon {
    font-size: 40px;
    &-dizhi1 {
      color: #FF3BAE;
    }
    &-xingxing2 {
      color: #FF802B;
    }
    &-kefu-tianchong {
      color: #46CD90;
    }
    &-dingdan {
      color: #FF655D;
    }
    &-purse {
      color: #F6C500;
    }
    &-wo {
      color: #1AC3FE;
    }
    &-jifen1 {
      color: #9850DB;
    }
    &-yibaoqia {
      color: #F00;
    }
    &-changjianwenti1 {
      color: #72bd63;
    }
    &-yijianfankui {
      color: #ff9800;
    }
    &-pingjia {
      color: #FF0000;
    }
    &-youjiantou {
      color: #000;
      font-size: 30px;
      line-height: initial;
    }
    &-daifukuan {
      color: #9CA2F9;
    }
    &-yaopin {
      color: #88C79A;
    }
    &-daishouhuo1{
      color: #FDBB59;
    }
    &-wenjianjia{
      color: #7DCAF7;
    }
  }

  /deep/.account-fixed-order {
    position: static;
    margin-top: 60px;
    .van-tabbar-item__icon{
      i{
        font-size: 50px !important;
        padding-bottom: 10px;
      }
      .van-info {
        line-height: 38px;
        padding: 0 8px;
      }
    }
  }

</style>
<style scoped type="text/scss" lang="scss">

  $mainColor:#e74a45;

  .van-uploader{
    z-index: 2;
    position: relative;
    top: 150px;
  }

  [class*=van-hairline]::after{
    border: none;
  }

  .account {
    background-color: #f5f5f5;
    display: flex;
    flex-flow: column;
    height: 100vh;

    .logo-bg{
      width: 180px;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding:8px;
      border-radius: 50%;
      background: #FFF;
      box-shadow: 0 3px 13px -3px $mainColor;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .order__header{
      a{
        height:60px;
        line-height: 60px;
        display: flex;
        color: #000;
        div{
          display: flex;
          align-items: center;
          span{
            font-size: 28px;
          }
        }
      }
      .left__all-order{
        flex: 1;
        padding-left: 20px;
      }
      .right__my-order{
        flex: 1;
        justify-content: flex-end;
        text-align: right;
      }
    }

    &--name{
      text-align: center;
      font-size: 35px;
      color: #FFF;
      padding: 50px 0 30px;
    }

    &--grid {
      background: #FFF;
      margin-top: 140px;

      ul{
        padding: 15px 0;
      }

      &--item {
        height: 80px;
        display: flex;
        align-items: center;
        padding: 15px 0 15px 30px;
        .left-icon-title{
          flex: 1.5;
          .van-icon{
            font-size: 42px;
            color: $mainColor;
          }
          span{
            font-size: 28px;
            color: #5F5F5F;
            display: inline-block;
            vertical-align: sub;
            padding-left: 20px;
          }
        }
        .van-icon{
          flex: .2;
          font-size: 35px;
          color: #5F5F5F;
          text-align: center;
          vertical-align: bottom;
          display: inline-block;
        }
      }
    }

    &-content {
      flex: 1;
    }

    &-fixed-order{
      width: 690px;
      background: #FFF;
      border-radius: 20px;
      box-shadow: 0 0 20px -2px $mainColor;

      .van-tabbar{
        margin: 30px auto;
        border-radius: 50px;
        &-item--active{
          color: #5F5F5F;
        }
      }
    }
    &-header {
      width: 720px;
      height: 395px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;

      &-login {
        &_text {
          text-align: center;
          font-size: 25px;
          color: white;
        }
      }
      &-sign_in {
        position: absolute;
        right: 0;
        top: 150px;
        border: 1PX solid #1AB6FD;
        background-color: white;
        padding: 0 5px 0 10px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        color: #333333;
        font-size: 25px;
      }
      .lingdang {
        font-size: 40px;
        color: white;
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .setting {
        font-size: 40px;
        color: white;
        position: absolute;
        left: 20px;
        top: 20px;
      }
    }
  }
</style>

<script>
  import { setAccount } from '../../storage';
  import { Toast } from 'vant';

  export default {
    data() {
      return {
        headerBg: {
          background: 'url(' + require('../../../src/assets/image/accounts/banner.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        },
        count: {
          toAppraiseCount: 0,
          toDeliveryCount: 0,
          toPayCount: 0,
          toReceivedCount: 0
        },
        account: this.$store.getters.account,
        show: true,
        signIn: false,
        accountInfo: ''
      };
    },
    created() {
      this.initData();
      this.accountInfo = this.$store.getters.account;
    },
    mounted() {
    },
    methods: {
      routerToConsume() {
        if (this.accountInfo.medicaidNumber) {
          this.$router.push('/accounts/insurance/consume');
        } else {
          Toast('请到农商行签约');
        }
      },
      async initData() {
        this.count = await this.$http.get('/orders/count');
        this.signIn = await this.$http.get('pointRecords/signIn/validateDailySignIn');
      },
      async onRead(file) {
        let param = new FormData();
        param.append('fileType', 'LOGO');
        param.append('file', file.file);
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        let fileId = await this.$http.post('/files', param, config);
        this.account.fileId = fileId;
        await this.$http.put('/accounts', this.account);
        this.$store.commit('SET_ACCOUNT', this.account);
        setAccount(this.accountId);
      }
    }
  };
</script>
