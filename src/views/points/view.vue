<template>
  <div class="detail">
    <new-header title="多力葵花籽油">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="detail-first">
      <img v-lazy="getImgURL(coupon.fileId,'LARGE_LOGO')"/>
    </div>
    <div class="detail-second">
      <div class="detail-second-price">
        <div>{{coupon.name}}</div>
        <div>{{coupon.point}}金币</div>
      </div>
      <div class="detail-second-date">
        <div>
          <div>
            <i class="iconfont ic-riqi1"></i>
          </div>
          <div>有效期</div>
        </div>
        <div>{{dateConvert(coupon.startDate)}}至{{dateConvert(coupon.expiryDate)}}</div>
      </div>
    </div>
    <div class="detail-third">
      <div class="detail-third-title">
        商品详情
      </div>
      <div class="detail-third-content">
        <div class="detail-third-content-introduction">
          <div class="detail-third-content-introduction-title">
            商品介绍
          </div>
          <div class="detail-third-content-introduction-content">
            {{coupon.content||'暂无'}}
          </div>
        </div>
        <div class="detail-third-content-flow">
          <div class="detail-third-content-flow-title">兑换流程</div>
          <div class="detail-third-content-flow-content">
            <div>1、兑换后在我的积分兑换流程里获得【兑换码】并复制；</div>
            <div>2、点击立即购买-填写收件信息-下一步“使用优惠“输入兑换码完成付款。</div>
          </div>
        </div>
        <div class="detail-third-content-attention">
          <div class="detail-third-content-attention-title">注意事项</div>
          <div class="detail-third-content-attention-content">
            <div>1、每位用户福利专享，可多次兑换；</div>
            <div>2、每个订单每张券只能使用一次；</div>
            <div>3、运费描述：全国包邮（港澳台）除外；</div>
            <div>4、新疆、西藏、内蒙古偏远地区无法到达；</div>
            <div>5、商家客服电话：400-601-5563；</div>
            <div>6、券码使用有效日期：收到优惠码之日起至{{dateConvert(coupon.expiryDate)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-fourth">
      <button @click.stop="onExchange()">
        马上兑换
      </button>
    </div>
    <van-actionsheet v-model="show" title="收货信息" class="detail-popup">
      <div class="detail-popup-content">
        <div class="detail-popup-content-consignee">
          <label>收货人&nbsp;&nbsp;&nbsp;</label>
          <input placeholder="请输入收货人姓名" v-model="consignee">
        </div>
        <div class="detail-popup-content-phone">
          <label>手机号码</label>
          <input placeholder="请输入收货人号码" v-model="phone">
        </div>
        <div class="detail-popup-content-area">
          <label>地区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input value="江苏省昆山市" readonly>
        </div>
        <div class="detail-popup-content-address">
          <label>详细地址</label>
          <input placeholder="请输入街道门牌信息等" v-model="address">
        </div>
      </div>
      <button @click="onConfirm">确认</button>
    </van-actionsheet>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: 'newPayList',
    data() {
      return {
        couponId: this.$route.query.couponId,
        coupon: {},
        show: false,
        consignee: '',
        phone: '',
        address: ''
      };
    },
    created() {
      this.$http.get('/coupons/' + this.couponId)
        .then(res => {
          this.coupon = res.data;
        })
        .catch(error => {
          this.exception(error);
        });
    },
    methods: {
      onExchange() {
        switch (this.coupon.type) {
          case 'TICKET':
            this.$http.post('/couponRecords?couponId=' + this.coupon.id)
              .then(res => {
                Toast('兑换成功');
                this.$store.state.account.point -= this.coupon.point;
              })
              .catch(error => {
                this.exception(error);
              });
            break;
          case 'ARTICLE':
            this.show = true;
        }
      },
      onConfirm() {
        let params = {
          'couponId': this.couponId,
          'consignee': this.consignee,
          'phone': this.phone,
          'address': this.address
        };
        this.$http.post('/couponRecords/article', params)
          .then(res => {
            Toast('兑换成功');
            this.show = false;
            this.$store.state.account.point -= this.coupon.point;
          })
          .catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .detail {
    position: fixed;
    background-color: #f5f5f5;
    height: 100%;
    overflow: scroll;
    &-first {
      width: 720px;
      height: 300px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      img {
        width: 270px;
        height: 270px;
      }
    }
    &-second {
      width: 720px;
      height: 200px;
      padding: 0 20px;
      background: rgba(255, 255, 255, 1);
      margin-bottom: 15px;
      &-price {
        width: 100%;
        height: 120px;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom: 1PX solid rgba(238, 238, 238, 1);
        > div {
          &:nth-child(1) {
            font-size: 30px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
          }
          &:nth-child(2) {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 0, 0, 1);
          }
        }
      }
      &-date {
        width: 100%;
        height: 80px;
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        > div {
          &:nth-child(1) {
            display: flex;
            > div {
              &:nth-child(1) {
                .ic-riqi1 {
                  font-size: 30px;
                }
              }
              &:nth-child(2) {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
    &-third {
      height: auto;
      background: rgba(255, 255, 255, 1);
      padding: 20px;
      &-title {
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
      }
      &-content {
        font-size: 22px;
        font-family: MicrosoftYaHei;
        color: rgba(85, 85, 85, 1);
        margin-top: 20px;
        &-introduction {
          &-content {
            margin-top: 10px;
          }
        }
        &-flow {
          margin-top: 10px;
          &-content {
            margin-top: 10px;
          }
        }
        &-attention {
          margin-top: 10px;
          &-content {
            margin-top: 10px;
          }
        }
      }
    }
    &-fourth {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 347px;
        height: 53px;
        background: rgba(250, 94, 56, 1);
        border-radius: 27px;
        font-size: 24px;
        font-family: MicrosoftYaHei;
        color: rgba(245, 245, 245, 1);
        outline: none;
        border-width: 0;
      }
    }
    &-popup {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      font-size:24px;
      font-family:HiraginoSansGB-W3;
      color:rgba(0,0,0,1);
      &-content {
        width: 100%;
        padding: 20px;
        >div {
          margin-bottom: 20px;
          label {
            width: 100px;
          }
          input {
            width: 500px;
            margin-left: 50px;
            &::placeholder{
              text-align: left;
            }
          }
        }
      }
      button {
        width:720px;
        height:96px;
        background:rgba(19,193,254,1);
        font-size:36px;
        font-family:HiraginoSansGB-W3;
        color:rgba(255,255,255,1);
        outline: none;
        border-width: 0;
      }
    }
  }
</style>
