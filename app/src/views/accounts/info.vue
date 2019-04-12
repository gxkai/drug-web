<template>
  <new-layout>
    <template slot="center">
      <new-white-space/>
      <info-cell title="手机号" :desc="account.username"/>
      <info-cell title="姓名" :desc="account.name"/>
      <info-cell title="性别" :desc="$t(account.gender)"/>
      <info-cell title="年龄" :desc="account.age"/>
      <info-cell title="身份证号" :desc="account.identityNumber"/>
      <info-cell title="医保卡号":desc="account.medicaidNumber === null ? '请到农商行签约' : account.medicaidNumber"/>
      <div v-show="account.medicaidNumber">
        <info-cell title="账户年度" :desc="medicaid.account"/>
        <info-cell title="上年度账户余额" :desc="medicaid.allBalance"/>
        <info-cell title="本年度账户预划金额" :desc="medicaid.limit"/>
        <info-cell title="账户支付金额" :desc="medicaid.consume"/>
        <info-cell title="当前账户余额" :desc="medicaid.balance"/>
        <info-cell title="本年医保住院累计" :desc="medicaid.hospital"/>
        <info-cell title="本年医保门诊累计" :desc="medicaid.outpatient"/>
      </div>
    </template>
  </new-layout>
</template>

<script>
  import infoCell from '@/components/accounts/infoCell';
  export default {
    components: {
      infoCell
    },
    data() {
      return {
        medicaid: {}
      };
    },
    computed: {
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        if (this.account.medicaidNumber) {
          this.medicaid = await this.$http.get('/api/accounts/medicaid');
        }
      }
    }
  };
</script>
