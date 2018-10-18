<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setAccount, setToken, getLogin, getAccount, getToken } from './assets/js/auth';

export default {
  name: 'App',
  data() {
    return {
      loginInfo: {
        username: '15995611111',
        password: '123456',
        clientId: '1'
      }
    };
  },
  computed: {
  },
  created() {
    // 默认登陆
    if (!getLogin()) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '登陆中...'
      });
      console.log('登陆中');
      this.$store.dispatch('LOGIN', this.loginInfo)
        .then(() => {
          this.$toast.clear();
          console.log('登陆成功');
        }).catch((err) => {
          this.exception(err);
        });
    } else {
      /**
       * 首次打开 storage -> vux
       */
      getAccount() &&
      this.$store.commit('SET_ACCOUNT', getAccount());
      getToken() &&
      this.$store.commit('SET_TOKEN', getToken());
    }
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
