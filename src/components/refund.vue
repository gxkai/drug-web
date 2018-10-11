<template>
  <div class="item1">
    <div class="item1-content" v-if="order.type === 'HOSPITAL'">
      <div class="content1">
        <new-header bgColor="white" height="low" leftSize="medium" leftColor="black" rightColor=red  @click="onShop()">
          <div slot="left">
            <i class="iconfont ic-yaodian"></i>
          </div>
          <span slot="left">{{order.hospitalName}}</span>
          <span slot="right" class="text-l-30" v-if="order.refundState === null">{{order.state|transformOrderState}}</span>
          <span slot="right" class="text-l-30" v-if="order.refundState === 'REFUNDING'">{{transformRefundState(order.refundState)}}</span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE">
          <div slot="left">
            <i class="iconfont ic-chufangdanluru"></i>
          </div>
          <span slot="left" style="color: #13C1FE">处方单</span>
          <!--<span slot="right" @click="onRx()">查看处方></span>-->
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
              </div>
              <div class="quantity">
                x{{item.quantity}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item1-content" v-else>
      <div class="content1">
        <new-header bgColor="white" height="low" leftSize="small" leftColor="black" rightColor=red @click="onShop()">
          <div slot="left">
              <i class="iconfont ic-yaodian" slot="left"></i>
          </div>
          <span slot="left"  @click="onShop()" class="text-l-30">{{order.shopName}}</span>
          <span slot="right" class="text-l-30" v-if="order.refundState === null || order.refundState !== 'REFUNDING'">{{order.state|transformOrderState}}</span>
          <span slot="right" class="text-l-30" v-else>{{transformRefundState(order.refundState)}}</span>
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE" v-if="order.rxId">
          <div slot="left">
            <i class="iconfont ic-chufangdanluru"></i>
          </div>
          <span slot="left" style="color: #13C1FE" class="text-l-25">处方单</span>
          <!--<span slot="right" @click="onRx()">查看处方></span>-->
        </new-header>
        <new-header bgColor="rgba(246,246,246,1)" height="low" leftSize="small" leftColor="black"
                    rightColor="#13C1FE" v-else>
          <div slot="left">
            <i class="iconfont ic-chufangdanluru"></i>
          </div>
          <span slot="left" style="color: #13C1FE" class="text-l-25">非处方单</span>
        </new-header>

        <div class="slide-content" v-for="item in order.list">
          <div class="image">
            <div class="rx_mark" v-if="!item.otc">处</div>
            <img v-lazy="getImgURL(item.fileId,'LARGE_LOGO')">
          </div>
          <div class="text">
            <div class="top">
              <div class="name">{{item.name}}</div>
              <div class="spec">规格：{{item.spec}}</div>
            </div>
            <div class="bottom">
              <div class="price">
                ¥{{item.price}}
              </div>
              <div class="quantity">
                  x{{item.quantity}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order',
    props: ['order'],
    data() {
      return {};
    },
    created() {
    },
    computed: {},
    methods: {
      onRx() {
        this.$router.push({path: '/rxs/view', query: {rxId: this.order.rxId}});
      },
      onShop() {
        this.$router.push({path: '/shops/view', query: {shopId: this.order.shopId}});
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

  .slide-content .image img {
    width: 100%;
  }

  .chu {
    position: absolute;
    width: 42px;
    height: 25px;
    background: rgba(43, 178, 146, 1);
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 20px;
    border-radius: 20px;
  }

  .feichu {
    position: absolute;
    width: 60px;
    height: 30px;
    background: rgba(191, 191, 191, 1);
    font-size: 16px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
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
    font-size: 25px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .slide-content .text .top .spec {
    font-size: 25px;
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
    font-size: 26px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
    align-self: center;
  }

  .slide-content .text .bottom .quantity {
    font-size: 30px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
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
    appearance: none !important;
    width: 118px;
    height: 40px;
    background: white;
    border-radius: 20px;
    font-size: 20px;
    color: rgba(102, 102, 102, 1);
    outline: none;
    display: inline-block;
    -webkit-appearance: none !important;
    border: none;
    border: 1px solid #757575;
  }

  .item-bottom-button-active {
    color: rgb(19, 193, 254) !important;
    border: 1px solid rgb(19, 193, 254) !important;
  }

  .item1 {
    width: 720px;
  }

</style>
