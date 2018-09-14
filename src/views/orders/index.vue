<template>
  <div>
    <div class="header" ref="header">
      <new-header title="全部订单">
       <div slot="left">
         <i class="iconfont ic-arrow-right"  @click.stop="$router.push('/accounts')"></i>
       </div>
        <div slot="right">
          <i class="iconfont ic-sousuo"  @click.stop="$router.push('/orders/search')"></i>
        </div>

      </new-header>
      <new-order-tab :urlRouter="$route.path"></new-order-tab>
    </div>
    <div class="body" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0" ref="body">
      <div v-for="order in orderList">
        <new-order :order.sync="order"></new-order>
      </div>
      <new-no-data v-if="loadingComplete" ></new-no-data>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderIndex',
    data() {
      return {
        loading: true,
        loadingComplete: false,
        url: '',
        pageNum: 0,
        pageSize: 15,
        orderList: []
      };
    },
    created() {
      this.loadMore();
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/orders/?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'scroll';
    }
  };
</script>

<style scoped>
</style>
