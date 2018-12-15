<template>
  <new-layout>
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-cell :title="item.year"
                is-link
                class="mt-l-20"
                v-for="(item,index) in items" :key="index"
                @click="linkToConsumeInfo(item)">
      </van-cell>
    </template>
  </new-layout>
</template>
<script>
  export default {
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
        this.items = await this.$http.get('/accounts/medicaid/consume');
      }
    }
  };
</script>
<style scoped type="text/scss" lang="scss">

</style>
