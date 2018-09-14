<template>
  <div>
    <new-header title="购物车" ref="header">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
      <span slot="right" @click="onRemoveBatch()" class="text-l-30">删除</span>
    </new-header>
    <new-footer :urlRouter="$route.path" ref="footer"></new-footer>
    <div class="close" ref="close">
      <div class="left icon1" @click.stop="onRadio(All)">
       <span>
          <i class="iconfont ic-radiobox" v-show="!chooseAll"></i>
          <i class="iconfont ic-radiochecked" v-show="chooseAll"></i>全选
       </span>
      </div>
      <div class="right">
        <span>合计:</span>
        <span>&yen;{{toFixedTwo(allPrice)}}</span>
        <button>
          <span @click.stop="onOrder()" class="text-l-30">结算({{allQuantity}})</span>
        </button>
      </div>
    </div>
    <div class="body" ref="body">
      <ul class="cartShops">
        <li v-for="cartShop in cartShops">
          <new-header bgColor="white" height="low" leftSize="small" leftColor="black">
            <div slot="left" class="icon1" @click.stop="onRadio(SHOP,cartShop)">
              <i class="iconfont ic-radiobox" v-show="!cartShop.radio"></i>
              <i class="iconfont ic-radiochecked" v-show="cartShop.radio"></i>
            </div>
            <div slot="left">
              <i class="iconfont ic-yaodian" slot="left"></i>
            </div>
            <div slot="left" @click.stop="$router.push({path:'/shops/view',query:{shopId:cartShop.id}})">
              <span class="text-l-30">{{cartShop.shopName}}</span>
            </div>
          </new-header>
          <ul class="cartRxs">
            <li v-for="cartRx in cartShop.rxs">
              <ul class="cartDrugs">
                <new-header bgColor="white"
                            height="low"
                            leftSize="small"
                            leftColor="black"
                            v-if="cartRx.rxId !== '0'&& cartRx.rxState == 'ENABLED'">
                  <div slot="left"
                       class="icon1 bg-f6f6f6"
                       @click.stop="onRadio(RX,cartShop,cartRx)">
                    <i class="iconfont ic-radiobox" v-show="!cartRx.radio"></i>
                    <i class="iconfont ic-radiochecked" v-show="cartRx.radio"></i>
                  </div>
                  <div slot="left">
                    <i class="iconfont ic-chufangdanluru"></i>
                  </div>
                  <span slot="left" class="chufangdan">处方单</span>
                  <span slot="right"
                        class="chakanchufan"
                        @click.stop="$router.push({path:'/rxs/view',query:{rxId:cartRx.rxId}})">
                    查看处方>
                  </span>
                </new-header>
                <new-header bgColor="white" height="low" leftSize="small" leftColor="black" v-else>
                  <div slot="left">
                    <i class="iconfont ic-jisongchufangdan color-333"></i>
                  </div>
                  <span slot="left" class="chufangdan">非处方单</span>
                </new-header>
                <li v-for="(cartDrug,cartDrugIndex) in cartRx.drugs"
                    :key="cartDrugIndex"
                    @click="$router.push({path:'/shopDrugSpecs',query:{shopDrugSpecId:cartDrug.id}})">
                  <mt-cell-swipe
                    :right="[
                      {
                        content: '删除',
                        style: { background: 'rgba(19,193,254,1)', color: '#fff', fontSize: '0.3rem', height: '3rem'},
                        handler: () => onRemove(cartShop,cartShopIndex,cartRx,cartRxIndex,cartDrug,cartDrugIndex)
                      }
                    ]">
                    <div class="slide-content">
                      <div class="icon1" @click.stop="onRadio(DRUG,cartShop,cartRx,cartDrug)">
                        <i class="iconfont ic-radiobox" v-show="!cartDrug.radio"></i>
                        <i class="iconfont ic-radiochecked" v-show="cartDrug.radio"></i>
                      </div>
                      <div class="image">
                        <div class="rx_mark" v-if="!cartDrug.otc">处</div>
                        <img :src="getImgURL(cartDrug.fileId, 'LARGE_LOGO')">
                      </div>
                      <div class="text">
                        <div class="top">
                          <p class="height1"></p>
                          <div class="name elps">{{cartDrug.name}}</div>
                          <div class="spec ml-l-10">{{cartDrug.spec}}</div>
                        </div>
                        <div class="bottom">
                          <div class="price">
                            <span class="text-l-25 ml-l-10">&yen;{{toFixedTwo(cartDrug.price)}}</span>
                          </div>
                          <div class="quantity">
                            <div>
                              <span class="text-l-25">x{{cartDrug.quantity}}</span>
                            </div>


                            <div class="multi" v-if="cartRx.rxId === '0'">
                              <div @click.stop="onCut(cartDrug)">-</div>
                              <div>
                                <input v-model="cartDrug.quantity" type="number">
                              </div>
                              <div @click.stop="onAdd(cartDrug)">+</div>
                            </div>


                            <div class="multi" v-if="cartRx.rxId != '0'">

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
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
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
    methods: {
      getData() {
        // if (this.cartShops.length === 0) {
        //   this.$http.get('/carts').then(res => {
        //     res.data.cartShops.forEach(e => {
        //       e.radio = false;
        //       e.rxs.forEach(e => {
        //         e.radio = false;
        //         e.drugs.forEach(e => {
        //           e.radio = false;
        //         });
        //       });
        //     });
        //     this.setCartShops(res.data.cartShops);
        //   }).catch(error => {
        //     this.exception(error);
        //   });
        // }
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
          MessageBox('提示', '请选择药品');
          return;
        }
        this.$http.get('/orders/cart?cartIds=' + cartIds).then(res => {
          console.log(res.data);
          this.$router.push({path: '/orders/create/fromCart', query: {cart: JSON.stringify(res.data)}});
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
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight - this.$refs.close.clientHeight - this.$refs.footer.$el.clientHeight
      ) + 'px';
      this.$refs.body.style.overflow = 'auto';
    }
  };
</script>

<style scoped>
  .chu {
    position: absolute;
    background: red;
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    padding: 5px 15px;
    border-radius: 30px;
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
    z-index: 1;
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
    font-size: 30px;
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

  .close .left span {
    font-size: 28px;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    display: inline-block;
  }

  /*字体颜色单独设置*/
  .chufangdan {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(19, 193, 254, 1);
  }

  .chakanchufan {
    font-size: 28px;
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
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);
    align-self: center;
  }

  .slide-content .image img {
    width: 100%;
  }

  .slide-content .text {
    padding: 20px 10px;
  }

  .slide-content .text .top {
    width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slide-content .text .top .name {
    font-size: 25px;
    color: rgba(51, 51, 51, 1);
    height: 24px;
    line-height: 24px;
  }

  .slide-content .text .top .spec {
    font-size: 25px;
    color: rgba(153, 153, 153, 1);
    margin-top: 12px;
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
    color: rgba(153, 153, 153, 1);
  }

  .multi-input input {
    width: 37px;
    height: 29px;
    background: rgba(210, 210, 210, 1);
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
    line-height: 0.1rem;
    outline: none;
  }

  .color-333 {
    color: #333;
  }

  .quantity span {
    margin-right: 16px;
  }

  .mint-cell-swipe-button {
    font-size: 24px;
  }

  .bg-f6f6f6 {
    background: #f6f6f6;
  }

  .multi {
    display: flex;
  }

  .multi > div {
    min-width: 37px;
    height: 37px;
    background-color: white;
    /* border: 1PX solid #D2D2D2;*/
    text-align: center;
    line-height: 37px;
    font-size: 20px;
  }

  .multi > div:nth-child(2) input {
    height: 30px;
    width: 37px;
    text-align: center;
    font-size: 20px;
    border: none;
    outline: none;
  }
  .height1{height: 15px;width: 100%}
</style>


