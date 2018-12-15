<template>
  <new-layout class="delivery">
   <template slot="top">
     <van-nav-bar
       :title="$route.name"
       left-arrow
       @click-left="$router.go(-1)"
     />
   </template>

    <template slot="center">
      <div class="delivery-schedule">
        <div>
          <div><img src="../../assets/image/delivery/ordersure.png"/></div>
          <div class="delivery-schedule-message text-#13C1FE">订单已确认</div>
        </div>

        <div style="z-index: 999">
          <div v-if="order.state== 'TO_RECEIVED' || order.state== 'TO_DELIVERY'||order.state== 'TO_APPRAISE' || order.state== 'COMPLETED'">
            <img src="../../assets/image/delivery/distribution.png"/>
            <div class="delivery-schedule-message text-#999999">配送中</div>
          </div>
          <div v-else>
            <img src="../../assets/image/delivery/distributioning.png"/>
            <div class="delivery-schedule-message text-#13C1FE">配送中</div>
          </div>
        </div>

        <div>
          <div v-if="order.state== 'TO_APPRAISE' || order.state== 'COMPLETED'">
            <img src="../../assets/image/delivery/received.png"/>
            <div class="delivery-schedule-message text-#999999">已收货</div>
          </div>
          <div v-else>
            <img src="../../assets/image/delivery/receiveing.png"/>
            <div class="delivery-schedule-message text-#13C1FE">已收货</div>
          </div>

        </div>
        <p></p>
      </div>
      <div class="delivery-info">
        <div class="delivery-info-header">
          <div>
            <i class="iconfont ic-yaodian text-333333"></i>
          </div>
          <div>
            {{order.shopName}}
          </div>
        </div>
        <div class="delivery-info-content">
          <div class="delivery-info-content-item">
            <div>
              <div>
                <i class="iconfont ic-purse"></i>
              </div>
              <div>
                已支付
              </div>
            </div>
            <div>
              &yen;{{order.totalAmount||0.00}}
            </div>
          </div>
          <div class="delivery-info-content-item">
            <div>
              <div>
                <i class="iconfont ic-weizhi"></i>
              </div>
              <div>
                送货地址
              </div>
            </div>
            <div>
              {{order.address||'无'}}
            </div>
          </div>
          <div class="delivery-info-content-item">
            <div>
              <div>
                <i class="iconfont ic-icon-test2"></i>
              </div>
              <div>
                订单编号
              </div>
            </div>
            <div>
              {{order.number||'无'}}
            </div>
          </div>
          <div class="delivery-info-content-item">
            <div>
              <div>
                <i class="iconfont ic-shouji"></i>
              </div>
              <div>
                送货人号码
              </div>
            </div>
            <div>
              {{order.courierPhone||'无'}}
            </div>
          </div>
        </div>
      </div>
    </template>
  </new-layout>
</template>

<script>
  export default {
    name: 'delivery',
    data() {
      return {
        title: '配送详情',
        orderId: this.$route.query.orderId,
        order: {}
      };
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.order = await this.$http.get(`/orders/${this.orderId}`);
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .delivery {
    &-info {
      &-header {
        display: flex;
        align-items: center;
        padding: 20px;
        &>div {
          &:nth-child(1) {
            .iconfont {
              font-size: 50px;
            }
          }
          &:nth-child(2) {
            font-size: 30px;
          }
        }
      }
      &-content {
        width: 100%;
        &-item {
          width: 100%;
          display: flex;
          padding: 20px;
          justify-content: space-between;
          align-items: center;
          &>div{
            &:nth-child(1) {
              display: flex;
              align-items: center;
              &>div {
                &:nth-child(1) {
                  i {
                    font-size: 40px;
                  }
                }
                &:nth-child(2) {
                  font-size: 25px;
                  margin-left: 10px;
                }
              }
            }
            &:nth-child(2) {
              width: 400px;
              text-align: right;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 25px;
            }
          }
        }
      }
    }
  }
</style>

<style scoped>
  .delivery {
    width: 720px;
  }

  .delivery-schedule {
    width: 680px;
    height: 155px;
    background: rgba(238, 238, 238, 1);
    margin: auto;
    margin-top: 12px;
    margin-bottom: 29px;
    padding: 15px 15px 15px 15px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: relative;

  }

  .delivery-schedule img {
    width: 90px;
    height: 90px;
  }

  .delivery-schedule-message {
    font-size: 24px;
  }

  .delivery-schedule p {
    width: 452px;
    height: 1px;
    border: 1px dashed #a6a6a6;
    position: absolute;
    display: block;
    margin-left: 100px;
    margin-top: 50px;
  }

  .delivery-drug-dot img {
    width: 14px;
    height: 14px;
    border-radius: 7px;
  }

  .delivery-drug-img img {
    width: 141px;
    height: 99px;
    margin-left: 22px;
    margin-right: 46px;
  }

  .delivery-drug-content span {
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
    display: flex;
    text-align: center;
  }
</style>
