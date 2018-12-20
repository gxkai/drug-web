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
      <van-cell title="就医类型"
                :value="consumeInfoMore.type">
      </van-cell>
      <van-cell title="就医机构"
                class="mt-l-20"
                :value="consumeInfoMore.hospital">
      </van-cell>
      <van-cell title="结算日期"
                class="mt-l-20"
                :value="dateConvert(consumeInfoMore.date)">
      </van-cell>
      <van-cell title="费用总额"
                class="mt-l-20"
                value-class="amount"
                :value="consumeInfoMore.amount">
      </van-cell>
      <van-cell title="账户支付"
                class="mt-l-20"
                value-class="amount"
                :value="consumeInfoMore.account">
      </van-cell>

      <van-cell title="统筹支付"
                class="mt-l-20"
                value-class="amount"
                :value="consumeInfoMore.plan">
      </van-cell>
      <!--<van-cell title="救助支付"-->
                <!--class="mt-l-20"-->
                <!--:value="consumeInfoMore.help">-->
      <!--</van-cell>-->
      <van-cell title="现金支付"
                class="mt-l-20"
                value-class="amount"
                :value="consumeInfoMore.self">
      </van-cell>

    </template>
  </new-layout>
</template>
<script>
  export default {
    data() {
      return {
        consumeInfoMore: JSON.parse(this.$route.query.consumeInfoMore)
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
