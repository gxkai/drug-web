<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    /**
     * 首次打开 storage -> vux
     */
    this.$storage.get('account') &&
    this.$store.commit('SET_ACCOUNT', this.$storage.get('account'));
    this.$storage.get('token') &&
    this.$store.commit('SET_TOKEN', this.$storage.get('token'));
    /**
     * 首次打开session丢失 刷新token
     */
    if (!this.$storage.session.has('firstLogin')) {
      this.$store.dispatch('VERIFY');
    };
    /**
     * 刷新 vux -> storage
     */
    window.addEventListener('beforeunload', () => {
      this.$storage.set('account', this.$store.getters.account);
      this.$storage.set('token', this.$store.getters.token);
    });
  }
};
</script>

<style>
/*@import "assets/css/all.css";*/
/*@import "assets/css/common.css";*/
</style>
<style lang="scss">
@import "assets/scss/index.scss";

</style>
