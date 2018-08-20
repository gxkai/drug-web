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
     * 刷新 vux -> storage
     */
    window.addEventListener('beforeunload', () => {
      this.$storage.set('account', this.$store.getters.account);
      this.$storage.set('token', this.$store.getters.token);
    });
  }
};
</script>
<style lang="scss">
@import "assets/scss/index.scss";

</style>
