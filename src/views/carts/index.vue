<template>
  <div>
    <new-header title="购物车">
      <i class="iconfont ic-arrow-right" slot="left"></i>
      <span slot="right" @click="onRemoveBatch()">删除</span>
    </new-header>

    <div class="close">
      <div class="left icon1" @click.stop="onRadio(All)">
        <i class="iconfont ic-radiobox" v-show="!chooseAll"></i>
        <i class="iconfont ic-radiochecked" v-show="chooseAll"></i>
        <span>全选</span>
      </div>
      <div class="right">
        <span>不含运费 合计:</span>
        <span>￥{{allPrice}}</span>
        <button>
          <span @click.stop="onOrder()">结算({{allQuantity}})</span>
        </button>
      </div>
    </div>
    <div class="body">
      <new-no-data v-if="cartShops.length === 0"></new-no-data>
      <ul class="cartShops">
        <li v-for="cartShop in cartShops">
          <new-header bgColor="white" height="low" leftSize="small" leftColor="black">
            <div slot="left" class="icon1" @click.stop="onRadio(SHOP,cartShop)">
              <i class="iconfont ic-radiobox" v-show="!cartShop.radio"></i>
              <i class="iconfont ic-radiochecked" v-show="cartShop.radio"></i>
            </div>
            <i class="iconfont ic-yaodian" slot="left"></i>
            <span slot="left">{{cartShop.shopName}}</span>
          </new-header>
          <ul class="cartRxs">
            <li v-for="cartRx in cartShop.rxs">
              <ul class="cartDrugs">
                <new-header bgColor="white" height="low" leftSize="small" leftColor="black"
                            v-if="cartRx.rxId && cartRx.rxState == 'ENABLED'">
                  <div slot="left" class="icon1" @click.stop="onRadio(RX,cartShop,cartRx)">
                    <i class="iconfont ic-radiobox" v-show="!cartRx.radio"></i>
                    <i class="iconfont ic-radiochecked" v-show="cartRx.radio"></i>
                  </div>
                  <i class="iconfont ic-chufangdanluru" slot="left"></i>
                  <span slot="left" class="chufangdan">处方单</span>
                  <span slot="right" class="chakanchufan">查看处方></span>
                </new-header>
                <new-header bgColor="white" height="low" leftSize="small" leftColor="black" v-else>
                  <i class="iconfont ic-jisongchufangdan" slot="left"></i>
                  <span slot="left" class="chufangdan">非处方单</span>
                </new-header>
                <li v-for="(cartDrug,cartDrugIndex) in cartRx.drugs" :key="cartDrugIndex">
                  <mt-cell-swipe
                    :right="[
                      {
                        content: 'Delete',
                        style: { background: 'rgba(19,193,254,1)', color: '#fff'},
                        handler: () => onRemove(cartShop,cartShopIndex,cartRx,cartRxIndex,cartDrug,cartDrugIndex)
                      }
                    ]">
                    <div class="slide-content">
                      <div class="icon1" @click.stop="onRadio(DRUG,cartShop,cartRx,cartDrug)">
                        <i class="iconfont ic-radiobox" v-show="!cartDrug.radio"></i>
                        <i class="iconfont ic-radiochecked" v-show="cartDrug.radio"></i>
                      </div>
                      <div class="image">
                        <img v-lazy="">
                      </div>
                      <div class="text">
                        <div class="top">
                          <div class="name">{{cartDrug.name}}</div>
                          <div class="spec">{{cartDrug.spec}}</div>
                        </div>
                        <div class="bottom">
                          <div class="price">
                            <span>¥{{cartDrug.price}}</span>
                          </div>
                          <div class="quantity">
                            <div>
                              <span>x{{cartDrug.quantity}}</span>
                            </div>
                            <div class="multi-input">
                              <input value="-" type="button" @click.stop="onCut(cartDrug)"><input v-model="cartDrug.quantity" type="button"><input value="+" type="button" @click.stop="onAdd(cartDrug)">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </mt-cell-swipe>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <new-footer :urlRouter="$route.path"></new-footer>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    name: 'carts',
    data() {
      return {
        chooseAll: false,
        All: 'ALL',
        SHOP: 'SHOP',
        RX: 'RX',
        DRUG: 'DRUG'
      };
    },
    components: {
    },
    computed: {
      ...mapGetters(['cartShops']),
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
    methods: {
      getData() {
        if (this.cartShops.length === 0) {
          debugger;
          this.$http.get('/carts').then(res => {
            res.data.cartShops.forEach(e => {
              e.radio = false;
              e.rxs.forEach(e => {
                e.radio = false;
                e.drugs.forEach(e => {
                  e.radio = false;
                });
              });
              this.cartShops.push(e);
            });
          }).catch(error => {
            this.exception(error);
          });
        }
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
        if (cartRx.rxId) {
          MessageBox('提示', '改处方单中药品会一起删除').then(action => {
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
          MessageBox('提示', '确定删除?').then(action => {
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
        MessageBox('提示', '确定删除?').then(action => {
          this.$http.delete('carts?cartIds=' + this.getCartIds()).then(res => {
            this.remove();
          }).catch(error => {
            this.exception(error);
          });
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
      onOrder() {
        this.remove();
        let cartIds = this.getCartIds();
        this.$http.get('/orders/cart?cartIds=' + cartIds).then(res => {
          this.remove();
        }).catch(error => {
          this.exception(error);
        });
      },
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
            if (cartRx.rxId) {
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
      },
      ...mapMutations({
        setCartShops: 'SET_CART_SHOPS'
      })
    }
  };
</script>

<style lang="scss" scoped>
  .body {
    height: calc(100vh - 98px - 130px - 100px);
    overflow: scroll;
  }

  /*结算栏*/
  .close {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 98px;
    width: 720px;
    background-color: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 100px;
  }

  .close .right button {
    height: 98px;
    background: rgba(240, 43, 43, 1);
    width: 193px;
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    outline: none;
    border: 0;
  }

  .close .right > span:nth-child(1) {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .close .right > span:nth-child(2) {
    color: rgba(240, 43, 43, 1);
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    margin-right: 10px;
  }

  .close .left {
    display: flex;
    align-items: center;
    width: 120px;
    justify-content: space-around;
  }

  /*字体颜色单独设置*/
  .chufangdan {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(19, 193, 254, 1);
  }

  .chakanchufan {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
  }

  /*radio颜色*/
  .icon1 .ic-radiochecked:before, .icon1 .ic-radiobox:before {
    font-size: 35px !important;
  }

  .ic-radiochecked:before {
    color: rgba(19, 193, 254, 1);
  }

  /*滑块样式*/
  .slide-content {
    width: 720px;
    height: 215px;
    background-color: rgba(241, 239, 240, 1);
    display: flex;
    margin-bottom: 10px;
  }

  .slide-content .icon1 {
    width: 60px;
    text-align: center;
    line-height: 70px;
  }

  .slide-content .image {
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);
    align-self: center;
  }

  .slide-content .text {
    padding-left: 20px;
  }

  .slide-content .text .top {
    height: 105px;
    width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slide-content .text .top .name {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .slide-content .text .top .spec {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .slide-content .text .bottom {
    height: 110px;
    width: 460px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .slide-content .text .bottom .price {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
    align-self: center;
  }

  .slide-content .text .bottom .quantity {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
  }

  .slide-content .text .bottom .quantity div:nth-child(1) {
    align-self: flex-end;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
  }


  .multi-input input:nth-child(1),.multi-input input:nth-child(3) {
    width:37px;
    height:29px;
    background:rgba(210,210,210,1);
    border: 2px rgba(153,153,153,1);
    outline: none;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height: 0.1rem;
  }
</style>


