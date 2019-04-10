<template>
  <new-layout>
    <template slot="center">
      <info-cell :title="item.hospital" :desc="item.date.split(' ')[0]"  v-for="(item,index) in items" :key="index"
      @click="loadPageAccountsInsuranceConsumeInfoMore(item)"
      />

    </template>
  </new-layout>
</template>
<script>
  import infoCell from '@/components/accounts/infoCell';
  export default {
    components: {
      infoCell
    },
    data() {
      return {
        items: []
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.items = await this.$http.get('/api/accounts/medicaid/consumes');
      }
    }
  };
</script>
