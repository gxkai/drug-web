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
        <div class="address" v-else>
          <div>
            <i class="iconfont ic-dizhi"></i>
          </div>
          <div>
            <div class="text-l-25 elps">
              收货人：{{receiveAddress.consignee}} {{receiveAddress.phone}}
            </div>
            <div class="text-l-25 elps">
              地址：{{receiveAddress.address}}
            </div>
          </div>
          <div>
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </div>
        <img src="../../../assets/image/colorbackground.png" class="image-bar">
      </router-link>
      <new-close-shop :shopInfo="shopDrugSpecOrderDTO" class="new-close-normal"></new-close-shop>
      <div class="delivery">
        <div class="top">
          <div>
            <i class="iconfont ic-peisongfangshi"></i>
          </div>
          <span class="text-l-30">配送方式</span>
        </div>
        <div class="bottom">
          <div :class="{active:deliveryType=='DELIVERY'}"
               @click.stop="onDeliveryType('DELIVERY')"
          v-if="isBlank(shopDrugSpecOrderDTO.rxId)">送货上门</div>
          <div :class="{active:deliveryType=='SELF'}" @click.stop="onDeliveryType('SELF')">上门自提</div>
        </div>
      </div>
      <div class="pay">
        <div class="top">
          <div>
            <i class="iconfont ic-fjzhifufangshi"></i>
          </div>
          <span class="text-l-30">支付方式</span>
        </div>
        <div class="bottom mt-l-10">
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
          <span>￥{{shopDrugSpecOrderDTO.payAmount}}</span>
        </div>
        <div>
          <span>商品金额：</span>
          <span>￥{{shopDrugSpecOrderDTO.amount}}</span>
        </div>
        <div>
          <span>医保扣除：</span>
          <span>￥{{shopDrugSpecOrderDTO.medicaidAmount}}</span>
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
          </div>
        </div>
      </div>
      <div class="coupon" v-if="isBlank(shopDrugSpecOrderDTO.rxId)">
        <div class="coupon_link">
          <div class="coupon_link_left">优惠券</div>
          <div class="coupon_link_right">
            <div v-if="isNotBlank(couponRecord)">
               满{{couponRecord.amount}}减{{couponRecord.minus}}
            </div>
            <div @click="show = true">
              <i class="iconfont ic-youjiantou"></i>
            </div>
          </div>
        </div>
        <div class="coupon_popup">
          <van-popup v-model="show" position="bottom">
            <div class="coupon_popup-container">
              <div class="coupon_popup-container-title text-l-30">
                使用优惠券
              </div>
              <div class="coupon_popup-container-list">
                <div class="coupon_popup-container-list-item"
                v-for="(item,key) in coupons"
                :key="key"
                @click="couponRecord = item;show = false">
                  <div class="text-l-28">
                    满{{item.amount}}减{{item.minus}}
                  </div>
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
    </div>
    <footer>
      <div class="right">
        <div class="left">
          <span>实付金额:</span>
          <span>￥{{shopDrugSpecOrderDTO.payAmount}}</span>
        </div>
        <button @click.stop="onOrder()">提交订单</button>
      </div>
    </footer>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { MessageBox } from 'mint-ui';
  // TODO 处方药店下单多个药品优惠券抵扣问题
  export default {
    name: 'createFromCart',
    data() {
      return {
        name: '订单结算',
        account: this.$store.getters.account,
        orderShopDrugSpecDTO: JSON.parse(this.$route.query.orderShopDrugSpecDTO),
        shopDrugSpecOrderDTO: {},
        deliveryType: this.$storage.get('deliveryType') || 'SELF',
        payType: 'ALIPAY',
        couponRecord: '',
        coupons: [],
        show: false
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
        this.$http.post('orders/shop/get', this.orderShopDrugSpecDTO)
          .then(res => {
            this.shopDrugSpecOrderDTO = res.data;
          })
          .catch(err => {
            this.exception(err);
          });
        this.$http.get('couponRecords/order')
          .then(res => {
            this.coupons = res.data;
          })
          .catch(err => {
            this.exception(err);
          });
      },
      onOrder() {
        if (this.deliveryType === 'DELIVERY' && JSON.stringify(this.receiveAddress) === '{}') {
          MessageBox('提示', '请维护收货地址').then(action => {
          });
        } else {
          let json = {};
          json.addressId = this.receiveAddress.id;
          json.orderShopDrugSpecDTO = this.orderShopDrugSpecDTO;
          json.deliveryType = this.deliveryType;
          json.payType = this.payType;
          json.couponRecordId = this.couponRecord.id;
          this.$http.post('/orders/shop', json).then(res => {
            console.log(res.data);
            this.$router.replace({
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
<style scoped type="text/less" lang="less">
  .coupon {
    &_link {
      display: flex;
      background-color: white;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      div {
        font-size: 30px;
      }
      &_right {
        display: flex;
        align-items: center;
        color: #999999;
      }
    }
    &_popup {
      &-container {
        height: 400px;
        overflow: auto;
        &-title {
          padding: 30px 0;
          text-align: center;
        }
        &-list {
          padding: 20px;
          &-item {
            text-align: center;
            border-bottom: 1PX solid #999999;
          }
        }
      }
    }
  }
</style>
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
    display: flex;
    padding: 10px 0 0 70px;
  }

  .delivery .bottom div {
    background: rgba(255, 255, 255, 1);
    border: 1PX solid #cccccc;
    border-radius: 4px;
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    padding: 5px 10px;
  }
  .delivery .bottom div:nth-child(2) {
    margin-left: 10px;
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
    width: 80px;
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
    top: 18px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #13C1FE;
  }

  /*设置选中的input的样式*/
  /* + 是兄弟选择器,获取选中后的label元素*/
  input:checked + label {
    background-color: #13C1FE;
    border: 1px solid #13C1FE;
  }

  input:checked + label::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 10px;
    top: 3px;
    left: 9px !important;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg)
  }

  .address {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }

  .address > div:nth-child(1) {
    width: 10%;
    margin-left: 10px;
  }

  .address > div:nth-child(2) {
    width: 80%;
  }

  .address > div:nth-child(2) > div:nth-child(1) {
    margin-top: 10px;
  }

  .address > div:nth-child(2) > div:nth-child(2) {
    margin-top: 10px;
  }

  .address > div:nth-child(3) {
    width: 10%;
  }

  .address .iconfont {
    font-size: 50px;
  }

  .image-bar {
    width: 100%;
  }

</style>

