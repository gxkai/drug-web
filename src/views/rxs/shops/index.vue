<!-- FIXME 字体大小 -->
<template>
  <div class="rxs-shop-contanier">
    <!-- TODO 搜索 -->
    <new-header>
      <div  slot="left">
        <router-link tag="i" to="/" class="iconfont ic-arrow-right"></router-link>
      </div>
      <div slot="center">
        <input tag="a"  class="header-search" @click="$router.push('/drugSearch')">
      </div>
    </new-header>

    <ul class="is-flex flex-row flex-sa p-tb-20 all-border head-ul">
      <li @click="orderById()" :class="{'blueactive1':index1===comprehensive1}">
        <span>综合</span>
      </li>
      <li @click="orderByDistance()" :class="{'blueactive1':index2===comprehensive2}">
        <span>距离最近</span>
      </li>
      <li @click="orderByScore()" :class="{'blueactive1':index3===comprehensive3}">
        <span>好评优先</span>
      </li>
      <li @click="orderByPrice()" class="is-flex flex-row " :class="{'blueactive1':index4===comprehensive4}">
        <span>价格</span>
        <div class="is-flex  position-relative arrow-header">
          <i class="iconfont ic-arrLeft-fill1 position-absolute position-top" style="font-size:14px;" :class="val===1?'unActive':'blueActive'"></i>
          <i class="iconfont ic-arrLeft-fill" :class="val===1?'blueActive':'unActive'" style="font-size:14px;margin-top: 3px;"></i>
        </div>
      </li>
    </ul>
   <ul>
      <router-link :to="{path:'/orders/create/fromHospital',query:{rxId:id}}">
        <new-shop :showStar="false" :fileId="hospital.fileId" :shopName="hospital.name" :phone="hospital.phone"
        :address="hospital.address" :price="hospital.amount" :newCart="true" :showIcon="true"></new-shop>
      </router-link>

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
        comprehensive4: -4,
        hospitalId: '',
        hospital: {}
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.hospitalId = this.$route.query.hospitalId;
      this.getRxShops();
      this.getHospital();
    },
    methods: {
      getRxShops() {
        this.$http.get('/rxs/' + this.id + '/shops?lng=' + this.lng + '&lat=' + this.lat)
          .then(res => {
            this.rxShops = res.data;
          });
      },
      getHospital() {
        this.$http.get('/rxs/' + this.id + '/hospitals')
          .then(res => {
            this.hospital = res.data;
          })
        ;
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
    bottom:-0px;
  }
  .unActive {
    color: #d6cfcf !important;
  }
  .blueActive {
    color: #1AB6FD;
  }
  .header-search{
    width:560px;
    height:40px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    border: 0;
    outline: none;
    padding: 0 20px;
  }
  .msg-icon{
    width:31px;
    height:36px;
  }
  .iconfont{
    width:0px!important;
    height:0px!important;
   }

  .ic-dianhua{
    font-size: 360px!important;
  }
  .rxs-shop-contanier{
    width: 720px;
    max-width: 720px;
  }
  .head-ul li span{
    font-size: 24px;
  }

</style>
