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
      <van-cell title="我的医保卡"
                is-link
                class="mt-l-20"
                to="/accounts/card/bind">
      </van-cell>

      <!--<van-cell title="医保账户信息查询" class="mt-l-20"-->
                <!--is-link-->
                <!--to="/accounts/insurance/account">-->
      <!--</van-cell>-->

      <!--<van-cell title="医保消息信息查询" class="mt-l-20"-->
                <!--is-link-->
                <!--to="/accounts/insurance/consume">-->
      <!--</van-cell>-->
    </template>
  </new-layout>
</template>
<script>
</script>
<style scoped type="text/less" lang="less">
</style>
