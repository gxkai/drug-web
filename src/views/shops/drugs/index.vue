<template>
  <div class="shop_drugs">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="shop_drugs-list"
         v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"
        ref="body">
        <div class="shop_drugs-list-item"
             v-for="drug in list"
        @click="linkToShopDrugSpec(drug.id)">
          <div class="shop_drugs-list-item-left">
            <div class="rx_mark" v-if="!drug.otc">处</div>
            <img :src="getImgURL(drug.fileId,'LARGE_LOGO')">
          </div>
          <div class="shop_drugs-list-item-right">
            <div class="shop_drugs-list-item-right_name">{{drug.name}}</div>
            <div class="shop_drugs-list-item-right_sfda">国药准字{{drug.sfda}}</div>
            <div class="shop_drugs-list-item-right_price">&yen;{{drug.price}}</div>
          </div>
        </div>
      <new-no-data v-if="loadingComplete"></new-no-data>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .shop_drugs {
    background-color: #f5f5f5;
    height: 100vh;
    &-list{
      &-item {
        display: flex;
        align-items: center;
        background-color: white;
        margin-bottom: 20px;
        &-left {
          padding: 20px;
          img {
            width: 200px;
            height: 200px;
          }
        }
        &-right {
          width: 450px;
          &>div {
            padding: 10px;
          }
          &_name {
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
          &_sfda {
            color: #999999;
            font-size: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &_price {
            color: #FF0000;
            font-size: 25px;
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'shopInfo',
    data() {
      return {
        list: [],
        pageNum: 0,
        pageSize: 15,
        shopId: this.$route.query.id,
        typeId: this.$route.query.typeId || '',
        loadingComplete: false,
        loading: true
      };
    },
    created: function () {
      this.loadMore();
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/shops/' + this.shopId + '/drugs?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&typeId=' + this.typeId).then(res => {
          if (res.data.list.length > 0) {
            this.list = this.list.concat(res.data.list);
            this.loading = false;
          } else {
            this.loadingComplete = true;
          }
        }).catch(error => {
          this.exception(error);
        });
      }
    }
  };
</script>
