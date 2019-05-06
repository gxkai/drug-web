<template>
  <div>
    <new-layout>
      <template id="mount-point" slot="center">
        <new-white-space />
        <div class="orderState-wrapper">
          <div class="line1">
            <van-icon
              v-if="order.state === 'TO_DELIVERY'"
              name="peijizhong-"
              size=".56rem"
              color="#d7000e"
            />
            <van-icon
              v-if="order.state === 'TO_APPRAISE'"
              name="daipingjia-"
              size=".56rem"
              color="#d7000e"
            />
            <van-icon
              v-if="order.state === 'TO_PAY'"
              name="daifukuan-"
              size=".56rem"
              color="#d7000e"
            />
            <van-icon
              v-if="order.state === 'TO_RECEIVED'"
              name="daishouhuo-"
              size=".56rem"
              color="#d7000e"
            />
            <span>
              {{ $t(order.state) }}
            </span>
          </div>
          <div v-if="order.state === 'TO_PAY'" class="line2">
            超过<span>30分钟</span>未支付，订单将自动取消。
          </div>
          <!--<div v-if="order.state === 'TO_DELIVERY'" class="line2">-->
          <!--医保不支持在线退单，如需退款请到备货，门店自行退。-->
          <!--</div>-->
        </div>
        <new-white-space />
        <div
          class="header-wrapper hairline-bottom"
          @click="loadPageShopsView(shop.id)"
        >
          <span>
            <van-icon name="yaodian-" size=".5rem" />
            {{ shop.name }}
          </span>
        </div>
        <div class="shopInfo-wrapper hairline-bottom">
          <div class="line line1">
            <span>
              <van-icon name="shijian" color="#d7000e" />
              {{ `营业时间：${shop.openTime}-${shop.closeTime}` }}
            </span>
          </div>
          <div class="line line2" @click="onLocation(shop)">
            <span>
              <van-icon name="dingwei-" color="#d7000e" />
              {{ `营业地址：${shop.address}` }}
            </span>
          </div>
        </div>
        <div class="wrapper4" @click="onCall()">
          <span>
            <van-icon name="dianhua-" color="#d7000e" />
            拨打药房电话
          </span>
        </div>
        <new-white-space />
        <div v-for="(rx, index) in order.list" :key="index">
          <div class="header-wrapper">
            <div class="left">
              <van-icon name="dingdan-" color="#d7000e" />
              <span>
                订单详情
              </span>
            </div>
            <div class="right" v-if="isRx(rx.id)" @click="clickRx">
              <van-icon name="chufang-" color="#d7000e" />
            </div>
          </div>
          <new-drug
            v-for="(item, index) in rx.list"
            :key="index"
            :item="item"
          />
        </div>
        <new-white-space />
        <info-cell
          :desc="`￥${order.totalAmount}`"
          title="商品总金额"
          color="#d7000e"
        />
        <info-cell
          :desc="`￥${order.medicaidAmount}`"
          title="医保扣除"
          color="#d7000e"
        />
        <info-cell
          :desc="`￥${order.payAmount}`"
          title="实付金额"
          color="#d7000e"
        />
        <new-white-space />
        <info-cell :desc="`${order.number}`" title="订单编号" color="#999999" />
        <info-cell
          :desc="`${order.payNumber}`"
          title="支付编号"
          color="#999999"
        />
        <info-cell
          :desc="`${$t(order.deliveryType)}`"
          title="配送方式"
          color="#999999"
        />
        <info-cell
          :desc="`${$t(order.payType)}`"
          title="支付方式"
          color="#999999"
        />
        <info-cell
          :desc="`${dateFmt(order.createdDate, 'YYYY-MM-DD hh:mm:ss')}`"
          title="下单时间"
          color="#999999"
        />
        <new-white-space />
        <div v-show="order.state === 'TO_PAY'" class="left-wrapper">
          <span v-if="leftTime > 0">
            剩余
            <i>
              {{ leftTime | dateFmt("mm分钟ss秒") }}
            </i>
          </span>
          <span v-else>
            倒计时结束!
          </span>
        </div>
        <div
          v-if="order.state !== 'CLOSED' && order.state !== 'TO_DELIVERY'"
          class="buttons-wrapper"
        >
          <div
            v-if="order.state === 'TO_PAY'"
            class="item"
            @click="onCancel(order)"
          >
            <span>
              取消订单
            </span>
          </div>
          <div
            v-if="order.state === 'TO_PAY'"
            class="item"
            @click="onPay(order)"
          >
            <span>
              去付款
            </span>
          </div>
          <div
            v-if="order.state == 'TO_RECEIVED'"
            class="item"
            @click="onConfirm(order)"
          >
            <span>
              确认收货
            </span>
          </div>
          <div
            v-if="order.state == 'TO_RECEIVED'"
            class="item"
            @click="onQrCode(order)"
          >
            <span>
              二维码收货
            </span>
          </div>
          <div
            v-if="order.state == 'TO_APPRAISE'"
            class="item"
            @click="onAppraise(order)"
          >
            <span>
              我要评价
            </span>
          </div>
          <!--<div-->
          <!--v-if="order.state == 'TO_DELIVERY' && !order.medicaid"-->
          <!--class="item"-->
          <!--@click="onRefund"-->
          <!--&gt;-->
          <!--<span>-->
          <!--退款-->
          <!--</span>-->
          <!--</div>-->
        </div>
      </template>
    </new-layout>
    <refund-pop v-model="refundShow" :order.sync="order" />
    <van-popup v-model="show" position="center">
      <img v-lazy="qrCode" />
    </van-popup>
  </div>
</template>

<style scoped type="text/scss" lang="scss">
.refund-wrapper {
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    span {
      width: 500px;
      height: 80px;
      background-color: #d7000e;
      border-radius: 25px;
      font-size: 36px;
      color: #ffffff;
      text-align: center;
      line-height: 80px;
    }
  }
  ul {
    li {
      display: grid;
      grid-template-columns: 1fr auto;
      padding: 20px 22px;
      span {
        color: $gray-dark;
        font-size: 27px;
      }
    }
  }
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    span {
      font-size: 36px;
      color: $gray-dark;
    }
    position: relative;
    .close-icon {
      position: absolute;
      top: 32px;
      right: 22px;
    }
  }
}

.left-wrapper {
  background-color: white;
  padding-left: 20px;
  padding-top: 20px;
  span {
    font-size: $size-small;
    i {
      color: #ff0000;
    }
  }
}
.buttons-wrapper {
  background-color: white;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    margin-left: 10px;
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    border: solid 1px #bfbfbf;
    span {
      font-size: $size-normal;
      color: $gray;
    }
  }
}
.header-wrapper {
  background-color: white;
  padding: 20px 37px !important;
  display: flex;
  justify-content: space-between;
}
.wrapper4 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: white;
  span {
    font-size: $size-normal;
    color: $gray-dark;
  }
}
.shopInfo-wrapper {
  background-color: white;
  padding: 20px 50px !important;
  .line {
    span {
      font-size: $size-mini;
      color: $gray;
    }
  }
  .line2 {
    margin-top: 10px;
  }
}
.orderState-wrapper {
  background-color: white;
  padding: 20px 35px;
  .line1 {
    span {
      font-size: 36px;
    }
  }
  .line2 {
    margin-top: 10px;
    font-size: $size-mini;
    color: $gray-light;
    span {
      color: $theme;
      font-size: $size-mini;
    }
  }
}
</style>
<script>
import orderIndex from '@/mixins/orders';
import infoCell from '@/components/orders/infoCell';
import refundPop from '@/components/orders/refundPop';
export default {
  components: {
    infoCell,
    refundPop
  },
  mixins: [orderIndex],
  data() {
    return {
      title: '订单详情',
      orderId: this.$route.query.orderId,
      order: {},
      timeLine: {},
      leftTime: 0,
      timer: '',
      shop: {}
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  mounted() {},
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    countTime() {
      // 获取当前时间
      var date = new Date();
      var now = date.getTime();
      // 设置截止时间
      var endDate = new Date(this.order.lastModifiedDate + 15 * 60 * 1000);
      var end = endDate.getTime();
      // 时间差
      var leftTime = end - now;
      if (leftTime > 0) {
        this.timer = setTimeout(this.countTime, 1000);
        this.leftTime = leftTime;
      } else {
        this.leftTime = 0;
      }
    },
    onCall() {
      window.location.href = `tel:${this.order.shopPhone}`;
    },
    onLocation(shop) {
      this.loadPageIframe(
        this.jumpToBaidu(shop.name, shop.address, shop.lat, shop.lng),
        '药店导航'
      );
    },
    async initData() {
      this.order = await this.$http.get(`/api/orders/${this.orderId}`);
      console.log(this.order);
      this.countTime();
      this.shop = await this.$http.get(`/api/shops/${this.order.shopId}`);
      this.timeLine = await this.$http.get(`/api/orders/${this.orderId}/logs`);
      console.log(this.timeLine);
    },
    clickRx() {
      let rxIds = this.order.list.map(e => e.id);
      this.loadPageRxsSwipeView(rxIds);
    }
  }
};
</script>
