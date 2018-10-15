<template>
  <new-layout class="shop_drugs">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      slot="top"
    />
    <div class="shop_drugs-content"
    slot="center"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div class="shop_drugs-list-item"
               v-for="drug in list"
               @click="linkToShopDrugSpec(drug.id)">
            <div class="shop_drugs-list-item-left">
              <div class="rx_mark" v-if="!drug.otc">处</div>
              <img v-lazy="getImgURL(drug.fileId,'LARGE_LOGO')">
            </div>
            <div class="shop_drugs-list-item-right">
              <div class="shop_drugs-list-item-right_name">{{drug.name}}</div>
              <div class="shop_drugs-list-item-right_sfda">国药准字{{drug.sfda}}</div>
              <div class="shop_drugs-list-item-right_price">&yen;{{drug.price}}</div>
            </div>
          </div>
          <new-no-data v-if="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .shop_drugs {
    &-content {
    }
    &-list {
      &-item {
        display: flex;
        align-items: center;
        background-color: white;
        margin-top: 20px;
        &-left {
          padding: 20px;
          position: relative;
          img {
            width: 200px;
            height: 200px;
          }
        }
        &-right {
          width: 450px;
          & > div {
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
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        shopId: this.$route.query.id,
        typeId: this.$route.query.typeId || ''
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
      onLoad() {
        this.pageNum++;
        this.$http.get('/shops/' + this.shopId + '/drugs', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize,
            'typeId': this.typeId
          }
        })
          .then(res => {
            this.isLoading = false;
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            console.log(this.list);
            if (res.data.list.length === 0) {
              this.finished = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>
