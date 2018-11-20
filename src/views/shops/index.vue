<template>
  <new-layout class="shops">
    <div slot="top">
      <div class="shops-header">
        <new-header>
          <div slot="left" @click="$router.go(-1)">
            <i class="iconfont ic-arrow-right"></i>
          </div>
          <div slot="center">
            <input class="iconfont" :placeholder="searchIcon" @focus="$router.push('/drugs')"/>
          </div>
        </new-header>
      </div>
      <div class="shops-filter">
        <div class="shops-filter-item" @click="orderBy('SYNTHESIZE')">
          <div class="shops-filter-item-text">
            综合
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:shopSort === 'SYNTHESIZE'? '#13C1FE': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:shopSort === 'SYNTHESIZE'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderBy('DISTANCE')">
          <div class="shops-filter-item-text">
            距离最近
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:shopSort === 'DISTANCE'? '#13C1FE': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:shopSort === 'DISTANCE'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderBy('APPRAISE')">
          <div class="shops-filter-item-text">
            好评优先
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:shopSort === 'APPRAISE'? '#13C1FE': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:shopSort === 'APPRAISE'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderBy('SALE')">
          <div class="shops-filter-item-text">
            销量最多
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up" :style="{borderBottomColor:shopSort === 'SALE'? '#13C1FE': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down" :style="{borderTopColor:shopSort === 'SALE'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shops-container"
    slot="center"
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
                  <new-star :score="item.score" disabled></new-star>
                </div>
                <div>
                  电话：{{item.phone}}
                </div>
                <div>
                  地址：{{item.address}}
                </div>
              </div>
              <div class="shops-container-item-peisong"
                   v-show="item.distribution === true">
                <i class="iconfont ic-peisong-"></i>
              </div>
            </div>
            <new-no-data v-if="finished"></new-no-data>
          </van-list>
        </van-pull-refresh>
    </div>
  </new-layout>
</template>
<script>
  export default {
    name: 'shopInfo',
    props: {},
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        shopSort: 'SYNTHESIZE',
        searchIcon: '\ue64c 药品名'
      };
    },
    computed: {
      position() {
        return this.$store.getters.position;
      }
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
        this.$axios.get('/shops', {
          params: {
            lat: this.position.lat,
            lng: this.position.lng,
            sort: this.shopSort,
            pageNum: this.pageNum,
            pageSize: this.pageSize
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
      },
      orderBy(shopSort) {
        this.shopSort = shopSort;
        this.onRefresh();
      }
    }
  }
  ;
</script>
<style scoped type="text/less" lang="less">
  .shops {
    width: 720px;
    background-color: #f5f5f5;
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
            border-bottom-color: #13C1FE;
            width: 0;
            height: 0;
          }
          &-down {
            border: 7px solid white;
            border-top-color: #13C1FE;
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
            color: #1AB6FD;
          }
        }
      }
    }
  }
</style>

