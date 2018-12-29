<template>
  <new-layout class="shops">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="shops-filter">
        <div class="shops-filter-item" @click="orderBy('SYNTHESIZE')" :class="{ red:activeRed == 1}">
          <div class="shops-filter-item-text">
            综合
          </div>
        <!--  <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:shopSort === 'SYNTHESIZE'? '#F60000': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:shopSort === 'SYNTHESIZE'? '#F60000': 'gray'} ">
            </div>
          </div>-->
        </div>
        <div class="shops-filter-item" @click="orderBy('DISTANCE')" :class="{ red:activeRed == 2}">
          <div class="shops-filter-item-text">
            距离最近
          </div>
       <!--   <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:shopSort === 'DISTANCE'? '#F60000': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:shopSort === 'DISTANCE'? '#F60000': 'gray'} ">
            </div>
          </div>-->
        </div>
        <div class="shops-filter-item" @click="orderBy('APPRAISE')" :class="{ red:activeRed == 3}">
          <div class="shops-filter-item-text">
            好评优先
          </div>
         <!-- <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:shopSort === 'APPRAISE'? '#F60000': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:shopSort === 'APPRAISE'? '#F60000': 'gray'} ">
            </div>
          </div>-->
        </div>
        <div class="shops-filter-item" @click="orderBy('SALE')" :class="{ red:activeRed == 4}">
          <div class="shops-filter-item-text">
            销量最多
          </div>
      <!--    <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:shopSort === 'SALE'? '#F60000': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down" :style="{borderTopColor:shopSort === 'SALE'? '#F60000': 'gray'} ">
            </div>
          </div>-->
        </div>
      </div>
    </template>
    <template slot="center">
      <div class="shops-container"
      >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad">
            <div class="shops-container-item"
                 :item="item"
                 v-for="(item,index) in list"
                 :key="index"
                 @click="$router.push({path:'/shops/view',query:{shopId:item.id}})">
              <div class="shops-container-item-left">
                <img v-lazy="getImgURL(item.fileId,'LARGE_LOGO')"/>
              </div>
              <div class="shops-container-item-right">
                <div>
                  {{item.name}}
                </div>
                <div>
                  <!--<new-star :score="item.score" disabled></new-star>-->
                </div>
                <div>
                  电话：{{item.phone}}
                </div>
                <div>
                  地址：{{item.address}}
                </div>
                <div class="fz21">
                  <span class="rx_shop_address"> <van-icon name="dizhi" size="2em" color="#a6a6a6"></van-icon></span> 距当前位置：{{item.distance | meter}}
                </div>
                <div class="mt10">
                  <span class="rx-delivery" v-if="item.distribution==true && item.shopDistance < item.distance">可配送</span>
                  <span class="rx-since">可自提</span>
                </div>
              </div>
           <!--   <div class="shops-container-item-peisong"
                   v-show="item.distribution === true  && item.shopDistance < item.distance">
                <i class="iconfont ic-peisong-"></i>
              </div>-->
            </div>
            <new-no-data v-if="finished"></new-no-data>
          </van-list>
        </van-pull-refresh>
      </div>
    </template>
  </new-layout>
</template>
<script>
  import { getCurrentAddress } from '@/storage';

  export default {
    name: 'shopInfo',
    props: {},
    data() {
      return {
        activeRed: 1,
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        shopSort: 'SYNTHESIZE',
        searchIcon: '\ue64c 药品名',
        position: getCurrentAddress()
      };
    },
    created() {
    },
    mounted() {
    },
    filters: {
      meter(meter) {
        if (meter < 1) {
          let meters = meter * 1000;
          return meters + '米';
        } else {
          let kilometers = meter;
          return kilometers + '公里';
        }
      }
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
          lat: this.position.lat,
          lng: this.position.lng,
          sort: this.shopSort,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const data = await this.$http.get('/shops', params);
        this.isLoading = false;
        this.loading = false;
        this.list = this.list.concat(data.list);
        if (data.list.length === 0) {
          this.finished = true;
        }
      },
      orderBy(shopSort) {
        if (shopSort === 'SYNTHESIZE') {
          this.activeRed = 1;
        }
        if (shopSort === 'DISTANCE') {
          this.activeRed = 2;
        }
        if (shopSort === 'APPRAISE') {
          this.activeRed = 3;
        }
        if (shopSort === 'SALE') {
          this.activeRed = 4;
        }
        this.shopSort = shopSort;
        this.onRefresh();
      }
    }
  }
  ;
</script>
<style scoped type="text/scss" lang="scss">
  .red{
    color: #F60000;
  }
  .fz21{
    font-size: 21px!important;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mt10{
    margin-top: 10px;
  }
  .rx-delivery {
    font-size: 20px;
    width: 82px;
    height: 33px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #F5003F;
    border-radius: 7px;
    display: inline-block;
    float: left;
    color: #F5003F;
    text-align: center;
    line-height: 33px;
    margin-right: 15px;
  }
  .rx-since {
    font-size: 20px;
    width: 82px;
    height: 33px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #F60000;
    border-radius: 7px;
    display: inline-block;
    float: left;
    color: #F60000;
    text-align: center;
    line-height: 33px;
    margin-right: 15px;
  }

  .shops {
    &-header {
      header {
        & > div:nth-child(2) {
          input {
            width: 500px;
            height: 55px;
            outline: none;
            border-width: 0;
            font-size: 30px;
            color: black;
            border-radius: 10PX;
            padding: 0 20px;
            &::placeholder {
              text-align: center;
            }
          }
        }
      }
    }
    &-filter {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 24px;
      font-family: HiraginoSansGB-W3;
      color: rgba(69, 69, 69, 1);
      background-color: white;
      &-item {
        display: flex;
        align-items: center;
        &-text {
          font-size: 30px;
        }
        &-arrow {
          display: flex;
          flex-direction: column;
          justify-content: center;
          &-up {
            border: 7px solid white;
            border-bottom-color: #F60000;
            width: 0;
            height: 0;
          }
          &-down {
            border: 7px solid white;
            border-top-color: #F60000;
            width: 0;
            height: 0;
            margin-top: 2px;
          }
        }
      }
    }
    &-container {
      &-item {
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        position: relative;
        &:first-child {
          margin-top: 10px;
        }
        padding: 20px;
        &-left {
          padding: 20px;
          img {
            width: 250px;
            height: 250px;
          }
        }
        &-right {
          padding: 20px;
          div {
            font-size: 25px;
            &:nth-child(1) {
              font-size: 30px;
            }
            &:nth-child(2) {
              margin-top: 10px;
            }
          }
        }
        &-peisong {
          position: absolute;
          right: 10px;
          top: 10px;
          i {
            font-size: 80px;
            color: #F60000;
          }
        }
      }
    }
  }
</style>

