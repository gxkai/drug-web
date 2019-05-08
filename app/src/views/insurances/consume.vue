<template>
  <new-layout>
    <template slot="center">
      <info-cell
        v-for="(item, index) in items"
        :title="item.hospital"
        :desc="item.date.split(' ')[0]"
        :key="index"
        @click="loadPageInsurancesConsumeInfoMore(item)"
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
      this.items = await this.$http.get('/api/app/accounts/medicaid/consumes');
      console.log(this.items);
    }
  }
};
</script>
