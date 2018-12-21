<template>
  <new-layout>
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="account__info">
        <van-cell title="手机号"
                  :value="account.username">
        </van-cell>

        <van-cell title="姓名"
                  :value="account.name">
        </van-cell>

        <van-cell title="性别"
                  :value="getGender(account.gender)">
        </van-cell>

        <van-cell title="年龄"
                  :value="account.age">
        </van-cell>

        <van-cell title="身份证号"
                  :value="account.identityNumber">
        </van-cell>

        <van-cell title="社保编号"
                  :value="account.medicaidNumber === null ? '请到农商行签约' : account.medicaidNumber">
        </van-cell>
      </div>
      <div class="medicare__info" v-if="account.medicaidNumber">

        <van-cell title="账户年度"
                  class="mt-l-20"
                  :value="medicaid.account">
        </van-cell>

        <van-cell title="上年度账户余额"
                  class="mt-l-20"
                  value-class="amount"
                  :value="medicaid.allBalance">
        </van-cell>

        <van-cell title="本年度账户预划金额"
                  class="mt-l-20"
                  value-class="amount"
                  :value="medicaid.limit">
        </van-cell>

        <van-cell title="账户支付金额"
                  class="mt-l-20"
                  value-class="amount"
                  :value="medicaid.consume">
        </van-cell>

        <van-cell title="当前账户余额"
                  class="mt-l-20"
                  value-class="amount"
                  :value="medicaid.balance">
        </van-cell>

        <van-cell title="本年医保住院累计"
                  class="mt-l-20"
                  value-class="amount"
                  :value="medicaid.hospital">
        </van-cell>

        <van-cell title="本年医保门诊累计"
                  class="mt-l-20"
                  value-class="amount"
                  :value="medicaid.outpatient">
        </van-cell>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">

  .medicare__info{
    margin-bottom: 40px;
  }

</style>
<script>
  export default {
    data() {
      return {
        medicaid: ''
      };
    },
    computed: {
      account() {
        return this.$store.getters.account;
      }
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.medicaid = await this.$http.get('/accounts/medicaid');
      }
    }
  };
</script>
