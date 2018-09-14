<template>
  <div class="appraise">
    <div class="appraise-title">
      <div class="appraise-title-left">
        <div class="text-l-25">总评分&nbsp;{{shopDrugSpec.shopTotalAppraise.score}}分</div>
        <div>
          <new-star :score="shopDrugSpec.shopTotalAppraise.score" disabled></new-star>
        </div>
      </div>
      <div class="appraise-title-right">
        <div class="text-l-25">
          共有{{list.length}}位网友评论
        </div>
      </div>
    </div>

    <div class="appraise-container" ref="container">
      <div   v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="0">
        <new-appraise-item :item="item" v-for="(item,index) in list" :key="index"></new-appraise-item>
        <new-no-data v-if="loadingComplete"></new-no-data>
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
        loading: true,
        loadingComplete: false
      };
    },
    computed: {},
    created() {
      this.loadMore();
    },
    mounted() {
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.$http.get('/drugAppraises?shopDrugSpecId=' + this.shopDrugSpec.id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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
  .appraise {
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
    padding: 20px;
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
        font-family: HiraginoSansGB-W3;
        color: rgba(51, 51, 51, 1);
      }
      &-right {
        font-family: HiraginoSansGB-W3;
        color: rgba(153, 153, 153, 1);
        div {
          margin-top: 15px;
        }
      }
    }
    &-container {
      position: relative;
      width: 100%;
      height: 100vh;
    }
  }
</style>
