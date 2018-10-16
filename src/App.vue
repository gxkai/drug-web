<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setAccount, setToken, getToken, getAccount } from './assets/js/auth';

export default {
  name: 'App',
  created() {
    /**
     * 首次打开 storage -> vux
     */
    getAccount() &&
    this.$store.commit('SET_ACCOUNT', getAccount());
    getToken() &&
    this.$store.commit('SET_TOKEN', getToken());
    /**
     * 刷新 vux -> storage
     */
    window.addEventListener('beforeunload', () => {
      setAccount(this.$store.getters.account);
      setToken(this.$store.getters.token);
    });
  }
};
</script>
<style lang="scss">
@import "assets/scss/index.scss";

</style>
