<template>
  <div class="collect_shops ">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="collect_shops-item"
             v-for="(item,index) in pageList"
             :key="index"
              @click="linkToShopView(item.id)">
          <div class="collect_shops-item-left">
            <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
          </div>
          <div class="collect_shops-item-right">
            <div>{{item.name}}</div>
            <div>{{item.area}} {{item.address}}</div>
          </div>
        </div>
      <new-no-data :length="pageList.length"></new-no-data>
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
        this.$http.get('/collects/shop?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            if (res.data.list.length === 0) {
              this.loading = true;
            }
            this.pageList = this.pageList.concat(res.data.list);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .collect_shops {
    width: 720px;
    height: calc(100vh - 200px);
    overflow: auto;
    &-item {
      display: flex;
      align-items: center;
      background-color: white;
      &:first-child {
        margin-top: 10px;
      }
      margin-bottom: 10px;
      &-left {
        padding: 10px;
        img {
          width: 245px;
          height: 245px;
        }
      }
      &-right {
        &>div {
          width: 400px;
          padding: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          font-size: 30px;
        }
      }
    }
  }
</style>
