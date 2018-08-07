<template>
  <div class="full-container">
    <header :style="{background:bgColor,color:color}" class="height130">
      <div class="header-top"></div>
      <slot name="left"><i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i></slot>
      <slot name="center">
        <!--TODO 搜索 -->
        <div class="d-inline-block fl position-absolute">

          <i class="iconfont ic-search d-inline-block fl position-absolute"></i>
          <input type="text" placeholder="           达康药业"
                 class="border-0 width-percent-100 border-radius25 head-center text-white position-absolute"/>
        </div>
      </slot>
      <slot name="right">
        <div class="d-inline-block fr position-relative">
          <i class="iconfont ic-lingdang"></i>
          <span class="dot position-absolute"></span>
        </div>
      </slot>
    </header>
    <div class="width-percent-100 bg-white">
      <div class="shops-nav width-percent-96 m-auto">
        <div class="d-inline-block fl  samediv comprehensive active" @click="reOrderBy('SYNTHESIZE_LESS')">
          默认
          <i class="icon iconfont ic-sanx-up"></i>
        </div>
        <div class="d-inline-block fl nearby samediv" @click="reOrderByAppraise()">评价</div>
        <div class="d-inline-block fl evaluate samediv" @click="reOrderBySales()">销量</div>
        <div class="d-inline-block fl screen samediv" @click="reOrderByDistance()">距离最近<i
          class="icon iconfont ic-sanx-up"></i></div>
      </div>
    </div>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

      <router-link v-for="(shopList,index) in shopLists"
                   :key="index"
                   :to="{ path: '/shops/view', query: { id: shopList.id }}">
        <div class="specific">
          <div class="width-percent-96 m-auto">

            <div class="shop-store d-inline-block fl">
              <img :src="getImgURL(shopList.fileId,'LARGE_LOGO')" class="shop-store-img"/>
            </div>
            <div>
              <div class="height-43"></div>
              <div class="shop-title">
                <p class="shop-title">{{shopList.name}}</p>
              </div>
              <div class="shop-star">
                <new-star :size="shopList.score"></new-star>
              </div>
              <div class="shop-tel text-333333">
                电话：{{shopList.phone}}
              </div>
              <div class="shop-tel text-333333 elps">
                地址：{{shopList.area}}{{shopList.address}}
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </ul>
    <new-all-data v-if="loading"></new-all-data>
  </div>
</template>
<script>
  // FIXME 代码优化
  export default {
    name: 'shopInfo',
    data() {
      return {
        bgColor: '#13C1FE',
        color: 'white',
        isA: false,
        isB: false,
        isC: false,
        isD: false,
        lng: 120.9809,
        lat: 31.3872,
        shopLists: [],
        shopSort: 'SYNTHESIZE',
        val: -1,
        salesVolume: -1,
        distanceVolume: -1,
        pageNum: 1,
        pageSize: 15,
        allLoaded: false,
        pages: ''
      };
    },
    props: {
      title: {
        default: '春天大药房'
      },
      tel: {
        default: '13020141411'
      },
      address: {
        default: '地址：昆山市长江路10号'
      }
    },
    methods: {
      loadMore() {
        this.loading = false;
        if (this.pageNum <= this.pages) {
          this.pageNum++;
          this.reOrderBy();
        } else {
          this.loading = true;
          this.allLoaded = true;
        }
      },
      reOrderByDistance() { // eslint-disable-next-line
        $('.samediv').removeClass('active'); // eslint-disable-next-line
        $('.samediv').eq(3).addClass('active'); // eslint-disable-next-line
        this.isD = !this.isD;
        this.distanceVolume = (-1) * this.distanceVolume;
        this.shopSort = 'DISTANCE';
        const url = '/shops';
        let data = {
          lat: this.lat,
          lng: this.lng,
          shopSort: this.shopSort,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        this.$http.get(url, {params: data}).then(res => {
          this.shopLists = res.data.list;
        });
      },
      reOrderBySales() { // eslint-disable-next-line
        $('.samediv').removeClass('active'); // eslint-disable-next-line
        $('.samediv').eq(2).addClass('active'); // eslint-disable-next-line
        this.salesVolume = (-1) * this.salesVolume;
        this.shopSort = 'SALE';
        const url = '/shops';
        let data = {
          lat: this.lat,
          lng: this.lng,
          shopSort: this.shopSort,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        this.$http.get(url, {params: data}).then(res => {
          this.shopLists = res.data.list;
        });
      },
      reOrderByAppraise() { // eslint-disable-next-line
        $('.samediv').removeClass('active'); // eslint-disable-next-line
        $('.samediv').eq(1).addClass('active'); // eslint-disable-next-line
        this.val = (-1) * this.val;
        this.shopSort = 'APPRAISE';
        const url = '/shops';
        let data = {
          lat: this.lat,
          lng: this.lng,
          shopSort: this.shopSort,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        this.$http.get(url, {params: data}).then(res => {
          this.shopLists = res.data.list;
        });
      },
      reOrderBy() { // eslint-disable-next-line
        $('.samediv').removeClass('active'); // eslint-disable-next-line
        $('.samediv').eq(0).addClass('active'); // eslint-disable-next-line
        const url = '/shops';
        let data = {
          lat: this.lat,
          lng: this.lng,
          shopSort: this.shopSort,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        this.$http.get(url, {params: data}).then(res => {
          this.shopLists = res.data.list;
          this.pages = res.data.pages;
        });
      }
    },
    created: function () {
      this.loadMore();
      this.reOrderBy();
    }
  }
  ;
</script>
<style scoped>
  .shop-tel {
    margin-top: 15px;
    font-size: 22px;
  }

  .height-43 {
    height: 43px;
  }

  .full-container {
    background: #f5f5f5;
    width: 720px;
  }

  .shop-store {
    width: 300px;
    height: 250px;
    margin: 15px 29px 16px 20px;
  }

  .shop-store-img {
    width:300px;
    height:249px;
  }

  .shops-nav {
    height: 79px;
    line-height: 79px;
    font-size: 26px;
    color: rgba(153, 153, 153, 1);
    border-bottom: 1px solid #E5E5E5;
  }

  .comprehensive {
    width: 68px;
  }

  .active {
    color: #454545;
  }

  .samediv {
    width: 23%;
    text-align: center;
  }

  .icon {
    width: 0;
    height: 0;
    margin-left: 4px;
    display: inline-block;
  }

  .specific {
    width: 720px;
    height: 281px;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 15px;
  }

  .shop-title {
    font-size: 30px;
    color: #454545;
  }

  .shop-star {
    margin-top: 11px;
  }

  .height {
    height: 130px;
  }

  .head-center {
    width: 530px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    opacity: 0.21;
    border-radius: 25px;
    margin-left: 53px;
  }

  .border-radius25 {
    border-radius: 25px;
  }

  .ic-arrow-right {
    margin-left: 21px;
  }

  .dot {
    width: 10px;
    height: 10px;
    background: rgba(255, 0, 0, 1);
    display: inline-block;
    border-radius: 5px;
    top: 5px;
    left: 25px;
  }

  .ic-lingdang {
    font-size: 40px;
  }

  .ic-arrow-right {
    font-size: 40px;
  }

  header {
    width: 720px;
  }

  .height130 {
    height: 130px;
  }

  .header-top {
    height: 45px;
  }

  input::-webkit-input-placeholder {
    color: red; /*rgb(49, 96, 113)*/
    font-size: 30px;
    line-height: 50px;
  }

  .ic-search {
    left: 80px;
    font-size: 30px;
  }
  .iconfont{
    width: 0!important;
    height: 0!important;
  }
  .icon{
    width: 0!important;
    height: 0!important;
  }
</style>
