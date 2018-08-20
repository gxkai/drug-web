<template>
  <div class="appraise">
    <div class="appraise-title">
      <div class="appraise-title-left">
        <div>总评分：{{shopDrugSpec.shopTotalAppraise.score}}分</div>
        <div>
          <new-star></new-star>
        </div>
      </div>
      <div class="appraise-title-right">
        <div>
          共有{{list.length}}位网友评论
        </div>
      </div>
    </div>

    <div class="appraise-container" ref="container">
      <div   v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="0">
        <new-appraise-item :item="item" v-for="(item,index) in list" :key="index"></new-appraise-item>
        <new-no-data :length="list.length" v-show="loading"></new-no-data>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['shopDrugSpec'],
    data() {
      return {
        list: [],
        pageNum: 1,
        pageSize: 6,
        total: null,
        loading: false
      };
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.$http.get('/drugAppraises?shopDrugSpecId=' + this.shopDrugSpec.id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            if (!this.total) {
              this.total = res.data.total;
            }
            if (res.data.list.length !== 0) {
              this.list = this.list.concat(res.data.list);
              this.loading = false;
              this.pageNum++;
            } else {
              this.loading = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .appraise {
    width: 720px;
    height: 100vh;
    &-title {
      width: 100%;
      height: 100px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      &-left {
        display: flex;
        flex-direction: column;
        align-self: center;
        font-size: 28px;
        font-family: HiraginoSansGB-W3;
        color: rgba(51, 51, 51, 1);
      }
      &-right {
        font-size: 20px;
        font-family: HiraginoSansGB-W3;
        color: rgba(153, 153, 153, 1);
      }
    }
    &-container {
      position: relative;
      width: 100%;
      height: 100vh;
    }
  }
</style>
