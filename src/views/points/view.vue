<template>
  <div class="points_view">
    <van-nav-bar
      :title="coupon.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div ref="content">
      <div class="points_view-first">
        <img v-lazy="coupon.type === 'ARTICLE'? getImgURL(coupon.fileId,'SMALL_PIC') : require('../../assets/image/coupon/coupon-bg.png')">
      </div>
      <div class="points_view-second">
        <div class="points_view-second-price">
          <div>{{coupon.name}}</div>
          <div>{{coupon.point}}金币</div>
        </div>
        <div class="points_view-second-date">
          <div>
            <div>
              <i class="iconfont ic-riqi1"></i>
            </div>
            <div>兑换日期</div>
          </div>
          <div>{{dateConvert(coupon.startDate)}}至{{dateConvert(coupon.endDate)}}</div>
        </div>
      </div>
      <div class="points_view-third">
        <div class="points_view-third-title">
          商品详情
        </div>
        <div class="points_view-third-content">
          <div class="points_view-third-content-introduction">
            <div class="points_view-third-content-introduction-title">
              商品介绍
            </div>
            <div class="points_view-third-content-introduction-content">
              {{coupon.content||'暂无'}}
            </div>
          </div>
          <div class="points_view-third-content-flow">
            <div class="points_view-third-content-flow-title">兑换流程</div>
            <div class="points_view-third-content-flow-content">
              <div>1、兑换后在我的积分兑换流程里获得【兑换码】并复制；</div>
              <div>2、点击立即购买-填写收件信息-下一步“使用优惠“输入兑换码完成付款。</div>
            </div>
          </div>
          <div class="points_view-third-content-attention">
            <div class="points_view-third-content-attention-title">注意事项</div>
            <div class="points_view-third-content-attention-content">
              <div>1、每位用户福利专享，可多次兑换；</div>
              <div>2、每个订单每张券只能使用一次；</div>
              <div>3、运费描述：全国包邮（港澳台）除外；</div>
              <div>4、新疆、西藏、内蒙古偏远地区无法到达；</div>
              <div>5、商家客服电话：400-601-5563；</div>
              <div>6、券码使用有效日期：收到优惠码之日起至{{dateConvert(expiryDate)}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="points_view-fourth">
        <div @click.stop="onExchange()">
          马上兑换
        </div>
      </div>
    </div>
    <van-popup v-model="popupVisible" position="bottom">
      <div class="points_view-popup">
        <div class="points_view-popup_title">
          <van-icon name="close" class="points_view-popup_title-close_icon" @click="popupVisible = false"></van-icon>
          收货信息
        </div>
        <div class="points_view-popup_item van-hairline--bottom">
          <label>收货人</label>
          <input placeholder="请输入收货人姓名" v-model="consignee">
        </div>
        <div class="points_view-popup_item van-hairline--bottom">
          <label>手机号码</label>
          <input placeholder="请输入收货人号码" v-model="phone">
        </div>
        <div class="points_view-popup_item van-hairline--bottom">
          <label>地区</label>
          <input value="江苏省昆山市" readonly>
        </div>
        <div class="points_view-popup_item">
          <label>详细地址</label>
          <input placeholder="请输入街道门牌信息等" v-model="address">
        </div>
        <div class="points_view-popup_confirm"
             @click="onConfirm">确认</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        couponId: this.$route.query.couponId,
        coupon: {},
        consignee: '',
        phone: '',
        address: '',
        popupVisible: false,
        expiryDate: ''
      };
    },
    created() {
      this.$axios.get('/coupons/' + this.couponId)
        .then(res => {
          this.coupon = res.data;
          if (this.coupon.expiryDate === null) {
            this.expiryDate = this.dateConvert(new Date(new Date().toLocaleDateString()).getTime() + this.coupon.validDay * 86400000);
          } else {
            this.expiryDate = this.coupon.expiryDate;
          }
        })
        .catch(error => {
          this.exception(error);
        });
    },
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.content.style.overflow = 'auto';
    },
    methods: {
      onExchange() {
        if (!(this.coupon.startDate < new Date().getTime() && new Date().getTime() < this.coupon.endDate)) {
          this.$toast('当前时间不在兑换范围内');
          return;
        }
        switch (this.coupon.type) {
          case 'TICKET':
            this.$axios.post('/couponRecords?couponId=' + this.coupon.id)
              .then(res => {
                this.$toast('兑换成功');
              })
              .catch(error => {
                this.exception(error);
              });
            break;
          case 'ARTICLE':
            this.popupVisible = true;
        }
      },
      onConfirm() {
        let params = {
          'couponId': this.couponId,
          'consignee': this.consignee,
          'phone': this.phone,
          'address': this.address
        };
        this.$axios.post('/couponRecords/article', params)
          .then(res => {
            let instance = this.$toast('兑换成功');
            setTimeout(() => {
              instance.close();
              this.popupVisible = false;
            }, 3000);
          })
          .catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .points_view {
    background-color: #f5f5f5;
    &-popup {
      min-height: 500px;
      &_title {
        text-align: center;
        font-size: 30px;
        padding: 20px 10px;
        position: relative;
        &-close_icon {
          position: absolute;
          right: 10px;
          color: #1AB6FD;
        }
      }
      &_item {
        padding: 20px 20px;
        label {
          display: inline-block;
          font-size: 30px;
          width: 150px;
        }
        input {
          font-size: 25px;
          &::placeholder {
            text-align: left;
          }
          width: 500px;
          border: none;
          outline: none;
        }
      }
      &_confirm {
        height: 80px;
        line-height: 80px;
        width: 100%;
        text-align: center;
        background-color: #1AB6FD;
        color: white;
        font-size: 30px;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
        margin-top: 10px;
      }
    }
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
            align-items: center;
            > div {
              &:nth-child(1) {
                .ic-riqi1 {
                  font-size: 40px;
                }
              }
              &:nth-child(2) {
                margin-left: 10px;
                font-size: 25px;
              }
            }
          }
          &:nth-child(2) {
            font-size: 25px;
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
        *{
          font-size: 25px;
        }
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
      div {
        width: 347px;
        height: 53px;
        background: rgba(250, 94, 56, 1);
        border-radius: 27px;
        font-size: 25px;
        font-family: MicrosoftYaHei;
        color: rgba(245, 245, 245, 1);
        text-align: center;
        line-height: 53px;
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
