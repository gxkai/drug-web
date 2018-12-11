<template>
  <div class="account">
    <div class="account-header">
      <van-uploader :after-read="onRead">
        <img v-lazy="getImgURL(account.fileId,'LARGE_LOGO')" class="account-header-logo"/>
      </van-uploader>

      <van-icon name="lingdang"
                class="lingdang"
                @click="linkToMessageType"></van-icon>
      <van-icon name="setting"
                class="setting"
                @click="$router.push('/setting')"></van-icon>
      <!--<div class="account-header-sign_in"-->
           <!--v-text="signIn === true ? '已签到' : '每日签到'"-->
           <!--:style="{backgroundColor: signIn === true ? 'Pink': ''}"-->
           <!--@click="$router.push('/points/signIn')">-->
      <!--</div>-->
    </div>

    <div class="account-content">
      <van-cell-group>
        <van-cell title="全部订单" value="我的订单" to="/orders" is-link/>
      </van-cell-group>

      <van-tabbar :fixed="Boolean(false)">
        <van-tabbar-item icon="icon-test" :info="count.toPayCount === 0 ? '':count.toPayCount"
                         :to="{path:'/orders', query:{state: 'TO_PAY'}}">待付款
        </van-tabbar-item>
        <van-tabbar-item icon="icon-test1" :info="count.toDeliveryCount === 0 ? '':count.toDeliveryCount "
                         :to="{path:'/orders', query:{state: 'TO_DELIVERY'}}">待发货
        </van-tabbar-item>
        <van-tabbar-item icon="daishouhuo" :info="count.toReceivedCount === 0 ? '' : count.toReceivedCount"
                         :to="{path:'/orders', query:{state: 'TO_RECEIVED'}}">待收货
        </van-tabbar-item>
        <van-tabbar-item icon="daipingjia01" :info="count.toAppraiseCount === 0 ? '' : count.toAppraiseCount"
                         :to="{path:'/orders', query:{state: 'TO_APPRAISE'}}">待评价
        </van-tabbar-item>
      </van-tabbar>

      <div class="account--grid">
        <router-link
          class="account--grid--item"
          tag="div"
          to="/orders"
        >
          <van-icon name="dingdan"></van-icon>
          <div>我的订单</div>
        </router-link>
        <!--<router-link-->
          <!--class="account&#45;&#45;grid&#45;&#45;item"-->
          <!--to="/chats"-->
        <!--&gt;-->
          <!--<van-icon name="kefu-tianchong"></van-icon>-->
          <!--<div>我的咨询</div>-->
        <!--</router-link>-->
        <router-link
          class="account--grid--item"
          tag="div"
          to="/addresses"
        >
          <van-icon name="dizhi1"></van-icon>
          <div>我的地址</div>
        </router-link>
        <router-link
          class="account--grid--item"
          tag="div"
          to="/collects"
        >
          <van-icon name="xingxing2"></van-icon>
          <div>我的收藏</div>
        </router-link>
        <router-link
          class="account--grid--item"
          tag="div"
          to="/accounts/info"
        >
          <van-icon name="wo"></van-icon>
          <div>我的账号</div>
        </router-link>
        <!--<router-link-->
          <!--class="account&#45;&#45;grid&#45;&#45;item"-->
          <!--to="/points"-->
        <!--&gt;-->
          <!--<van-icon name="jifen1"></van-icon>-->
          <!--<div>我的积分</div>-->
        <!--</router-link>-->
        <router-link
          class="account--grid--item"
          tag="div"
          to="/accounts/insurance"
        >
          <van-icon name="yibao-" color="#ff8400"></van-icon>
          <div>我的医保</div>
        </router-link>
        <router-link
          class="account--grid--item"
          tag="div"
          to="/drugAppraises"
        >
          <van-icon name="pingjia"></van-icon>
          <div>我的评价</div>
        </router-link>
        <router-link
          class="account--grid--item"
          tag="div"
          to="/faqs"
        >
          <van-icon name="changjianwenti1"></van-icon>
          <div>常见问题</div>
        </router-link>
        <router-link
          class="account--grid--item"
          tag="div"
          to="/feedbacks/create"
        >
          <van-icon name="yijianfankui"></van-icon>
          <div>意见反馈</div>
        </router-link>
      </div>
    </div>
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
    &-pingjia {
      color: #FF0000;
    }
  }

  .account {
    background-color: #f5f5f5;
    display: flex;
    flex-flow: column;
    height: 100vh;
    &--grid {
      margin-top: 20px;
      display: flex;
      flex-flow: row wrap;
      &--item {
        flex: 0 0 25%;
        height: 120px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-top: 1PX solid #EBEBEB;
        border-right: 1PX solid #EBEBEB;
        &>div {
          font-size: 25px;
          margin-top: 10px;
        }
      }
    }
    &-content {
      flex: 1;
    }
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
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.count = await this.$http.get('/orders/count');
        this.signIn = await this.$http.get('pointRecords/signIn/validateDailySignIn');
      },
      onRead(file) {
        let param = new FormData();
        param.append('fileType', 'LOGO');
        param.append('file', file.content);
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        this.$axios.post('/files/image', param, config).then(async res => {
          this.account.fileId = res.data;
          await this.$http.put('/accounts', this.account);
          this.$store.commit('SET_ACCOUNT', this.account);
        });
      }
    }
  }
  ;
</script>
