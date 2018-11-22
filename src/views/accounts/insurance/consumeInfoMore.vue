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
      <van-cell title="类型"
                class="mt-l-20"
                :value="consumeInfoMore.type">
      </van-cell>
      <van-cell title="就诊医院"
                class="mt-l-20"
                :value="consumeInfoMore.hospital">
      </van-cell>
      <van-cell title="就诊日期"
                class="mt-l-20"
                :value="dateConvert(consumeInfoMore.date)">
      </van-cell>
      <van-cell title="就诊金额"
                class="mt-l-20"
                :value="consumeInfoMore.amount">
      </van-cell>
      <van-cell title="统筹支付"
                class="mt-l-20"
                :value="consumeInfoMore.plan">
      </van-cell>
      <van-cell title="统筹自付"
                class="mt-l-20"
                :value="consumeInfoMore.planSelf">
      </van-cell>
      <van-cell title="救助支付"
                class="mt-l-20"
                :value="consumeInfoMore.help">
      </van-cell>
      <van-cell title="账户支付"
                class="mt-l-20"
                :value="consumeInfoMore.account">
      </van-cell>
      <van-cell title="现金自付"
                class="mt-l-20"
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
    },
    mounted() {
    }
  };
</script>
<style scoped type="text/less" lang="less">
</style>
