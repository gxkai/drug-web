<template>
  <div class="appraise">
    <div class="appraise-title">
      <div class="appraise-title-left">
        <div class="text-l-25">总评分&nbsp;{{shopDrugSpec.shopTotalAppraise.score}}分</div>
        <div>
          <van-rate v-model="shopDrugSpec.shopTotalAppraise.score" disabled disabled-color="red" :size="15"></van-rate>
        </div>
      </div>
      <div class="appraise-title-right">
        <div class="text-l-25">
          共有{{list.length}}位网友评论
        </div>
      </div>
    </div>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <new-appraise-item :item="item" v-for="(item,index) in list" :key="index"></new-appraise-item>
        <new-no-data v-if="finished"></new-no-data>
      </van-list>
    </van-pull-refresh>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'drugAppraise',
    props: ['shopDrugSpec'],
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: []
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      async onLoad() {
        this.pageNum++;
        const params = {
          'pageNum': this.pageNum,
          'pageSize': this.pageSize,
          'shopDrugId': this.shopDrugSpec.id
        };
        const data = await this.$http.get('/drugAppraises', params);
        this.isLoading = false;
        this.loading = false;
        this.list = this.list.concat(data.list);
        console.log(this.list);
        if (data.list.length === 0) {
          this.finished = true;
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .appraise {
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
