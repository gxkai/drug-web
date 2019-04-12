<template>
  <div>
    <popup-spec v-model="showSpecs" :drugInfo="info" :drugSpecs="drugSpecs" :drugSpec.sync="drugSpec"/>
    <popup-cart v-model="show" :item="shopDrug"/>
    <new-layout>
      <template slot="center">
        <new-white-space/>
        <new-drug :item="drugSpec" @click.native="onSpec" :info="info" disabled/>
        <div class="introduction-wrapper">
          {{`适应症:${info.introduce}`}}
        </div>
        <new-white-space/>
        <van-tabs v-model="active">
          <van-tab title="商家报价">
            <div v-for="(item,index) in list" :key="index" class="shop-wrapper" @click="loadPageShopDrugs(item.shopDrugId)">
              <new-white-space/>
              <header>
                <div class="left">
                  <van-icon name="yaodian-" size=".46rem"/>
                  <span>
                  {{item.name}}
                </span>
                </div>
                <div class="right">
                <span>
                  {{`￥${item.price}`}}
                </span>
                </div>
              </header>
              <div class="line1">
                <van-icon name="dingwei-" color="#d7000e"/>
                <span>
                {{item.address}}
              </span>
              </div>
              <div class="line2">
              <span class="tag" v-show="item.distribution === true">
                可配送
              </span>
                <span class="tag">
                可自提
              </span>
                <span>
                {{`距离当前位置：${item.distance}km`}}
              </span>
              </div>
              <div class="cart-icon" @click.stop="goCar(item)">
                <van-icon name="gouwuche-" color="#d7000e"/>
              </div>
            </div>
          </van-tab>
          <van-tab title="商品信息">
            <new-white-space/>
            <info-cell title="商品名称" :desc="info.name"/>
            <info-cell title="品牌名称" :desc="info.brandName"/>
            <info-cell title="拼音名称" :desc="info.pinyinName"/>
            <info-cell title="英文名称" :desc="info.enName"/>
            <info-cell title="国药准字" :desc="info.sfda"/>
            <info-cell title="有效期" :desc="info.validity"/>
          </van-tab>
          <van-tab title="注意事项">
            <div class="attention-wrapper">
              {{info.attention}}
            </div>
          </van-tab>
        </van-tabs>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .shop-wrapper {
    position: relative;
    .cart-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }
    header {
      padding: 10px 15px;
      background-color: white;
      display: grid;
      grid-template-columns: 1fr auto;
      .left {
        span {
          font-size: $size-large;
          color: #010000;
        }
      }
      .right {
        span {
          font-size: $size-small;
          color: #ff0000;
        }
      }
    }
    .line1 {
      padding: 10px 60px;
      background-color: white;
      span {
        font-size: $size-small;
        color: $gray;
      }
    }
    .line2 {
      background-color: white;
      padding: 20px 60px;
      span {
        margin-left: 10px;
        font-size: $size-mini;
        color: $gray;
      }
      .tag {
        border-radius: 7px;
        border: solid 1px $theme;
        color: $theme;
        padding: 5px;
      }
    }
  }

  /deep/ .van-tabs {
    &__wrap {
      height: 100px !important;
    }
    &--line {
      padding-top: 100px;
    }
    .van-tab {
      color: $gray-light !important;
      &--active {
        color: $theme !important;
      }
      span {
        line-height: 100px !important;
        font-size: $size-small !important;
      }
    }
  }
  /deep/ .van-tag {
    font-size: 20px!important;
    padding: 5px 10px;
    margin-left: 10px;
  }

  /deep/ .van-radio .van-icon-checked {
    color: $theme!important;
  }
  .introduction-wrapper,.attention-wrapper {
    font-size: $size-mini;
    color: $gray-light;
    background-color: white;
    padding: 24px 40px;
  }
</style>
<script>
  import infoCell from '@/components/drugs/shops/infoCell';
  import popupCart from '@/components/shopDrugs/popup';
  import popupSpec from '@/components/drugs/shops/popupSpec';
  export default {
    components: {
      infoCell,
      popupCart,
      popupSpec
    },
    data() {
      return {
        list: [],
        info: [],
        drugSpecs: [],
        drugSpec: {},
        drugId: this.$route.query.drugId,
        showSpecs: false,
        sort: 'SYNTHESIZE',
        show: false,
        active: 0,
        shopDrug: {}
      };
    },
    watch: {
      drugSpec(value) {
        this.getShops();
      }
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      goCar(item) {
        if (this.info.otc && item.stock > 0) {
          this.show = true;
          item.logo = this.drugSpec.logo;
          this.shopDrug = item;
        } else if (!this.info.otc) {
          this.$toast('处方药无法加入购物车');
        } else if (item.stock === 0) {
          this.$toast('库存不足，无法加入购物车');
        }
      },
      async initData() {
        const data = await this.$http.get(`/api/drugs/${this.drugId}`);
        this.info = data;
        this.drugSpecs = data.drugSpecs;
        this.drugSpec = this.drugSpecs[0];
        this.getShops();
      },
      async getShops() {
        const data = await this.$http.get(`/api/drugs/${this.drugId}/shops?sort=${this.sort}&lat=${this.currentAddress.lat}&lng=${this.currentAddress.lng}`);
        this.list = data.list;
      },
      onSpec() {
        if (this.drugSpecs.length > 1) {
          this.showSpecs = true;
        }
      }
    }
  };
</script>
