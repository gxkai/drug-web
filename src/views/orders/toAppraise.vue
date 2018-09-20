<template>
  <div class="orders">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/orders/search')"
      ref="header"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <new-order-tab :urlRouter="$route.path"
                   ref="orderTab"></new-order-tab>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0"
         ref="body">
      <new-order-item
        :order.sync="order"
        v-for="(order, key) in orderList"
        :key="key"></new-order-item>
      <new-no-data v-if="loadingComplete"></new-no-data>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'toAppraise',
    data() {
      return {
        loading: true,
        loadingComplete: false,
        pageNum: 0,
        pageSize: 15,
        orderList: []
      };
    },
    created() {
      this.loadMore();
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight - this.$refs.orderTab.$el.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'scroll';
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/orders/?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&orderState=' + 'TO_APPRAISE')
          .then(res => {
            if (res.data.list.length > 0) {
              this.orderList = this.orderList.concat(res.data.list);
              this.loading = false;
            } else {
              this.loadingComplete = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .orders {
    background-color: #f5f5f5;
    height: 100vh;
  }
</style>
