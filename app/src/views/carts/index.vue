<template>
  <new-layout>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <div
            v-for="(cartShop, cartShopIndex) in list"
            :key="cartShopIndex"
            class="cart"
          >
            <div class="shop">
              <div
                v-for="(cartRx, cartRxIndex) in cartShop.rxs"
                :key="cartRxIndex"
                class="rx"
              >
                <header
                  class="hairline-bottom rx-header"
                  @click="loadPageShopsView(cartShop.id)"
                >
                  <div class="left">
                    <new-radio
                      :radio="cartRx.radio"
                      size=".5rem"
                      @click.native.stop="onRadio(RX, cartShop, cartRx)"
                    />
                  </div>
                  <div class="center">
                    <van-icon name="yaodian-" size="0.5rem" />
                    <span>
                      {{ cartShop.shopName }}
                    </span>
                    <van-icon name="arrow" />
                  </div>
                  <div
                    v-if="isRx(cartRx.rxId)"
                    class="right"
                    @click.stop="loadPageRxsView(cartRx.rxId, true)"
                  >
                    <van-icon name="chufang-" size="0.5rem" />
                  </div>
                </header>
                <van-swipe-cell
                  v-for="(cartDrug, cartDrugIndex) in cartRx.drugs"
                  :key="cartDrug.cartId"
                  :right-width="100"
                  @click-right="
                    onRemove(
                      cartShop,
                      cartShopIndex,
                      cartRx,
                      cartRxIndex,
                      cartDrug,
                      cartDrugIndex
                    )
                  "
                >
                  <span slot="right">
                    删除
                  </span>
                  <div class="drug">
                    <div class="left">
                      <new-radio
                        :radio="cartDrug.radio"
                        size=".5rem"
                        @click.native.stop="
                          onRadio(DRUG, cartShop, cartRx, cartDrug)
                        "
                      />
                    </div>
                    <div class="right" @click="loadPageShopDrugs(cartDrug.id)">
                      <new-image
                        :url="getImgURL(cartDrug.fileId, 'LARGE_LOGO')"
                        :rx="!cartDrug.otc"
                        size="small"
                      />
                      <div class="wrapper">
                        <div class="line line1">
                          <span>
                            {{ cartDrug.name }}
                          </span>
                        </div>
                        <div class="line line2">
                          <span>
                            {{ `规格：${cartDrug.spec}` }}
                          </span>
                        </div>
                        <div class="line line2">
                          <span>
                            {{ `国药准字：${cartDrug.sfda}` }}
                          </span>
                        </div>
                        <div class="line line3">
                          <span class="price">
                            {{ `￥${cartDrug.price}` }}
                          </span>
                          <span v-if="isRx(cartRx.rxId)" class="quantity">
                            {{ `x${cartDrug.quantity}` }}
                          </span>
                          <new-stepper
                            v-else
                            v-model="cartDrug.quantity"
                            @change="changeQuantity(cartDrug, cartShop)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </van-swipe-cell>
              </div>
              <div class="submit-bar">
                <div class="left van-ellipsis">
                  <span class="text">
                    合计
                  </span>
                  <span class="price van-ellipsis">
                    {{ `￥${cartShop.allPrice}` }}
                  </span>
                </div>
                <div class="right" @click="onOrder(cartShop)">
                  <span>
                    {{ `结算(${cartShop.allQuantity})` }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <new-end
            v-if="finished === true"
            :name="list.length > 0 ? 'END' : 'NONE'"
          />
        </van-list>
      </van-pull-refresh>
    </template>
    <template slot="bottom">
      <new-footer-entry :value="3" />
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
/deep/ .van-swipe-cell__right {
  width: 100px !important;
  height: 100%;
  background: #ff7ea9;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: $size-small;
    color: white;
  }
}
.cart {
  width: 690px;
  border-radius: 10px;
  margin: 10px auto 0;
  .submit-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 20px 0;
    .left {
      .text {
        color: #454545;
        font-size: 20px;
      }
      .price {
        color: #f02b2b;
      }
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
    }
    .right {
      background-color: $theme;
      border-radius: 20px;
      padding: 5px 15px;
      span {
        color: white;
      }
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .shop {
    width: 100%;
    .shop-header {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 10px;
      padding: 10px;
    }
    .rx-header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 20px;
      padding: 10px;
      .center {
        display: flex;
        align-items: center;
        .van-icon {
          margin-right: 10px;
        }
      }
    }
    .rx {
      background-color: #ffffff;
      .drug {
        position: relative;
        background-color: white;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-column-gap: 20px;
        padding: 10px;
        .left {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .right {
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr;
          grid-column-gap: 20px;
          .wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .line1 {
            }
            .line2 {
              span {
                font-size: $size-mini;
                color: $gray-light;
              }
            }
            .line3 {
              display: flex;
              justify-content: space-between;
              .price {
                font-size: $size-mini;
                color: #ff0011;
              }
              .quantity {
                font-size: $size-mini;
                color: $gray-dark;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<script>
import list from '@/mixins/list';
export default {
  name: 'Carts',
  components: {},
  mixins: [list],
  data() {
    return {
      chooseAll: false,
      All: 'ALL',
      SHOP: 'SHOP',
      RX: 'RX',
      DRUG: 'DRUG'
    };
  },
  computed: {
    allPrice() {
      let sum = 0;
      this.list.forEach(e => {
        e.rxs.forEach(e => {
          e.drugs.forEach(e => {
            if (e.radio) {
              sum += e.price * e.quantity;
            }
          });
        });
      });
      return sum;
    },
    allQuantity() {
      let sum = 0;
      this.list.forEach(e => {
        e.rxs.forEach(e => {
          e.drugs.forEach(e => {
            if (e.radio) {
              sum += e.quantity;
            }
          });
        });
      });
      return sum;
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      const data = await this.$http.get('/api/carts', this.getParams());
      data.list.forEach(e => {
        e.allPrice = 0;
        e.allQuantity = 0;
        e.radio = false;
        e.rxs.forEach(e => {
          e.radio = false;
          e.drugs.forEach(e => {
            e.radio = false;
          });
        });
      });
      this.pushToList(data.list);
    },
    async changeQuantity(cartDrug, cartShop) {
      await this.$http.put(
        `/api/carts/${cartDrug.cartId}?quantity=${cartDrug.quantity}`
      );
      this.calculate(cartShop);
    },
    /**
     * 单个删除
     */
    onRemove(
      cartShop,
      cartShopIndex,
      cartRx,
      cartRxIndex,
      cartDrug,
      cartDrugIndex
    ) {
      if (cartRx.rxId !== '0') {
        this.$dialog
          .confirm({ message: '改处方单中药品会一起删除' })
          .then(async () => {
            let cartIds = [];
            cartRx.drugs.forEach(e => {
              cartIds.push(e.cartId);
            });
            await this.$http.delete('/api/carts?cartIds=' + cartIds);
            cartShop.rxs.splice(cartRxIndex, 1);
            if (cartShop.rxs.length === 0) {
              this.list.splice(cartShopIndex, 1);
            }
            this.calculate(cartShop);
          });
      } else {
        this.$dialog.confirm({ message: '确定删除？' }).then(async () => {
          await this.$http.delete('/api/carts/' + cartDrug.cartId);
          cartRx.drugs.splice(cartDrugIndex, 1);
          if (cartRx.drugs.length === 0) {
            cartShop.rxs.splice(cartRxIndex, 1);
            if (cartShop.rxs.length === 0) {
              this.list.splice(cartShopIndex, 1);
            }
          }
          this.calculate(cartShop);
        });
      }
    },
    /**
     * 批量删除
     */
    onRemoveBatch() {
      let cartIds = this.getCartIds();
      this.$dialog.confirm({ message: '确定清空购物车?' }).then(async () => {
        const params = {
          cartIds: cartIds
        };
        await this.$http.delete('/api/carts', params);
        this.list = [];
      });
    },
    /**
     * 获取已选购物车ID
     * @returns {Array}
     */
    getCartIds() {
      let cartIds = [];
      this.list.forEach(e => {
        e.rxs.forEach(e => {
          e.drugs.forEach(e => {
            cartIds.push(e.cartId);
          });
        });
      });
      return cartIds;
    },
    /**
     * 获取已选药房购物车ID
     */
    getShopCartIds(cartShop) {
      let cartIds = [];
      let rxDrugNum = 0;
      let nRxDrugNum = 0;
      cartShop.rxs.forEach(rx => {
        rx.drugs.forEach(drug => {
          if (drug.radio) {
            cartIds.push(drug.cartId);
            if (rx.rxId === '0') {
              rxDrugNum++;
            } else {
              nRxDrugNum++;
            }
          }
        });
      });
      if (rxDrugNum > 0 && nRxDrugNum > 0) {
        this.$toast('处方单药品和非处方单药品不能同时结算');
        return;
      }
      return cartIds;
    },
    /**
     * 订单结算
     */
    async onOrder(cartShop) {
      let cartIds = this.getShopCartIds(cartShop);
      if (cartIds.length === 0) {
        this.$toast('请选择药品');
        return;
      }
      let isRx = cartShop.rxs.some(rx => {
        return rx.rxId !== '0' && rx.radio === true;
      });
      const data = await this.$http.get(
        `/api/orders/cart?cartIds=${cartIds}&isRx=${isRx}`
      );
      this.loadPageOrdersCreateFromCart(data, isRx);
    },
    /**
     * 计算总价和总数
     */
    calculate(cartShop) {
      let allPrice = 0;
      let allQuantity = 0;
      cartShop.rxs.forEach(e => {
        e.drugs.forEach(e => {
          if (e.radio === true) {
            allPrice += e.price * e.quantity;
            allQuantity += e.quantity;
          }
        });
      });
      cartShop.allPrice = allPrice;
      cartShop.allQuantity = allQuantity;
    },
    /**
     * 选中raido
     * @param type
     * @param cartShop
     * @param cartRx
     * @param cartDrug
     */
    onRadio(type, cartShop, cartRx, cartDrug) {
      switch (type) {
        case 'RX':
          cartRx.radio = !cartRx.radio;
          cartRx.drugs.forEach(e => {
            e.radio = cartRx.radio;
          });
          if (
            cartShop.rxs.some(e => {
              return e.radio === !cartRx.radio;
            })
          ) {
            cartShop.radio = cartRx.radio;
          }
          break;
        case 'DRUG':
          cartDrug.radio = !cartDrug.radio;
          if (cartRx.rxId !== '0') {
            cartRx.drugs.forEach(e => {
              e.radio = cartDrug.radio;
            });
            cartRx.radio = cartDrug.radio;
            if (
              cartShop.rxs.some(e => {
                return e.radio === !cartDrug.radio;
              }) === false
            ) {
              cartShop.radio = cartDrug.radio;
            }
          } else {
            if (
              cartRx.drugs.some(e => {
                return e.radio === !cartDrug.radio;
              }) === false
            ) {
              cartRx.radio = cartDrug.radio;
              if (
                cartShop.rxs.some(e => {
                  return e.radio === !cartDrug.radio;
                }) === false
              ) {
                cartShop.radio = cartDrug.radio;
              }
            }
          }
      }
      this.calculate(cartShop);
    }
  }
};
</script>
