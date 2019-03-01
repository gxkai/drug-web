<template>
  <div class="shops">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="item"
             v-for="(item,index) in list" :key="index"
             @click="linkToShopView(item.id)"
        >
          <div class="item1">
            <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')"
            >
          </div>
          <div class="item2">
            <div>
              <span class="name">{{item.name}}</span>
            </div>
            <div>
              <span class="area">{{item.area}}{{item.address}}</span>
            </div>
          </div>
        </div>
        <new-no-data v-show="finished === true"></new-no-data>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .shops {
    .item {
      margin-top: 20px;
      padding: 20px;
      background-color: white;
      display: grid;
      grid-template-columns: 300px auto;
      .item1 {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .item2 {
        .name{
          font-size:28px;
          font-weight:normal;
          color:rgba(51,51,51,1);
        }
        .area {
          font-size:25px;
          font-weight:normal;
          color:rgba(153,153,153,1);
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
        const data = await this.$http.get('/collects/shop', params);
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

