<template>
  <div id="OrderDetails">
    <new-header :title="title">
      <router-link to="/orders?parameter=goods" slot="left" class="iconfont ic-arrow-right text-white">
      </router-link>
    </new-header>

    <div class="order-type is-flex flex-row flex-item flex-sb p-lr-20">
      <span class="text-white">{{userPrompt[order.state]}}</span>
      <span v-if="order.state === 'TO_PAY'">
          <img src="../../assets/image/order/payfor.png" class="is-175x160">
      </span>
      <span v-if="order.state === 'TO_DELIVERY'">
          <img src="../../assets/image/order/payfor1.png" class="is-175x160">
      </span>
      <span v-if="order.state === 'TO_RECEIVED'">
          <img src="../../assets/image/order/alerdyshipped.png" class="is-175x160">
      </span>
      <div v-if="order.state === 'TO_PAY'">
        <span>剩</span>
        <!-- TODO 倒计时-->
        <!--<count-down v-on:end_callback="countDownE_cb"-->
                    <!--:currentTime="startTime" :startTime="startTime" :endTime="endTime" hourTxt="小时" minutesTxt="分"-->
                    <!--secondsTxt="秒"></count-down>-->
        <span>自动关闭</span>
        <span><i class="icon iconfont ic-qianbao"></i>千百</span>
      </div>
    </div>
    <!--<div class="J_OrderDetails_receipt3"><img src="static/img/knowledge_icon/knowledge-right.png" alt=""></div>-->

    <div v-if="order.deliveryType === 'DELIVERY'" class="is-flex flex-row flex-item p-lr-20">
      <div><i class=" iconfont ic-dizhi"></i></div>
      <div class="p-lr-20">
        <div><span>收货人：</span> <span>{{order.consignee}}</span><span>{{order.tel}}</span></div>
        <div><span>收货地址：</span> <span>{{order.address}}</span></div>
      </div>
    </div>

    <ul>
      <div @click="showShop(order.shopId)">{{order.shopName}}</div>
      <li v-if="order.hasRxDrug">
        <div class="J_OrderDetails_ispf">
          <span><img src="static/img/prescription.png"/></span>
          <span>处方单</span>
          <span @click="setShowRx"><i class="icon iconfont icon-xiala"></i></span>
        </div>

        <div v-for="rxDrug in order.rxDrugs" v-show="showRx">
          {{rxDrug}}
          <!--<div @click="showRecipe(rxDrug.rxId)">查看处方></div>-->
          <!--<div v-for="item in rxDrug.drugs" style="width: 100%;display: block;">-->
            <!--<div>-->
              <!--<img v-lazy="item.imgUrl">-->
              <!--<img v-if="item.otc" src="static/img/chu.png">-->
              <!--<img v-else src="static/img/fei.png">-->
            <!--</div>-->
            <!--<div>-->
              <!--<div>{{item.drugName}}</div>-->
              <!--<div>-->
                <!--<span>规格：{{item.spec}}</span>-->
                <!--<span>X {{item.quantity}}</span>-->
              <!--</div>-->
              <!--<div>¥{{item.price}}</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </li>

      <li v-if="order.hasNorDrug">
        <div v-if="order.hasRxDrug">
          <span><img src="static/img/noprescription.png"/></span>
          <span>非处方单</span>
          <span @click="setShowNor"><i class="icon iconfont icon-xiala"></i></span>
        </div>

        <div v-for="item in order.norDrugs" v-show="showNor">
          <!--<div>-->
            <!--<img v-lazy="item.imgUrl">-->
            <!--<img v-if="!item.otc" src="static/img/chu.png">-->
            <!--<img v-else src="static/img/fei.png">-->
          <!--</div>-->
          <!--<div>-->
            <!--<div>{{item.drugName}}</div>-->
            <!--<div>-->
              <!--<span>规格：{{item.spec}}</span>-->
              <!--<span>X {{item.quantity}}</span>-->
            <!--</div>-->
            <!--<div>¥{{item.price}}</div>-->
          <!--</div>-->
        </div>
      </li>

    </ul>
    <div class="price-box p-lr-20">
      <div class="is-flex flex-sb">
        <span>订单总价:</span>
        <span>￥{{order.totalAmount | formatAmount}}</span>
      </div>
      <div class="is-flex flex-sb">
        <span>医保扣除:</span>
        <span class="text-red">￥{{order.medicaidAmount | formatAmount}}</span>
      </div>
      <div class="is-flex flex-sb">
        <span>需付款:</span>
        <span class="text-red">￥{{order.totalAmount | formatAmount}}</span>
      </div>
    </div>

    <div v-if="order.state === 'TO_PAY'">
      <div @click="showPay(order.id)">付款</div>
      <div @click="confirm(order.id, 'cancel', '是否取消订单？')">取消订单</div>
    </div>

    <div v-if="order.state === 'TO_DELIVERY'">
      <div @click="showRefund(order.id)">退款</div>
      <div v-if="order.deliveryType === 'DELIVERY'" @click="remind(order.id)">提醒发货</div>
    </div>

    <div v-if="order.state === 'TO_RECEIVED'">
      <div @click="showRefund(order.id)">退货</div>
      <div @click="confirm(order.id, 'confirm', '确认收货?')">确认收货</div>
      <div v-if="order.deliveryType === 'DELIVERY'" @click="showDelivery(order.id)">查看物流</div>
    </div>

    <div v-if="order.state === 'TO_APPRAISE'">
      <div @click="showAppraise(order.id)">评价</div>
      <div @click="showRefund(order.id)">退货</div>
    </div>

    <div v-if="order.state === 'REFUND_COMPLETE'">
      <div>退款成功</div>
    </div>

    <div class="order-detail p-lr-20">
      <div>
        <span>订单编号:</span>
        <span>{{order.number}}</span>
      </div>
      <div class="" v-if="order.payNo">
        <span>支付宝交易号:</span>
        <span>{{order.payNo}}</span>
      </div>
      <div>
        <span>创建时间:</span>
        <span>{{order.createdDate|moment('YYYY-MM-DD HH:mm:ss')}}</span>
      </div>
    </div>
    <div v-if="order.state === 'COMPLETED' || order.state === 'CLOSED'">
      <div @click="confirm(order.id, 'del', '是否删除订单？')">删除订单</div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        title: '订单详情',
        orderId: '',
        // orderNumber: 14,
        order: {
          id: 12,
          state: 'TO_RECEIVED',
          deliveryType: 'DELIVERY',
          consignee: '收货人xx',
          address: '收货地址xxxx',
          totalAmount: '85.5',
          medicaidAmount: '12',
          payNo: 'No1231231',
          number: 'No1231231123',
          createdDate: '2017-12-30',
          hasRxDrug: true,
          hasNorDrug: true,
          rxDrugs: {
            drugs: {
              isOtc: true,
              imgUrl: 1,
              drugName: '药品名称',
              spec: '12/盒',
              quantity: '12',
              price: 58.5
            }
          }
        },
        userPrompt: {
          'TO_PAY': '等待买家付款',
          'TO_DELIVERY': '买家已付款',
          'TO_RECEIVED': '卖家已发货',
          'TO_APPRAISE': '待评价',
          'COMPLETED': '已完成',
          'REFUNDING': '退货中',
          'REFUND_COMPLETE': '退货成功',
          'CLOSED': '交易关闭'
        },
        endTime: '',
        startTime: '',
        showRx: true,
        showNor: true
      };
    },
    components: {
    },
    methods: {
      initData() {
        this.$http.get('/orders/' + this.orderId)
          .then(res => {
            console.log(res.data);
            // this.order = res.data;
            // this.order.createdDate = new Date(res.data.createdDate);
            // if (this.order.state === 'TO_PAY') {
            //   this.endTime = Date.parse(this.order.createdDate) + 1800 * 1000;
            //   this.startTime = Date.parse(new Date());
            //   if (this.endTime <= this.startTime) {
            //     this.order.state = 'CLOSED';
            //   }
            // }
            // showOrderPics(this);
          });
      },
      countDownE_cb() {
        this.order.state = 'CLOSED';
      },
      setShowRx() {
        this.showRx = !this.showRx;
      },
      setShowNor() {
        this.showNor = !this.showNor;
      },
      showPay(id) {
        let ids = [];
        ids.push(id);
        this.$router.push({path: '/orders/pay', query: {orderIds: JSON.stringify(ids)}});
      },
      showRefund(id) {
        this.$router.push({path: '/orderRefunds/create', query: {orderId: id}});
      },
      showAppraise(id) {
        this.$router.push({path: '/drugAppraises/create', query: {orderId: id}});
      },
      showDelivery(id) {
        this.$router.push({path: '/orders/delivery', query: {orderId: id}});
      },
      showRecipe(rxId) {
        this.$router.push({path: '/rxs/view', query: {id: rxId}});
      },
      showShop(shopId) {
        this.$router.push({path: '/shops/view', query: {shopId: shopId}});
      },
      remind(id) {
        MessageBox.alert('提醒发货成功！', '提示');
      },
      confirm(id, type, text) {
        MessageBox.confirm(text).then(action => {
          if (type === 'confirm') {
            this.confirmOrder(id);
          }
          if (type === 'cancel') {
            this.cancel(id);
          }
          if (type === 'del') {
            this.del(id);
          }
        });
      },
      cancel(id) {
        this.$http.put('/orders/' + id + '/close1')
          .then(res => {
            this.order.state = 'CLOSED';
          }).catch((e) => {
            MessageBox.alert('取消失败！', '提示');
          });
      },
      confirmOrder(id) {
        this.$http.put('/orders/' + id + '/complete')
          .then(res => {
            this.order.state = 'TO_APPRAISE';
          }).catch((e) => {
            MessageBox.alert('确认收货失败！', '提示');
          });
      },
      del(id) {
        this.$http.delete('/orders/' + id)
          .then(res => {
            this.$router.push({path: '/orders'});
          }).catch((e) => {
            MessageBox.alert('删除失败！', '提示');
          });
      }
    },
    created() {
      this.orderId = this.$route.query.orderId;
      this.initData();
    }
  };
</script>

<style scoped>
  .order-detail{
    width:720px;
    height:162px;
    background:rgba(245,245,245,1);
  }
  .is-175x160{
    width: 175px;
    height: 160px;
  }
  .order-type{
    width: 720px;
    height: 160px;
    background: #13c1fe;
  }
  .is-flex{
    display: flex !important;
  }
  .flex-row{
    flex-direction: row;
  }
  .flex-item{
    align-items: center;
  }
  .flex-sb{
    justify-content: space-between;
  }
  .p-lr-20{
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .price-box{
    width: 720px;
    height: 120px;
    background: rgba(245,245,245,1);
  }

</style>


