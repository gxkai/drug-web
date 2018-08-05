<!-- FIXME 字体大小 -->
<template>
  <div class="rxs-shop-contanier">
    <!-- TODO 搜索 -->
   <!-- <new-header></new-header>-->

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

    <ul class="is-flex flex-row flex-sa p-tb-20 all-border">
      <li @click="orderById()" :class="{'blueactive1':index1==comprehensive1}">
        <span>综合</span>
      </li>
      <li @click="orderByDistance()" :class="{'blueactive1':index2==comprehensive2}">
        <span>距离最近</span>
      </li>
      <li @click="orderByScore()" :class="{'blueactive1':index3==comprehensive3}">
        <span>好评优先</span>
      </li>
      <li @click="orderByPrice()" class="is-flex flex-row " :class="{'blueactive1':index4==comprehensive4}">
        <span>价格</span>
        <div class="is-flex  position-relative">
          <i class="iconfont ic-arrLeft-fill1 position-absolute position-top" :class="val==1?'unActive':'blueActive'"></i>
          <i class="iconfont ic-arrLeft-fill position-absolute position-bottom" :class="val==1?'blueActive':'unActive'"></i>
        </div>
      </li>
    </ul>
    <ul>
      <!-- TODO 医院 -->
      <new-shop :showStar="false" :fileId="3" :newScore="4" :shopName="昆山市中医院" :phone="'0512-56498211'"
                :address="昆山市朝阳路189号" :price="58.00" :newCart="true" :showIcon="true"></new-shop>
      <li v-for="rxShop in rxShops">
        <router-link :to="{path:'/rxs/shops/drugs',query:{id:id,shopId:rxShop.id,shopName:rxShop.name}}">
        <new-shop :showStar="true" :fileId="rxShop.fileId" :newScore="rxShop.score" :shopName="rxShop.name" :phone="rxShop.tel"
                  :address="rxShop.area + rxShop.address" :price="rxShop.amount" :newCart="true"></new-shop>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bgColor: '#13C1FE',
        color: 'white',
        id: '',
        rxShops: [],
        lng: 120.9809,
        lat: 31.3872,
        val: -1,
        comprehensive1: -1,
        index1: 1,
        index2: 2,
        index3: 3,
        index4: 4,
        comprehensive2: -2,
        comprehensive3: -3,
        comprehensive4: -4
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.getRxShops();
    },
    methods: {
      getRxShops() {
        this.$http.get('/rxs/' + this.id + '/shops?lng=' + this.lng + '&lat=' + this.lat)
          .then(res => {
            this.rxShops = res.data;
          });
      },
      orderById() {
        this.rxShops = this.orderListsById(this.rxShops);
        this.comprehensive1 = 1;
        this.comprehensive2 = 7;
        this.comprehensive3 = 7;
        this.comprehensive4 = 7;
      },
      orderByDistance() {
        this.rxShops = this.orderListsByDistance(this.rxShops);
        this.comprehensive2 = 2;
        this.comprehensive1 = 7;
        this.comprehensive3 = 7;
        this.comprehensive4 = 7;
      },
      orderByScore() {
        this.rxShops = this.orderListsByScore(this.rxShops);
        this.comprehensive3 = 3;
        this.comprehensive1 = 7;
        this.comprehensive2 = 7;
        this.comprehensive4 = 7;
      },
      orderByPrice() {
        this.comprehensive4 = 4;
        this.comprehensive1 = 7;
        this.comprehensive2 = 7;
        this.comprehensive3 = 7;
        this.val = -(this.val);
        if (this.val === -1) {
          this.rxShops = this.orderListsByPriceASC(this.rxShops);
        } else {
          this.rxShops = this.orderListsByPriceDESC(this.rxShops);
        }
      },
      orderListsByPriceASC(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].amount > list[j + 1].amount) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsByPriceDESC(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].amount < list[j + 1].amount) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsById(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].id > list[j + 1].id) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsByDistance(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].distance > list[j + 1].distance) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsByScore(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].score > list[j + 1].score) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      }
    }
  };
</script>

<style scoped >
  .flex-row{
    flex-direction: row;
  }
  .flex-sa{
    justify-content: space-around;
  }
  .p-tb-20{
    padding: 20px 0;
    box-sizing: border-box;
  }
  .all-border{
    border: 1px #f5f5f5 solid;
  }
  .position-top{
    top:-6px;
  }
  .position-bottom{
    bottom:-8px;
  }
  .unActive {
    color: #d6cfcf !important;
  }
  .blueActive {
    color: #1AB6FD;
  }
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
</style>
