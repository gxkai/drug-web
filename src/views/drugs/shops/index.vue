<template>
  <div class="fruit-body drugs_shops">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
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
          <span class="text-l-25">商家报价</span>
        </div>
        <div @click="popupVisible = !popupVisible">
          <i class="icon iconfont ic-arrowdown" v-if="popupVisible"></i>
          <i class="icon iconfont ic-youjiantou" v-else></i>
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
                评分&#58;{{shopList.score}}分
              </div>
            </div>
            <div>
              <div>
                <i class="icon iconfont ic-kucun text-1AB6FD"></i>
              </div>
              <div>
                库存&#58;{{shopList.stock}}
              </div>
            </div>
          </div>
          <div class="shopping-car">
            <i class="iconfont ic-gouwuche3 text-1AB6FD"></i>
          </div>
        </div>
      </router-link>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="drugs_shops-popup">
        <div class="drugs_shops-popup-header">
          <div class="drugs_shops-popup-header-left">
            <img :src="getImgURL(drugSpec.logo,'LARGE_LOGO')"/>
          </div>
          <div class="drugs_shops-popup-header-center">
            <div class="elpsTwo">{{drugInfo.name}} {{drugSpec.name}} -{{drugInfo.originName}}</div>
            <div style="color: #1AB6FD">{{drugInfo.sfda}}</div>
          </div>
          <div class="drugs_shops-popup-header-right" @click="popupVisible = false">
              <i class="iconfont ic-guanbi2"></i>
          </div>
        </div>
        <div class="drugs_shops-popup-content">
          <div class="drugs_shops-popup-content-title">
            选择规格
          </div>
          <div class="drugs_shops-popup-content-list">
            <div class="drugs_shops-popup-content-list-item"
                 v-for="item in drugSpecs"
                 :class="{'drugs_shops-popup-content-list-active':drugSpec === item}"
                 @click="popupVisible = false; drugSpec = item">
              <div>{{item.name}}</div>
              <div>
                <input :id="item" type="radio"  :value="item"   v-model="drugSpec">
                        <label :for="item"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
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
        drugSpecId: this.$route.query.drugSpecId,
        popupVisible: false,
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
  .drugs_shops {
    &-popup {
      width: 720px;
      min-height: 500px;
      &-header {
        width: 100%;
        padding: 20px 0;
        position: relative;
        &-left {
          position: absolute;
          bottom: 0;
          left: 20px;
          img {
            width: 160px;
            height: 160px;
          }
        }
        &-center {
          margin: 0 20px 0 200px;
          width: 450px;
          div {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            &:nth-child(1) {
              font-size: 28px;
            }
            &:nth-child(2) {
              font-size: 25px;
              font-weight: 300;
            }
          }
        }
        &-right {
          position: absolute;
          right:20px;
          top: 10px;
          i {
            font-size: 40px;
            color: #1AB6FD;
          }
        }
      }
      &-content {
        &-title {
          padding: 20px;
          font-size: 25px;
        }
        &-list {
          padding: 0 20px;
          &-active {
            border: 1PX solid #1AB6FD;
          }
          &-item {
            padding: 5px 10px;
            margin: 5px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div:nth-child(2) {
              position: relative;
            }
            div {
              font-size: 28px;
            }
            label {
              font-size: 28px;
              position: absolute;
              left: 0;
              top: 0;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 1px solid #999;
            }
            input {
              width: 30px;
              height: 30px;
              opacity: 0;
            }
            input:checked+label {
              background-color: #13C1FE;
              border: 1PX solid #13C1FE;
            }
            input:checked+label::after {
              position: absolute;
              content: "";
              width: 7px;
              height: 12px;
              top: 4px;
              left: 8px;
              border: 1PX solid #fff;
              border-top: none;
              border-left: none;
              transform: rotate(45deg);
            }
          }
        }
      }
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
    padding: 10px 30px;
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

