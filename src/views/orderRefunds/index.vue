<!-- FIXME 字体大小 -->
<template>
<div>
  <new-header :title="退货列表">
    <div slot="left">
      <router-link tag="i" to="/accounts" class="iconfont ic-arrow-right"></router-link>
    </div>
 </new-header>
  <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"
      style="overflow:scroll">
    <div v-for="pages in pageList">
      <div v-for="drug in pages.drugs">
        <new-drug-refund class="mt-15"
          :pageId="pages.id" :company="pages.shopName" :state="pages.state"
          :isOtc="drug.isOtc" :fileId="drug.drugLogo" :drugName="drug.name"
          :spec="drug.spec" :quantity="drug.quantity" ></new-drug-refund>
      </div>
    </div>
    <div v-if="pageList.length <= 0">
      <div v-show="allLoaded" style="text-align: center">就这么多啦,回顶部再看看吧</div>
      <div v-show="nullLoaded" style="text-align: center">没有数据</div>
    </div>
  </ul>
</div>
</template>

<script>
  import {Loadmore} from 'mint-ui';
  export default {
    name: 'orderRefundList',
    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        pages: null,
        pageList: [],
        allLoaded: false,
        nullLoaded: false,
        accountId: this.$store.getters.account.id
      };
    },
    components: {
      'mt-loadmore': Loadmore
    },
    created() {
    },
    methods: {
      loadMore() {
        if (this.pages === null || this.pageNum < this.pages) {
          this.pageNum++;
          this.loadData();
        } else {
          this.loading = true;
          this.allLoaded = true;
        }
      },
      loadData() {
        this.$http.get('/orderRefunds?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.nullLoaded = true;
              this.loading = true;
              return false;
            }
            res.data.list.forEach(item => {
              item.state = this.transform(item.state);
              item.drugs.forEach(item => {
                item.drugLogo = '/files/' + item.fileId + '/image?resolution=LARGE_LOGO';
              });
            });
            this.pageList = this.pageList.concat(res.data.list);
          });
      }

    }
  };
</script>

<style scoped>
  .mt-15{
    margin-top: 15px !important;
  }
</style>
