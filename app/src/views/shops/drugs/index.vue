<template>
  <new-layout>
    <template slot="top">
      <new-search-bar v-model="keyword" @search="search" :placeholder="placeholder"/>
      <new-filter-bar :filters="filters" :active="active"/>
    </template>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div
            v-for="item in list"
            @click="loadPageShopDrugs(item.id)"
          >
            <new-white-space/>
            <new-drug :item="item"/>
          </div>
          <new-end v-if="finished === true" :name="list.length > 0 ? 'END' : 'NONE'"/>
        </van-list>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
</style>
<script>
  import list from '@/mixins/list';
  export default {
    name: 'shopInfo',
    mixins: [list],
    data() {
      return {
        shopId: this.$route.query.shopId,
        typeId: this.$route.query.typeId || '',
        placeholder: '搜索药品',
        filters: ['默认', '价格', '销量'],
        active: 0,
        keyword: ''
      };
    },
    computed: {
    },
    watch: {
      keyword(n) {
        if (n === '') {
          this.onRefresh();
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      search() {
        this.onRefresh();
      },
      async onLoad() {
        this.loadMore();
        const params = {
          'typeId': this.typeId
        };
        const data = await this.$http.get(`/api/shops/${this.shopId}/drugs`, this.getParams(params));
        this.pushToList(data.list);
      }
    }
  };
</script>
