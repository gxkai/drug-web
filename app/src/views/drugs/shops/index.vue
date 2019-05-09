<template>
  <div>
    <popup-spec
      v-model="showSpecs"
      :drug-info="info"
      :drug-specs="drugSpecs"
      :drug-spec.sync="drugSpec"
    />
    <popup-cart v-model="show" :item="shopDrug" />
    <new-layout>
      <template slot="center">
        <new-white-space />
        <new-drug
          :item="drugSpec"
          :info="info"
          disabled
          @click.native="onSpec"
        />
        <attention-wrapper :content="`适应症:${info.introduce}`" />
        <new-white-space />
        <van-tabs v-model="active">
          <van-tab title="商家报价">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="shop-wrapper"
              @click="loadPageShopDrugs(item.shopDrugId)"
            >
              <new-white-space />
              <header>
                <div class="left">
                  <van-icon name="yaodian-" size=".46rem" />
                  <span>
                    {{ item.name }}
                  </span>
                </div>
                <div class="right">
                  <span>
                    {{ `￥${item.price}` }}
                  </span>
                </div>
              </header>
              <div class="line1">
                <van-icon name="dingwei-" color="#d7000e" />
                <span>
                  {{ item.address }}
                </span>
              </div>
              <div class="line2">
                <span v-show="item.distribution === true" class="tag">
                  可配送
                </span>
                <span class="tag">
                  可自提
                </span>
                <span>
                  {{ `距离当前位置：${item.distance}km` }}
                </span>
              </div>
              <div class="cart-icon" @click.stop="goCar(item)">
                <van-icon name="gouwuche-" color="#d7000e" />
              </div>
            </div>
          </van-tab>
          <van-tab title="商品信息">
            <new-white-space />
            <info-wrapper :item="info" />
          </van-tab>
          <van-tab title="注意事项">
            <attention-wrapper :content="info.attention" />
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
</style>
<script>
import infoCell from '@/components/drugs/shops/infoCell';
import infoWrapper from '@/components/drugs/shops/infoWrapper';
import attentionWrapper from '@/components/drugs/shops/attentionWrapper';
import popupCart from '@/components/shopDrugs/popup';
import popupSpec from '@/components/drugs/shops/popupSpec';
export default {
  components: {
    infoCell,
    popupCart,
    popupSpec,
    infoWrapper,
    attentionWrapper
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
  mounted() {},
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
      const data = await this.$http.get(`/api/app/drugs/${this.drugId}`);
      console.log(data)
      this.info = data; // 药品详情商品信息
      let str = this.info.attention
      let reg = /^[1-9]+[0-9]*]*$/
      // str = str.replace(/[0-9]/g, '|')
      for (let i = 0; i < str.length; i++) {
        if (reg.test(str[i]) && reg.test(str[i + 1])) {
          // console.log(reg.test(str[i]))
          str.replace(i, '|')
        }
      }
      console.log(str)

      this.drugSpecs = data.drugSpecs;
      this.drugSpec = this.drugSpecs[0];
      this.getShops();
    },
    async getShops() {
      const data = await this.$http.get(
        `/api/app/drugs/${this.drugId}/shops?sort=${this.sort}&lat=${
          this.currentAddress.lat
        }&lng=${this.currentAddress.lng}`
      );
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
