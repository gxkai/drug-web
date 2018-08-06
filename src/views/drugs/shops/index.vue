<!-- FIXME 字体大小 -->
<template>
  <div class="fruit-body">
    <new-header :title="drugInfo.name">
      <div slot="left">
        <i class="iconfont ic-arrow-right"  @click="$router.go(-1)"></i>
      </div>
    </new-header>
    <swiper :options="swiperOption" class="swiper-body">
      <swiper-slide v-for="(pic,index) in drugSpec.pics" :key="index">
        <img v-lazy="getImgURL(pic, 'MIDDLE_PIC')"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="drug-div1 position-relative">
      <div class="drug-div2 position-absolute">
        <p class="elps drug-head-line">{{drugInfo.name}}</p>
        <p class="elpsTwo drug-head-benefit">{{drugInfo.introduce}}</p>
        <p class="drug-firm elps">{{drugInfo.sfda}}</p>
        <p class="drug-firm elps">厂商：{{drugInfo.originName}}</p>
      </div>
    </div>
    <div class="drug-offer">
      <div class="width-percent-96 m-auto merchant">
        <div class="d-inline-block fl"><span class="text-1AB6FD">{{total}}</span><span>商家报价</span></div>
        <div class="d-inline-block fr" @click="changeIcon()">
          <i class="icon iconfont ic-youjiantou"  v-if="hide"></i>
          <i class="icon iconfont ic-arrowdown"  v-if="!hide"></i>
        </div>
      </div>
      <div class="comprehensive">
        <div class="d-inline-block" @click="orderById()">综合<i class="ic-sanx-up icon iconfont text-1AB6FD"></i></div>
        <div class="d-inline-block" @click="orderByDistance()">距离</div>
        <div class="d-inline-block" @click="orderByPrice()">价格</div>
      </div>
    </div>
    <div class="width-percent-100 bg-white drug-shops" v-for="(shopList,index) in shopLists" :key="index">
      <router-link :to="{path:'/shopDrugSpecs',query:{id:shopList.shopDrugSpecId}}">
      <div class="ordinary width-percent-96 m-auto">
        <div class="drug-ordinary">
          <span class="d-inline-block fl drug-shop">{{shopList.name}}</span>
          <span class="text-red d-inline-block fr drug-price">¥{{shopList.price}}</span>
        </div>
        <div class="rote">
          <span>
            <i class="icon iconfont ic-ditu text-1AB6FD"></i>{{shopList.address}}
          </span>
          <span>
            <i class="icon iconfont ic-aixin text-1AB6FD"></i>评分：{{shopList.score}}分
          </span>
          <span>
            <i class="icon iconfont ic-kucun text-1AB6FD"></i>库存：{{shopList.stock}}
          </span>
        </div>
        <div class="fr rote shopping-car">
          <i class="icon iconfont ic-gouwuche3 text-1AB6FD"></i>
        </div>
      </div>
      </router-link>
    </div>

    <div v-show="!hide">
         <new-drug-buttom   :drugSpecs='drugSpecs' :drugInfo='drugInfo' :drugSpec.sync="drugSpec"
                 @close="changeIcon()"></new-drug-buttom>
    </div>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  export default {
    data() {
      return {
        shopLists: [],
        drugInfo: [],
        drugSpecs: [],
        drugSpec: {},
        drugId: this.$route.query.drugId,
        drugSpecId: this.$route.query.id,
        hide: true,
        total: 0,
        sort: 'SYNTHESIZE',
        val: -1,
        lat: '31.39',
        lng: '120.95',
        swiperOption: {
          autoplay: 3500,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          speed: 1000
        }
      };
    },
    watch: {
      drugSpec(value) {
        this.getShopLists();
      }
    },
    methods: {
      getShopLists() {
        var url = '/drugs/' + this.drugId + '/drugSpecs/' + this.drugSpec.id + '/shops?sort=' + this.sort + '&lat=' + this.lat + '&lng=' + this.lng;
        this.$http.get(url).then((res) => {
          this.total = res.data.total;
          this.shopLists = res.data.list;
        }).catch(error => {
          this.exception(error);
        });
      },

      orderById() {
        this.sort = 'SYNTHESIZE';
        this.getShopLists();
      },
      orderByDistance() {
        this.sort = 'DISTANCE';
        this.getLocation();
      },
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        } else {
          MessageBox('提示', '浏览器不支持获取地理位置');
        }
      },
      showPosition(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getShopLists();
      },
      showError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            MessageBox('提示', 'User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            MessageBox('提示', 'Location information is unavailable.');
            break;
          case error.TIMEOUT:
            MessageBox('提示', 'The request to get user location timed out.');
            break;
          case error.UNKNOWN_ERROR:
            MessageBox('提示', 'An unknown error occurred.');
            break;
        }
      },
      orderByPrice() {
        this.val = -(this.val);
        if (this.val === -1) {
          this.sort = 'PRICE_ASC';
        } else {
          this.sort = 'PRICE_DESC';
        }
        this.getShopLists();
      },
      changeIcon() {
        this.hide = !this.hide;
      }
    },
    created: function () {
      const drugURL = '/drugs/' + this.drugId;
      this.$http.get(drugURL).then((res) => {
        this.drugInfo = res.data;
        this.drugSpecs = res.data.drugSpecs;
        this.drugSpecs.forEach(e => {
          if (e.id === this.drugSpecId) {
            this.drugSpec = e;
          }
        });
        this.getLocation();
      }).catch(error => {
        this.exception(error);
      });
    }
  };
</script>

<style scoped>
  .fruit-body {
    background: #fbf7f7;
    width:720px;
  }

  .icon {
    width: auto;
    height: auto;
  }

  .drug-bg-img {
    width: 720px;
    height: 413px;
    background: rgba(255, 255, 255, 1);
  }

  .drug-type {
    width: 42px;
    height: 25px;
    background: rgba(43, 178, 146, 1);
    color: white;
    text-align: center;
    line-height: 25px;
    margin-top: 11px;
    margin-left: 22px;
    border-radius: 42px/21px;
  }

  .drug-img {

    height: 295px;
    background: #ffffff;
  }

  .drug-div1 {
    width: 680px;
    height: 228px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
    margin-left: 20px;
    border: 1px solid #13C1FE;
  }

  .drug-div2 {
    width: 660px;
    height: 246px;
    background: rgba(255, 255, 255, 1);
    margin-left: 10px;
    z-index: 9;
    border: 1px solid #13C1FE;
    margin-bottom: 10px;
    top: -28px;
  }

  .drug-head-line {
    width: 600px;
    height: 26px;
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
    line-height: 26px;
    margin: 26px 0 0 30px;
  }

  .drug-head-benefit {
    width: 583px;
    height: 50px;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
    margin: 27px 0 0 30px;
  }

  .drug-firm {
    width: 500px;
    height: 25px;
    font-size: 20px;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
    margin: 22px 0px 16px 30px;
  }

  .drug-offer {
    margin-top: 10px;
    width: 720px;
    height: 117px;
    background: white;
  }

  .merchant {
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    border-bottom: 1px solid #f5f5f5;
  }

  .comprehensive {
    font-size: 24px;
    height: 67px;
    line-height: 67px;
  }

  .comprehensive div:first-child {
    margin-left: 98px;
  }

  .comprehensive div:nth-child(2) {
    margin-left: 165px;
  }

  .comprehensive div:nth-child(3) {
    margin-left: 179px;
  }

  .ordinary {
    margin-top: 15px;
    height: 130px;
  }

  .drug-ordinary {
    margin-top: 22px;
    height: 69px;
    line-height: 69px;
  }

  .drug-shop {
    margin-left: 20px;
    font-size: 26px;
  }

  .drug-price {
    margin-right: 21px;
    font-size: 24px;
  }

  .rote {
    font-size: 20px;
  }

  .rote i {
    font-size: 20px;
  }

  .shopping-car {
    height: 34px;
    line-height: 34px;
  }

  .mint-radio.is-right {
    padding-right: 10px;
  }
  /*定义进入过渡的结束状态*/
  .slide-fades-enter-active {
    transition: all 0.5s ease;

  }

  /* 定义离开过渡的结束状态*/
  .slide-fades-leave-active {
    transition: all 0.5s ease;
  }

  /*离开过渡的结束状态*/
  .slide-fades-leave-active {
    bottom: 0rem !important;
  }

  .slide-fades-leave-to {
    bottom: -28rem !important;
  }

  /*进入过渡的开始状*/
  .slide-fades-enter {
    bottom: -22rem !important;
  }

  .swiper-body {
    width:720px;
    height:413px;
    text-align: center;
    background-color: white;
  }

  .swiper-body img {
    height: 400px;
  }

  a span{
    color: #333333;
  }
</style>

