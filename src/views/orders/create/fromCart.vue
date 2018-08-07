<template>
  <div class="main">
    <new-header title="订单结算">
      <div slot="left">
      <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="body">
      <router-link tag="div" to="/orders/addresses" v-if="deliveryType === 'DELIVERY'">
        <new-header bgColor="rgba(255,255,255,1)"  title="请维护地址" color = '666666' rightColor="#666666" v-if="JSON.stringify(this.receiveAddress) === '{}'">
          <i class="iconfont ic-youjiantou" slot="right"></i>
        </new-header>
        <new-header bgColor="rgba(255,255,255,1)" leftColor="#666666" rightColor="#666666" class="address" v-else>
          <i class="iconfont ic-dizhi" slot="left"></i>
          <div slot="center" class="center">
            <p>收货人：{{receiveAddress.consignee}} {{receiveAddress.phone}}</p>
            <p>地址：{{receiveAddress.address}}</p>
          </div>
          <i class="iconfont ic-youjiantou" slot="right"></i>
        </new-header>
        <img src="../../../assets/image/colorbackground.png">
      </router-link>
      <new-close-list :cartShops="cart.cartShops" class="new-close-list"></new-close-list>
      <div class="delivery">
        <div class="top">
          <i class="iconfont ic-peisongfangshi"></i>
          <span>配送方式</span>
        </div>
        <div class="bottom">
          <button :class="{active:deliveryType=='DELIVERY'}" @click.stop="onDeliveryType('DELIVERY')">送货</button>
          <button :class="{active:deliveryType=='SELF'}" @click.stop="onDeliveryType('SELF')">上门自提</button>
        </div>
      </div>
      <div class="pay">
        <div class="top">
          <i class="iconfont ic-fjzhifufangshi"></i>
          <span>支付方式</span>
        </div>
        <div class="bottom">
          <div>
            <div v-if="payType === 'WECHAT_PAY'">
              <img src="../../../assets/image/alopay.png" @click.stop="onPayType('ALIPAY')">
              <img src="../../../assets/image/checkwechat.png">
            </div>
            <div v-else>
              <img src="../../../assets/image/checkalopay.png">
              <img src="../../../assets/image/wechat.png" @click.stop="onPayType('WECHAT_PAY')">
            </div>
          </div>
        </div>
      </div>
      <div class="amount">
        <div>
          <span>实付金额：</span>
          <span>￥{{cart.payAmount}}</span>
        </div>
        <div>
          <span>商品金额：</span>
          <span>￥{{cart.amount}}</span>
          <span>(包含运费：0.00)</span>
        </div>
        <div>
          <span>医保扣除：</span>
          <span>￥{{cart.medicaidAmount}}</span>
        </div>
      </div>

      <div class="medical">
        <div>
          <span>医保信息</span>
        </div>
        <new-line></new-line>
        <div class="medical-info" v-if="account.medicaidNumber">
          <div>
            <span>姓名：{{account.name}}</span>
          </div>
          <div>
            <span>医保卡：{{account.medicaidNumber}}</span>
          </div>
          <div>
            <span>医保卡余额：￥0</span>
          </div>
        </div>
        <div v-else>
          <new-header height="low" bgColor="white" leftColor="black">
            <i class="iconfont ic-qianbao" slot="left"></i>
            <span slot="left" class="medical-bangding">医保卡绑定</span>
          </new-header>
          <div class="medical-qubangding" @click="$router.push('/accounts/bind')">
            <a>去绑定医保卡</a>
            <button>去绑定</button>
          </div>
        </div>
      </div>

    </div>
    <footer>
      <div class="right">
        <div class="left">
          <span>实付金额:</span>
          <span>￥{{cart.payAmount}}</span>
        </div>
        <button @click.stop="onOrder()">提交订单</button>
      </div>
    </footer>
  </div>


</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {MessageBox} from 'mint-ui';
  export default {
    name: 'createFromCart',
    data() {
      return {
        name: '订单结算',
        account: this.$store.getters.account,
        cart: JSON.parse(this.$route.query.cart),
        deliveryType: this.$storage.get('deliveryType') || 'SELF',
        payType: 'ALIPAY'
      };
    },
    components: {},
    created() {
      this.getData();
    },
    computed: {
      ...mapGetters(['receiveAddress'])
    },
    methods: {
      getData() {
        if (JSON.stringify(this.receiveAddress) === '{}') {
          this.$http.get('addresses/default').then(res => {
            if (res.data) {
              this.setReceiveAddress(res.data);
            }
          }).catch(error => {
            this.exception(error);
          });
        }
      },
      /**
       * 获取购物车ID数组
       * @returns {Array}
       */
      getCartIds() {
        let cartIds = [];
        this.cart.cartShops.forEach(e => {
          e.rxs.forEach(e => {
            e.drugs.forEach(e => {
              cartIds.push(e.cartId);
            });
          });
        });
        return cartIds;
      },
      onOrder() {
        if (this.deliveryType === 'DELIVERY' && JSON.stringify(this.receiveAddress) === '{}') {
          MessageBox('提示', '请维护收货地址').then(action => {});
        } else {
          let data = {
            'addressId': this.receiveAddress.id,
            'cartIds': this.getCartIds(),
            'deliveryType': this.deliveryType,
            'payType': this.payType
          };
          this.$http.post('/orders', data).then(res => {
            let str = '';
            res.data.forEach(e => {
              str += 'orderIds=' + e + '&';
            });
            str = str.substring(0, str.length - 1);
            this.$router.push({
              path: '/orders/pay?' + str + '&deliveryType=' + this.deliveryType
            });
          }).catch(error => {
            this.exception(error);
          });
        }
      },
      onDeliveryType(item) {
        this.deliveryType = item;
      },
      onPayType(item) {
        this.payType = item;
      },
      ...mapMutations({
        setReceiveAddress: 'SET_RECEIVE_ADDRESS'
      })
    }
  };
</script>
<style scoped>
  .main {
    background-color: rgba(246, 246, 246, 1);
    height: 100vh;
    width: 720px;
  }

  .body {
    width: 720px;
    height: calc(100vh - 100px - 130px);
    overflow: auto;
  }

  .address .center {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .delivery, .pay {
    background-color: rgba(255, 255, 255, 1);
    margin-bottom: 10px;
    height: 160px;
  }

  .delivery .top {
    display: flex;
    align-items: center;
  }

  .delivery .top i {
    margin-left: 10px;
    margin-right: 10px;
  }

  .delivery .bottom {
    margin-left: 72px;
  }

  .delivery .bottom button {
    width: 146px;
    height: 55px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    outline: none;
    border-width: 2px;
  }

  .delivery .bottom .active {
    border-color: #F02B2B;
    color: rgba(240, 43, 43, 1);
  }

  .pay .top {
    display: flex;
    align-items: center;
  }

  .pay .top i {
    margin-left: 10px;
    margin-right: 10px;
  }

  .pay .bottom {
    margin-left: 72px;
  }

  .pay .bottom img {
    width: 67px;
    height: 67px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }

  .iconfont {
    font-size: 50px;
  }

  .amount {
    width: 720px;
    height: 160px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 0px 0px rgba(230, 230, 230, 0.52);
    margin-bottom: 10px;
    padding: 20px;
  }

  .amount div > span:nth-child(1) {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .amount div > span:nth-child(2) {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
  }

  .amount div > span:nth-child(3) {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .medical {
    width: 720px;
    height: 260px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 0px 0px rgba(230, 230, 230, 1);
    margin-bottom: 10px;
  }

  .medical > div:nth-child(1) {
    padding: 20px;
  }

  .medical > div:nth-child(1) > span {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .medical-info {
    padding: 20px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }

  .medical-info div {
    margin-bottom: 5px;
  }

  /**
  脚部
   */

  footer {
    display: flex;
    height: 100px;
    width: 720px;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
  }

  footer .right {
    display: flex;
    justify-content: center;
  }

  footer .right .left {
    align-self: center;
  }

  footer .right .left span:nth-child(1) {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }

  footer .right .left span:nth-child(2) {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: #F02B2B;
  }

  footer .right button {
    width: 214px;
    height: 100px;
    box-sizing: border-box;
    background: rgba(240, 43, 43, 1);
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    border: 0;
    outline: none;
  }


  .medical-bangding {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(69,69,69,1);
    margin-left: 10px;
  }
  .ic-qianbao {
    font-size: 24px;
  }

  .medical-qubangding a{
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
    text-decoration: underline;
    margin-left: 68px;
  }
  .medical-qubangding button {
    width:132px;
    height:36px;
    background:rgba(19,193,254,1);
    box-shadow:2px 1px 2px rgba(0,0,0,0.33);
    font-size:22px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    line-height: 10px;
    border-radius: 50px;
    outline: none;
    border: 0;
  }
</style>

