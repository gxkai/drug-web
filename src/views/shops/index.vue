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
          <div class="shops-filter-item-arrow-up">
          </div>
          <div class="shops-filter-item-arrow-down">
          </div>
        </div>
      </div>
      <div class="shops-filter-item" @click="orderBy('DISTANCE')">
        <div class="shops-filter-item-text">
          距离最近
        </div>
        <div class="shops-filter-item-arrow">
          <div class="shops-filter-item-arrow-up">
          </div>
          <div class="shops-filter-item-arrow-down">
          </div>
        </div>
      </div>
      <div class="shops-filter-item" @click="orderBy('APPRAISE')">
        <div class="shops-filter-item-text">
          好评优先
        </div>
        <div class="shops-filter-item-arrow">
          <div class="shops-filter-item-arrow-up">
          </div>
          <div class="shops-filter-item-arrow-down">
          </div>
        </div>
      </div>
      <div class="shops-filter-item" @click="orderBy('SALE')">
        <div class="shops-filter-item-text">
          价格
        </div>
        <div class="shops-filter-item-arrow">
          <div class="shops-filter-item-arrow-up">
          </div>
          <div class="shops-filter-item-arrow-down">
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
                  <new-star :score="item.score" disabled size="middlerr"></new-star>
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
      <new-no-data :length="list.length" v-show="loading"></new-no-data>
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
        pageNum: 1,
        pageSize: 15,
        loading: false,
        shopSort: 'SYNTHESIZE',
        searchIcon: '\ue64c 药品名'
      };
    },
    created() {
    },
    mounted() {
      this.$refs.container.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.filter.clientHeight) + 'px';
      this.$refs.container.style.overflow = 'scroll';
    },
    methods: {
      onReset() {
        this.list = [];
        this.pageNum = 0;
        this.loading = false;
      },
      loadMore() {
        this.$http.get('/shops', this.getParams())
          .then(res => {
            if (res.data.list.length !== 0) {
              this.list = this.list.concat(res.data.list);
              this.pageNum++;
            } else {
              this.loading = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      },
      getParams() {
        return {
          params: {
            lat: this.position.lat,
            lng: this.position.lng,
            shopSort: this.shopSort,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        };
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
  .shops-container-item{
    background: white;
    padding:2px 5px 0px 5px!important;
  }
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
      width: 100%;
      &-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        padding: 20px;
        &-left{
          width: 250px;
          padding: 20px;
          img{
            width: 100%;
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

  .border-bottom-grey {
    border-bottom: 1px #f3f3f3 solid;
  }
  .shops-container{
    background: #f5f5f5;
  }
  .shops-filter{
    border-bottom: 1px #f5f5f5 solid;
  }
  .shops-container-item-right div{
    margin-bottom: 5px;
  }
</style>

