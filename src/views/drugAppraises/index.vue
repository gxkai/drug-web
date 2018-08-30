<template>
  <div class="main">
    <new-header title="我的评价" ref="header">
      <div slot="left" @click="$router.go(-1)">
      <i class="iconfont ic-arrow-right"  ></i>
      </div>
    </new-header>
    <div class="body" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" ref="body">
      <div class="drugAppraises-main" v-for="item in list">
        <div class="line1">
          <div>
            <img :src="getImgURL(account.fileId,'LARGE_LOGO')">
            <span>{{account.username|asterisk}}</span>
          </div>
          <span>{{item.createdDate|timeConvert}}</span>
        </div>
        <div class="line2">
          {{item.content}}
        </div>
        <div class="line3">
          <img :src="getImgURL(item.fileId,'LARGE_LOGO')">
          <div class="right">
            <p>药品名称：{{item.name}}</p>
            <p>规格:{{item.spec}}</p>
          </div>
        </div>
      </div>
      <new-no-data v-if="list.length===0"></new-no-data>
      <new-loading v-if="process"></new-loading>
      <new-all-data v-if="loading"></new-all-data>
    </div>

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
        process: false,
        account: this.$store.getters.account
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
        this.$http.get('/drugAppraises/mine?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    }
  };
</script>

<style scoped>
  .drugAppraises-main{
    width:680px;
    height:328px;
    margin: auto;
    margin-bottom: 40px;
    background:rgba(255,255,255,1);
  }
  .main {
    background: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }

  .body {
    width: 720px;
    background: rgba(255, 255, 255, 1);
    padding: 20px;
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
    width:62px;
    height:62px;
    margin-right: 21px;
  }

  .line1 div:nth-child(1) span {
    font-size:28px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
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
    margin-top: 10px;
    margin-bottom: 15px;
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
    margin-right: 31px;
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
