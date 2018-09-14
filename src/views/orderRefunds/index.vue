<template>
  <div>
    <div ref="header">
      <new-header title="退货列表">
        <div slot="left" @click="$router.go(-1)">
          <i class="iconfont ic-arrow-right"></i>
        </div>
      </new-header>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0" ref="body">
      <div v-for="pages in list">
        <div v-for="drug in pages.drugs">
          <new-drug-refund class="mt-l-25"
                           :pages="pages" :drug="drug"></new-drug-refund>
        </div>
      </div>
      <new-no-data v-if="loadingComplete"></new-no-data>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderRefundList',
    data() {
      return {
        list: [],
        pageNum: 0,
        pageSize: 5,
        loading: true,
        loadingComplete: false
      };
    },
    created() {
      this.loadMore();
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/orderRefunds?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            if (res.data.list.length > 0) {
              this.list = this.list.concat(res.data.list);
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
