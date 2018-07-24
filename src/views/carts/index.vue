<template>
  <div class="shopCar">
    <mt-header title="购物车" style="position:relative;left:0px;top:0px;width:104%;">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="d_drugComponent" v-if="list.length === 0">
      <img src="static/img/noorder.png"/>
      <p class="d_nodata1">您还没有购物车药品哦</p>
      <p class="d_nodata2">可以去看看有哪些想买的</p>
    </div>

    <div style="padding-bottom:9rem;">
      <div v-for="(shop,shopI) in list">
        <div class="parent width96 marginAuto mt1 bottombordere5">
  <span class="child">
  <span class="checkbox-group">
  <input type="checkbox" name="fu" :id="'shop'+shop.id" v-model="shop.picked"
         @change="selectShop(shop)"/>
  <label :for="'shop'+shop.id"></label>
  </span>
  <img :src="shop.shopLogo">&nbsp;{{shop.shopName}}名称
  </span>
        </div>
        <div v-for="(rx,rxI) in shop.rxs">
          <p class="d_shopcar mt1 width98 marginAuto  d_new_shopcar" v-if="rx.rxId !==null">
            <i class="icon iconfont ic-chufangdanluru" style="color:#333333!important;"></i>处方单
            <router-link tag="span" :to="{path:'/rxs/view',query:{rxId:rx.rxId}}" class="fr">查看处方</router-link>
          </p>
          <p class="d_shopcar mt1 width98 marginAuto d_new_shopcar" v-else>
            <i class="icon iconfont ic-jisongchufangdan"
               style="color:#333333!important;margin-left:2rem!important;"></i>
            非处方单
          </p>


          <mt-cell-swipe v-for="(drug,drugI) in rx.drugs" :key="drugI" style="width:100%!important;background:#f6f6f6;"
                         class="drugComponent" :right="[
        {
          content: '删除',
          style: {background: '#1AB6FD', color: '#fff', lineHeight: '12rem', fontSize: '1rem', width: '5rem', height:'12rem', textAlign:'-webkit-center'},
          handler: () => deleteCart(shop,shopI,rx,rxI,drug,drugI,list)
        }
      ]">
            <div class="parent marginAuto d_drug metass" style="">
              <div>
                <i class="checkbox-group fl">
                  <input type="checkbox" style="margin-left:5px;text-align:center;margin-right:5px;" class="d_shopcar_checkbox" name="fu" :id="'drug'+drug.cartId"
                         v-model="drug.picked"
                         @change="selectCart(shop,rx,drug)"
                  />
                  <label :for="'drug'+drug.cartId"></label>
                </i>
              </div>


              <div class="rel" style="background:white;width:10rem;height:10rem;">
                <div v-if="drug.isOtc === false">
                  <img src="static/img/chu.png" class="prescription" style="margin-top:5px;margin-left:5px;">
                </div>
                <div v-else>
                  <img src="static/img/fei.png" class="prescription" style="margin-top:5px;margin-left:5px;">
                </div>
                <router-link :to="{path:'/shopDrugSpecs',query:{id:drug.id}}">
                  <img v-lazy="drug.logo" class="d_shopdrugImg fl" style="margin-left:2rem;margin-top:2rem;">

                </router-link>
              </div>


              <div>
                <div style="margin-left:1rem;">
                  <div class="elps" style="text-align:left;margin-top:0.5rem;width:100px;">{{drug.name}}</div>
                  <div class="elps" style="text-align:left;margin-top:1rem;color:#999999;font-size:0.9rem;width:100px;">规格：{{drug.spec}}</div>
                  <div style="text-align:left;margin-top:3rem;font-size:1.2rem;">¥{{drug.price}}</div>
                </div>


                <div id="d_p2">
                  <p id="d_p1">x{{drug.quantity}}</p>
                  <div class="gw_num">
                    <em class="jian" @click="shopCarNumber(drug,false)">-</em>
                    <input type="text" v-model="drug.quantity" class="num"/>
                    <em class="add" @click="shopCarNumber(drug,true)">+</em>
                  </div>
                </div>


              </div>


            </div>
          </mt-cell-swipe>
        </div>
      </div>
    </div>


    <footer v-if="list.length !== 0">
      <div>
        <span class="checkbox-group mt1">
        <input type="checkbox" id="all" v-model="pickedAll" @change="selectAll()"/>
        <label for="all" style="margin-left:1rem;"></label>
        </span>
        全选
      </div>
      <div>
        合计:¥{{totalPrice}}
      </div>
      <div @click="commit()">
        结算（{{totalQuantity}}）
      </div>
    </footer>
    <allBottom></allBottom>
  </div>
</template>
<script>
  // import allBottom from '../../components/allBottom';
  import Vue from 'vue';
  import {CellSwipe, MessageBox, Toast} from 'mint-ui';

  Vue.component(CellSwipe.name, CellSwipe);
  export default {
    name: 'carts',
    data() {
      return {
        list: [],
        pickedAll: false,
        totalPrice: 0,
        accountId: '',
        totalQuantity: 0
      };
    },
    components: {
      // allBottom
    },
    created() {
      this.getData();
    },
    methods: {
      deleteCart(shop, shopI, rx, rxI, drug, drugI, list) {
        if (rx.rxId !== null) {
          MessageBox.confirm('该处方单会一并删除').then(action => {
            let cartIds = [];
            rx.drugs.forEach(drug => {
              cartIds.push(drug.cartId);
            });
            this.$http.delete(this.URL_PATH + '/carts?cartIds=' + cartIds, {
              headers: {
                'Authorization': this.$store.getters.token
              }
            })
              .then(res => {
                if (res.status === 200) {
                  shop.rxs.splice(rxI, 1);
                  if (shop.rxs.length === 0) {
                    this.list.splice(shopI, 1);
                  }
                  this.getTotalPrice();
                }
              });
          });
        } else {
          MessageBox.confirm('确定要删除这个商品吗？').then(action => {
            this.$http.delete(this.URL_PATH + '/carts/' + drug.cartId, {
              headers: {
                'Authorization': this.$store.getters.token
              }
            })
              .then(res => {
                if (res.status === 200) {
                  rx.drugs.splice(drugI, 1);
                  if (rx.drugs.length === 0) {
                    shop.rxs.splice(rxI, 1);
                  }
                  if (shop.rxs.length === 0) {
                    this.list.splice(shopI, 1);
                  }
                  this.getTotalPrice();
                }
              });
          });
        }
      },
      commit() {
        let cartIds = [];
        this.list.forEach(shop => {
          shop.rxs.forEach(rx => {
            rx.drugs.forEach(drug => {
              if (drug.picked) {
                cartIds.push(drug.cartId);
              }
            });
          });
        });
        if (cartIds.length === 0) {
          Toast({
            message: '请选择购物车商品',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        this.$http.get(this.URL_PATH + '/carts/order?cartIds=' + cartIds, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then(res => {
            if (res.status === 200) {
              let list = res.data;
              let cartList = list.cartShops;
              let amount = list.amount;
              cartList.forEach(shop => {
                let nRxs = shop.rxs.filter(rx => {
                  return rx.rxId === null;
                });
                let drugs = [];
                nRxs.forEach(rx => {
                  drugs = drugs.concat(rx.drugs);
                });
                shop.rxs = shop.rxs.filter(rx => {
                  return rx.rxId !== null;
                });
                if (drugs.length !== 0) {
                  shop.rxs = shop.rxs.concat({rxId: null, drugs: drugs});
                }
              });
              let carts = {};
              carts.cartList = cartList;
              carts.amount = amount;
              carts.cartIds = cartIds;
              this.$router.push({path: '/orders/create', query: {carts: JSON.stringify(carts)}});
            }
          })
          .catch((error) => {
            this.exception.message(error);
          });
      },
      getTotalPrice() {
        let sum = 0;
        let sum1 = 0;
        this.list.forEach(shop => {
          shop.rxs.forEach(rx => {
            rx.drugs.forEach(drug => {
              if (drug.picked) {
                sum += drug.price * drug.quantity;
                sum1 += drug.quantity;
              }
            });
          });
        });
        this.totalPrice = sum;
        this.totalQuantity = sum1;
      },
      selectAll() {
        this.list.forEach(shop => {
          shop.picked = this.pickedAll;
          shop.rxs.forEach(rx => {
            rx.drugs.forEach(drug => {
              drug.picked = this.pickedAll;
            });
          });
        });
        this.getTotalPrice();
      },
      selectShop(shop) {
        shop.rxs.forEach(rx => {
          rx.drugs.forEach(drug => {
            drug.picked = shop.picked;
          });
        });
        this.pickedAll = !this.list.find(shop => !shop.picked);
        this.getTotalPrice();
      },
      selectCart(shop, rx, drug) {
        if (!drug.picked) {
          shop.picked = false;
          if (rx.rxId !== null) {
            rx.drugs.forEach(drug => {
              drug.picked = false;
            });
          }
        } else {
          if (rx.rxId !== null) {
            rx.drugs.forEach(drug => {
              drug.picked = true;
            });
          }
          shop.picked = !shop.rxs.find(rx => rx.drugs.find(drug => !drug.picked));
        }
        this.pickedAll = !this.list.find(shop => !shop.picked);
        this.getTotalPrice();
      },
      getData() {
        if (this.$store.getters.account) {
          this.accountId = this.$store.getters.account.id;
        }
        this.$http.get(this.URL_PATH + '/carts?', {
          headers: {
            'Authorization': JSON.parse(localStorage.account).token
          }
        })
          .then(res => {
            console.log(res);
            this.list = res.data.cartShops;
            this.list.forEach(shop => {
              shop.picked = false;
              let nRxs = shop.rxs.filter(rx => {
                return rx.rxId === null;
              });
              let drugs = [];
              nRxs.forEach(rx => {
                drugs = drugs.concat(rx.drugs);
              });
              shop.rxs = shop.rxs.filter(rx => {
                return rx.rxId !== null;
              });
              if (drugs.length !== 0) {
                shop.rxs = shop.rxs.concat({rxId: null, drugs: drugs});
              }
              shop.rxs.forEach(rx => {
                rx.drugs.forEach(drug => {
                  drug.picked = false;
                  drug.logo = this.URL_PATH + '/files/' + drug.fileId + '/image?resolution=LARGE_LOGO';
                });
              });
            });
          });
      },
      shopCarNumber(drug, flag) {
        if (flag) {
          drug.quantity++;
          this.$http.put(this.URL_PATH + '/carts?id=' + drug.cartId + '&quantity=' + drug.quantity);
        } else {
          drug.quantity--;
          if (drug.quantity <= 1) {
            drug.quantity = 1;
          } else {
            this.$http.put(this.URL_PATH + '/carts?id=' + drug.cartId + '&quantity=' + drug.quantity);
          }
          ;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  footer {
    position: fixed;
    bottom: 5rem;
    width: 100%;
    background: white;
    height: 4rem;
    line-height: 4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  footer div:first-child {
    flex: 3;
  }

  footer div:not(first-child) {
    flex: 2;
  }

  footer div:nth-child(3) {
    background: #f02b2b;
    color: white;
    text-align: center;
  }

  /*纯CSS写法*/

  .mint-header {
    background: #1AB6FD;
  }

  .d_shopcar {
    color: #13c1fe;
  }

  .dshopCar {
    position: absolute;
    bottom: 5.5rem;
    display: flex;
    height: 3rem;
  }

  .dshopCar span:not(first-child) {
    flex: 1.3;
    line-height: 3rem;
    text-align: right;
  }

  .dshopCar span:first-child {
    flex: 2;
    text-align: right;
  }

  .dshopCar span:nth-child(2) i {
    color: #f02b2b;
    font-style: normal;
  }

  .dshopCar span:nth-child(3) {
    background: #f02b2b;
    color: white;
    text-align: center;
  }

  i {
    color: #f02b2b;
    font-style: normal;
  }

  /*@import 'static/scss/common.scss'*/


</style>

<style lang="scss" scoped>
  .mint-cell-wrapper {
    background-image: linear-gradient(180deg, white, white 50%, transparent 50%) !important;
  }

  .mint-header {
    background: #1AB6FD;
  }

  em {
    font-style: normal;
  }

  .gw_num {
    border: 1px solid #dbdbdb;
    width: 86px;
    line-height: 26px;
    overflow: hidden;
    float: right;
    margin-right: 0.2rem;
    margin-top: 1.3rem;
  }

  .gw_num em {
    display: block;
    height: 26px;
    width: 26px;
    float: left;
    color: #7A7979;
    border-right: 1px solid #dbdbdb;
    text-align: center;
    cursor: pointer;
  }

  .gw_num .num {
    display: block;
    float: left;
    text-align: center;
    width: 32px;
    font-style: normal;
    font-size: 14px;
    line-height: 24px;
    border: 0;
    background: none;
  }

  .gw_num em.add {
    float: right;
    border-right: 0;
    border-left: 1px solid #dbdbdb;
  }

  .drugComponent div:first-child p {
    height: 3rem;
    line-height: 3rem;
  }

  .drugComponent div:first-child p:nth-child(2) {
    margin-bottom: 1rem;
  }

  .drugComponent div:first-child p img {
    width: 6%;
    margin-top: 2px;
    display: inline-block;
    vertical-align: middle;
  }

  .drugComponent {
    width: 96%;
    margin: auto;
    border: 1px solid white;
  }

  .d_shopdrugImg {
    width: 7rem;
    height: 7rem;
  }

  .parent div:first-child img.prescription {
    position: absolute;
    width: 2rem;
  }

  .parent div:first-child img:nth-child(2) {
    width: 14%;
  }

  .parent div:nth-child(2) span:first-child {
    color: #333333;
    display: block;
    font-size: 1.4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 3rem;
  }

  .parent div:nth-child(2) span:nth-child(2) {
    color: #999999;
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 1.2rem;
  }

  .parent div:nth-child(2) span:nth-child(3) {
    color: #ff0000;
    font-size: 1.3rem;
    margin-top: 1rem;
    display: inline-block;
  }

  .d_drug div:first-child {
    flex: 1;
  }

  .d_drug {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }

  .d_drug div:nth-child(3) {

    text-align: center;
    flex: 12;
  }

  i {
    font-style: normal;
    float: right;
    color: #ff0000;
  }

  .drugComponent .p1 {
    text-align: right;
    margin-bottom: 2rem;
  }

  .d_drugdivBtn {
    display: flex;
  }

  .d_drugdivBtn span:first-child {
    border: none;
  }

  .d_drugdivBtn span {
    flex: 1;
    padding: 5px 0px;
    text-align: center;
    float: right;
    border: 1px solid #bfbfbf;
    border-radius: 5px;
    justify-content: space-around;
    margin-right: 5px;
  }

  .drugComponent {
    width: 103%;
  }

  .mint-cell-swipe-button {
    line-height: 10rem !important;
  }

  .mint-cell:last-child {
    border: none !important;
    background-image: none !important;
  }

  .fr {
    float: right;
  }

  .fl {
    float: left;
  }

  .mint-cell-swipe-button {
    height: 100%;
    display: inline-block;
    line-height: 48px;
    text-align: -webkit-center;
    width: 6rem;
  }

  .shopCar {
    overflow: hidden;
    padding-bottom: 0rem;
  }

  .mint-cell-swipe-button {
    height: 100% !important;
    display: inline-block !important;
    /* padding: 0 21px; */
    line-height: 48px !important;
    /* text-align: left; */
    width: 64px !important;
    text-indent: 10px !important;
  }

  .ic-chufangdanluru, .ic-jisongchufangdan {
    float: left;
    color: #333333;
    font-size: 2.2rem;
  }

  .d_shopcar_checkbox {
    left: 50px;
  }

  .d_shopcar_checkbox input[type=checkbox] + label {
    position: absolute;
    left: 50px;
  }

  .fr {
    float: right;
  }

  .d_new_shopcar {
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
  }

  .d_new_shopcar span {
    height: 4rem;
    line-height: 4rem;
    font-size: 1rem;
  }

  .bottombordere5 .child {
    font-size: 1.4rem;
    color: #454545;
  }

  .bottombordere5 {
    border: none;
  }

  .fl {
    float: left;
  }

  .mint-cell-value {
    width: 100% !important;
  }

  .mint-cell-value span {
    width: auto !important;
  }

  /*.mint-cell-wrapper {*/
    /*background-image: linear-gradient(180deg #de1515 #eaeaea 50% transparent 50%) !important;*/
  /*}*/

  .d_drugComponent {
    margin-top: 10rem;
  }

  .d_drugComponent img {
    margin: auto;
    vertical-align: middle;
    display: inline-block;
    width: 30%;
    margin-left: 36%;
  }

  .d_drugComponent p {
    text-align: center;
  }

  .d_drugComponent .d_nodata1 {
    color: #666666;
    font-size: 2rem;
  }

  .d_drugComponent .d_nodata2 {
    color: #999999;
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  .mint-cell-title {
    -webkit-box-flex: 0 !important;
    -ms-flex: 0 !important;
    flex: 0 !important;
  }

  .mint-cell-title {
    -webkit-box-flex: 0 !important;
    -ms-flex: 0 !important;
    flex: 0 !important;
  }

.mint-cell-wrapper{background-image:none!important;}

</style>
