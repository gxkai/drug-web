<template>
  <div>
    <!--<div class="orderSettlement">-->
      <!--<mt-header :title="name">-->
        <!--<router-link to="#" slot="left">-->
          <!--<mt-button icon="back" @click="$router.go(-1)"></mt-button>-->
        <!--</router-link>-->
      <!--</mt-header>-->
      <!--<router-link to="/orders/addresses" class="d_order_parent" v-if="needAddr" style="height:7.5rem;">-->

        <!--<div v-if="address" id="d_address">-->
          <!--<div><i class="icon iconfont ic-map" id="dizhi1"></i></div>-->

          <!--<div class="mt1">-->
            <!--<p class="elps">收货人：{{address.consignee}}{{address.tel}}</p>-->
            <!--<p class="elps">地<span class="d-inline-block width1"></span>址：{{address.area}} {{address.address}}</p>-->
          <!--</div>-->
          <!--<div>-->
            <!--&lt;!&ndash; <img src="static/img/orderRight.png" class="d_orderRight"/> &ndash;&gt;-->
            <!--<i class="icon iconfont ic-youjiantou" id="ic_youjiantou"></i>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div v-else id="d_address">-->
          <!--<div><i class="icon iconfont ic-map" id="dizhi1" style="color:#333333!important;"></i></div>-->
          <!--<div><p class="elps mt1" id="lh4">请维护您的地址</p></div>-->
          <!--<div>-->
            <!--&lt;!&ndash; <img src="static/img/orderRight.png" class="d_orderRight"/> &ndash;&gt;-->
            <!--<i class="icon iconfont ic-youjiantou" id="ic_youjiantou"></i>-->
          <!--</div>-->
        <!--</div>-->
        <!--<section class="bgw">-->
        <!--<img src="static/img/colorbackground.png" class="orderColorbg" v-if="needAddr"/>-->
      <!--</section>-->

      <!--</router-link>-->




      <!--<div v-for="(shop,shopI) in cartList" class="bgw">-->


        <!--<div class="parent width-96 marginAuto mt1 bgw pd1">-->
            <!--<span class="child d_order_fontsize">-->
                  <!--<i class="icon iconfont ic-shangchuanmoban" style="color:#333333!important;"></i>&nbsp;{{shop.shopName}}名称-->
            <!--</span>-->
        <!--</div>-->
        <!--<div v-for="(rx,rxI) in shop.rxs">-->
          <!--&lt;!&ndash; {{rx.id}} &ndash;&gt;-->
          <!--<p class="d_shopcar mt1  marginAuto d_neworders_p d_order_fontsize" v-if="rx.rxId" style="width: 97%;">-->
            <!--&lt;!&ndash;  <img src="static/img/prescription.png" class="width5"/>  &ndash;&gt;-->
            <!--<i class="icon iconfont ic-chufangdanluru" style="color:#13c1fe!important;"></i>-->
            <!--处方单-->
            <!--<span class="d_order_look">-->
            <!--<router-link :to="{path:'/rxs/view',query:{id:rx.drugs[rxI].id}}" id="prescription">查看处方</router-link>-->
            <!--</span>-->
          <!--</p>-->

          <!--<p class="d_shopcar mt1 marginAuto d_neworders_p d_order_fontsize" v-else-if="rx.drugs.length!==0" style="width: 97%;color:#13c1fe;">-->
            <!--&lt;!&ndash; <img src="static/img/not_prescription.png" class="width5"/> &ndash;&gt;-->
            <!--<i class="icon iconfont ic-jisongchufangdan" style="color:#333333!important;margin-right:5.5px;font-size:1.8rem;margin-left:5px;"></i>-->
            <!--非处方单-->
            <!--<span class="d_order_look">-->
            <!--<router-link :to="{path:'/rxs/view',query:{id:rx.drugs[rxI].id}}" id="prescription" class="text-13C1FE">查看处方</router-link>-->
            <!--</span>-->
          <!--</p>-->

          <!--<div class="drugComponent" style="background:#f5f5f5;width:100%;padding-bottom:0.8rem;">-->
            <!--<div v-for="(drug,drugI) in rx.drugs" class="drugComponent">-->

              <!--<div class="parent marginAuto d_drug">-->
                <!--<div class="rel width10 height10 bg-white">-->
                  <!--<div v-if="drug.isOtc === false" style="display:none;">-->
                    <!--<img src="static/img/chu.png" class="prescription">-->
                  <!--</div>-->
                  <!--<div v-else style="display:none;">-->
                    <!--<img src="static/img/fei.png" class="prescription">-->
                  <!--</div>-->
                  <!--<img v-lazy="drug.logo" class="d_shopdrugImg fr d_neworders_drug  mt2 ml2">-->
                <!--</div>-->
                <!--<div>-->
                  <!--<span class="elips mt2">{{drug.name}}</span>-->
                  <!--<span>规格：{{drug.spec}}</span>-->
                  <!--<span>¥{{drug.price}}</span>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<p style="height:3rem;line-height:14.5rem;text-align: right;margin-right: 2rem;font-size:1.2rem;">x{{drug.quantity}}</p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->


      <!--<div class="d_distribution" id="d_borderB" style="height:7.5rem;">-->
        <!--<div class="d_vermiddle d_neworders_p">-->
          <!--<div>-->
            <!--<i class="icon iconfont ic-peisongfangshi" style="color:#333333!important;margin-top:0.55rem;"></i>&nbsp;-->
            <!--<i style="margin-top:0.55rem;float:left;color:#454545;">配送方式</i>-->
          <!--</div>-->
          <!--<div class="delivery">-->
            <!--<span @click="delivery(0)" :class="{redactive:deliveryI==0}">送货</span>-->
            <!--<span @click="delivery(1)" :class="{redactive:deliveryI==1}">上门自提</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->


      <!--<div class="d_distribution">-->
        <!--<div class="d_vermiddle d_neworders_p d_vermiddle1">-->
          <!--<i class="icon iconfont ic-fjzhifufangshi" style="color:#333333!important;margin-left:5px;font-size:1.8rem;margin-top:0.55rem;"></i>&nbsp;-->
          <!--<i style="margin-top:0.55rem;float:left;color:#454545;margin-left:0.7rem;">支付方式</i>-->
        <!--</div>-->
        <!--<div class="d_vermiddle d_setapl" style="width:81%;">-->
                 <!--<span @click="alipay(0)">-->
                    <!--<img src="static/img/alopay.png" class="aplipyss" />-->
                    <!--<img src="static/img/checkalopay.png" v-if="payI===0" class="aplipys"/>-->
                 <!--</span>-->

          <!--<span @click="alipay(1)">-->
                  <!--<img src="static/img/wechat.png" class="aplipyss"/>-->
                  <!--<img src="static/img/checkwechat.png" v-if="payI===1" class="aplipys" style="margin-left:-1px;" />-->
                <!--</span>-->
        <!--</div>-->
      <!--</div>-->


      <!--<section style="height:14rem;">-->


        <!--&lt;!&ndash;<div class="d_vermiddle">&ndash;&gt;-->
        <!--&lt;!&ndash;<img src="static/img/invoice.png"/>发票信息 <span class="d_lookprescription">不需要</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<div style="overflow:hidden;height:33rem;">-->
          <!--<div style="background:white;width:100%;">-->
            <!--<ul class="d_pays" id="d_pays">-->
              <!--<li><strong>实付金额：</strong><span>¥{{amount}}</span></li>-->
              <!--<li>商品金额：<span>¥{{amount}}</span><em>（包含运费：0.00）</em></li>-->
              <!--<li>医保扣除：<span>￥0.00</span></li>-->
            <!--</ul>-->
          <!--</div>-->

          <!--<div style="background:white;width:100%;">-->
            <!--<ul style="height:8rem;" class="d_pays2">-->
              <!--<li><strong>医保信息</strong></li>-->
              <!--<li>姓名：李网云</li>-->
              <!--<li>医保卡：235689652396845</li>-->
              <!--<li>医保余额：￥986.53</li>-->
            <!--</ul>-->
          <!--</div>-->

        <!--</div>-->
      <!--</section>-->
    <!--</div>-->

    <!--<footer>-->
      <!--实付金额：<em>¥{{amount}}</em>&nbsp;&nbsp;-->
      <!--<span @click="commit()">提交订单</span>-->
    <!--</footer>-->
  </div>


</template>
<script>
  // import headGreen from 'components/headGreen';
  // import exception from 'static/js/exception';
  // import {Toast} from 'mint-ui';

  export default {
    name: 'orderSettlement',
    data() {
      return {
        name: '订单结算',
        alipayshow: false,
        alipayshow1: false,
        deliveryI: 0,
        payI: 0,
        cartList: [],
        cartIds: [],
        address: '',
        amount: 0,
        needAddr: true
      };
    },
    components: {
      // 'headGreen': headGreen,
      // accountId: '',
      // carts: []
    },
    created() {
      this.getData();
    },
    methods: {
      // addAddress: function (value) {
      //   this.address = value;
      // },
      // getData() {
      //   this.accountId = this.$store.getters.account.id;
      //   this.carts = JSON.parse(this.$route.query.carts);
      //   this.delivery(0);
      //   this.alipay(0);
      //   this.getCarts();
      //   this.getAddress();
      // },
      // getCarts() {
      //   this.cartList = this.carts.cartList;
      //   this.cartList.forEach(shop => {
      //     shop.rxs.forEach(rx => {
      //       rx.drugs.forEach(drug => {
      //         drug.picked = false;
      //         drug.logo = this.URL_PATH + '/files/' + drug.fileId + '/image?resolution=LARGE_LOGO';
      //       });
      //     });
      //   });
      //   this.cartIds = this.carts.cartIds;
      //   this.amount = this.carts.amount;
      // },
      // getAddress() {
      //   this.address = this.$storage.getStorage('address');
      //   this.$storage.removeStorage('address');
      //   if (!this.address) {
      //     this.$http.get(this.URL_PATH + '/addresses/default?', {
      //       headers: {
      //         'Authorization': this.$store.getters.token
      //       }
      //     })
      //       .then(res => {
      //         if (res.status === 200) {
      //           this.address = res.data;
      //         }
      //       });
      //   }
      // },
      // delivery(index) {
      //   this.deliveryI = index;
      //   if (index === 1) {
      //     this.needAddr = false;
      //   } else {
      //     this.needAddr = true;
      //   }
      // },
      // alipay(index) {
      //   this.payI = index;
      // },
      // commit() {
      //   if (this.needAddr === true && !this.address) {
      //     Toast({
      //       message: '请选择地址',
      //       position: 'middle',
      //       duration: 3000
      //     });
      //     return;
      //   }
      //   this.$http.post(this.URL_PATH + '/orders', {
      //     'addressId': this.needAddr === true ? this.address.id : null,
      //     'cartIds': this.cartIds,
      //     'deliveryType': this.deliveryI === 0 ? 'DELIVERY' : 'SELF',
      //     'payType': this.payI === 0 ? 'ALIPAY' : 'WECHAT_PAY'
      //   }, {
      //     headers: {
      //       'Authorization': this.$store.getters.token
      //     }
      //   })
      //     .then(res => {
      //       if (res.status === 200) {
      //         let str = '';
      //         res.data.forEach(e => {
      //           str += 'orderIds=' + e + '&';
      //         });
      //         str = str.substring(0, str.length - 1);
      //         this.$router.push({
      //           path: '/orders/pay?' + str
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       exception.message(error);
      //     });
      // }
    }
  };
</script>
<style scoped>

</style>

<!--<style scoped>-->
  <!--@import 'static/css/common.css'-->
  <!--@import 'static/scss/common.scss'-->

  <!--.orderSettlement {-->
    <!--width: 96%;-->
    <!--margin: auto;-->
  <!--}-->

  <!--.d_order_parent {-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--justify-content: space-between;-->
    <!--flex-wrap: wrap;-->
    <!--background: white;-->
  <!--}-->

  <!--.d_order_parent div:first-child {-->

    <!--text-align: left;-->
  <!--}-->

  <!--.d_order_parent div:nth-child(2) {-->
    <!--flex: 3;-->
  <!--}-->

  <!--.d_order_parent div:nth-child(3) {-->
    <!--flex: 1;-->
  <!--}-->

  <!--.orderColorbg {-->
    <!--width: 100%;-->
  <!--}-->

  <!--.d_vermiddle {-->
    <!--vertical-align: middle;-->
    <!--margin-bottom: 1rem;-->
    <!--margin-top: 1rem;-->
  <!--}-->

  <!--.delivery {-->
    <!--margin-top: 1rem;-->
    <!--padding-left: 5%;-->
  <!--}-->

  <!--.delivery span {-->
    <!--display: inline-block;-->
    <!--width: 30%;-->
    <!--height: 3rem;-->
    <!--line-height: 3rem;-->
    <!--border: 1px solid #bfbfbf;-->
    <!--color: #bfbfbf;-->
    <!--text-align: center;-->
    <!--border-radius: 5px;-->
    <!--margin-right: 1rem;-->
    <!--margin-bottom: 1rem;-->
  <!--}-->

  <!--.d_settul ul li {-->
    <!--border-bottom: 1px solid #e5e5e5;-->
    <!--height: 4rem;-->
    <!--line-height: 4rem;-->
  <!--}-->

  <!--.d_settul ul li:last-child {-->
    <!--border: none;-->
  <!--}-->

  <!--.d_settul ul li:first-child {-->
    <!--color: #333333;-->
  <!--}-->

  <!--.d_settul ul li span {-->
    <!--color: #ff0000;-->
  <!--}-->

  <!--footer {-->
    <!--position: fixed;-->
    <!--bottom: -0.5rem;-->
    <!--height: 4rem;-->
    <!--background: white;-->
    <!--text-align: right;-->
    <!--width: 100%;-->
    <!--line-height: 4rem;-->
  <!--}-->

  <!--footer em {-->
    <!--color: #f02b2b;-->
    <!--font-style: normal;-->
  <!--}-->

  <!--footer span {-->
    <!--background: #f02b2b;-->
    <!--color: white;-->
    <!--flex: 1;-->
    <!--padding: 1rem 1.3rem;-->
  <!--}-->

  <!--#alipay, #alipay1 {-->
    <!--width: 10%;-->
  <!--}-->

  <!--#alipay12, #alipay11 {-->
    <!--width: 15%;-->
  <!--}-->

  <!--.aplpay {-->
    <!--position: relative;-->
  <!--}-->

  <!--#alipay12 {-->
    <!--position: absolute;-->
    <!--left: 0px;-->
  <!--}-->

  <!--.d_setapl span {-->
    <!--margin-right: 15px;-->
    <!--position: relative;-->
  <!--}-->



  <!--.d_setapl img:nth-child(2) {-->
    <!--position: absolute;-->
    <!--width: 100%;-->
    <!--left: 0;-->
  <!--}-->

  <!--.d_order_parent .address {-->
    <!--width: 1rem;-->
    <!--text-align: center;-->
    <!--margin-left: 1rem;-->
    <!--margin-top: 0.8rem;-->
  <!--}-->

  <!--.d_orderRight {-->
    <!--float: right;-->
    <!--width: 0.8rem;-->
    <!--margin-top: 22%;-->
  <!--}-->

  <!--.elps {-->
    <!--width: 100%;-->
    <!--line-height: 2rem;-->
  <!--}-->

  <!--.redactive {-->
    <!--color: #f02b2b !important;-->
    <!--border: 1px solid #f02b2b !important;-->
  <!--}-->

  <!--em {-->
    <!--font-style: normal;-->
  <!--}-->
<!--</style>-->

<!--<style lang="scss" scoped>-->
  <!--.mint-cell-wrapper {-->
    <!--background-image: linear-gradient(180deg, white, white 50%, transparent 50%) !important;-->
  <!--}-->

  <!--.mint-header {-->
    <!--background: #1AB6FD;-->
  <!--}-->

  <!--em {-->
    <!--font-style: normal;-->
  <!--}-->

  <!--.gw_num {-->
    <!--border: 1px solid #dbdbdb;-->
    <!--width: 110px;-->
    <!--line-height: 26px;-->
    <!--overflow: hidden;-->
    <!--float: right;-->
    <!--margin-right: 2rem;-->
  <!--}-->

  <!--.gw_num em {-->
    <!--display: block;-->
    <!--height: 26px;-->
    <!--width: 26px;-->
    <!--float: left;-->
    <!--color: #7A7979;-->
    <!--border-right: 1px solid #dbdbdb;-->
    <!--text-align: center;-->
    <!--cursor: pointer;-->
  <!--}-->

  <!--.gw_num .num {-->
    <!--display: block;-->
    <!--float: left;-->
    <!--text-align: center;-->
    <!--width: 52px;-->
    <!--font-style: normal;-->
    <!--font-size: 14px;-->
    <!--line-height: 24px;-->
    <!--border: 0;-->
  <!--}-->

  <!--.gw_num em.add {-->
    <!--float: right;-->
    <!--border-right: 0;-->
    <!--border-left: 1px solid #dbdbdb;-->
  <!--}-->

  <!--@import 'static/scss/common.scss';-->
  <!--.drugComponent div:first-child p {-->
    <!--height: 3rem;-->
    <!--line-height: 3rem;-->
    <!--margin-top: 1rem;-->
  <!--}-->

  <!--.drugComponent div:first-child p:nth-child(2) {-->
    <!--margin-bottom: 1rem;-->
  <!--}-->

  <!--.drugComponent div:first-child p img {-->
    <!--width: 6%;-->
    <!--margin-top: 2px;-->
    <!--display: inline-block;-->
    <!--margin-top: 2px;-->
    <!--vertical-align: middle;-->
  <!--}-->

  <!--.drugComponent {-->
    <!--width: 96%;-->
    <!--margin: auto;-->
  <!--}-->

  <!--.d_shopdrugImg {-->
    <!--width: 64%;-->
  <!--}-->

  <!--.parent div:first-child img.prescription {-->
    <!--position: absolute;-->
    <!--width: 16%;-->
  <!--}-->

  <!--.parent div:first-child img:nth-child(2) {-->
    <!--width: 14%;-->
  <!--}-->

  <!--.parent div:nth-child(2) {-->
    <!--flex: 8;-->
    <!--margin-left: 1rem;-->
  <!--}-->

  <!--.parent div:nth-child(2) span:first-child {-->
    <!--color: #333333;-->
    <!--display: block;-->
    <!--font-size: 1.4rem;-->

  <!--}-->

  <!--.parent div:nth-child(2) span:nth-child(2) {-->
    <!--color: #999999;-->
    <!--display: block;-->
    <!--margin-top: 5px;-->
    <!--margin-bottom: 5px;-->
    <!--font-size: 1.2rem;-->
  <!--}-->

  <!--.parent div:nth-child(2) span:nth-child(3) {-->
    <!--color: #ff0000;-->
    <!--font-size: 1.3rem;-->
    <!--margin-top: 1rem;-->
    <!--display: inline-block;-->
  <!--}-->


  <!--.d_drug {-->
    <!--padding-top: 1rem;-->
    <!--padding-bottom: 0.2rem;-->
  <!--}-->

  <!--.d_drug div:nth-child(3) {-->
    <!--line-height: 8rem;-->
    <!--text-align: center;-->
    <!--flex: 3.5;-->
    <!--color: #999999;-->
  <!--}-->

  <!--i {-->
    <!--font-style: normal;-->
    <!--float: right;-->
    <!--color: #ff0000;-->
  <!--}-->

  <!--.drugComponent .p1 {-->
    <!--text-align: right;-->
    <!--margin-bottom: 2rem;-->
  <!--}-->

  <!--.d_drugdivBtn {-->
    <!--display: flex;-->
  <!--}-->

  <!--.d_drugdivBtn span:first-child {-->
    <!--border: none;-->
  <!--}-->

  <!--.d_drugdivBtn span {-->
    <!--flex: 1;-->
    <!--padding: 5px 0px;-->
    <!--text-align: center;-->
    <!--float: right;-->
    <!--border: 1px solid #bfbfbf;-->
    <!--border-radius: 5px;-->
    <!--justify-content: space-around;-->
    <!--margin-right: 5px;-->
  <!--}-->

  <!--.drugComponent {-->
    <!--width: 100%;-->
  <!--}-->

  <!--.mint-cell-value span {-->
    <!--width: 85% !important;-->
  <!--}-->

  <!--.mint-cell-swipe-button {-->
    <!--line-height: 10rem !important;-->
  <!--}-->

  <!--.mint-cell:last-child {-->
    <!--border: none !important;-->
    <!--background-image: none !important;-->
  <!--}-->

  <!--.fr {-->
    <!--float: right;-->
  <!--}-->

  <!--.fl {-->
    <!--float: left;-->
  <!--}-->

  <!--.mint-cell-swipe-button {-->
    <!--height: 100%;-->
    <!--display: inline-block;-->
    <!--line-height: 48px;-->
    <!--text-align: -webkit-center;-->
    <!--width: 6rem;-->
  <!--}-->

  <!--.ic-chufangdanluru, .ic-jisongchufangdan, .ic-fjzhifufangshi, .ic-peisongfangshi {-->
    <!--float: left;-->
    <!--color: #333333;-->
    <!--font-size: 2.2rem;-->
  <!--}-->

  <!--/* .ic-fjzhifufangshi,.ic-peisongfangshi{float: left;color: #333333;} */-->
  <!--.ic-shangchuanmoban, .ic-address, .ic-youjiantou {-->
    <!--color: #333333;-->
    <!--font-size: 2.2rem;-->
  <!--}-->

  <!--.d_neworders_drug {-->
    <!--width: 9rem !important;-->
    <!--float: left !important;-->
  <!--}-->

  <!--.d_neworders_p {-->
    <!--line-height: 2rem; /* border-bottom: 2px solid #e5e5e5; */-->
  <!--}-->

  <!--.child {-->
    <!--line-height: 2rem;-->
  <!--}-->

  <!--.ic-address {-->
    <!--float: left;-->
    <!--margin-left: 0.5rem;-->
  <!--}-->

  <!--.d_vermiddle, .drugComponent {-->
    <!--width: 96%;-->
    <!--margin: auto;-->
    <!--margin-top: 0.5rem;-->
  <!--}-->

  <!--.d_drug div:nth-child(3) p {-->
    <!--margin-right: 0px !important;-->
  <!--}-->

  <!--.d_settul {-->
    <!--margin-top: 2rem;-->
  <!--}-->

  <!--.d_vermiddle1 {-->
    <!--width: 100% !important;-->
    <!--margin-bottom: 1rem;-->
  <!--}-->

  <!--.d_order_fontsize {-->
    <!--font-size: 1.4rem;-->
  <!--}-->

  <!--.d_order_look {-->
    <!--float: right;-->
    <!--font-size: 1rem;-->
    <!--color: #ff0000;-->
  <!--}-->

  <!--.orderSettlement {-->
    <!--background: #f5f5f5;-->
  <!--}-->

  <!--.bgw {-->
    <!--background: white-->
  <!--}-->

  <!--.d_pays {-->
    <!--width: 98%;-->
    <!--margin: 1rem auto;-->
  <!--}-->

  <!--.d_pays li {-->
    <!--line-height: 4rem !important;-->
    <!--text-indent: 1rem !important;-->
    <!--border-bottom: 1px solid #f5f5f5;-->
    <!--height: 4rem;-->
  <!--}-->

  <!--.d_pays2 {-->
    <!--height: 10rem;-->
  <!--}-->

  <!--.d_pays2 li {-->
    <!--line-height: 4rem !important;-->
    <!--text-indent: 1.2rem !important;-->
    <!--height: 4rem;-->
    <!--border-bottom: 1px solid #f5f5f5;-->
  <!--}-->

  <!--.d_distribution {-->
    <!--width: 100%;-->
    <!--background: white;-->
  <!--}-->

  <!--#d_borderB {-->
    <!--border-bottom: 1px solid #f5f5f5;-->
  <!--}-->

  <!--#dizhi1 {-->
    <!--color: #333333;-->
    <!--margin-top:0.5em;-->
    <!--margin-right: 1.1rem;-->
  <!--}-->

  <!--#d_address {-->
    <!--display: flex;-->
    <!--width: 98%;-->
    <!--margin-left: 1%;-->
  <!--}-->

  <!--#d_address div:first-child {-->
    <!--flex: 0.3;-->
    <!--text-align: left;-->
    <!--line-height: 4rem;-->
  <!--}-->

  <!--#d_address div:first-child i {-->
    <!--font-size: 2rem;-->
   <!--}-->

  <!--#d_address div:nth-child(2) {-->
    <!--flex: 3;-->
    <!--overflow: hidden;-->
  <!--}-->

  <!--#ic_youjiantou {-->
   <!--margin-top: 2rem;-->
  <!--}-->

  <!--.pd1 {-->
    <!--padding-top: 1rem;-->
  <!--}-->

  <!--#lh4 {-->
    <!--line-height: 4rem;-->
  <!--}-->

  <!--#prescription {-->
    <!--color: #13c1fe;-->
  <!--}-->

  <!--#d_pays li span {-->
    <!--color: red;-->
  <!--}-->
  <!--.aplipys{width: 3.34rem;height:3.34rem;}-->
  <!--.aplipyss{width: 3.34rem;height:3.34rem;}-->
 <!--.elips{overflow: hidden;white-space:nowrap;text-overflow:ellipsis;display:block;width:159px;}-->
<!--</style>-->
