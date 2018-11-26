<template>
  <new-layout class="shops"
  centerColor="white"
  >
    <template slot="top">
      <div class="shops-header">
        <new-header>
          <div slot="left" @click="$router.go(-1)">
            <i class="iconfont ic-arrow-right"></i>
          </div>
          <div slot="center">
            <input class="iconfont" :placeholder="searchIcon" @focus="$router.push('/drugs')">
          </div>
        </new-header>
      </div>
      <div class="shops-filter">
        <div class="shops-filter-item" @click="orderById()">
          <div class="shops-filter-item-text">
            综合
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:sort === 'ID_DESC'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderByDistance()">
          <div class="shops-filter-item-text">
            距离
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:sort === 'DISTANCE_ASC'? '#13C1FE': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:sort === 'DISTANCE_DESC'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderByScore()">
          <div class="shops-filter-item-text">
            评价
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:sort === 'SCORE_ASC'? '#13C1FE': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:sort === 'SCORE_DESC'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderByPrice()">
          <div class="shops-filter-item-text">
            价格
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:sort === 'PRICE_ASC'? '#13C1FE': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:sort === 'PRICE_DESC'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="shops-container"
         slot="center">
      <!--<div @click="linkToRxShopDrug(rxId, hospital.id, hospital.name, 'HOSPITAL')">-->
        <!--<new-rx-hospital-item :item="hospital"/>-->
      <!--</div>-->
      <div
        v-for="(rxShop,index) in rxShops"
        :key="index"
        @click="linkToRxShopDrug(rxId,rxShop.id,rxShop.name, rxShop.type)">
        <new-rx-shop-item
          :item="rxShop">
        </new-rx-shop-item>
      </div>
    </div>
  </new-layout>
</template>

<script>
  import { getReceivedPosition } from '../../../assets/js/auth';

  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
        rxShops: [],
        hospitalId: this.$route.query.hospitalId,
        hospital: {},
        searchIcon: '\ue64c 药品名',
        sort: 'ID_DESC'
      };
    },
    computed: {
      position() {
        return getReceivedPosition().position;
      }
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        this.getRxShops();
        // this.getHospital();
      },
      async getRxShops() {
        this.rxShops = await this.$http.get(`/rxs/${this.rxId}/shops?lng=${this.position.lng}&lat=${this.position.lat}`);
      },
      async getHospital() {
        this.hospital = await this.$http.get(`/rxs/${this.rxId}/hospital`);
      },
      orderById() {
        this.rxShops = this.rxShops.sort((a, b) => a.id - b.id);
      },
      orderByDistance() {
        if (this.sort === 'DISTANCE_DESC') {
          this.sort = 'DISTANCE_ASC';
          this.rxShops = this.rxShops.sort((a, b) => a.distance - b.distance);
        } else {
          this.sort = 'DISTANCE_DESC';
          this.rxShops = this.rxShops.sort((a, b) => b.distance - a.distance);
        }
      },
      orderByScore() {
        if (this.sort === 'SCORE_DESC') {
          this.sort = 'SCORE_ASC';
          this.rxShops = this.rxShops.sort((a, b) => a.score - b.score);
        } else {
          this.sort = 'SCORE_DESC';
          this.rxShops = this.rxShops.sort((a, b) => b.score - a.score);
        }
      },
      orderByPrice() {
        if (this.sort === 'PRICE_DESC') {
          this.sort = 'PRICE_ASC';
          this.rxShops = this.rxShops.sort((a, b) => a.amount - b.amount);
        } else {
          this.sort = 'PRICE_DESC';
          this.rxShops = this.rxShops.sort((a, b) => b.amount - a.amount);
        }
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .shops {
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
            &::placeholder {
              text-align: center;
            }
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
            border-bottom-color: gray;
            width: 0;
            height: 0;
          }
          &-down {
            border: 7px solid white;
            border-top-color: gray;
            width: 0;
            height: 0;
            margin-top: 2px;
          }
        }
      }
    }
  }
</style>
