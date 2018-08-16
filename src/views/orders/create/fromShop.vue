<template>
  <div class="main">
    <new-header title="订单结算">
      <div slot="left" @click.stop="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>
    <div class="body">
      <router-link tag="div" to="/orders/addresses" v-if="deliveryType === 'DELIVERY'">
        <new-header bgColor="rgba(255,255,255,1)" title="请维护地址" color='666666' rightColor="#666666"
                    v-if="JSON.stringify(this.receiveAddress) === '{}'">
          <div slot="right">
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </new-header>
        <new-header bgColor="rgba(255,255,255,1)" leftColor="#666666" rightColor="#666666" class="address" v-else>
          <div slot="left">
            <i class="iconfont ic-dizhi"></i>
          </div>
          <div slot="center" class="center">
            <p>收货人：{{receiveAddress.consignee}} {{receiveAddress.phone}}</p>
            <p>地址：{{receiveAddress.address}}</p>
          </div>
          <div slot="right">
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </new-header>
        <img src="../../../assets/image/colorbackground.png">
      </router-link>
      <new-close-normal :shopInfo="shopInfo" class="new-close-normal"></new-close-normal>
      <div class="delivery">
        <div class="top">
          <div>
            <i class="iconfont ic-peisongfangshi"></i>
          </div>
          <span>配送方式</span>
        </div>
        <div class="bottom">
          <button :class="{active:deliveryType=='DELIVERY'}" @click.stop="onDeliveryType('DELIVERY')">送货</button>
          <button :class="{active:deliveryType=='SELF'}" @click.stop="onDeliveryType('SELF')">上门自提</button>
        </div>
      </div>
      <div class="pay">
        <div class="top">
          <div>
            <i class="iconfont ic-fjzhifufangshi"></i>
          </div>
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
          <span>￥{{shopInfo.payAmount.toFixed(2)}}</span>
        </div>
        <div>
          <span>商品金额：</span>
          <span>￥{{shopInfo.amount.toFixed(2)}}</span>
        </div>
        <div>
          <span>医保扣除rwew：</span>
          <span>￥{{shopInfo.medicaidAmount.toFixed(2)}}</span>
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
            <div slot="left">
              <i class="iconfont ic-qianbao"></i>
            </div>
            <span slot="left" class="medical-bangding">医保卡绑定</span>
          </new-header>
          <div class="medical-qubangding" @click="$router.push('/accounts/card/bind')">
            <a>去绑定医保卡</a>
            <button>去绑定</button>
          </div>
        </div>
      </div>
     <!--点击优惠券开始-->
      <div class="bg-white width-percent-100 height-l-90 line-height-l-90">
        <div class="bg-white coupons width-percent-94 m-auto">
          <span class="d-inline-block fl">优惠券</span>
          <span class="d-inline-block fr" @click="coupon()"><i class="iconfont ic-youjiantou"></i></span>
        </div>
      </div>
      <div id="whole" v-show="show"></div>
      <transition v-show="show" name="slide-fades">
        <div class="new-coupons bg-white" v-show="show">
          <div class="use-coupon">
            使用优惠券
          </div>
          <div>
            <ul class="coupon-ul">
              <li v-for="(item,index) in coupons">
                满{{item.amount}}减{{item.minus}}
                <span class="fr pr-50">
                    <input type="radio" :value="item.id" v-model="checkedValue" name="radio" :id="item.id"/>
                     <label :for="item.id"></label>
                </span>
              </li>
            </ul>
          </div>
          <div class="coupon-close" @click="close()" v-show="show">
            关闭 <input type="hidden" v-model="checkedValue"/>
          </div>
        </div>
      </transition>
      <!--点击优惠券结束-->
   </div>
   <footer>
      <div class="right">
        <div class="left">
          <span>实付金额:</span>
          <span>￥{{shopInfo.payAmount.toFixed(2)}}</span>
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
        shopDrugSpecId: this.$route.query.shopDrugSpecId,
        quantity: this.$route.query.quantity,
        deliveryType: this.$storage.get('deliveryType') || 'SELF',
        payType: 'ALIPAY',
        shopInfo: [],
        coupons: [],
        checkedValue: '',
        show: false
      };
    },
    components: {},
    created() {
      this.getData();
      this.$http.get('couponRecords/order')
        .then(res => {
          this.coupons = res.data;
        });
    },
    computed: {
      ...mapGetters(['receiveAddress'])
    },
    methods: {
      close() {
        this.show = !this.show;
      },
      coupon() {
        this.show = !this.show;
      },
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

        this.$http.get('/orders/shopDrugSpec?shopDrugSpecId=' +
          this.shopDrugSpecId + '&quantity=' + this.quantity)
          .then(res => {
            this.shopInfo = res.data;
          }).catch((error) => {
            this.exception(error);
          });
      },
      onOrder() {
        if (this.deliveryType === 'DELIVERY' && JSON.stringify(this.receiveAddress) === '{}') {
          MessageBox('提示', '请维护收货地址').then(action => {
          });
        } else {
          let data = {
            'addressId': this.receiveAddress.id,
            'shopDrugSpecId': this.shopDrugSpecId,
            'quantity': this.quantity,
            'deliveryType': this.deliveryType,
            'payType': this.payType,
            'couponRecordId': this.couponRecordId
          };
          this.$http.post('/orders/shopDrugSpec', data).then(res => {
            this.$router.push({
              path: '/orders/pay?orderIds=' + res.data + '&deliveryType=' + this.deliveryType
            });
          }).catch(error => {
            this.exception(error);
          });
        }
      },
      onDeliveryType(item) {
        this.deliveryType = item;
        this.$storage.set('deliveryType', item);
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
    margin-right: 20px;
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
    background: rgba(240, 43, 43, 1);
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    border: 0;
    outline: none;
  }

  .medical-bangding {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(69, 69, 69, 1);
    margin-left: 10px;
  }

  .ic-qianbao {
    font-size: 24px;
  }

  .medical-qubangding a {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(19, 193, 254, 1);
    text-decoration: underline;
    margin-left: 68px;
  }

  .medical-qubangding button {
    width: 132px;
    height: 36px;
    background: rgba(19, 193, 254, 1);
    box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.33);
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    line-height: 10px;
    border-radius: 50px;
    outline: none;
    border: 0;
  }

  /*优惠券样式*/
  /*定义进入过渡的结束状态*/
  .slide-fades-enter-active {
    transition: all 0.5s ease;

  }

  /* 定义离开过渡的结束状态*/
  .slide-fades-leave-active {
    transition: all 0.5s ease;
  }

  /*离开过渡的结束状态*/
  .slide-fades-leave-active {
    bottom: 0rem !important;
  }

  .slide-fades-leave-to {
    bottom: -28rem !important;
  }

  /*进入过渡的开始状*/
  .slide-fades-enter {
    bottom: -22rem !important;
  }

  .new-coupons {
    position: absolute;
    bottom: 0px;
    z-index: 99999;
    width: 720px;
    height: 441px;
    background: rgba(255, 255, 255, 1);
  }

  .coupon-close {
    width: 720px;
    height: 64px;
    background: rgba(19, 193, 254, 1);
    color: white;
    text-align: center;
    line-height: 64px;
    font-size: 30px;
    z-index: 99999;
    bottom: 0px;
    position: absolute;
  }

  .use-coupon {
    width: 720px;
    height: 82px;
    line-height: 82px;
    text-align: center;
    font-size: 30px;
  }

  .mint-radio-label {
    font-size: 24px !important;
  }

  input[type='radio'] {
    font-size: 24px !important;
  }

  .coupon-ul {
    height: 220px;
    overflow-y: scroll;
  }

  .coupon-ul li {
    font-size: 24px;
    text-indent: 21px;
    color: #999999;
    height: 84px;
    line-height: 84px;
    position: relative;

  }



  input[type="radio"] {
    width: 25px;
    height: 25px;
    opacity: 0;
  }

  label {
    position: absolute;
    top:18px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #13C1FE;
  }

  /*设置选中的input的样式*/
  /* + 是兄弟选择器,获取选中后的label元素*/
  input:checked+label {
    background-color: #13C1FE;
    border: 1px solid #13C1FE;
  }

  input:checked+label::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 3px;
    left: 9px!important;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
  }
</style>

