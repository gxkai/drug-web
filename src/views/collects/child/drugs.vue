<template>
  <div class="collect_drugs">
      <div class="collect_drugs-item"
           v-for="(item,index) in pageList"
           :key="index"
            @click="linkToShopDrugSpec(item.id)">
        <div class="collect_drugs-item-left">
          <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
        </div>
        <div class="collect_drugs-item-right">
          <div>
            <span>[{{item.name}}]</span>
            <span>{{item.spec}}</span>
          </div>
          <div>
            <span>商家&#58;{{item.shopName}}</span>
            <span class="text-red">&yen;{{toFixedTwo(item.price)}}</span>
          </div>
        </div>
      </div>
    <new-no-data :length="pageList.length"></new-no-data>
  </div>
</template>
<script>
  export default {
    name: 'collectDrugs',
    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        pages: null,
        pageList: [],
        loading: false,
        process: false,
        accountId: this.$store.getters.account.id
      };
    },
    created() {
      this.loadMore();
    },
    mounted() {
    },
    methods: {
      loadMore() {
        this.$http.get('/collects/drug?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            if (res.data.list.length === 0) {
              this.loading = true;
            } else {
              this.pageList = this.pageList.concat(res.data.list);
            }
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .collect_drugs {
    width: 720px;
    overflow: auto;
    height: calc(100vh - 200px);
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
          white-space: nowrap;
          span {
            font-size: 30px;
          }
        }
      }
    }
  }
</style>
