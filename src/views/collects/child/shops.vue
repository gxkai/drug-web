<!-- FIXME 字体大小 -->
<template>
  <div class="shop-container ">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <router-link v-for="(items,index) in pageList" :to="{path:'/shops/view',query:{id:items.id}}" :key="index">
        <div class="media">
          <div class="shop-left">
            <img v-lazy="items.imgUrl" alt="Image">
          </div>
          <div class="shop-right">
            <span>{{items.name}}</span>
            <span>{{items.area}} {{items.address}}</span>
          </div>
        </div>
      </router-link>
      <new-no-data v-if="pageList.length===0"></new-no-data>
      <new-loading v-if="process"></new-loading>
      <new-all-data v-if="loading"></new-all-data>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'collectShop',
    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        pages: null,
        process: false,
        pageList: [],
        loading: false,
        accountId: this.$store.getters.account.id
      };
    },
    components: {},
    created() {
    },
    methods: {
      loadMore() {
        if (this.pages === null || this.pageNum <= this.pages) {
          this.pageNum++;
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      loadData() {
        this.process = true;
        this.$http.get('/collects/shop?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.process = false;
              return false;
            }
            this.pageList = this.pageList.concat(res.data.list);
            this.pageList.forEach(e => {
              e.imgUrl = this.$http.get(this.getImgURL(e.fileId, 'LOGO'));
            });
          });
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

  .shop-container {
    width: 720px;
    height: 100vh;
    overflow: scroll;
  }

  .shop-right {
    height: 149px;
    flex-direction: column;
    justify-content: space-around;
  }

  .shop-left img {
    width: 236px;
    height: 170px;
    margin-right: 30px;
  }

  .media {
    padding: 20px;
    margin-bottom: 20px;
  }

  .shop-right span {
    display: block;
  }

  .shop-right {
    padding-top: 40px;
    padding-bottom: 27px;
    margin-left: 20px;
  }

  .shop-right > :first-child {
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
  }

  .shop-right > :last-child {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
  }

</style>
