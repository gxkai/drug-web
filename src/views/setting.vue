<template>
  <div class="setting">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <van-cell title="当前版本"
              is-link
              class="mt-l-20"
              to="/version">
    </van-cell>

    <van-cell title="关于我们" class="mt-l-20"
              is-link
              to="/about">
    </van-cell>
    <div class="setting-footer"
         @click="logout" v-show="$store.getters.account !==null">
      退出当前账号
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less" >
  .setting {
    width: 720px;
    height: 100vh;
    background-color: #f5f5f5;
    &-footer {
      color: white;
      background-color: #1AB6FD;
      height: 100px;
      width: 100%;
      font-size: 30px;
      position: fixed;
      bottom: 0;
      text-align: center;
      line-height: 100px;
    }
  }
</style>
<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('LOGIN_OUT').then(res => {
          this.$router.push('/accounts');
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    created() {
    }
  };
</script>
