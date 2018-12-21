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
      <div class="consume__item">
        <van-cell
          is-link
          class="mt-l-20"
          v-for="(item,index) in items" :key="index"
          @click="linkToConsumeInfoMore(item)"
        >
          <div slot="title">
            <span>{{ item.hospital }}</span>
            <span style="float: right">{{ item.date.split(' ')[0] }}</span>
          </div>
        </van-cell>
      </div>
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
        this.items = await this.$http.get('/accounts/medicaid/consumes');
      }
    }
  };
</script>
<style scoped type="text/scss" lang="scss">

  .consume__item .mt-l-20:first-child{
    margin-top: 0 !important;
  }
</style>
