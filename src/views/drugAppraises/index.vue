<template>
  <div class="main">
    <new-header title="我的评价">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>
    <ul class="body" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li v-for="item in list">
        <div class="line1">
          <div>
            <img :src="account.headImg">
            <span>{{account.username}}</span>
          </div>
          <span>{{item.createdDate}}</span>
        </div>
        <div class="line2">
          {{item.content}}
        </div>
        <div class="line3">
          <img :src="item.logo">
          <div class="right">
            <p>{{item.name}}</p>
            <p>{{item.spec}}</p>
          </div>
        </div>
      </li>
      <new-nodata v-if="list.length===0"></new-nodata>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'myAppraise',
    data() {
      return {
        list: [],
        pageNum: 0,
        pageSize: 5,
        pages: null,
        loading: false,
        account: this.$store.getters.account
      };
    },
    created() {
      this.account.headImg = this.getImgURL(this.account.fileId, 'LARGE_LOGO');
    },
    methods: {
      loadMore() {
        this.pageNum++;
        if (!this.pages || this.pageNum < this.pages) {
          this.loadData();
        } else {
          this.loading = false;
        }
      },
      loadData() {
        this.$http.get('/drugAppraises/mine?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then(res => {
            res.data.list.forEach(e => {
              e.logo = this.getImgURL(e.fileId);
              e.createdDate = this.timeConvert(e.createdDate);
            });
            this.list = this.list.concat(res.data.list);
            if (!this.pages) {
              this.pages = res.data.pages;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .main {
    background: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }

  .body {
    width: 720px;
    height: calc(100vh - 130px);
    background: rgba(255, 255, 255, 1);
    padding: 20px;
    overflow: scroll;
  }

  .line1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .line1 div:nth-child(1) {
    display: inline-flex;
    align-items: center;
  }

  .line1 div:nth-child(1) img {
    height: 65px;
    border-radius: 50px;
  }

  .line1 div:nth-child(1) span {
    margin-left: 10px;
  }

  .line1 div:nth-child(2) span {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }

  .line2 {
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    line-height: 88px;
  }

  .line3 {
    width: 679px;
    height: 165px;
    background: rgba(238, 238, 238, 1);
    margin: auto;
    display: flex;
    align-items: center;
  }

  .line3 img {
    width: 201px;
    height: 144px;
    margin-left: 10px;
  }

  .line3 .right {
    margin-left: 20px;
  }

  .line3 .right p:nth-child(1) {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(0, 0, 0, 1);
  }

  .line3 .right p:nth-child(2) {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }
</style>
