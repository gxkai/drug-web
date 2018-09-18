<template>
  <div class="shops">
    <div class="shops-header" ref="header">
      <new-header>
        <div slot="left" @click="$router.go(-1)">
          <i class="iconfont ic-arrow-right"></i>
        </div>
        <div slot="center">
          <input class="iconfont" :placeholder="searchIcon" @focus="$router.push('/shops')"/>
        </div>
      </new-header>
    </div>
    <div class="shops-filter" ref="filter">
      <div class="shops-filter-item" @click="orderBy('SYNTHESIZE')">
        <div class="shops-filter-item-text">
          综合
        </div>
        <div class="shops-filter-item-arrow">
          <div class="shops-filter-item-arrow-up" :style="{borderBottomColor:shopSort === 'SYNTHESIZE'? '#13C1FE': 'gray'} ">
          </div>
          <div class="shops-filter-item-arrow-down" :style="{borderTopColor:shopSort === 'SYNTHESIZE'? '#13C1FE': 'gray'} ">
          </div>
        </div>
      </div>
      <div class="shops-filter-item" @click="orderBy('DISTANCE')">
        <div class="shops-filter-item-text">
          距离最近
        </div>
        <div class="shops-filter-item-arrow">
          <div class="shops-filter-item-arrow-up" :style="{borderBottomColor:shopSort === 'DISTANCE'? '#13C1FE': 'gray'} ">
          </div>
          <div class="shops-filter-item-arrow-down" :style="{borderTopColor:shopSort === 'DISTANCE'? '#13C1FE': 'gray'} ">
          </div>
        </div>
      </div>
      <div class="shops-filter-item" @click="orderBy('APPRAISE')">
        <div class="shops-filter-item-text">
          好评优先
        </div>
        <div class="shops-filter-item-arrow">
          <div class="shops-filter-item-arrow-up" :style="{borderBottomColor:shopSort === 'APPRAISE'? '#13C1FE': 'gray'} ">
          </div>
          <div class="shops-filter-item-arrow-down" :style="{borderTopColor:shopSort === 'APPRAISE'? '#13C1FE': 'gray'} ">
          </div>
        </div>
      </div>
      <div class="shops-filter-item" @click="orderBy('SALE')">
        <div class="shops-filter-item-text">
          价格
        </div>
        <div class="shops-filter-item-arrow">
          <div class="shops-filter-item-arrow-up" :style="{borderBottomColor:shopSort === 'SALE'? '#13C1FE': 'gray'} ">
          </div>
          <div class="shops-filter-item-arrow-down" :style="{borderTopColor:shopSort === 'SALE'? '#13C1FE': 'gray'} ">
          </div>
        </div>
      </div>
    </div>
    <div class="shops-container" ref="container">
        <div  v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="0">
            <div class="shops-container-item"
                 :item="item"
                 v-for="(item,index) in list"
                 :key="index"
                 @click="$router.push({path:'/shops/view',query:{shopId:item.id}})">
              <div class="shops-container-item-left">
                <img :src="getImgURL(item.fileId,'LARGE_LOGO')"/>
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
            </div>
        </div>
      <new-no-data v-if="loadingComplete"></new-no-data>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'shopInfo',
    props: {},
    data() {
      return {
        position: this.$store.getters.position,
        list: [],
        pageNum: 0,
        pageSize: 15,
        loading: true,
        loadingComplete: false,
        shopSort: 'SYNTHESIZE',
        searchIcon: '\ue64c 药品名'
      };
    },
    created() {
      this.loadMore();
    },
    mounted() {
      this.$refs.container.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.filter.clientHeight) + 'px';
      this.$refs.container.style.overflow = 'scroll';
    },
    methods: {
      onReset() {
        this.list = [];
        this.pageNum = 0;
        this.loading = true;
        this.loadingComplete = false;
      },
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/shops',
          {params: {
            lat: this.position.lat,
            lng: this.position.lng,
            shopSort: this.shopSort,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }})
          .then(res => {
            if (res.data.list.length > 0) {
              this.list = this.list.concat(res.data.list);
              this.loading = false;
            } else {
              this.loadingComplete = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      },
      orderBy(shopSort) {
        this.shopSort = shopSort;
        this.onReset();
        this.loadMore();
      }
    }
  }
  ;
</script>
<style scoped type="text/less" lang="less">
  .shops {
    height: 100vh;
    width: 720px;
    &-header {
      header {
        & > div:nth-child(2) {
          input {
            width: 500px;
            height: 70px;
            outline: none;
            border-width: 0;
            font-size: 20px;
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
      /*position: relative;*/
      background-color: #f5f5f5;
      width: 100%;
      &-item {
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        &:first-child {
          margin-top: 10px;
        }
        padding: 20px;
        &-left{
          padding: 20px;
          img{
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
      }
    }
  }
</style>

