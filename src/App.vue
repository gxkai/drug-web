<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { setAccount, setToken, getAccount, getToken } from './storage';

export default {
  name: 'App',
  data() {
    return {
      loginInfo: {
        username: '18896781024',
        password: '123456',
        clientId: '1'
      }
    };
  },
  computed: {
  },
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
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import "assets/scss/index.scss";

</style>
