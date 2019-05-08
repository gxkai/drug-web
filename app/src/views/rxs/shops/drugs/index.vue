<template>
  <div>
    <new-layout>
      <template slot="center">
        <van-collapse v-model="activeNames">
          <div v-for="(drug, index) in drugs" :key="index">
            <new-white-space />
            <drug-wrapper :item="carts[index]" />
            <van-collapse-item :name="index + ''" class="origin-wrapper">
              <div slot="title" class="title">
                <van-icon name="yaodian-" size="0.44rem" /><span>{{
                  `${drugs[index].drugs.length}个厂商报价`
                }}</span>
              </div>
              <ul>
                <li
                  v-for="origin in drugs[index].drugs"
                  :key="origin.shopDrugId"
                  class="hairline-bottom"
                  @click="choose(origin, index)"
                >
                  <div class="left">
                    <new-radio
                      :radio="origin.shopDrugId === carts[index].shopDrugId"
                      size=".35rem"
                    />
                  </div>
                  <div class="center">
                    <span>
                      {{ origin.originName }}
                    </span>
                  </div>
                  <div class="right">
                    <span>
                      {{ `￥${origin.price}` }}
                    </span>
                    <span>
                      {{ `(医保报销金额￥${origin.medicaidPrice})` }}
                    </span>
                  </div>
                </li>
              </ul>
            </van-collapse-item>
          </div>
        </van-collapse>
        <footer-wrapper
          :quantity="quantity"
          :amount="amount"
          :total-medicaid-price="totalMedicaidPrice"
        />
      </template>
      <template slot="bottom">
        <van-goods-action style="position: static">
          <van-goods-action-mini-btn
            icon="shop"
            text="药房"
            @click.native="loadPageShopsView(shopId)"
          />
          <van-goods-action-mini-btn
            icon="cart"
            text="购物车"
            @click.native="loadPageCarts"
          />
          <div class="submit-buttons">
            <div @click="createCart()">
              <span>
                加入购物车
              </span>
            </div>
            <div @click="onBuy">
              <span>
                立即购买
              </span>
            </div>
          </div>
        </van-goods-action>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.submit-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  padding: 15px 20px;
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
.origin-wrapper {
  .title {
    span {
      font-size: $size-small;
      margin-left: 10px;
    }
  }
  ul {
    li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 20px;
      padding: 20px 10px;
      div {
        word-break: break-word;
      }
      .center {
        span {
          font-size: $size-mini;
        }
      }
      .right {
        span {
          &:nth-child(1) {
            font-size: $size-mini;
            color: #ff0000;
          }
          &:nth-child(2) {
            font-size: 18px;
            color: $gray;
          }
        }
      }
    }
  }
}
</style>
<script>
import footerWrapper from '@/components/rxs/shops/drugs/footWrapper';
import drugWrapper from '@/components/rxs/shops/drugs/drugWrapper';

export default {
  components: {
    footerWrapper,
    drugWrapper
  },
  data() {
    return {
      rxId: this.$route.query.rxId,
      shopId: this.$route.query.shopId,
      shopName: this.$route.query.shopName,
      drugs: [],
      show: false,
      origins: [],
      index: 0,
      carts: [],
      isActive: true,
      amount: 0,
      quantity: 0,
      totalMedicaidPrice: 0,
      activeNames: ['0']
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.drugs = await this.$http.get(
        `/api/app/rxs/${this.rxId}/shops/${this.shopId}/drugs`
      );
      console.log(this.drugs);
      this.initCart();
    },
    initCart() {
      this.drugs.forEach(drug => {
        this.carts.push({
          accountId: this.account.id,
          shopId: this.shopId,
          rxId: this.rxId,
          drugId: drug.drugs[0].drugId,
          shopDrugId: drug.drugs[0].shopDrugId,
          name: drug.name,
          spec: drug.spec,
          usage: drug.usage,
          dosage: drug.dosage,
          price: drug.drugs[0].price,
          quantity: drug.quantity,
          fileId: drug.drugs[0].fileId,
          otc: drug.otc,
          originName: drug.drugs[0].originName,
          rxItemId: drug.rxItemId,
          medicaidPrice: drug.drugs[0].medicaidPrice
        });
        this.totalMedicaidPrice += drug.drugs[0].medicaidPrice;
      });
      this.carts.forEach(e => {
        this.amount += e.price * e.quantity;
        this.quantity += e.quantity;
      });
      console.log(this.totalMedicaidPrice);
    },
    choose(origin, index) {
      this.carts[index] = Object.assign(this.carts[index], origin);
      this.amount = 0;
      this.quantity = 0;
      this.totalMedicaidPrice = 0;
      this.totalMedicaidPrice += origin.medicaidPrice;
      this.carts.forEach(e => {
        this.amount += e.price * e.quantity;
        this.quantity += e.quantity;
      });
    },
    async createCart() {
      await this.$http.post('/api/app/carts', this.carts);
      this.$toast('加入成功');
    },
    async onBuy() {
      let json = {
        rxId: this.rxId,
        shopId: this.shopId,
        items: this.carts
      };
      const shopDrugOrderDTO = await this.$http.post(
        '/api/app/orders/shop/preClose',
        json
      );
      this.loadPageOrdersCreateFromShop(shopDrugOrderDTO);
    }
  }
};
</script>
