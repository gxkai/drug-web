<template>
  <div>
    <new-layout>
      <template slot="top">
        <van-nav-bar
          :title="$route.meta.name"
          left-arrow
          @click-left="$router.go(-1)"
        />
      </template>
      <template slot="center">
        <new-wing-blank class="wrapper1">
          <div class="line1">
            <span>
              {{$t(order.state)}}
            </span>
          </div>
          <div class="line2">
            <span v-if="order.state==='TO_PAY'">
              超过<i>30分钟</i>未支付，订单将自动取消
            </span>
            <span v-if="order.state==='TO_DELIVERY'">
              医保不支持在线退单，如需退款请到备货门店自行退。
            </span>
          </div>
          <div class="line3" v-if="order.state==='TO_PAY'">
            <span>
               {{leftTime|countTimeConvert}}
            </span>
          </div>
          <new-white-space size="1rem"/>
          <div class="line4">
            <new-button
              fontSize="2em"
              color="#666666"
              borderColor="#666666"
              backgroundColor="white"
              name="取消订单"
              v-if="order.state==='TO_PAY'"
              @click.native="onCancel"
            />
            <new-button
              fontSize="2em"
              color="#666666"
              borderColor="#666666"
              backgroundColor="white"
              name="去付款"
              v-if="order.state==='TO_PAY'"
              @click.native="onPay"
            />
            <!--<new-button-->
              <!--fontSize="2em"-->
              <!--color="#666666"-->
              <!--borderColor="#666666"-->
              <!--backgroundColor="white"-->
              <!--name="申请退款"-->
              <!--v-if="order.state == 'TO_DELIVERY' && order.medicaid === true"-->
              <!--@click.native="onRefund"-->
            <!--/>-->
            <new-button
              fontSize="2em"
              color="#666666"
              borderColor="#666666"
              backgroundColor="white"
              name="确认收货"
              v-if="order.state == 'TO_RECEIVED'"
              @click.native="onConfirm"
            />
            <new-button
              fontSize="2em"
              color="#666666"
              borderColor="#666666"
              backgroundColor="white"
              name="查看配送"
              v-if="order.deliveryType == 'DELIVERY'"
              @click.native="onDelivery"
            />
            <new-button
              fontSize="2em"
              color="#666666"
              borderColor="#666666"
              backgroundColor="white"
              name="我要评价"
              v-if="order.state == 'TO_APPRAISE'"
              @click.native="onAppraise"
            />
          </div>
        </new-wing-blank>
        <new-white-space/>
        <new-left-title :text="shop.name" textColor="black"/>
        <new-wing-blank class="wrapper2">
          <div class="line line1">
            <van-icon name="shijian2" size=".5rem"/>
            <span>营业时间：{{shop.openTime}}-{{shop.closeTime}}</span>
          </div>
          <div class="line line2">
            <van-icon name="location" size=".5rem"/>
            <span>{{shop.address}}</span>
          </div>
          <new-white-space />
          <div class="line line3" @click="onCall()">
            <van-icon name="phone" size=".5rem" color="#FF0000"/>
            <span>
              拨打药房电话
            </span>
          </div>
        </new-wing-blank>
        <new-white-space/>
        <new-left-title text="订单详情" textColor="black"/>
        <new-wing-blank class="wrapper3">
          <div class="line line1">
            <span>
              订单编号：{{order.number}}
            </span>
          </div>
          <div class="line line2">
            <span>
              支付编号：{{order.payNumber}}
            </span>
          </div>
          <div class="line line3">
            <span>
              配送方式：{{$t(order.deliveryType)}}
            </span>
          </div>
          <div class="line line4">
            <span>
              支付方式：{{$t(order.payType)}}
            </span>
          </div>
          <div class="line line5">
            <span>
              下单时间：{{order.createdDate|timeConvert}}
            </span>
          </div>
          <div class="line line6">
            <span>
              买家留言：{{order.accountRemark}}
            </span>
          </div>
        </new-wing-blank>
        <new-white-space/>
        <new-left-title text="商品详情" textColor="black"/>
        <new-drug v-for="(item, index) in order.list" :key="index" :item="item"/>
        <new-wing-blank class="wrapper5 van-hairline--top">
          <div class="line line1">
            <span>
              商品总金额
            </span>
            <span>
              ¥{{order.totalAmount}}
            </span>
          </div>
          <div class="line line2">
            <span>
              医保扣除
            </span>
            <span>
              ¥{{order.medicaidAmount}}
            </span>
          </div>
          <div class="line line3">
            <span>
              实付金额
            </span>
            <span>
              ¥{{order.payAmount}}
            </span>
          </div>
        </new-wing-blank>
      </template>
    </new-layout>
    <van-popup v-model="show" position="bottom" class="pop">
      <new-wing-blank class="container">
        <div class="title">
          <span>
            选择退款原因
          </span>
        </div>
        <div class="item" v-for="(item, index) in reasons" :key="index" @click="reason=item">
          <span>
            {{item}}
          </span>
          <new-radio :radio="reason === item"/>
        </div>
      </new-wing-blank>
      <div class="button">
          <span>
            确认
          </span>
      </div>
    </van-popup>
  </div>

</template>

<style scoped type="text/scss" lang="scss">
  .pop {
    .container {
      display: grid;
      grid-row-gap: 30px;
      .title {
        justify-self: center;
        span {
          font-size:30px;
          font-weight:400;
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        span {
          font-size:24px;
          font-weight:400;
        }
      }
    }
    .button {
      margin-top: 50px;
      background-color: $themeColor;
      display: flex;
      justify-content: center;
      padding: 10px 0;
      span {
        font-size:30px;
        font-weight:400;
        color:white;
      }
    }
  }
  .wrapper5 {
    background-color: white;
    display: grid;
    align-content: space-evenly;
    height: 200px;
    .line {
      display: flex;
      justify-content: space-between;
      span {
        font-size:20px;
        font-weight:400;
        &:nth-child(2) {
          color: $themeColor;
        }
      }
    }
  }
  .wrapper4 {
    display: grid;
    grid-template-columns: 1fr 2fr;
    background-color: white;
    .right {
      display: grid;
      align-content: space-evenly;
      .line {
        display: flex;
        justify-content: space-between;
      }
      .line1 {
        span {
          font-size:20px;
          font-weight:400;
          &:nth-child(2) {
            color: $themeColor;
          }
        }
      }
      .line2 {
        span {
          font-size:20px;
          color: $greyColorLighter;
        }
      }
      .line3 {
        span {
          font-size:20px;
          font-weight:400;
          &:nth-child(1) {
            color: $themeColor;
          }
          &:nth-child(2) {
            color: $greyColorLighter;
          }
        }
      }
    }
  }
  .wrapper3 {
    background-color: white;
    display: grid;
    grid-row-gap: 20px;
    .line {
      span {
        color: $greyColor;
        font-size:23px;
        font-weight:400;
      }
    }
  }
  .wrapper2 {
    background: white;
    display: grid;
    .line1, .line2 {
      span {
        font-size:24px;
        font-weight:400;
        color: $greyColor;
      }
    }
    .line2 {
      margin-top: 10px;
    }
    .line3 {
      justify-self: center;
      margin-top: 10px;
      span {
        font-size: 23px;
        margin-left: 10px;
      }
    }
  }
  .wrapper1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    .line1 {
      span {
        color: $themeColor;
        font-size: 36px;
        font-weight: bold;
      }
    }
    .line2 {
      span {
        font-size: 24px;
        color: $greyColorLighter;
        i {
          color: $themeColor;
          font-style: normal;
          font-size: 24px;
        }
      }
    }
    .line3 {
      span {
        color: $greyColorLighter;
        font-size: 24px;
        font-weight: 400;
      }
    }
    .line4 {
      align-self: stretch;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        title: '订单详情',
        orderId: this.$route.params.orderId,
        show: false,
        order: {},
        timeLine: {},
        leftTime: 0,
        reasons: [
          '商品降价',
          '质量问题',
          '商品损坏',
          '缺少件',
          '其他原因'
        ],
        reason: '',
        timer: '',
        shop: {}
      };
    },
    components: {},
    computed: {
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      countTime() {
        // 获取当前时间
        var date = new Date();
        var now = date.getTime();
        // 设置截止时间
        var endDate = new Date(this.order.lastModifiedDate + 15 * 3600);
        var end = endDate.getTime();
        // 时间差
        var leftTime = end - now;
        if (leftTime > 0) {
          this.timer = setTimeout(this.countTime, 1000);
          this.leftTime = leftTime;
        } else {
          this.leftTime = '倒计时结束';
        }
      },
      onCall() {
        window.location.href = `tel:${this.order.shopPhone}`;
      },
      async initData() {
        this.$loading();
        this.order = await this.$http.get(`/orders/${this.orderId}`);
        console.log(this.order);
        this.countTime();
        this.shop = await this.$http.get(`/shops/${this.order.shopId}`);
        this.timeLine = await this.$http.get(`/orders/${this.orderId}/logs`);
        console.log(this.timeLine);
      },
      async onCancel() {
        await this.$http.put(`/orders/${this.order.id}/close`);
        this.order.state = 'CLOSED';
      },
      async onPay() {
        window.location.href = await this.$http.get(`/orders/${this.order.id}/pay`);
      },
      onRefund() {
        this.$router.push({ name: '/orderRefunds/create', params: { orderId: this.order.id } });
      },
      onDelivery() {
        this.$router.push({ name: '/orders/delivery', params: { orderId: this.order.id } });
      },
      onAppraise() {
        this.$router.push({ name: '/drugAppraises/create', params: { orderId: this.order.id } });
      },
      async onConfirm() {
        await this.$http.put(`/orders/${this.order.id}/complete`);
        this.order.state = 'TO_APPRAISE';
      }
    }
  };
</script>


