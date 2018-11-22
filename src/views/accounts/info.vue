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
      <van-cell title="手机号"
                class="mt-l-20"
                :value="account.username">
      </van-cell>

      <van-cell title="姓名"
                class="mt-l-20"
                :value="account.name">
      </van-cell>

      <van-cell title="性别"
                class="mt-l-20"
                :value="getGender(account.gender)">
      </van-cell>

      <van-cell title="年龄"
                class="mt-l-20"
                :value="account.age">
      </van-cell>

      <van-cell title="身份证号"
                class="mt-l-20"
                :value="account.identityNumber">
      </van-cell>

      <van-cell title="医保卡号"
                class="mt-l-20"
                :value="account.medicaidNumber">
      </van-cell>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
</style>
<script>
  export default {
    data() {
      return {
      };
    },
    computed: {
      account() {
        return this.$store.getters.account;
      }
    },
    created() {
    },
    methods: {
    }
  };
</script>
