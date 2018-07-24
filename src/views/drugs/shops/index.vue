<template>
  <div id="SPharmacyBydrug" style="overflow: scroll">
    <mt-header :title="drugInfo.name" style="color:white;">
      <router-link to="#" slot="left">
        <mt-button @click="$router.go(-1)" icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="J_SPharmacyBydrug_yao">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(picUrl,index) in picUrls" :key="index">
          <img v-lazy="picUrl" style="width:100%;height: 30vh"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="J_SPharmacyBydrug_msg">
      <div style="font-size:1.2rem;">{{drugInfo.name}}</div>
      <div>{{drugInfo.introduce.substring(0,45)}}<span v-if="drugInfo.introduce.length>45">......</span></div>
      <div style="color:#999999">{{drugInfo.sfda}}</div>
      <div style="color:#999999">厂商：{{drugInfo.originName}}</div>
    </div>
    <div class="J_SPharmacyBydrug_msg_bg">
      <div>这些字是撑高度用的</div>
      <div>这些字是撑高度用的</div>
      <div>这些字是撑高度用的</div>
      <div>这些字是撑高度用的</div>
    </div>
    <div class="J_SPharmacyBydrug_content">
      <div class="J_SPharmacyBydrug_content_title">
        <div>
          <span style="color:#1AB6FD;">{{total}} 个</span>
          <span>商家报价</span>
          <i class="icon iconfont ic-youjiantou" @click="dropDown()" v-if="!arrowdown"></i>
          <i class="icon iconfont ic-arrowdown" @click="arrowDown()" v-if="arrowdown"></i>
        </div>
        <div class="J_SPharmacyBydrug_sanjiao"></div>
      </div>
      <div class="J_SPharmacyBydrug_content_nav">
        <div @click="orderById()">综合<i class="icon iconfont ic-sanx-up"></i></div>
        <div @click="orderByDistance()">距离最近</div>
        <div @click="orderByPrice()" style="display: flex; flex-direction: row;align-items: center">价格
          <div class="d_drugs_index">
            <i class="icon iconfont ic-arrLeft-fill1" :class="val==1?'samespan':'blueactive'"
               style="display:block;"></i>
            <i class="icon iconfont ic-arrLeft-fill" :class="val==1?'blueactive':'samespan'"></i>
          </div>
        </div>
      </div>

      <ul>
        <li v-for="(shopList,index) in shopLists" :key="index">
          <router-link :to="{path:'/shopDrugSpecs',query:{id:shopList.shopDrugSpecId}}">
            <div class="J_SPharmacyBydrug_content_ul_li_d1">
              <span>{{ shopList.name}}</span>
              <span style="color:red;">&yen; {{ shopList.price}}</span>
            </div>
            <div class="J_SPharmacyBydrug_content_ul_li_d2">
              <div class="J_SPharmacyBydrug_content_ul_li_d2_d">

                <span class="d_ellopsis"><i class="icon iconfont ic-ditu" id="ditu"></i>{{shopList.address}}</span>

                <span class="d_ellopsis1"><i class="icon iconfont ic-aixin" id="aixin"></i>评分:{{shopList.score}}</span>

                <span class="d_ellopsis1"><i class="icon iconfont ic-kucun" id="kucun"></i>库存:{{shopList.stock}}</span>
                <span class="f_cart_img">
                    <!-- <img src="static/img/drug/cart.png"> -->
                    <i class="icon iconfont ic-gouwuche3" id="gouwuche"></i>
                </span>
              </div>
              <div></div>
            </div>
          </router-link>
        </li>
      </ul>

    </div>

    <drugBottom v-if="hide" :spec="spec" :tips='tips' :drugInfo='drugInfo'
                v-on:close="d_closed"></drugBottom>
  </div>
</template>

<script>
  import drugBottom from '@/components/drugBottom';

  export default {
    data() {
      return {
        shopLists: [],
        drugInfo: [],
        arrowdown: false,
        hide: false,
        tips: [],
        total: '',
        picUrls: '',
        drugId: '',
        drugShopSort: 'SYNTHESIZE',
        spec: '',
        specId: '',
        val: -1,
        lng: null,
        lat: null
      };
    },
    props: ['message'],
    components: {
      drugBottom
    },
    methods: {

      getShopLists() {
        this.$http.get('/drugs/' + this.drugId + '/drugSpecs/' + this.specId + '/shops?drugShopSort=' + this.drugShopSort + '&lat=' + this.lat + '&lng=' + this.lng).then((res) => {
          this.total = res.data.total;
          this.shopLists = res.data.list;
        });
      },

      orderById() {
        this.drugShopSort = 'SYNTHESIZE';
        this.getShopLists();
      },
      orderByDistance() {
        this.drugShopSort = 'DISTANCE';
        this.getLocation();
      },
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          alert('浏览器不支持');
        }
      },
      showPosition(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getShopLists();
      },
      orderByPrice() {
        this.val = -(this.val);
        if (this.val === -1) {
          this.drugShopSort = 'PRICE_LESS';
        } else {
          this.drugShopSort = 'PRICE_MORE';
        }
        this.getShopLists();
      },
      dropDown() {
        this.hide = true;
        this.arrowdown = true;
      },
      arrowDown() {
        this.arrowdown = false;
        this.hide = false;
      },
      d_closed(data) {
        if (data !== '') {
          data = data || this.drugId;
          // 根据选择的值修改页面
          this.$http.get('/drugs/' + this.drugId + '/drugSpecs/' + data + '/shops?drugShopSort=' + this.drugShopSort).then((res) => {
            this.total = res.data.total;
            this.shopLists = res.data.list;
          });
          this.tips.forEach(e => {
            if (e.value === data) {
              this.drugInfo.value = e.value;
              this.picUrls = e.picUrls;
              this.spec = e.name;
            }
          });
        }
        this.hide = false;
        this.arrowdown = false;
      }
    },
    created: function () {
      this.drugId = this.$route.query.id;
      this.specId = this.$route.query.specId;
      this.$http.get('/drugs/' + this.drugId).then((res) => {
        this.drugInfo = res.data;
        // 规格信息
        this.tips = res.data.drugSpecs;
        this.tips.forEach(e => {
          e.label = e.name;
          e.value = e.id;
          e.logoUrl = '/files/' + e.logo + '/image?resolution=' + 'LARGE_LOGO';
          e.picUrls = [];
          e.pics.forEach(e1 => {
            e.picUrls.push('/files/' + e1 + '/image?resolution=' + 'LARGE_PIC');
          });
        });
        this.drugInfo.value = this.tips[0].value;
        this.spec = this.tips[0].name;
        this.picUrls = this.tips[0].picUrls;
      });
      this.getLocation();
    }
  };
</script>

<style scoped>
  .mint-header {
    background: white;
    color: #333333
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .J_SPharmacyBydrug_yao {
    width: 100%;
    background-color: #ccc;
    position: relative;
  }

  .J_SPharmacyBydrug_yao_ischu {
    position: absolute;
    width: 3rem;
    height: 3rem;
    top: 1rem;
    left: 1rem;
    background-color: #fff;
  }

  .J_SPharmacyBydrug_msg {
    position: absolute;
    z-index: 1;
    top: 23rem;
    border: 1px solid #1AB6FD;
    background-color: #fff;
    width: 90%;
    margin-left: 5%;
    padding: 1rem 3%;
  }

  .J_SPharmacyBydrug_msg div {
    line-height: 2.5rem;

  }

  .J_SPharmacyBydrug_msg_bg {
    position: absolute;
    top: 24rem;
    background-color: #fff;
    border: 1px solid #1AB6FD;
    width: 94%;
    margin-left: 3%;
    padding: 1rem 3%;

  }

  .J_SPharmacyBydrug_msg_bg div {
    visibility: hidden;
    line-height: 2.42rem;
  }

  .J_SPharmacyBydrug_content {
    position: absolute;
    top: 38rem;
    width: 100%;
  }

  .J_SPharmacyBydrug_content_title {
    padding: 0 3%;
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    display: flex;
    justify-content: space-between;
  }

  .J_SPharmacyBydrug_content_nav {
    display: flex;
    height: 3rem;
    line-height: 3rem;
    margin-top: 0.5rem;
    justify-content: space-between;
    padding: 0 7%;
    border-bottom: 6px solid #f5f5f5;
  }

  .J_SPharmacyBydrug_content ul {
    margin-bottom: 5rem;
  }

  .J_SPharmacyBydrug_content li {
    padding: 0 5%;
    margin: 0.5rem 0;
    border-bottom: 6px solid #f5f5f5;
  }

  .J_SPharmacyBydrug_content_ul_li_d1 {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    line-height: 2rem;
  }

  .J_SPharmacyBydrug_content_ul_li_d2 {
    line-height: 3rem;
  }

  .J_SPharmacyBydrug_content_ul_li_d2_d {
    position: relative;
    color: #999;
  }

  .J_SPharmacyBydrug_content_ul_li_d2_d img {
    width: 1rem;
  }

  .f_cart_img {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .f_cart_img img {
    width: 3rem;
  }

  .J_SPharmacyBydrug_content_ul_li_d2 .icon {
    color: #1AB6FD;
  }

  .ic-youjiantou, .ic-arrowdown {
    float: right;
  }

  .J_SPharmacyBydrug_content_title div:first-child {
    width: 100%;
  }

  .samespan {
    width: 10px;
    margin-bottom: 0.2rem;
    color: #d6cfcf;
    display: inline-block;
    font-size: 1.6rem;
  }

  .blueactive {
    color: #1AB6FD;
    width: 10px;
    display: inline-block;
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
  }

  .d_drugs_index {
    flex: 1;
    margin-top: -2px;
    line-height: 0.5rem;
  }

  .mint-button-icon i {
    color: white !important;
  }

  .mint-header {
    background: #1AB6FD;
  }

  .d_ellopsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 32%;
    display: inline-block;
  }

  .d_ellopsis1 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 23%;
    display: inline-block;
  }

  .ic-gouwuche3 {
    font-size: 2rem;
    margin-top: 1rem;
  }

  .ic-sanx-up {
    color: #1AB6FD;
  }

  #kucun, #ditu, #aixin, #gouwuche {
    color: #1AB6FD !important;
  }
</style>

