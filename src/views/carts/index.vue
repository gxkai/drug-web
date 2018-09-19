<template>
  <div class="cart">
    <new-header title="购物车" ref="header">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
      <span slot="right" @click="onRemoveBatch()" class="text-l-30">删除</span>
    </new-header>
    <div class="cart-list" ref="list">
      <new-no-data v-if="cartShops.length === 0"></new-no-data>
      <div v-for="(cartShop, cartShopIndex) in cartShops" :key="cartShopIndex">
        <div class="cart-list-shop"
             @click="linkToShopView(cartShop.id)">
          <div class="cart-list-shop_radio"
               @click.stop="onRadio(SHOP,cartShop)">
            <input type="checkbox" v-model="cartShop.radio">
            <label></label>
          </div>
          <div>
            <i class="iconfont ic-yaodian"></i>
          </div>
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
              <div>
                <i class="iconfont ic-chufangdanluru"></i>
              </div>
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
            <van-cell-swipe v-for="(cartDrug, cartDrugIndex) in cartRx.drugs"
                            :right-width="65"
                            :key="cartDrugIndex">
              <div class="cart-list-drugs-item"
                   @click="linkToShopDrugSpec(cartDrug.id)">
                <div class="cart-list-drugs-item-left">
                  <div class="cart-list-drugs-item-left_radio"
                       @click.stop="onRadio(DRUG,cartShop,cartRx,cartDrug)">
                    <input type="checkbox" v-model="cartDrug.radio">
                    <label></label>
                  </div>
                  <div class="cart-list-drugs-item-left_logo">
                    <div class="rx_mark"
                         v-if="!cartDrug.otc">
                      处
                    </div>
                    <img :src="getImgURL(cartDrug.fileId,'LARGE_LOGO')">
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
                    <div class="cart-list-drugs-item-right_quantity">
                      x{{cartDrug.quantity}}
                    </div>
                  </div>
                </div>
              </div>
              <span slot="right"
                    class="cart-list-drugs-item-delete"
                    @click="onRemove(cartShop,cartShopIndex,cartRx,cartRxIndex,cartDrug,cartDrugIndex)">删除</span>
            </van-cell-swipe>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-commit"
         :style="{'opacity': cartShops.length === 0 ? 0:1}"
    ref="commit">
      <div class="cart-commit-left">
        <div class="cart-commit-left_radio"
             @click.stop="onRadio(All)">
          <input type="checkbox" v-model="chooseAll">
          <label></label>
        </div>
        <div class="cart-commit-left_all">
          全选
        </div>
      </div>
      <div class="cart-commit-right">
        <div class="cart-commit-right_sum">
          <span>合计</span>
          <span class="cart-commit-right_sum-price">&yen;{{toFixedTwo(allPrice)}}</span>
        </div>
        <div class="cart-commit-right_close"
        @click="onOrder()">
          结算({{allQuantity}})
        </div>
      </div>
    </div>
    <new-footer :urlRouter="$route.path" ref="footer"></new-footer>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .cart {
    width: 720px;
    height: 100vh;
    &-list {
      &-shop {
        padding: 20px 0;
        display: flex;
        align-items: center;
        background-color: white;
        &_radio {
          position: relative;
          label {
            position: absolute;
            left: 5px;
            top: 8px;
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
        padding: 20px 0;
        display: flex;
        align-items: center;
        background-color: white;
        justify-content: space-between;
        &-left {
          display: flex;
          align-items: center;
          &_radio {
            position: relative;
            label {
              position: absolute;
              left: 5px;
              top: 8px;
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
          &-delete {
            font-size: 30px;
            color: white;
            padding: 0 40px;
            line-height: 240px;
            font-weight: 200;
          }
          &-left {
            display: flex;
            &_radio {
              position: relative;
              label {
                position: absolute;
                left: 5px;
                top: 8px;
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
    &-commit {
      width: 100%;
      position: fixed;
      bottom: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 999;
      &-right {
        display: flex;
        &_sum {
          padding: 30px;
          & > span {
            font-size: 30px;
          }
          &-price {
            color: #FF0000;
          }
        }
        &_close {
          background-color: #FF0000;
          padding: 30px 50px;
          font-size: 30px;
          color: white;
          font-weight: 200;
        }
      }
      &-left {
        display: flex;
        align-items: center;
        &_radio {
          position: relative;
          padding: 0 0 8px 0;
        }
        &_all {
          padding-left: 10px;
          font-size: 30px;
        }
        label {
          position: absolute;
          left: 5px;
          top: 8px;
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
  }
</style>
<script>
  import { MessageBox, Toast } from 'mint-ui';
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
        cartShops: []
      };
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
      this.getData();
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.list.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight - this.$refs.commit.clientHeight - this.$refs.footer.$el.clientHeight
        ) + 'px';
        this.$refs.list.style.overflow = 'auto';
      });
    },
    methods: {
      getData() {
        this.$http.get('/carts').then(res => {
          res.data.cartShops.forEach(e => {
            e.radio = false;
            e.rxs.forEach(e => {
              e.radio = false;
              e.drugs.forEach(e => {
                e.radio = false;
              });
            });
          });
          this.cartShops = res.data.cartShops;
          console.log(this.cartShops);
        }).catch(error => {
          this.exception(error);
        });
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
          MessageBox.confirm('改处方单中药品会一起删除').then(action => {
            let cartIds = [];
            cartRx.drugs.forEach(e => {
              cartIds.push(e.cartId);
            });
            this.$http.delete('carts?cartIds=' + cartIds).then(res => {
              cartShop.rxs.splice(cartRxIndex, 1);
              if (cartShop.rxs.length === 0) {
                this.cartShops.splice(cartShopIndex, 1);
              }
            }).catch(error => {
              this.exception(error);
            });
          });
        } else {
          MessageBox.confirm('确定删除？').then(action => {
            this.$http.delete('carts/' + cartDrug.cartId).then(res => {
              cartRx.drugs.splice(cartDrugIndex, 1);
              if (cartRx.drugs.length === 0) {
                cartShop.rxs.splice(cartRxIndex, 1);
                if (cartShop.rxs.length === 0) {
                  this.cartShops.splice(cartShopIndex, 1);
                }
              }
            }).catch(error => {
              this.exception(error);
            });
          });
        }
      },
      /**
       * 批量删除
       */
      onRemoveBatch() {
        MessageBox.confirm('确定删除?').then(action => {
          this.$http.delete('carts?cartIds=' + this.getCartIds()).then(res => {
            this.remove();
          }).catch(error => {
            this.exception(error);
          });
        });
      },
      onRemoveBatchWithOutTip() {
        this.$http.delete('carts?cartIds=' + this.getCartIds()).then(res => {
          this.remove();
        }).catch(error => {
          this.exception(error);
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
      onOrder() {
        let cartIds = this.getCartIds();
        if (cartIds.length === 0) {
          Toast('请选择药品');
          return;
        }
        this.$http.get('/orders/cart?cartIds=' + cartIds).then(res => {
          console.log(res.data);
          this.$router.push({ path: '/orders/create/fromCart', query: { cart: JSON.stringify(res.data) } });
        }).catch(error => {
          this.exception(error);
        });
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

