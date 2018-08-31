<template>
  <div class="item1">
    <div class="item1-content" v-if="order.type === 'HOSPITAL'">
      <div class="content1">
        <new-header bgColor="white" height="low" leftSize="small" leftColor="black" rightColor="red">
          <div slot="left">
            <i class="iconfont ic-yaodian" ></i>
          </div>
          <span slot="left" @click.stop="onShop()" class="text-l-30">{{order.hospitalName}}</span>
          <span slot="right" class="text-l-30">{{order.state|transformOrderState}}</span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE">
          <div slot="left">
            <i class="iconfont ic-chufangdanluru" ></i>
          </div>
          <span slot="left" style="color: #13C1FE" class="text-l-30"> 处方单</span>
          <span slot="right" @click="onRx()" class="text-l-30">查看处方></span>
        </new-header>

        <div class="slide-content" v-for="item in order.list">
          <div class="image">
            <img :src="getImgURL(item.fileId, 'MIDDLE_LOGO')">
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
                  <span class="text-l-30 mr-l-10">x{{item.quantity}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <div>
          <div class="item-bottom-price">
            <span>共计{{order.list.length}}件商品 合计{{order.amount.toFixed(2)}}</span>
          </div>
          <div>
            <div class="item-bottom-buttons">
              <button @click="onCancel()" v-if="order.state == 'TO_PAY'">取消订单</button>
              <button @click="onPay()" v-if="order.state == 'TO_PAY'">我要付款</button>
              <button class="item-bottom-button-active" @click="onRefund()" v-if="order.state == 'TO_CHECK' || order.state == 'TO_DELIVERY' ||order.state ==  'TO_RECEIVED' || order.state == 'TO_APPRAISE' ||order.state ==  'COMPLETED'">申请退款</button>
              <button class="item-bottom-button-active" @click="onConfirm()" v-if="order.state == 'TO_RECEIVED'">确认收货</button>
              <button @click="onDetail()">订单详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item1-content" v-else>
      <div class="content1">
        <new-header bgColor="white" height="low" leftSize="small" leftColor="black" rightColor="red">
          <div slot="left">
            <i class="iconfont ic-yaodian" ></i>
          </div>
          <span slot="left" @click.stop="onShop()" class="text-l-30">{{order.shopName}}</span>
          <span slot="right" class="text-l-30">{{order.state|transformOrderState}}</span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE" v-if="order.rxId">
          <div slot="left">
            <i class="iconfont ic-chufangdanluru"></i>
          </div>
          <span slot="left" style="color: #13C1FE" class="text-l-30"> 处方单</span>
          <span slot="right" @click="onRx()" class="text-l-30">查看处方></span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE" v-else>
          <div slot="left">
            <i class="iconfont ic-chufangdanluru" ></i>
          </div>
          <span slot="left" style="color: #13C1FE" class="text-l-30">非处方单</span>
        </new-header>

        <div class="slide-content" v-for="item in order.list" @click="onDrug(item)">
          <div class="image">
            <div class="chu" v-if="item.otc">非</div>
            <div class="feichu" v-else>处</div>
            <img :src="getImgURL(item.fileId,'LARGE_LOGO')">
          </div>
          <div class="text">
            <div class="top">
              <div class="name text-l-30">{{item.name}}</div>
              <div class="spec text-l-30">规格：{{item.spec}}</div>
            </div>
            <div class="bottom">
              <div class="price">
                <span class="text-l-30">¥{{item.price.toFixed(2)}}</span>
              </div>
              <div class="quantity">
                <div>
                  <span class="text-l-30 mr-l-10">x{{item.quantity}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-bottom">
        <div>
          <div class="item-bottom-price">
            <span class="text-l-30">共计{{order.list.length}}件商品 合计{{order.amount.toFixed(2)}}</span>
          </div>
          <div>
            <div class="item-bottom-buttons">
              <button @click="onCancel()" v-if="order.state == 'TO_PAY'">取消订单</button>
              <button @click="onPay()" v-if="order.state == 'TO_PAY'">我要付款</button>
              <button class="item-bottom-button-active" @click="onRefund()" v-if="order.state == 'TO_CHECK' || order.state == 'TO_DELIVERY' || order.state == 'TO_RECEIVED' || order.state =='TO_APPRAISE' ||order.state == 'COMPLETED'">申请退款</button>
              <button class="item-bottom-button-active" @click="onConfirm()" v-if="order.state == 'TO_RECEIVED'">确认收货</button>
              <button @click="onDelivery()"  v-if="order.deliveryType == 'DELIVERY' && (order.state == 'TO_RECEIVED' ||order.state ==  'TO_APPRAISE' ||order.state ==  'COMPLETED' ||order.state ==  'REFUNDING')">查看配送</button>
              <button @click="onAppraise()" v-if="order.state == 'TO_APPRAISE'">我要评价</button>
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
      console.log(this.order.state);
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
      onDrug(item) {
        this.$router.push({path: '/shopDrugSpecs', query: {shopDrugSpecId: item.shopDrugSpecId}});
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
          if (this.order.type === 'HOSPITAL') {
            this.order.state = 'COMPLETED';
          } else {
            this.order.state = 'TO_APPRAISE';
          }
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
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);
    align-self: center;
    position: relative;
  }

  .slide-content .image img{
    width: 100%;
  }

  .chu {
    position: absolute;
    width:42px;
    height:24px;
    background:rgba(43,178,146,1);
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 20px;
    border-radius: 21px/12px;
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
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .slide-content .text .top .spec {
    font-size: 30px;
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
    font-size: 30px;
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
    font-size: 30px;
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
    justify-content: space-around;
  }

  .item-bottom-price {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .item-bottom-price>span:nth-child(1) {
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    margin-right: 20px;
  }
  .item-bottom-buttons {
    width: 720px;
    display: flex;
    justify-content: flex-end;
  }

  .item-bottom-buttons button {
    appearance:none!important;
    background: white;
    padding: 5px ;
    border-radius: 20px;
    font-size: 25px;
    color: rgba(102, 102, 102, 1);
    outline: none;
    -webkit-appearance: none!important;
    border: none;
    border:1px solid #757575;
    margin-left: 10px;
    padding: 5px 15px;
  }
  .item-bottom-buttons button:nth-last-child(1) {
    margin-right: 20px;
  }

  .item-bottom-button-active {
    color: rgb(19, 193, 254) !important;
    border:1px solid rgb(19, 193, 254)!important;
  }
  .item1{
    width: 720px;
  }
  .ic-yaodian{
    font-size: 36px;
  }
  .item1{
    border-bottom: 6px solid #F6F6F6;
  }
</style>
