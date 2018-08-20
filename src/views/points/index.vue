<template>
  <div>
    <div class="points-continer bg-f5f5f5">
      <new-header title="我的积分">
        <div slot="left">
          <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
        </div>
      </new-header>
      <div class="points-me bg-white">
        <div class="left d-inline-block fl">
          <i class="iconfont ic-jifen text-13C1FE"></i>
          <span class="text-333333 d-inline-block">剩余积分：</span>
          <span class="text-EC6941 d-inline-block">{{$store.getters.account.point}}</span>
        </div>
        <div class="middle d-inline-block fl"></div>
        <div class="right" @click="changes()">
          <i class="iconfont ic-jifen01 text-EC6941"></i>
          <span class="text-333333 d-inline-block">兑换记录></span>
        </div>
      </div>
      <div class="points-exchange bg-f5f5f5 text-center">
        <span class="line-one d-inline-block"></span>
        <span class="title">兑换商品</span>
        <span class="line-two d-inline-block"></span>
      </div>
    </div>
    <new-coupon v-bind:couponList="couponList"></new-coupon>
  </div>
</template>
<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        pageNum: 1,
        pageSize: 15,
        couponList: [],
        accountId: this.$store.getters.account.id
      };
    },
    methods: {
      changes() {
        this.$router.push('/points/exchangeRecord?id=' + this.accountId + '&type=realrecord');
      }
    },
    created: function () {
      this.$http.get('/coupons')
        .then(res => {
          this.couponList = res.data.list;
          console.log('wudan');
          console.log(res);
          this.id = res.data.list.id;
        });
    }
  };
</script>
<style scoped>
  .points-continer {
    width: 720px;
  }

  .points-me {
    width: 720px;
    height: 130px;
    line-height: 120px;
  }

  .points-me .left span {
    font-size: 24px !important;
  }

  .points-me .right span {
    font-size: 24px !important;
  }

  .points-me .middle {
    width: 2px;
    height: 80px;
    background: rgba(191, 191, 191, 1);
    margin-top: 20px;
    margin-left: 71px;
  }

  .points-exchange {
    width: 720px;
    height: 100px;
    line-height: 100px;
    display: table;
  }

  .points-exchange span {
    line-height: 100px;
  }

  .points-exchange .line-one {
    width: 117px;
    height: 3px;
    background: rgba(191, 191, 191, 1);
    vertical-align: middle;
    margin-right: 16px;
  }

  .points-exchange .title {
    font-size: 30px;
    font-weight: bold;
  }

  .points-exchange .line-two {
    width: 117px;
    height: 3px;
    background: rgba(191, 191, 191, 1);
    vertical-align: middle;
    margin-left: 16px;
  }

  .ic-jifen, .ic-jifen01 {
    font-size: 60px !important;
    width: 63px;
    height: 63px;
    margin: 28px 13px 29px 31px;
    vertical-align: middle;
  }

</style>
