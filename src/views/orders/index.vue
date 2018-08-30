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
      <new-loading v-if="process"></new-loading>
      <new-all-data v-if="loading"></new-all-data>
      <new-no-data v-if="orderList.length === 0"></new-no-data>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderIndex',
    data() {
      return {
        loading: false,
        process: false,
        url: '',
        pageNum: 0,
        pageSize: 5,
        pages: null,
        orderList: []
      };
    },
    created() {

    },
    methods: {
      loadMore() {
        this.pageNum++;
        if (!this.pages || this.pageNum < this.pages) {
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      loadData() {
        this.process = true;
        this.$http.get('/orders/?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            this.orderList = this.orderList.concat(res.data.list);
            if (!this.pages) {
              this.pages = res.data.pages;
            }
            this.process = false;
          }).catch(error => {
            this.exception(error);
            this.process = false;
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
