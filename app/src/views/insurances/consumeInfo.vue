<template>
  <new-layout>
    <template slot="center">
      <info-cell
        v-for="(item, index) in consumeInfo.list"
        :title="item.hospital"
        :desc="item.date | dateFmt('YYYY-MM-DD')"
        :key="index"
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
      consumeInfo: this.$route.params.consumeInfo
    };
  },
  created() {},
  mounted() {}
};
</script>
<style scoped type="text/scss" lang="scss"></style>
