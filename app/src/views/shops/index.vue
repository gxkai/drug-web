<template>
  <new-layout>
    <template slot="top">
      <new-filter-bar :filters="filters" :active.sync="active"/>
    </template>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div  v-for="(item,index) in list"
                :key="index">
            <new-white-space/>
            <new-shop :item="item"/>
          </div>
          <new-end v-if="finished === true" :name="list.length > 0 ? 'END' : 'NONE'"/>
        </van-list>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>
<script>
  import list from '@/mixins/list';
  export default {
    name: 'shopInfo',
    props: {},
    mixins: [list],
    data() {
      return {
        activeRed: 1,
        sort: 'SYNTHESIZE',
        active: 0,
        searchIcon: '\ue643 药品名',
        shopRate: 5,
        filters: ['综合', '距离最近', '好评优先', '销量最多']
      };
    },
    watch: {
      active(n) {
        switch (n) {
          case 1:
            this.sort = 'DISTANCE';
            break;
          case 2:
            this.sort = 'APPRAISE';
            break;
          case 3:
            this.sort = 'SALE';
            break;
          default:
            this.sort = 'SYNTHESIZE';
            break;
        }
        this.onRefresh();
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      async onLoad() {
        this.loadMore();
        const params = {
          lat: this.currentAddress.lat,
          lng: this.currentAddress.lng,
          sort: this.sort
        };
        const data = await this.$http.get('/api/shops', this.getParams(params));
        this.pushToList(data.list);
      }
    }
  };
</script>

