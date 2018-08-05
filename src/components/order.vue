<template>
  <div class="item1">
    <div class="item1-content" v-if="order.type === 'HOSPITAL'">
      <div class="content1">
        <new-header bgColor="white" height="low" leftSize="small" leftColor="black" rightColor=red>
          <div slot="left" style="display: flex;align-items: center" @click="onShop()">
            <i class="iconfont ic-yaodian"></i>
            <span style="color: black">{{order.hospitalName}}</span>
          </div>
          <span slot="right">{{order.state|transformOrderState}}</span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE">
          <i class="iconfont ic-chufangdanluru" slot="left"></i>
          <span slot="left" style="color: #13C1FE">处方单</span>
          <span slot="right" @click="onRx()">查看处方></span>
        </new-header>

        <div class="slide-content" v-for="item in order.list">
          <div class="image">
            <img v-lazy="getImgURL(item.fileId, 'MIDDLE_LOGO')">
          </div>
          <div class="text">
            <div class="top">
              <div class="name">{{item.name}}</div>
              <div class="spec">规格：{{item.spec}}/{{item.unit}}</div>
            </div>
            <div class="bottom">
              <div class="price">
                <span></span>
              </div>
              <div class="quantity">
                <div>
                  <span>x{{item.quantity}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <div>
          <div class="item-bottom-price">
            <span>总计{{order.amount}}(含运费)</span>
          </div>
          <div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_PAY'">
              <button @click="onCancel()">取消订单</button>
              <button class="item-bottom-button-active" @click="onPay()">付款</button>
              <button @click="onDetail()">订单详情</button>
            </div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_APPRAISE'">
              <button @click="onDelivery()">查看物流</button>
              <button @click="onAppraise()">追加评价</button>
              <button @click="onDetail()">订单详情</button>
            </div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_RECEIVED'">
              <button class="item-bottom-button-active" @click="onRefund()">申请退款</button>
              <button class="item-bottom-button-active" @click="onConfirm()">确认收货</button>
              <button @click="onDelivery()">查看物流</button>
              <button @click="onDetail()">订单详情</button>
            </div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_DELIVERY'">
              <button class="item-bottom-button-active" @click="onRefund()">申请退款</button>
              <button @click="onDelivery()">查看物流</button>
              <button @click="onRemind()">提醒发货</button>
              <button @click="onDetail()">订单详情</button>
            </div>
            <div class="item-bottom-buttons" v-if="order.state == 'COMPLETED'">
              <button @click="onDelivery()">查看物流</button>
              <button @click="onAppraise()">追加评价</button>
              <button @click="onDetail()">订单详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item1-content" v-else>
      <div class="content1">
        <new-header bgColor="white" height="low" leftSize="small" leftColor="black" rightColor=red>
          <div slot="left" style="display: flex;align-items: center"  @click="onShop()">
            <i class="iconfont ic-yaodian" slot="left"></i>
            <span slot="left" style="color: black">{{order.shopName}}</span>
          </div>
          <span slot="right">{{order.state|transformOrderState}}</span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE" v-if="order.rxId">
          <i class="iconfont ic-chufangdanluru" slot="left"></i>
          <span slot="left" style="color: #13C1FE">处方单</span>
          <span slot="right" @click="onRx()">查看处方></span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE" v-else>
          <i class="iconfont ic-chufangdanluru" slot="left"></i>
          <span slot="left" style="color: #13C1FE">非处方单</span>
        </new-header>

        <div class="slide-content" v-for="item in order.list">
          <div class="image">
            <div class="chu" v-if="item.otc">处</div>
            <div class="feichu" v-else>非</div>
            <img v-lazy="item.logo">
          </div>
          <div class="text">
            <div class="top">
              <div class="name">{{item.name}}</div>
              <div class="spec">规格：{{item.spec}}</div>
            </div>
            <div class="bottom">
              <div class="price">
                <span>¥{{item.price}}</span>
              </div>
              <div class="quantity">
                <div>
                  <span>x{{item.quantity}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <div>
          <div class="item-bottom-price">
            <span>总计{{order.amount}}(含运费)</span>
          </div>
          <div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_PAY'">
              <button @click="onCancel()">取消订单</button>
              <button class="item-bottom-button-active" @click="onPay()">付款</button>
              <button @click="onDetail()">订单详情</button>
            </div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_APPRAISE' || order.state == 'COMPLETED'">
              <button @click="onDelivery()">查看物流</button>
              <button @click="onAppraise()">追加评价</button>
              <button @click="onDetail()">订单详情</button>
            </div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_RECEIVED'">
              <button class="item-bottom-button-active" @click="onRefund()">申请退款</button>
              <button class="item-bottom-button-active" @click="onConfirm()">确认收货</button>
              <button @click="onDelivery()">查看物流</button>
              <button @click="onDetail()">订单详情</button>
            </div>
            <div class="item-bottom-buttons" v-if="order.state == 'TO_DELIVERY'">
              <button class="item-bottom-button-active" @click="onRefund()">申请退款</button>
              <button @click="onDelivery()">查看物流</button>
              <button @click="onRemind()">提醒发货</button>
              <button @click="onDetail()">订单详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  export default {
    name: 'order',
    props: ['order'],
    data() {
      return {};
    },
    created() {
      this.order.list.forEach(e => {
        e.logo = this.getImgURL(e.fileId, 'LARGE_LOGO');
      });
      this.emitOrder();
    },
    computed: {
    },
    methods: {
      emitOrder() {
        this.$emit('update:order', this.order);
      },
      onCancel() {
        this.$http.put('/orders/' + this.order.id + '/close').then(res => {
          this.order.state = 'CLOSED';
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      },
      onRx() {
        this.$router.push({path: '/rxs/view', query: {rxId: this.order.rxId}});
      },
      onShop() {
        this.$router.push({path: '/shops/view', query: {shopId: this.order.shopId}});
      },
      onDetail() {
        this.$router.push({path: '/orders/view', query: {orderId: this.order.id}});
      },
      onPay() {
        this.$router.push({path: '/orders/pay', query: {orderIds: this.order.id}});
      },
      onRefund() {
        this.$router.push({path: '/orderRefunds/create', query: {orderId: this.order.id}});
      },
      onDelivery() {
        this.$router.push({path: '/orders/delivery', query: {orderId: this.order.id}});
      },
      onAppraise() {
        this.$router.push({path: '/drugAppraises/create', query: {orderId: this.order.id}});
      },
      onRemind() {
        MessageBox.alert('提醒发货成功！', '提示');
      },
      onConfirm() {
        this.$http.put('/orders/' + this.order.id + '/complete').then(res => {
          this.order.state = 'TO_APPRAISE';
          this.emitOrder();
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    mounted() {
    }
  };
</script>

<style scoped>

  /*滑块样式*/
  .slide-content {
    width: 720px;
    height: 215px;
    background: rgba(246, 246, 246, 1);
    display: flex;
    margin-bottom: 20px;
    padding-left: 40px;
    padding-bottom: 20px;
  }

  .slide-content .image {
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);
    align-self: center;
    position: relative;
  }

  .chu {
    position: absolute;
    width:42px;
    height:25px;
    background:rgba(43,178,146,1);
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 20px;
    border-radius: 20px;
  }

  .feichu {
    position: absolute;
    width:60px;
    height:30px;
    background:rgba(191,191,191,1);
    font-size:16px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    text-align: center;
    line-height: 30px;
    border-radius: 30px/15px;
  }

  .slide-content .text {
    padding-left: 20px;
  }

  .slide-content .text .top {
    height: 105px;
    width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slide-content .text .top .name {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .slide-content .text .top .spec {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
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
    font-family: HiraginoSansGB-W3;
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
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .item-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 720px;
    height: 113px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 8px 4px rgba(0, 0, 0, 0.14);
    justify-content: space-around;
    padding-right: 20px;
  }

  .item-bottom-price {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .item-bottom-buttons button {
    appearance:none!important;
    width: 118px;
    height: 40px;
    background: white;
    border-radius: 20px;
    font-size: 20px;
    color: rgba(102, 102, 102, 1);
    outline: none;
    display: inline-block;
    -webkit-appearance: none!important;
    border: none;
    border:1px solid #757575;
  }

  .item-bottom-button-active {
    color: rgb(19, 193, 254) !important;
    border:1px solid rgb(19, 193, 254)!important;
  }
  .item1{
    width: 720px;
  }

</style>
