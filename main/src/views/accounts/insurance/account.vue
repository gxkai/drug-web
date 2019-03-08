<template>
  <new-layout class="insurance-account">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-cell title="姓名"
                class="mt-l-20"
                :value="accountInfo.name">
      </van-cell>

      <van-cell title="医保编号" class="mt-l-20"
                :value="accountInfo.medicaidNumber">
      </van-cell>

      <van-cell title="历史账户余额" class="mt-l-20"
                :value="accountInfo.allBalance">
      </van-cell>

      <van-cell title="本年预划额度" class="mt-l-20"
                :value="accountInfo.limit">
      </van-cell>

      <van-cell title="本年账户划入" class="mt-l-20"
                :value="Number(accountInfo.shift)">
      </van-cell>

      <van-cell title="本年消费累计" class="mt-l-20"
                :value="accountInfo.consume">
      </van-cell>

      <van-cell title="医保账户余额" class="mt-l-20"
                :value="accountInfo.balance">
      </van-cell>

      <van-cell title="累计月数" class="mt-l-20"
                :value="accountInfo.month">
      </van-cell>
    </template>
  </new-layout>
</template>
<script>
  export default {
    data() {
      return {
        accountInfo: []
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.accountInfo = this.$http.get('/accounts/medicaid');
      }
    }
  };
</script>
<style scoped type="text/scss" lang="scss">
</style>
