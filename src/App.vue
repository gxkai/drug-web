<template>
  <div id="app">
    <navigation>
      <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
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
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import "assets/scss/index.scss";

</style>
