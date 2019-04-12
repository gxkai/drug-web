<template>
  <new-layout>
    <template slot="center">
      <div
        class="cart"
        v-for="(cartShop, cartShopIndex) in cartShops"
        :key="cartShopIndex"
      >
        <div class="shop">
          <div
            class="rx"
            v-for="(cartRx, cartRxIndex) in cartShop.rxs"
            :key="cartRxIndex"
          >
            <header class="hairline-bottom shop-header" @click="loadPageShopsView(cartShop.id)">
              <div class="left">
                <van-icon name="yaodian-" size=".46rem"/>
              </div>
              <div class="right">
              <span>
                {{ cartShop.shopName }}
              </span>
              </div>
            </header>
            <header class="hairline-bottom rx-header">
              <div class="left">
                <new-radio :radio="cartRx.radio" size=".5rem" @click.native.stop="onRadio(RX,cartShop,cartRx)"/>
              </div>
              <div class="center"
                   v-if="isRx(cartRx.rxId)"
              >
                <span>
                  处方单
                </span>
              </div>
              <div class="center"
                v-else
              >
                <span>
                  非处方单
                </span>
              </div>
              <div class="right"
                   v-if="isRx(cartRx.rxId)"
                   @click="loadPageRxsView(cartRx.rxId, true)"
              >
                <van-icon name="chufang-" size="0.5rem"/>
              </div>
            </header>
            <van-swipe-cell v-for="(cartDrug, cartDrugIndex) in cartRx.drugs"
                            :key="cartDrug.cartId"
                            :right-width="100"
                            @click-right="onRemove(cartShop,cartShopIndex,cartRx,cartRxIndex,cartDrug,cartDrugIndex)"
            >
              <span slot="right">
                  删除
              </span>
              <div class="drug" >
                 <div class="left">
                   <new-radio :radio="cartDrug.radio" size=".5rem"
                              @click.native.stop="onRadio(DRUG,cartShop,cartRx,cartDrug)"/>
                 </div>
                 <div class="right" @click="loadPageShopDrugs(cartDrug.id)">
                   <new-image :url="getImgURL(cartDrug.fileId,'LARGE_LOGO')" :rx="!cartDrug.otc" size="small"/>
                   <div class="wrapper">
                     <div class="line line1">
                       <span>
                         {{cartDrug.name}}
                       </span>
                     </div>
                     <div class="line line2">
                       <span>
                         {{`规格：${cartDrug.spec}`}}
                       </span>
                     </div>
                     <div class="line line2">
                       <span>
                         {{`国药准字：${cartDrug.sfda}`}}
                       </span>
                     </div>
                     <div class="line line3">
                       <span class="price"
                       >
                         {{`￥${cartDrug.price}`}}
                       </span>
                       <span class="quantity"
                             v-if="isRx(cartRx.rxId)"
                       >
                         {{`x${cartDrug.quantity}`}}
                       </span>
                       <new-stepper
                         v-else
                         v-model="cartDrug.quantity"
                         v-on:change="changeQuantity(cartDrug, cartShop)"
                       />
                     </div>
                   </div>
                 </div>
               </div>
            </van-swipe-cell>
          </div>
          <div class="submit-bar"
          >
            <div class="left van-ellipsis">
            <span class="text">
              合计
            </span>
              <span class="price van-ellipsis">
              {{`￥${cartShop.allPrice}`}}
            </span>
            </div>
            <div class="right"
                 @click="onOrder(cartShop)"
            >
          <span>
            {{`结算(${cartShop.allQuantity})`}}
          </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="bottom">
      <van-tabbar :value="3" :fixed="false">
        <van-tabbar-item icon="shouye-" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="chufang-" to="/rxs">处方单</van-tabbar-item>
        <van-tabbar-item icon="fenlei-" to="/drugTypes">分类</van-tabbar-item>
        <van-tabbar-item icon="gouwuche-" to="/carts"
        >购物车
        </van-tabbar-item>
        <van-tabbar-item icon="wo-" to="/accounts">我</van-tabbar-item>
      </van-tabbar>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  /deep/ .van-swipe-cell__right {
    width: 100px!important;
    height: 100%;
    background: #FF7EA9;
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
  background-color: #ffffff;
  border-radius: 10px;
  margin: 10px auto 0;
  .submit-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    .left {
      background-color: white;
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
      padding: 15px 40px;
      border-radius: 50px;
      background-color: #ff0000;
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
      padding: 10px;
    }
    .rx {
      .drug {
        position: relative;
        background-color: white;
        /*width: inherit;*/
        display: grid;
        grid-template-columns: auto 1fr;
        grid-column-gap: 20px;
        padding:10px;
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
                font-size: 20px;
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
export default {
  name: 'carts',
  data() {
    return {
      chooseAll: false,
      All: 'ALL',
      SHOP: 'SHOP',
      RX: 'RX',
      DRUG: 'DRUG',
      cartShops: [],
      loading: false,
      isLoading: false
    };
  },
  components: {},
  computed: {
    allPrice() {
      let sum = 0;
      this.cartShops.forEach(e => {
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
      this.cartShops.forEach(e => {
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initData();
    });
  },
  created() {},
  mounted() {},
  methods: {
    async onRefresh() {
      await this.initData();
      this.isLoading = false;
    },
    async initData() {
      const data = await this.$http.get('/api/carts');
      data.cartShops.forEach(e => {
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
      this.cartShops = data.cartShops;
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
              this.cartShops.splice(cartShopIndex, 1);
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
              this.cartShops.splice(cartShopIndex, 1);
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
        this.cartShops = [];
      });
    },
    /**
     * 获取已选购物车ID
     * @returns {Array}
     */
    getCartIds() {
      let cartIds = [];
      this.cartShops.forEach(e => {
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
