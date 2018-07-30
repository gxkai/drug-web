<template>
  <div class="bind-container" id="data-list-content">
      <new-header  title="评价" :style="{background:bgColor,color:color}">
         <i class="iconfont ic-arrow-right" slot="left" :style="{color:color}"></i>
         <i class="iconfont ic-fenxiang" slot="right" :style="{color:color}"></i>
       </new-header>
   <div class="bg-white">
     <div class="all-appraise width-percent-96 m-auto line-height-l-20">
       <div class="width-percent-100">

         <span class="d-inline-block total-appraise fl">
           <p>总评分：5.0分</p>
           <new-star size="4" disabled class="new-star"></new-star>
         </span>
         <span class="d-inline-block fr net-friend elips">共有199位网友评论</span>


       </div>
     </div>
   </div>

    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <div class="content-appraise width-percent-100 bg-white" v-for="item in pageList">
      <div class="width-percent-96 m-auto border-bottom-f1f1f1 time">
          <span class="d-inline-block fl">{{item.username}}</span>
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
    <div v-show="allLoaded" style="text-align: center">就这么多啦,回顶部再看看吧</div>

  </div>
</template>

<script>
  import {Loadmore} from 'mint-ui';
  export default{
    props: ['shopDrugSpec'],
    data() {
      return {
        shopTotalAppraise: '',
        pageNum: 0,
        pageSize: '',
        totalPage: '',
        totalNum: '',
        pageList: [],
        allLoaded: false,
        bottomPullText: '上拉加载更多',
        autoFill: false,
        bgColor: 'white',
        color: '#000000'
      }
    },
    watch: {
      pageList: 'scrollToBottom'
    },
    created() {
      this.shopTotalAppraise = this.shopDrugSpec.shopTotalAppraise;
      this.pageSize = this.shopDrugSpec.drugAppraises.pageSize;
      this.totalPage = this.shopDrugSpec.drugAppraises.pages;
      this.totalNum = this.shopDrugSpec.drugAppraises.total;
      this.pageList = this.shopDrugSpec.drugAppraises.list;
      this.loadMore();
    },
    methods: {
      loadMore (){
        this.loading = false;
        if (this.pageNum < this.totalPage) {
          this.pageNum++;
          this.$http.get('/drugAppraises?shopDrugSpecId=' + this.shopDrugSpec.id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
            .then(res => {
              console.log(res);
              this.pageList = this.pageList.concat(res.data.list);
            });
        } else {
          this.loading = true;
          this.allLoaded = true;
        }
      },
      scrollToBottom() {
        this.$nextTick(() => {
          var div = document.getElementById('data-list-content');
          div.scrollTop = div.scrollHeight;
        });
      }
    },
    filters: {
      TYPES(drugtype) {
        if (drugtype) {
          return '非处方药';
        } else {
          return '处方药';
        }
      },
      timeConvert(date) {
        return this.timeConvert(date);
      }
    }
  };
</script>

<style scoped>
.bind-container{
  width: 720px;
  background: #f5f5f5;
  min-height:100vh;
}
.all-appraise{
  height:119px;
  border-top:1px solid #f5f5f5;
 }
.total-appraise{
    width:182px;
    font-size:28px;
    color:rgba(51,51,51,1);
    margin-top: 12px;
    line-height: 0.7rem;
  }
  .ic-xingxing{
    margin-top: 13px;
  }
  .net-friend{
    width:200px;
    font-size:20px;
    color:rgba(153,153,153,1);
    margin-right: 26px;
    line-height: 1rem;
  }
  .content-appraise{
      margin-top: 16px;
      height: 118px;
  }
  .time{
    height: 40px;
    line-height: 40px;
  }
  .new-star{
    height:0.8rem;
    line-height: 0.8rem;
  }
</style>
