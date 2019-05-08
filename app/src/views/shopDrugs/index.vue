<template>
  <div>
    <new-layout>
      <template slot="center">
        <van-tabs v-model="active">
          <van-tab title="商品">
            <component is="goods" :shop-drug="shopDrug" :active.sync="active"/>
          </van-tab>
          <van-tab title="详情">
            <component is="info" :shop-drug="shopDrug" />
          </van-tab>
          <van-tab title="评价">
            <new-white-space />
            <component is="appraise" :shop-drug="shopDrug" />
          </van-tab>
        </van-tabs>
      </template>
      <template slot="bottom">
        <van-goods-action style="position: sticky">
          <van-goods-action-mini-btn icon="chat" text="咨询" @click="onChat" />
          <van-goods-action-mini-btn icon="cart" text="购物车" to="/carts" />
          <van-goods-action-mini-btn
            :style="{ color: collected === true ? 'red' : '' }"
            icon="pingjia-1"
            text="收藏"
            @click="onCollect"
          />
          <div class="submit-buttons">
            <div
              :style="{
                backgroundColor:
                  shopDrug.otc === true && shopDrug.stock > 0
                    ? '#f02b2b'
                    : 'gray'
              }"
              @click="onShow(0)"
            >
              <span>
                加入购物车
              </span>
            </div>
            <div
              :style="{
                backgroundColor:
                  shopDrug.otc === true && shopDrug.stock > 0
                    ? '#f0912b'
                    : 'gray'
              }"
              @click="onShow(1)"
            >
              <span>
                立即购买
              </span>
            </div>
          </div>
        </van-goods-action>
      </template>
    </new-layout>
    <popup :type="type" :item="shopDrug" v-model="show" />
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.submit-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  padding: 15px 20px;
  background-color: white;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(1) {
      background-color: #f02b2b;
      border-radius: 20px 0 0 20px;
    }
    &:nth-child(2) {
      background-color: #f0912b;
      border-radius: 0 20px 20px 0;
    }
    span {
      color: white;
    }
  }
}
/deep/ .van-tabs {
  &__wrap {
    height: 100px !important;
    position: fixed;
  }
  &--line {
    padding-top: 100px;
  }
  .van-tab {
    color: black !important;
    &--active {
      color: $theme !important;
    }
    span {
      line-height: 100px !important;
      font-size: $size-large !important;
    }
  }
}
</style>
<script>
import appraise from '@/components/shopDrugs/appraise';
import info from '@/components/shopDrugs/info';
import goods from '@/components/shopDrugs/goods';
import popup from '@/components/shopDrugs/popup';
export default {
  components: {
    appraise,
    info,
    popup,
    goods
  },
  data() {
    return {
      shopDrug: {
        shopTotalAppraise: {},
        drugAppraises: {
          list: []
        },
        origin: {}
      },
      show: false,
      type: 0,
      number: 1,
      collected: false,
      loading: false,
      shopDrugId: this.$route.query.shopDrugId,
      active: 0
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    onShow(type) {
      if (this.shopDrug.otc && this.shopDrug.stock > 0) {
        this.show = true;
        this.type = type;
      }
      if (this.shopDrug.otc === false) {
        switch (type) {
          case 0:
            this.$toast('处方药无法加入购物车');
            break;
          case 1:
            this.$toast('处方药无法立即购买');
            break;
          default:
            break;
        }
      } else if (this.shopDrug.stock === 0) {
        switch (type) {
          case 0:
            this.$toast('库存不足，无法加入购物车');
            break;
          case 1:
            this.$toast('库存不足，无法立即购买');
            break;
          default:
            break;
        }
      }
    },
    onChat() {
      this.$dialog
        .confirm({ message: `打电话给${this.shopDrug.phone}` })
        .then(() => {
          window.location.href = `tel:${this.shopDrug.phone}`;
        })
        .catch(() => {});
    },
    async initData() {
      this.shopDrug = await this.$http.get(`/api/app/shopDrugs/${this.shopDrugId}`);
      console.log(this.shopDrug);
      this.collected = await this.$http.get(
        `/api/app/collects/drug/one?shopDrugId=${this.shopDrugId}`
      );
    },
    async onCollect() {
      let data = {
        shopId: this.shopDrug.shopId,
        drugId: this.shopDrug.drugId,
        shopDrugId: this.shopDrug.id,
        collected: !this.collected
      };
      this.$toast.loading({ duration: 0, forbidClick: true });
      await this.$http.post('/api/app/collects/drug', data);
      this.collected = !this.collected;
      if (this.collected) {
        this.$toast('收藏成功');
      } else {
        this.$toast('取消收藏成功');
      }
    }
  }
};
</script>
