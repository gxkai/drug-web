<template>
  <div class="collect-drugs">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div
        class="collect-drugs--item"
        v-for="item in list"
        :key="item.shopDrugSpecId"
        @click="linkToShopDrugSpec(item.shopDrugSpecId)"
        >
        <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')"
        class="collect-drugs--item--logo"
        >
        <div
        class="collect-drugs--item__right"
        >
          <div>
          <span>[{{item.name}}]</span>
          <span>({{item.spec}})</span>
          </div>
          <div>
            <span>商家&#58;{{item.shopName}}</span>
          </div>
          <div>
            <span>&yen;{{toFixedTwo(item.price)}}</span>
          </div>
        </div>
        </div>
        <new-no-data v-show="finished === true"></new-no-data>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .collect-drugs {
    &--item {
      display: flex;
      padding: 20px;
      background-color: white;
      margin-top: 20px;
      &--logo {
        width: 200px;
        height: 200px;
      }
      &__right {
        margin-left: 20px;
        &>div {
          &:nth-child(1) {
            width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            span {
              font-size:28px;
              font-family:HiraginoSansGB-W3;
              font-weight:normal;
              color:rgba(51,51,51,1);
            }
          }
          &:nth-child(2) {
            span {
              font-size:18px;
              font-family:HiraginoSansGB-W3;
              font-weight:normal;
              color:rgba(153,153,153,1);
            }
          }
          &:nth-child(3) {
            margin-top: 30px;
            span {
              font-size:28px;
              font-family:HiraginoSansGB-W3;
              font-weight:normal;
              color:rgba(255,0,0,1);
            }
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'collectDrugs',
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
          'pageSize': this.pageSize
        };
        const data = await this.$http.get('/collects/drug', params);
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
