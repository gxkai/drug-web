<template>
  <new-layout>
    <template slot="center">
      <info-cell title="就医类型" :desc="consumeInfoMore.type"/>
      <info-cell title="就医机构" :desc="consumeInfoMore.hospital"/>
      <info-cell title="结算日期" :desc="consumeInfoMore.date|dateFmt('YYYY-MM-DD')"/>
      <info-cell title="费用总额" :desc="consumeInfoMore.amount"/>
      <info-cell title="账户支付" :desc="consumeInfoMore.account"/>
      <info-cell title="统筹支付" :desc="consumeInfoMore.plan"/>
      <info-cell title="现金支付" :desc="consumeInfoMore.self"/>
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
    mounted() {
    }
  };
</script>
<style scoped type="text/scss" lang="scss">
</style>
