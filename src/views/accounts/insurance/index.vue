<template>
  <div class="insurance">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="insurance__content"
         ref="content">
      <van-cell title="医保卡绑定"
                is-link
                class="mt-l-20"
                to="/accounts/card/bind">
      </van-cell>

      <van-cell title="医保账户信息查询" class="mt-l-20"
                is-link
                to="/accounts/insurance/account">
      </van-cell>

      <van-cell title="医保消息信息查询" class="mt-l-20"
                is-link
                to="/accounts/insurance/consume">
      </van-cell>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight
      ) + 'px';
      this.$refs.content.style.overflow = 'auto';
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .insurance {
    background-color: #f5f5f5;
  }
</style>
