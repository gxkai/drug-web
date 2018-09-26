<template>
  <div class="insurance-consumeInfoMore">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="insurance-consumeInfoMore__content"
         ref="content">
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
    </div>
  </div>
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
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight
      ) + 'px';
      this.$refs.content.style.overflow = 'auto';
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .insurance-consumeInfoMore {
    background-color: #f5f5f5;
  }
</style>
