<template>
  <div>
    <new-layout>
      <template slot="center">
        <new-addresses :list="list"/>
      </template>
      <template slot="bottom">
        <new-submit-button name="新增地址" @click.native="loadPageAddressesEdit"/>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">

</style>
<script>
  export default {
    name: 'addressesEdit',
    data() {
      return {
        list: []
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initData();
      });
    },
    created() {
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/api/addresses');
      }
    }
  };
</script>
