<template>
  <new-layout class="cart" centerColor="white">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        right-text="删除"
        @click-left="$router.go(-1)"
        @click-right="onRemoveBatch()"
      />
    </template>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="cart-list">
          <new-no-data v-if="cartShops.length === 0"></new-no-data>
          <div v-for="(cartShop, cartShopIndex) in cartShops" :key="cartShopIndex">
            <div class="cart-list-shop"
                 @click="linkToShopView(cartShop.id)">
              <div class="cart-list-shop_radio"
                   @click.stop="onRadio(SHOP,cartShop)">
                <input type="checkbox" v-model="cartShop.radio">
                <label></label>
              </div>
              <van-icon name="yaodian" size="3em"></van-icon>
              <div class="cart-list-shop_name" v-text="cartShop.shopName"></div>
            </div>
            <div v-for="(cartRx, cartRxIndex) in cartShop.rxs" :key="cartRxIndex">
              <div class="cart-list-rx"
                   v-if="isRx(cartRx.rxId)">
                <div class="cart-list-rx-left">
                  <div class="cart-list-rx-left_radio"
                       @click.stop="onRadio(RX,cartShop,cartRx)">
                    <input type="checkbox" v-model="cartRx.radio">
                    <label></label>
                  </div>
                  <van-icon name="chufangdanluru" size="3em"></van-icon>
                  <div class="cart-list-rx-left_name">
                    处方单
                  </div>
                </div>
                <div class="cart-list-rx-right"
                     @click="linkToRxView(cartRx.rxId)">
                  查看处方&gt;
                </div>
              </div>
              <div class="cart-list-rx"
                   v-else>
                <div class="cart-list-rx-left">
                  <div class="cart-list-rx-left_radio"
                       @click.stop="onRadio(RX,cartShop,cartRx)">
                    <input type="checkbox" v-model="cartRx.radio">
                    <label></label>
                  </div>
                  <div>
                    <i class="iconfont ic-jisongchufangdan"></i>
                  </div>
                  <div class="cart-list-rx-left_name">
                    非处方单
                  </div>
                </div>
              </div>
              <div class="cart-list-drugs">
                <van-swipe-cell v-for="(cartDrug, cartDrugIndex) in cartRx.drugs"
                                :right-width="65"
                                :key="cartDrugIndex">
                  <div class="cart-list-drugs-item">
                    <div class="cart-list-drugs-item-left">
                      <div class="cart-list-drugs-item-left_radio"
                           @click.stop="onRadio(DRUG,cartShop,cartRx,cartDrug)">
                        <input type="checkbox" v-model="cartDrug.radio">
                        <label></label>
                      </div>
                      <div class="cart-list-drugs-item-left_logo"
                           @click="linkToShopDrugSpec(cartDrug.id)">
                        <div class="rx_mark"
                             v-if="!cartDrug.otc">
                          处
                        </div>
                        <img v-lazy="getImgURL(cartDrug.fileId,'LARGE_LOGO')">
                      </div>
                    </div>
                    <div class="cart-list-drugs-item-right">
                      <div>
                        <div class="cart-list-drugs-item-right_name">
                          {{cartDrug.name}}
                        </div>
                        <div class="cart-list-drugs-item-right_spec">
                          规格：{{cartDrug.spec}}
                        </div>
                      </div>
                      <div>
                        <div class="cart-list-drugs-item-right_price">
                          &yen;{{cartDrug.price}}
                        </div>
                        <div>
                      <span class="cart-list-drugs-item-right_quantity"
                            v-if="isRx(cartRx.rxId)">x{{cartDrug.quantity}}</span>
                          <new-stepper
                            v-model="cartDrug.quantity"
                            v-else
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span slot="right"
                        class="cart-list-drugs-item-delete"
                        @click="onRemove(cartShop,cartShopIndex,cartRx,cartRxIndex,cartDrug,cartDrugIndex)">删除</span>
                </van-swipe-cell>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </template>
    <template slot="bottom">
      <van-submit-bar
        :price="allPrice*100"
        :button-text="'结算('+allQuantity+')'"
        @submit="onOrder"
        :loading="loading"
        :style="{'display': cartShops.length === 0 ? 'none':''}"
        style="position: sticky"
      >
        <div @click.stop="onRadio(All)">
          <input type="checkbox" v-model="chooseAll">
          <label></label>
          <span>全选</span>
        </div>
      </van-submit-bar>
      <van-tabbar
        :value="3"
        :fixed="Boolean(false)"
      >
        <van-tabbar-item icon="icon"
                         to="/">首页
        </van-tabbar-item>
        <van-tabbar-item icon="chufang"
                         to="/rxs">处方单
        </van-tabbar-item>
        <van-tabbar-item icon="fenlei"
                         to="/drugTypes">分类
        </van-tabbar-item>
        <van-tabbar-item icon="gouwuche2"
                         to="/carts">购物车
        </van-tabbar-item>
        <van-tabbar-item icon="wo"
                         to="/accounts">我
        </van-tabbar-item>
      </van-tabbar>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .cart {
    &-list {
      margin-top: 20px;
      &-shop {
        padding: 20px 20px;
        display: flex;
        background-color: white;
        &_radio {
          position: relative;
          margin-right: 10px;
          label {
            position: absolute;
            left: 5px;
            top: 5px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid #13C1FE;
          }
          input {
            width: 30px;
            height: 30px;
            opacity: 0;
          }
          input:checked + label {
            background-color: #13C1FE;
            border: 1PX solid #13C1FE;
          }
          input:checked + label::after {
            position: absolute;
            content: "";
            width: 7px;
            height: 12px;
            top: 6px;
            left: 8px;
            border: 1PX solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg);
          }
        }
        &_name {
          font-size: 30px;
        }
      }
      &-rx {
        padding: 20px 20px;
        display: flex;
        align-items: center;
        background-color: white;
        justify-content: space-between;
        &-left {
          display: flex;
          &_radio {
            position: relative;
            margin-right: 10px;
            label {
              position: absolute;
              left: 5px;
              top: 5px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 1px solid #13C1FE;
            }
            input {
              width: 30px;
              height: 30px;
              opacity: 0;
            }
            input:checked + label {
              background-color: #13C1FE;
              border: 1PX solid #13C1FE;
            }
            input:checked + label::after {
              position: absolute;
              content: "";
              width: 7px;
              height: 12px;
              top: 6px;
              left: 8px;
              border: 1PX solid #fff;
              border-top: none;
              border-left: none;
              transform: rotate(45deg);
            }
          }
          &_name {
            font-size: 30px;
            color: #1AB6FD;
          }
        }
        &-right {
          font-size: 30px;
          color: #FF0000;
        }
      }
      &-drugs {
        &-item {
          display: flex;
          background-color: #f5f5f5;
          margin-bottom: 10px;
          padding: 0 20px;
          &-delete {
            font-size: 30px;
            color: white;
            padding: 120px 40px;
            line-height: 250px;
            font-weight: 200;
            background-color: #1AB6FD;
          }
          &-left {
            display: flex;
            &_radio {
              position: relative;
              label {
                position: absolute;
                left: 5px;
                top: 20px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 1px solid #13C1FE;
              }
              input {
                width: 30px;
                height: 30px;
                opacity: 0;
              }
              input:checked + label {
                background-color: #13C1FE;
                border: 1PX solid #13C1FE;
              }
              input:checked + label::after {
                position: absolute;
                content: "";
                width: 7px;
                height: 12px;
                top: 6px;
                left: 8px;
                border: 1PX solid #fff;
                border-top: none;
                border-left: none;
                transform: rotate(45deg);
              }
            }
            &_logo {
              padding: 20px;
              img {
                width: 200px;
                height: 200px;
              }
            }
          }
          &-right {
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 430px;
            & > div {
              &:nth-child(1) {
                & > div {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                }
              }
              &:nth-child(2) {
                display: flex;
                justify-content: space-between;
              }
            }
            &_name {
              font-size: 30px;
            }
            &_spec {
              font-size: 25px;
              color: #999999;
            }
            &_price {
              font-size: 30px;
              color: #FF0000;
            }
            &_quantity {
              font-size: 30px;
              color: #999999;
            }
          }
        }
      }
    }
    .van-submit-bar {
      bottom: 100px;
      span {
        margin-left: 20px;
        font-size: 30px;
      }
      label {
        position: absolute;
        left: 20px;
        top: 34px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #13C1FE;
      }
      input {
        width: 30px;
        height: 30px;
        opacity: 0;
      }
      input:checked + label {
        background-color: #13C1FE;
        border: 1PX solid #13C1FE;
      }
      input:checked + label::after {
        position: absolute;
        content: "";
        width: 7px;
        height: 12px;
        top: 6px;
        left: 8px;
        border: 1PX solid #fff;
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
      }
    }
  }
</style>
<script>
  // import { mapGetters, mapMutations } from 'vuex';
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
      }
      ;
    },
    components: {},
    computed: {
      // ...mapGetters(['cartShops']),
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
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async onRefresh() {
        await this.initData();
        this.isLoading = false;
      },
      async initData() {
        const data = await this.$http.get('/carts');
        data.cartShops.forEach(e => {
          e.radio = false;
          e.rxs.forEach(e => {
            e.radio = false;
            e.drugs.forEach(e => {
              e.radio = false;
            });
          });
        });
        this.cartShops = data.cartShops;
        console.log(this.cartShops);
      },
      /**
       * 减少数量
       */
      onAdd(cartDrug) {
        cartDrug.quantity++;
      },
      /**
       * 增加数量
       */
      onCut(cartDrug) {
        if (cartDrug.quantity > 1) {
          cartDrug.quantity--;
        }
      },
      /**
       * 单个删除
       */
      onRemove(cartShop, cartShopIndex, cartRx, cartRxIndex, cartDrug, cartDrugIndex) {
        if (cartRx.rxId !== '0') {
          this.$dialog.confirm({ message: '改处方单中药品会一起删除' }).then(async () => {
            let cartIds = [];
            cartRx.drugs.forEach(e => {
              cartIds.push(e.cartId);
            });
            await this.$http.delete('carts?cartIds=' + cartIds);
            cartShop.rxs.splice(cartRxIndex, 1);
            if (cartShop.rxs.length === 0) {
              this.cartShops.splice(cartShopIndex, 1);
            }
          });
        } else {
          this.$dialog.confirm({ message: '确定删除？' }).then(async () => {
            await this.$http.delete('carts/' + cartDrug.cartId);
            cartRx.drugs.splice(cartDrugIndex, 1);
            if (cartRx.drugs.length === 0) {
              cartShop.rxs.splice(cartRxIndex, 1);
              if (cartShop.rxs.length === 0) {
                this.cartShops.splice(cartShopIndex, 1);
              }
            }
          });
        }
      },
      /**
       * 批量删除
       */
      onRemoveBatch() {
        let cartIds = this.getCartIds();
        if (cartIds.length === 0) {
          this.$toast('请选择药品');
          return;
        }
        this.$dialog.confirm({ message: '确定删除?' }).then(async () => {
          const params = {
            cartIds: cartIds
          };
          await this.$http.delete('/carts', params);
          this.remove();
        });
      },
      /**
       * 通用删除方法
       */
      remove() {
        for (let i = this.cartShops.length; i > 0; i--) {
          for (let j = this.cartShops[i - 1].rxs.length; j > 0; j--) {
            for (let k = this.cartShops[i - 1].rxs[j - 1].drugs.length; k > 0; k--) {
              if (this.cartShops[i - 1].rxs[j - 1].drugs[k - 1].radio) {
                this.cartShops[i - 1].rxs[j - 1].drugs.splice(k - 1, 1);
              }
            }
            if (this.cartShops[i - 1].rxs[j - 1].drugs.length === 0) {
              this.cartShops[i - 1].rxs.splice(j - 1, 1);
            }
          }
          if (this.cartShops[i - 1].rxs.length === 0) {
            this.cartShops.splice(i - 1, 1);
          }
        }
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
              if (e.radio) {
                cartIds.push(e.cartId);
              }
            });
          });
        });
        return cartIds;
      },
      /**
       * 订单结算
       */
      async onOrder() {
        let cartIds = this.getCartIds();
        if (cartIds.length === 0) {
          this.$toast('请选择药品');
          return;
        }
        this.loading = true;
        const data = await this.$http.get('/orders/cart?cartIds=' + cartIds);
        this.$router.push({ path: '/orders/create/fromCart', query: { cart: JSON.stringify(data) } });
        this.loading = false;
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
          case 'ALL':
            this.chooseAll = !this.chooseAll;
            this.cartShops.forEach(e => {
              e.radio = this.chooseAll;
              e.rxs.forEach(e => {
                e.radio = this.chooseAll;
                e.drugs.forEach(e => {
                  e.radio = this.chooseAll;
                });
              });
            });
            break;
          case 'SHOP':
            cartShop.radio = !cartShop.radio;
            cartShop.rxs.forEach(e => {
              e.radio = cartShop.radio;
              e.drugs.forEach(e => {
                e.radio = cartShop.radio;
              });
            });
            if ((cartShop.radio && this.cartShops.filter(e => {
              return e.radio === !cartShop.radio;
            }).length === 0) || !cartShop.radio) {
              this.chooseAll = cartShop.radio;
            }
            break;
          case 'RX':
            cartRx.radio = !cartRx.radio;
            cartRx.drugs.forEach(e => {
              e.radio = cartRx.radio;
            });
            if (cartShop.rxs.filter(e => {
              return e.radio === !cartRx.radio;
            }).length === 0) {
              cartShop.radio = cartRx.radio;
              if ((cartRx.radio && this.cartShops.filter(e => {
                return e.radio === !cartShop.radio;
              }).length === 0) || !cartRx.radio) {
                this.chooseAll = cartShop.radio;
              }
            }
            break;
          case 'DRUG':
            cartDrug.radio = !cartDrug.radio;
            if (cartRx.rxId !== '0') {
              cartRx.drugs.forEach(e => {
                e.radio = cartDrug.radio;
              });
              cartRx.radio = cartDrug.radio;
              if (cartShop.rxs.filter(e => {
                return e.radio === !cartDrug.radio;
              }).length === 0) {
                cartShop.radio = cartDrug.radio;
                if ((cartDrug.radio && this.cartShops.filter(e => {
                  return e.radio === !cartDrug.radio;
                }).length === 0) || !cartDrug.radio) {
                  this.chooseAll = cartDrug.radio;
                }
              }
            } else {
              if (cartRx.drugs.filter(e => {
                return e.radio === !cartDrug.radio;
              }).length === 0) {
                cartRx.radio = cartDrug.radio;
                if (cartShop.rxs.filter(e => {
                  return e.radio === !cartDrug.radio;
                }).length === 0) {
                  cartShop.radio = cartDrug.radio;
                  if ((cartDrug.radio && this.cartShops.filter(e => {
                    return e.radio === !cartDrug.radio;
                  }).length === 0) || !cartDrug.radio) {
                    this.chooseAll = cartDrug.radio;
                  }
                }
              }
            }
        }
      }
      // ...mapMutations({
      //   setCartShops: 'SET_CART_SHOPS'
      // })
    }
  };
</script>

