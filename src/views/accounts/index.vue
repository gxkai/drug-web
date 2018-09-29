<template>
  <div class="account">
    <div class="account-header"
         ref="header">
      <img :src="getImgURL(account.fileId,'LARGE_LOGO')" class="account-header-logo"
           v-if="account!== null"/>
      <div class="account-header-login"
           @click="$router.push('/login')"
           v-else>
        <img src="../../assets/image/accounts/default_head.jpg"/>
        <div class="account-header-login_text">登录/注册</div>
      </div>

      <van-icon name="lingdang"
                class="lingdang"
                @click="linkToMessageType"></van-icon>
      <van-icon name="setting"
                class="setting"
                @click="$router.push('/setting')"></van-icon>
      <div class="account-header-sign_in"
           v-text="signIn === true ? '已签到' : '每日签到'"
           :style="{backgroundColor: signIn === true ? 'Pink': ''}"
           @click="everyDay()">
      </div>
    </div>

    <div class="account-content"
         ref="content">
      <van-cell-group>
        <van-cell title="全部订单" value="我的订单" to="/orders" is-link/>
      </van-cell-group>

      <van-tabbar :fixed="Boolean(false)">
        <van-tabbar-item icon="icon-test" :info="count.toAppraiseCount === 0 ? '':count.toAppraiseCount"
                         :to="{path:'/orders', query:{state: 'TO_PAY'}}">待付款
        </van-tabbar-item>
        <van-tabbar-item icon="icon-test1" :info="count.toDeliveryCount === 0 ? '':count.toDeliveryCount "
                         :to="{path:'/orders', query:{state: 'TO_DELIVERY'}}">待发货
        </van-tabbar-item>
        <van-tabbar-item icon="daishouhuo" :info="count.toPayCount === 0 ? '' : count.toPayCount"
                         :to="{path:'/orders', query:{state: 'TO_RECEIVED'}}">待收货
        </van-tabbar-item>
        <van-tabbar-item icon="daipingjia01" :info="count.toReceivedCount === 0 ? '' : count.toReceivedCount"
                         :to="{path:'/orders', query:{state: 'TO_APPRAISE'}}">待评价
        </van-tabbar-item>
      </van-tabbar>

      <van-tabbar :fixed="Boolean(false)" class="mt-l-20">
        <van-tabbar-item icon="dingdan"
                         class="van-hairline--right"
                         to="/orders">
          我的订单
        </van-tabbar-item>
        <van-tabbar-item icon="kefu-tianchong"
                         class="van-hairline--right"
                         to="/chats">
          我的咨询
        </van-tabbar-item>
        <van-tabbar-item icon="dizhi1"
                         class="van-hairline--right"
                         to="/addresses">
          地址
        </van-tabbar-item>
        <van-tabbar-item icon="xingxing2"
                         to="/collects">
          我的收藏
        </van-tabbar-item>
      </van-tabbar>
      <van-tabbar :fixed="Boolean(false)">
        <van-tabbar-item icon="purse"
                         class="van-hairline--right"
                         to="/orderRefunds">
          退款
        </van-tabbar-item>
        <van-tabbar-item icon="wo"
                         class="van-hairline--right"
                         to="/accounts/edit">
          账号设置
        </van-tabbar-item>
        <van-tabbar-item icon="jifen1"
                         class="van-hairline--right"
                         to="/points">
          我的积分
        </van-tabbar-item>
        <van-tabbar-item icon="yibaoqia"
                         to="/accounts/insurance">
          医保信息
        </van-tabbar-item>
      </van-tabbar>
      <van-row>
        <van-col span="12">
          <van-tabbar :fixed="Boolean(false)">
            <van-tabbar-item icon="changjianwenti1"
                             class="van-hairline--right"
                             to="/faqs">
              常见问题
            </van-tabbar-item>
            <van-tabbar-item icon="yijianfankui"
                             class="van-hairline--right"
                             to="/feedbacks/create">
              意见反馈
            </van-tabbar-item>
          </van-tabbar>
        </van-col>
      </van-row>
    </div>
    <new-footer :urlRouter="$route.path" ref="footer"></new-footer>
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
      color: red;
    }
    &-changjianwenti1 {
      color: #72bd63;
    }
    &-yijianfankui {
      color: #ff9800;
    }
  }

  .account {
    background-color: #f5f5f5;
    &-header {
      width: 720px;
      height: 369px;
      background: linear-gradient(0deg, rgba(0, 173, 179, 1), rgba(19, 193, 254, 1), rgba(134, 219, 249, 1));
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
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
        font-size: 50px;
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
  export default {
    data() {
      return {
        count: {
          toAppraiseCount: 0,
          toDeliveryCount: 0,
          toPayCount: 0,
          toReceivedCount: 0
        },
        account: this.$store.getters.account,
        show: true,
        signIn: false
      };
    },
    created() {
      if (this.account !== null) {
        this.$http.get('/orders/count')
          .then(res => {
            this.count = res.data;
            console.log(res.data);
          }).catch(error => {
            this.exception(error);
          });
        this.$http.get('pointRecords/signIn/validateDailySignIn')
          .then(res => {
            this.signIn = res.data;
            console.log(res.data);
          })
          .catch(err => {
            this.exception(err);
          });
      }
    },
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.footer.$el.clientHeight
      ) + 'px';
      this.$refs.content.style.overflow = 'auto';
    },
    methods: {
      everyDay() {
        this.$router.push('/points/signIn');
      }
    }
  }
  ;
</script>
