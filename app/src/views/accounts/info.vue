<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <info-cell :desc="account.username" title="手机号" />
      <info-cell :desc="account.name" title="姓名" />
      <info-cell :desc="$t(account.gender)" title="性别" />
      <info-cell :desc="account.age" title="年龄" />
      <info-cell :desc="account.identityNumber" title="身份证号" />
      <info-cell
        :desc="
          account.medicaidNumber === null
            ? '请到农商行签约'
            : account.medicaidNumber
        "
        title="医保卡号"
      />
      <div v-show="account.medicaidNumber">
        <info-cell :desc="medicaid.account" title="账户年度" />
        <info-cell :desc="medicaid.allBalance" title="上年度账户余额" />
        <info-cell :desc="medicaid.limit" title="本年度账户预划金额" />
        <info-cell :desc="medicaid.consume" title="账户支付金额" />
        <info-cell :desc="medicaid.balance" title="当前账户余额" />
        <info-cell :desc="medicaid.hospital" title="本年医保住院累计" />
        <info-cell :desc="medicaid.outpatient" title="本年医保门诊累计" />
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
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      if (this.account.medicaidNumber) {
        this.medicaid = await this.$http.get('/api/app/accounts/medicaid');
      }
    }
  }
};
</script>
