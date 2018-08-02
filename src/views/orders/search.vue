<template>
  <div class="main">
    <div class="bar header">
      <div class="out">
        <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
        <div class="inner">
          <i class="iconfont ic-sousuo"></i>
          <input type="text" v-model="keyword">
        </div>
        <span @click="onSearch()">搜索</span>
      </div>
    </div>
    <div  class="body">
      <div v-for="order in orderList">
        <new-order :order="order"></new-order>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        keyword: '',
        loading: false,
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
      onSearch() {
        this.reset();
        this.loadMore();
      },
      reset() {
        this.pages = null;
        this.pageNum = 0;
        this.orderList = [];
        this.loading = true;
      },
      loadMore() {
        this.pageNum++;
        if (!this.pages || this.pageNum < this.pages) {
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      loadData() {
        // this.$http.get('/orders/?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&keyword=' + this.keyword)
        //   .then(res => {
        //     this.orderList = this.orderList.concat(res.data.list);
        //     if (!this.pages) {
        //       this.pages = res.data.pages;
        //     }
        //   }).catch(error => {
        //     this.exception(error);
        //   });
      }
    },
    mounted() {
    }
  };
</script>

<style scoped>
  .main {
    background: rgba(246, 246, 246, 1);
    width: 720px;
  }

  .body {
    width: 720px;
    height: 100px;
  }

  /**
  搜索框
   */

  .bar {
    width: 720px;
    height: 66px;
    background: rgba(210, 210, 210, 1);
    display: flex;
    justify-content: center;
  }

  .out {
    display: flex;
    align-items: center;
  }

  .out span {
    font-size: 26px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    margin-left: 8px;
  }

  .inner {
    width: 597px;
    height: 42px;
    background: rgba(229, 229, 229, 1);
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .inner input {
    width: 560px;
    height: 42px;
    background: rgba(229, 229, 229, 1);
    border: 0;
    outline: none;
  }

  .ic-sousuo {
    color: #D2D2D2;
    font-size: 50px;
  }

  .ic-arrow-right {
    font-size: 50px;
  }

</style>
