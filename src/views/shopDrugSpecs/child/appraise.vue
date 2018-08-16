<template>
  <div class="bind-container" id="data-list-content">
    <div class="bg-white">
      <div class="all-appraise width-percent-96 m-auto line-height-l-20">
        <div class="width-percent-100">
          <span class="d-inline-block total-appraise fl">
           <p>总评分：{{shopDrugSpec.shopTotalAppraise.score}}分</p>
           <new-star :score="shopDrugSpec.shopTotalAppraise.score"  disabled class="new-star"></new-star>
         </span>
          <span class="d-inline-block fr net-friend elips">共有{{shopDrugSpec.drugAppraises.total}}位网友评论</span>
        </div>
      </div>
    </div>

    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="content-appraise width-percent-100 bg-white" v-for="item in list">
        <div class="width-percent-96 m-auto border-bottom-f1f1f1 time">
          <span class="d-inline-block fl">{{item.username|asterisk}}</span>
          <span class="d-inline-block fr">{{timeConvert(item.createdDate)}}</span>
        </div>
        <div class="width-percent-96 m-auto">
          <new-star :size="item.score" disabled></new-star>
        </div>
        <div class="width-percent-96 m-auto">
          {{item.content}}
        </div>
      </div>
    </ul>
    <new-no-data v-if="list.length===0"></new-no-data>
    <new-loading v-if="process"></new-loading>
    <new-all-data v-if="loading"></new-all-data>
  </div>
</template>

<script>
  export default {
    props: ['shopDrugSpec'],
    data() {
      return {
        list: [],
        pageNum: 0,
        pageSize: 5,
        pages: null,
        loading: false,
        process: false
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
        this.$http.get('/drugAppraises?shopDrugSpecId=' + this.shopDrugSpec.id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            this.list = this.list.concat(res.data.list);
            if (!this.pages) {
              this.pages = res.data.pages;
            }
            this.process = false;
          }).catch(error => {
            this.process = false;
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .bind-container {
    width: 720px;
    background: #f5f5f5;
    min-height: 100vh;
  }

  .all-appraise {
    height: 119px;
    border-top: 1px solid #f5f5f5;
  }

  .total-appraise {
    width: 182px;
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
    margin-top: 12px;
    line-height: 0.7rem;
  }

  .ic-xingxing {
    margin-top: 13px;
  }

  .net-friend {
    width: 200px;
    font-size: 20px;
    color: rgba(153, 153, 153, 1);
    margin-right: 26px;
    line-height: 1rem;
  }

  .content-appraise {
    margin-top: 16px;
    height: 118px;
  }

  .time {
    height: 40px;
    line-height: 40px;
  }

  .new-star {
    height: 0.8rem;
    line-height: 0.8rem;
  }

  .drug-flull {
    width: 69%;
  }
</style>
