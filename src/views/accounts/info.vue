<template>
  <div class="account-edit" >
    <van-nav-bar
    :title="$route.name"
    left-arrow
    @click-left="$router.go(-1)"
    ref="header"/>
    <div class="account-edit--content">
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
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .account-edit {
    display: flex;
    flex-flow: column;
    height: 100vh;
    &--content {
      background-color: #f5f5f5;
      flex: 1;
      overflow: auto;
    }
  }
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
