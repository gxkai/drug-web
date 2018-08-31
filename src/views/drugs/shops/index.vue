<template>
  <div class="fruit-body">
    <new-header :title="drugInfo.name">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="swiper">
      <mt-swipe :atuo="3000">
        <mt-swipe-item v-for="(pic,index) in drugSpec.pics" :key="index">
          <img :src="getImgURL(pic, 'MIDDLE_PIC')"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="drug-div1 position-relative">
      <div class="drug-div2 position-absolute">
        <p class="elps drug-head-line">{{drugInfo.name}}</p>
        <p class="elpsTwo drug-head-benefit">{{drugInfo.introduce}}</p>
        <p class="drug-firm elps">{{drugInfo.sfda}}</p>
        <p class="drug-firm elps">厂商：{{drugInfo.originName}}</p>
      </div>
    </div>
    <div class="drug-offer">
      <div class=" merchant">
        <div>
          <span class="text-l-25 text-red">{{total}}</span>
          <span class="text-l-22">商家报价</span>
        </div>
        <div @click="changeIcon()">
          <i class="icon iconfont ic-youjiantou" v-if="hide"></i>
          <i class="icon iconfont ic-arrowdown" v-if="!hide"></i>
        </div>
      </div>
      <div class="comprehensive">
        <div @click="orderById()">综合<i class="ic-sanx-up icon iconfont text-1AB6FD"></i></div>
        <div @click="orderByDistance()">距离</div>
        <div @click="orderByPrice()">价格</div>
      </div>
    </div>
    <div class="width-percent-100 bg-white drug-shops" v-for="(shopList,index) in shopLists" :key="index">
      <router-link :to="{path:'/shopDrugSpecs',query:{shopDrugSpecId:shopList.shopDrugSpecId}}">
        <div class="ordinary width-percent-96 m-auto">
          <div class="drug-ordinary">
            <span class="d-inline-block fl drug-shop">{{shopList.name}}</span>
            <span class="text-red d-inline-block fr drug-price">¥{{shopList.price}}</span>
          </div>
          <div class="rote">
            <div>
              <div>
                <i class="icon iconfont ic-ditu text-1AB6FD"></i>
              </div>
              <div>
                {{shopList.address}}
              </div>
            </div>
            <div>
              <div>
                <i class="icon iconfont ic-aixin text-1AB6FD"></i>
              </div>
              <div>
                评分：{{shopList.score}}分
              </div>
            </div>
            <div>
              <div>
                <i class="icon iconfont ic-kucun text-1AB6FD"></i>
              </div>
              <div>
                库存：{{shopList.stock}}
              </div>
            </div>
          </div>
          <div class="shopping-car">
            <i class="iconfont ic-gouwuche3 text-1AB6FD"></i>
          </div>
        </div>
      </router-link>
    </div>

    <div v-show="!hide">
      <new-drug-buttom :drugSpecs='drugSpecs' :drugInfo='drugInfo' :drugSpec.sync="drugSpec"
                       @close="changeIcon()"></new-drug-buttom>
    </div>
  </div>
</template>
<script>
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
        lat: this.$store.getters.position.lat,
        lng: this.$store.getters.position.lng
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
        this.getShopLists();
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
        this.getShopLists();
      }).catch(error => {
        this.exception(error);
      });
    }
  };
</script>

<style type="text/less" lang="less">
  .swiper {
    width: 100%;
    height: 500px;
    img {
      width: 100%;
      height: 450px;
    }
  }
</style>

<style scoped>
  .fruit-body {
    background: #fbf7f7;
    width: 720px;
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
    font-size: 30px;
    color: rgba(51, 51, 51, 1);
    margin: 10px 0 0 30px;
  }

  .drug-head-benefit {
    width: 583px;
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    margin: 10px 0 0 30px;
  }

  .drug-firm {
    width: 500px;
    font-size: 20px;
    color: rgba(153, 153, 153, 1);
    margin: 22px 0px 16px 30px;
  }

  .drug-offer {
    margin-top: 10px;
    width: 720px;
    background: white;
  }

  .merchant {
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .comprehensive {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
  }

  .comprehensive > div {
    font-size: 24px;
  }

  .ordinary {
    margin-top: 15px;
    position: relative;
    padding-bottom: 20px;
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
    display: flex;
    align-items: center;
  }

  .rote > div {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .rote > div > div {
    font-size: 25px;
  }

  .rote > div > div .iconfont {
    font-size: 30px;
  }

  .shopping-car {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  a span {
    color: #333333;
  }

  .ic-youjiantou, .ic-arrowdown {
    font-size: 25px;
  }

  .text-red {
    color: red;
  }

  .ic-gouwuche3 {
    font-size: 30px;
  }
</style>

