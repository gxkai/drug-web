<template>
  <new-layout class="shops">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
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
                 @click="$router.push({name:'/shops/view',params:{shopId:item.id}})">
              <div class="shops-container-item-left">
                <img v-lazy="getImgURL(item.fileId,'LARGE_LOGO')"/>
              </div>
              <div class="shops-container-item-right">
                <div>
                  {{item.name}}
                </div>
                <div class="shop-rate">
                  <div>
                    <!--<van-rate v-model="shopRate" style="display: inline-block" />-->
                    <span class="yueshou">总销量{{item.sales|| 0}}</span>
                  </div>
                  <div>
                      {{item.distance | meter}}
                  </div>
                </div>
                <!--<div>-->
                <!--电话：{{item.phone}}-->
                <!--</div>-->
                <div class="shopAdd">
                  <div>
                    <van-icon name="dizhi" size="1.2em" color="#a6a6a6"></van-icon>{{item.address}}
                  </div>
                  <!--<span>平台配送</span>-->
                </div>
                <!--<div class="fz21">-->
                <!--<span class="rx_shop_address"> <van-icon name="dizhi" size="2em" color="#a6a6a6"></van-icon></span> 距当前位置：{{item.distance | meter}}-->
                <!--</div>-->
                <div class="mt10">
                  <van-tag type="danger" plain>可自提</van-tag>
                  <van-tag :type="item.distribution==true && item.shopDistance < item.distance ? 'danger':'' " plain>可配送</van-tag>
                  <van-tag type="item.medicaid? 'danger':''" plain >医保店</van-tag>
                  <van-tag type="danger" plain>在线咨询</van-tag>
                </div>
              </div>
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
        position: getCurrentAddress(),
        shopRate: 5
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

  /deep/ .van-tag {
    font-size: 20px!important;
    padding: 5px 10px;
    margin-left: 10px;
  }
  .red{
    color: $themeColor;
  }
  .fz21{
    font-size: 21px!important;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mt10{
    margin-top: 10px;
  }

  .border--grey {
    border-color: #999999!important;
    color: #999999!important;
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
            border-bottom-color: $themeColor;
            width: 0;
            height: 0;
          }
          &-down {
            border: 7px solid white;
            border-top-color: $themeColor;
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
        padding: 6px;
        &-left {
          padding: 15px;
          img {
            width: 200px;
            height: 200px;
          }
        }
        &-right {
          padding: 20px;
          width: 550px;
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
            color: $themeColor;
          }
        }
      }
    }
  }
  .shop-rate{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>div{
      font-size: 20px;
    }
    span.yueshou{
      font-size: 20px;
    }
  }
  .shopAdd{
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.5;
    margin-top: 8px;
    &>div{
      font-size: 24px !important;
      display: flex;
    }
    span{
      font-size:20px;
      color:#a6a6a6;
    }
  }
</style>

