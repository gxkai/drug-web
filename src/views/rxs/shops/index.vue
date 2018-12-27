<template>
  <new-layout class="shops"
              centerColor="white"
  >
    <template slot="top">
      <div class="shops-header drugs">


        <!--
         <new-header>
                  <div slot="left" @click="$router.go(-1)">
                    <i class="iconfont ic-arrow-right"></i>
                  </div>
                  <div slot="center">
                    <input class="iconfont" :placeholder="searchIcon" @focus="$router.push('/drugs')">
                  </div>
            </new-header>
        -->


        <div class="drugs-header">
          <van-icon name="arrow-left" class="drugs-header__left" size="2.5em" color="white" @click="$router.go(-1)"></van-icon>
          <input class="iconfont drugs-header__input" v-model="drugName" :placeholder="searchIcon">
          <van-icon name="sousuo" class="drugs-header__right" size="3em" color="white" @click="search(drugName)"></van-icon>
        </div>







      </div>
      <div class="shops-filter">
        <!--   <div class="shops-filter-item" @click="orderById()">
             <div class="shops-filter-item-text">
               综合
             </div>
             <div class="shops-filter-item-arrow">
               <div class="shops-filter-item-arrow-up">
               </div>
               <div class="shops-filter-item-arrow-down"
                    :style="{borderTopColor:sort === 'ID_DESC'? '#F60000': 'gray'} ">
               </div>
             </div>
           </div>-->
        <div class="shops-filter-item" @click="orderByPrice()">
          <div class="shops-filter-item-text">
            价格
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:sort === 'PRICE_ASC'? '#F60000': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:sort === 'PRICE_DESC'? '#F60000': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderByDistance()">
          <div class="shops-filter-item-text">
            距离最近
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:sort === 'DISTANCE_ASC'? '#F60000': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:sort === 'DISTANCE_DESC'? '#F60000': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="shops-filter-item" @click="orderByScore()">
          <div class="shops-filter-item-text">
            好评优先
          </div>
          <div class="shops-filter-item-arrow">
            <div class="shops-filter-item-arrow-up"
                 :style="{borderBottomColor:sort === 'SCORE_ASC'? '#F60000': 'gray'} ">
            </div>
            <div class="shops-filter-item-arrow-down"
                 :style="{borderTopColor:sort === 'SCORE_DESC'? '#F60000': 'gray'} ">
            </div>
          </div>
        </div>

      </div>
    </template>
    <div class="shops-container"
         slot="center">
      <div @click="toQyPayUrl()" v-if="hospital !== null">
        <new-rx-hospital-item :item="hospital"/>
      </div>
      <div v-show="rxShopsOneshow"
           v-for="(rxShop,index) in rxShops"
           :key="index"
           @click="linkToRxShopDrug(rxId,rxShop.id,rxShop.name, rxShop.type)">
        <new-rx-shop-item
          :item="rxShop">
        </new-rx-shop-item>
      </div>


      <div v-show="rxShopsTwoshow"
           v-for="(rxShop,index) in rxShopsTwo"
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
  import { getCurrentAddress } from '@/storage';

  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
        rxShops: [],
        rxShopsTwo: [],
        rxShopsOneshow: true,
        rxShopsTwoshow: false,
        hospitalId: this.$route.query.hospitalId,
        hospital: null,
        searchIcon: '药品名',
        sort: 'ID_DESC',
        drugName: '',
        position: getCurrentAddress()
      };
    },
    computed: {
    },
    created() {
      this.initData();
    },
    methods: {
      async toQyPayUrl() {
        let url = await this.$http.get(`/hospitals/${this.hospitalId}/url`);
        window.location.href = url;
        // this.$toast('暂未开放');
      },
      initData() {
        this.getRxShops();
        this.getHospital();
      },
      search(drugName) {
        this.rxShopsTwoshow = true;
        this.rxShopsOneshow = false;
        this.rxShopsTwo = this.rxShops.filter(s => s.name.includes(drugName));
      },
      async getRxShops() {
        this.rxShops = await this.$http.get(`/rxs/${this.rxId}/shops?lng=${this.position.lng}&lat=${this.position.lat}`);
      },
      async getHospital() {
        this.hospital = await this.$http.get(`/rxs/${this.rxId}/hospital?lng=${this.position.lng}&lat=${this.position.lat}`);
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
        this.$toast('加载中');
        if (this.sort === 'SCORE_DESC') {
          this.sort = 'SCORE_ASC';
          this.rxShops = this.rxShops.sort((a, b) => a.score - b.score);
        } else {
          this.sort = 'SCORE_DESC';
          this.rxShops = this.rxShops.sort((a, b) => b.score - a.score);
        }
        this.$toast.clear();
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

<style scoped type="text/scss" lang="scss">
  .drugs{
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      background-color: #F60000;
      padding: 0 20px;
      &__left {

      }
      &__input {
        width: 500px;
        height: 45px;
        outline: none;
        border-width: 0;
        font-size: 30px;
        color: black;
        border-radius: 10PX;
        padding: 0 20px;
        &::placeholder {
          text-align: center;
        }
      }

    }
  }
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
