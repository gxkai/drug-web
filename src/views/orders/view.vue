<template>
  <div id="OrderDetails">
    <new-header :title="title">
      <router-link to="/orders?parameter=goods" slot="left" class="icon-font ic-arrow-right text-white">
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
        <span><i class="icon icon-font ic-qianbao"></i>千百</span>
      </div>
    </div>
    <div v-if="order.deliveryType === 'DELIVERY'" class="address-box is-flex flex-row flex-item p-lr-20">
      <div><i class=" icon-font ic-dizhi"></i></div>
      <div class="p-lr-20">
        <div><span>收货人：</span> <span>{{order.consignee}}</span><span>{{order.tel}}</span></div>
        <div><span>收货地址：</span> <span>{{order.address}}</span></div>
      </div>
    </div>

    <ul>
      <div @click="showShop(order.shopId)">{{order.shopName}}</div>
      <li v-if="order.hasRxDrug">
        <div class="p-lr-20">
          <span><img src="../../assets/image/prescription.png" class="is-35x35"/></span>
          <span>处方单</span>
          <span @click="setShowRx"><i class="icon icon-font icon-xiala"></i></span>
        </div>

        <div v-for="rxDrug in order.rxDrugs" v-show="showRx">
          <div class="text-right p-lr-20" @click="showRecipe(rxDrug.rxId)">查看处方></div>
          <refund-drug class="mt-10" :drugName="rxDrug.drugName" :spec="rxDrug.spec" :price="rxDrug.price"
                       :quantity="rxDrug.quantity" :isOtc="rxDrug.isOtc">
          </refund-drug>
        </div>
      </li>

      <li v-if="order.hasNorDrug">
        <div v-if="order.hasRxDrug" class="p-lr-20">
          <span><img src="../../assets/image/noprescription.png" class="is-35x35"/></span>
          <span>非处方单</span>
          <span @click="setShowNor"><i class="icon icon-font icon-xiala"></i></span>
        </div>
        <div v-for="item in order.norDrugs" v-show="showNor">
          <refund-drug class="mt-10" :drugName="item.drugName" :spec="item.spec" :price="item.price"
                       :quantity="item.quantity" :isOtc="item.isOtc">
          </refund-drug>
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

    <div v-if="order.state === 'TO_PAY'" class="change-box p-lr-20 is-flex flex-end m-tb-20">
      <div @click="showPay(order.id)">付款</div>
      <div @click="confirm(order.id, 'cancel', '是否取消订单？')">取消订单</div>
    </div>

    <div v-if="order.state === 'TO_DELIVERY'" class="change-box p-lr-20 is-flex flex-end m-tb-20">
      <div @click="showRefund(order.id)">退款</div>
      <div v-if="order.deliveryType === 'DELIVERY'" @click="remind(order.id)">提醒发货</div>
    </div>

    <div v-if="order.state === 'TO_RECEIVED'" class="change-box p-lr-20 is-flex flex-end m-tb-20">
      <div @click="showRefund(order.id)">退货</div>
      <div @click="confirm(order.id, 'confirm', '确认收货?')">确认收货</div>
      <div v-if="order.deliveryType === 'DELIVERY'" @click="showDelivery(order.id)">查看物流</div>
    </div>

    <div v-if="order.state === 'TO_APPRAISE'" class="change-box p-lr-20 is-flex flex-end m-tb-20">
      <div @click="showAppraise(order.id)">评价</div>
      <div @click="showRefund(order.id)">退货</div>
    </div>

    <div v-if="order.state === 'REFUND_COMPLETE'">
      <div>退款成功</div>
    </div>

    <div class="order-detail p-lr-20 is-flex flex-column flex-center">
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
            drugs: [
              {
                isOtc: true,
                imgUrl: 1,
                drugName: '药品名称',
                spec: '12/盒',
                quantity: '12',
                price: 58.5
              },
              {
                isOtc: false,
                imgUrl: 2,
                drugName: '药品名称药药药',
                spec: '12/盒',
                quantity: '13',
                price: 12.5
              }
            ]
          },
          norDrugs: [
            {
              isOtc: true,
              imgUrl: 1,
              drugName: '药品名称',
              spec: '12/盒',
              quantity: '12',
              price: 58.5
            },
            {
              isOtc: false,
              imgUrl: 2,
              drugName: '药品名称药药药',
              spec: '12/盒',
              quantity: '13',
              price: 12.5
            }
          ]
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
            // this.order = res.data;
            // this.order.createdDate = new Date(res.data.createdDate);
            // if (this.order.state === 'TO_PAY') {
            //   this.endTime = Date.parse(this.order.createdDate) + 1800 * 1000;
            //   this.startTime = Date.parse(new Date());
            //   if (this.endTime <= this.startTime) {
            //     this.order.state = 'CLOSED';
            //   }
            // }
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
  .change-box div{
    margin-left: 20px;
    border: 1px #1AB6FD solid;
    border-radius: 15px;
    color: #1AB6FD;
    padding: 2px 5px;
    box-sizing: border-box;
  }
  .m-tb-20{
    margin-top: 20px !important;
    margin-bottom: 20px !important;
  }
  .flex-end{
    justify-content: flex-end;
  }
  .flex-center{
    justify-content: center;
  }
  .order-detail{
    width:720px;
    height:162px;
    background:rgba(245,245,245,1);
  }
  .is-35x35{
    width: 35px;
    height: 35px;
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
  .flex-column{
    flex-direction: column;
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
  .mt-10{
    margin-top: 10px !important;
  }
  .price-box{
    width: 720px;
    height: 120px;
    background: rgba(245,245,245,1);
  }
  .address-box{
    width: 720px;
    height: 127px;
    border-bottom: #f5f5f5 1px solid;
  }
</style>


