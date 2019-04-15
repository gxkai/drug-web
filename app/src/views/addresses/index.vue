<template>
  <div>
    <new-layout>
      <template slot="center">
        <addresses :list="list" />
      </template>
      <template slot="bottom">
        <new-submit-button
          name="新增地址"
          @click.native="loadPageAddressesEdit"
        />
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
import addresses from '@/components/addresses/addresses';
export default {
  name: 'AddressesEdit',
  components: {
    addresses
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.list = await this.$http.get('/api/addresses');
    }
  }
};
</script>
