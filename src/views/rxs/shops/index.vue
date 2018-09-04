<template>
  <div class="shops">
    <div class="shops-header" ref="header">
      <new-header>
        <div slot="left" @click="$router.go(-1)">
          <i class="iconfont ic-arrow-right"></i>
        </div>
        <div slot="center">
          <input v-model="keyword" class="iconfont" :placeholder="searchIcon" @focus="$router.push('/shops')">
        </div>
      </new-header>
    </div>
    <div class="shops-filter" ref="filter">
      <div class="shops-filter-item" @click="orderById()">
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
      <div class="shops-filter-item" @click="orderByDistance()">
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
      <div class="shops-filter-item" @click="orderByScore()">
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
      <div class="shops-filter-item" @click="orderByPrice()">
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
    <div class="shops-container" ref="body">
      <div @click="$router.push({path:'/orders/create/fromHospital',query:{rxId:rxId}})">
        <new-rx-hospital-item :item="hospital"/>
      </div>
      <div
        v-for="(rxShop,index) in rxShops"
        :key="index"
        @click.stop="$router.push({path: '/rxs/shops/drugs', query: {rxId: rxId, shopId: rxShop.id, shopName: rxShop.name}});">
        <new-rx-shop-item
          :item="rxShop">
        </new-rx-shop-item>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
        rxShops: [],
        position: this.$store.getters.position,
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
        hospital: {},
        keyword: '',
        searchIcon: '\ue64c 药品名'
      };
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.filter.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    },
    created() {
      this.getRxShops();
      this.getHospital();
    },
    methods: {
      getRxShops() {
        this.$http.get('/rxs/' + this.rxId + '/shops?lng=' + this.position.lng + '&lat=' + this.position.lat)
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
  }

  .border-bottom-grey {
    border-bottom: 1px #f3f3f3 solid;
  }
</style>
