<template>
  <new-layout>
    <template slot="center">
      <info-cell :desc="consumeInfoMore.type" title="就医类型" />
      <info-cell :desc="consumeInfoMore.hospital" title="就医机构" />
      <info-cell
        :desc="consumeInfoMore.date | dateFmt('YYYY-MM-DD')"
        title="结算日期"
      />
      <info-cell :desc="consumeInfoMore.amount" title="费用总额" />
      <info-cell :desc="consumeInfoMore.account" title="账户支付" />
      <info-cell :desc="consumeInfoMore.plan" title="统筹支付" />
      <info-cell :desc="consumeInfoMore.self" title="现金支付" />
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
      consumeInfoMore: this.$route.params.consumeInfoMore
    };
  },
  created() {
    console.log(this.consumeInfoMore);
  },
  mounted() {}
};
</script>
<style scoped type="text/scss" lang="scss"></style>
