<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$storage.get('account') &&
    this.$store.commit('SETACCOUNT', this.$storage.get('account'));
    this.$storage.get('token') &&
    this.$store.commit('SETTOKEN', this.$storage.get('token'));
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
