<template>
  <div class="main">
    <div class="bar" ref="header">
      <div class="out">
        <div>
          <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
        </div>
        <div class="inner">
          <div>
            <i class="iconfont ic-sousuo"></i>
          </div>
          <input type="text" v-model="keyword" style="font-size: .3rem">
        </div>
        <span @click="onSearch()">搜索</span>
      </div>
    </div>
    <div ref="body">
      <div class="history" v-if="!this.keyword">
        <div class="history-titele">
          <span style="font-size: .3rem">历史搜索</span>
        </div>
        <div class="history-buttons" v-if="$storage.get('orderHis')">
          <div v-for="item in $storage.get('orderHis')" @click="onButton()" style="font-size: .3rem;">{{item}}</div>
        </div>
      </div>
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="0" v-else>
        <div v-for="order in orderList">
          <new-order :order.sync="order"></new-order>
        </div>
        <new-loading v-if="process"></new-loading>
        <new-all-data v-if="loading"></new-all-data>
        <new-no-data v-if="orderList.length === 0 && hasSearch"></new-no-data>
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
        process: false,
        hasSearch: false,
        pageNum: 0,
        pageSize: 5,
        pages: null,
        orderList: []
      };
    },
    created() {
    },
    watch: {
      keyword(value) {
        if (!value) {
          this.reset();
          this.hasSearch = false;
        }
      }
    },
    methods: {
      onButton() {
        this.keyword = event.target.textContent;
        this.onSearch();
      },
      onSearch() {
        if (this.keyword) {
          this.setHistory();
          this.reset();
          this.hasSearch = true;
          this.loadMore();
        }
      },
      setHistory() {
        this.saveSearch(this.keyword);
      },
      reset() {
        this.pages = null;
        this.pageNum = 0;
        this.orderList = [];
        this.loading = false;
        this.process = false;
      },
      loadMore() {
        if (this.keyword && this.hasSearch) {
          this.pageNum++;
          if (!this.pages || this.pageNum < this.pages) {
            this.loadData();
          } else {
            this.loading = true;
          }
        }
      },
      loadData() {
        this.process = true;
        this.$http.get('/orders/?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&keyword=' + this.keyword)
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
      this.$refs.body.style.overflow = 'auto';
    }
  };
</script>

<style scoped>
  .main {
    background: rgba(246, 246, 246, 1);
    width: 720px;
    height: 100vh;
  }

  .history-titele {
    margin: 20px;
  }

  .history-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .history-buttons div:nth-child(1) {
    background-color: rgba(19, 193, 254, 1);
    color: white;
  }

  .history-buttons div {
    background-color: rgba(246, 246, 246, 1);
    border-radius: 50px;
    border: 1PX solid white;
    margin: 20px;
    font-size: 25px;
    padding: 5px 20px;
  }

  /**
  搜索框
   */

  .bar {
    width: 720px;
    height: 100px;
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
    height: 60px;
    background: rgba(229, 229, 229, 1);
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .inner input {
    width: 560px;
    height: 60px;
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
