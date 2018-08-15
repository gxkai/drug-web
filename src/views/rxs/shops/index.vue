<template>
  <div class="rxs-shop-contanier">
    <div ref="header">
    <new-header>
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
      <input slot="center" class="header-search" @click="$router.push('/drugs/search')" placeholder="通用名、商品名、症状" type="text">
    </new-header>

    <ul class="is-flex flex-row flex-sa p-tb-20 all-border">
      <li @click="orderById()" :class="{'blueactive1':index1===comprehensive1}">
        <span class="text-l-25">综合</span>
      </li>
      <li @click="orderByDistance()" :class="{'blueactive1':index2===comprehensive2}">
        <span class="text-l-25">距离最近</span>
      </li>
      <li @click="orderByScore()" :class="{'blueactive1':index3===comprehensive3}">
        <span class="text-l-25">好评优先</span>
      </li>
      <li @click="orderByPrice()" class="is-flex flex-row " :class="{'blueactive1':index4===comprehensive4}">
        <span class="text-l-25">价格</span>
        <div class="is-flex  position-relative">
          <i class="iconfont ic-arrLeft-fill1 position-absolute position-top"
             :class="val===1?'unActive':'blueActive'"></i>
          <i class="iconfont ic-arrLeft-fill position-absolute position-bottom"
             :class="val===1?'blueActive':'unActive'"></i>
        </div>
      </li>
    </ul>
    </div>
    <ul ref="body">
      <li @click="$router.push({path:'/orders/create/fromHospital',query:{rxId:rxId}})">
        <new-shop :showStar="false"
                  :fileId="hospital.fileId"
                  :shopName="hospital.name"
                  :phone="hospital.phone"
                  :address="hospital.address"
                  :price="hospital.amount"
                  :newCart="true"
                  :showIcon="true"
                  >
        </new-shop>
      </li>

      <li v-for="(rxShop,index) in rxShops"
          :key="index"
          @click.stop="$router.push({path: '/rxs/shops/drugs', query: {rxId: rxId, shopId: rxShop.id, shopName: rxShop.name}});"
          >
        <new-shop :showStar="true" :fileId="rxShop.fileId" :newScore="rxShop.score" :shopName="rxShop.name"
                  :phone="rxShop.tel"
                  :address="rxShop.area + rxShop.address" :price="rxShop.amount" :newCart="true"></new-shop>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
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
        hospitalId: this.$route.query.hospitalId,
        hospital: {}
      };
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    },
    created() {
      this.getRxShops();
      this.getHospital();
    },
    methods: {
      getRxShops() {
        this.$http.get('/rxs/' + this.rxId + '/shops?lng=' + this.lng + '&lat=' + this.lat)
          .then(res => {
            this.rxShops = res.data;
          }).catch(error => {
            this.exception(error);
          });
      },
      getHospital() {
        this.$http.get('/rxs/' + this.rxId + '/hospitals')
          .then(res => {
            this.hospital = res.data;
          }).catch(error => {
            this.exception(error);
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

<style scoped>
  .flex-row {
    flex-direction: row;
  }

  .flex-sa {
    justify-content: space-around;
  }

  .p-tb-20 {
    padding: 20px 0;
    box-sizing: border-box;
  }

  .all-border {
    border: 1px #f5f5f5 solid;
  }

  .position-top {
    top: -6px;
  }

  .position-bottom {
    bottom: -8px;
  }

  .unActive {
    color: #d6cfcf !important;
  }

  .blueActive {
    color: #1AB6FD;
  }

  .header-search {
    width: 560px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 0;
    outline: none;
    padding: 0 20px;
    font-size: 20px;
  }

  .msg-icon {
    width: 31px;
    height: 36px;
  }

</style>
