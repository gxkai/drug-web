<template>
  <div>
    <new-layout>
      <template slot="center">
        <van-collapse v-model="activeNames">
        <div v-for="(drug,index) in drugs" :key="index">
          <new-white-space/>
          <div class="drug-wrapper">
            <div class="left">
              <img v-lazy="getImgURL(carts[index].fileId, 'LARGE_LOGO')"/>
            </div>
            <div class="right">
              <div class="line1">
                <span>名称：</span>
                <span>{{carts[index].name}}</span>
              </div>
              <div class="line1">
                <span>用量：</span>
                <span>{{carts[index].dosage}}</span>
              </div>
              <div class="line1">
                <span>厂商：</span>
                <span>{{carts[index].originName}}</span>
              </div>
              <div class="line2">
                <span>{{`￥${carts[index].price}`}}</span>
                <span>{{`(医保报销金额￥${carts[index].medicaidPrice})`}}</span>
              </div>
            </div>
          </div>
          <van-collapse-item :name="index+''" class="origin-wrapper">
            <div slot="title" class="title"><van-icon name="yaodian-" size="0.44rem"/><span>{{`${drugs[index].drugs.length}个厂商报价`}}</span></div>
            <ul>
              <li
                v-for="origin in drugs[index].drugs"
                :key="origin.shopDrugId"
                class="hairline-bottom"
                @click="choose(origin,index)"
              >
                <div class="left">
                  <new-radio :radio="origin.shopDrugId===carts[index].shopDrugId" size=".35rem"/>
                </div>
                <div class="center">
                  <span>
                    {{origin.originName}}
                  </span>
                </div>
                <div class="right">
                  <span>
                    {{`￥${origin.price}`}}
                  </span>
                  <span>
                    {{`(医保报销金额￥${origin.price})`}}
                  </span>
                </div>
              </li>
            </ul>
          </van-collapse-item>
        </div>
        </van-collapse>
        <footer>
          <div class="left">
            <van-icon name="qian-" color="#ef1010" size=".8rem"/>
          </div>
          <div class="right">
            <div class="line1">
              <span>
              {{`${quantity}件商品：共计`}}
            </span>
              <span>
              {{`￥${amount}`}}
            </span>
              <span>
              {{`医保报销￥${totalMedicaidPrice}`}}
            </span>
            </div>
            <div class="line2">
              <span>
                （实际医保报销金额，请以提交订单显示为准）
              </span>
            </div>
          </div>
        </footer>
      </template>
      <template slot="bottom">
        <van-goods-action style="position: static">
          <van-goods-action-mini-btn icon="shop" text="药房" @click.native="loadPageShopsView(shopId)"/>
          <van-goods-action-mini-btn icon="cart" text="购物车" @click.native="loadPageCarts"/>
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
  footer {
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: white;
    padding: 20px 10px;
    grid-column-gap: 10px;
    .right {
      .line1 {
        span {
          font-size: $size-mini;
          &:nth-child(1) {
            color: #010000;
          }
          &:nth-child(2) {
            color: #ff0011;
          }
          &:nth-child(3) {
            color: $gray-light;
          }
        }
      }
      .line2 {
        margin-top: 10px;
        span {
          font-size: 18px;
        }
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
  .drug-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    background-color: white;
    padding: 10px 15px;
    align-items: center;
    .left {
      img {
        width: 230px;
        height: 190px;
      }
    }
    .right {
      display: grid;
      grid-row-gap: 10px;
      .line1 {
        display: grid;
        grid-template-columns: auto 1fr;
        span {
          word-break: break-word;
          font-size: $size-mini;
        }
      }
      .line2 {
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
</style>
<script>
  export default {
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
    computed: {
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.drugs = await this.$http.get(`/api/rxs/${this.rxId}/shops/${this.shopId}/drugs`);
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
        await this.$http.post('/api/carts', this.carts);
        this.$toast('加入成功');
      },
      async onBuy() {
        let json = {
          'rxId': this.rxId,
          'shopId': this.shopId,
          'items': this.carts
        };
        const shopDrugOrderDTO = await this.$http.post('/api/orders/shop/preClose', json);
        this.loadPageOrdersCreateFromShop(shopDrugOrderDTO);
      }
    }
  };
</script>
