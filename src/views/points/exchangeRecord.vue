<template>
  <div class="exchange_record">
    <new-header title="兑换记录"
    ref="header">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="exchange_record-list"
         ref="content"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0">
      <new-coupon-record-item v-for="(item,index) in list" :key="index" :item="item"></new-coupon-record-item>
      <new-no-data v-if="loadingComplete"></new-no-data>
    </div>
 </div>
</template>

<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        loading: true,
        loadingComplete: false,
        list: [],
        pageNum: 0,
        pageSize: 15
      };
    },
    created() {
      this.loadMore();
    },
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.content.style.overflow = 'scroll';
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/couponRecords?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            if (res.data.list > 0) {
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

<style scoped type="text/less" lang="less">
  .exchange_record {
    width: 720px;
    &-list {
      width: 100%;
      background-color: #f5f5f5;
    }
  }
</style>
