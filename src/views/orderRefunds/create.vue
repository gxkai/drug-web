<template>
  <div class="refund_create">
    <new-header title="申请退款">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      </div>
    </new-header>

    <new-refund :order="orderInfo"></new-refund>

    <div class="refund_create-reason">
      <div class="refund_create-reason-left">
        <span>退款原因</span>
        <span style="color: #1AB6FD">{{reason}}</span>
      </div>
      <div class="refund_create-reason-right" @click="popupVisible = !popupVisible">
        <span>请选择&gt;</span>
      </div>
    </div>
    <div class="refund_create-price">
      <span>退款金额</span>
      <span style="color: #ef4f4f">&yen;{{toFixedTwo(orderInfo.totalAmount)}}</span>
    </div>
    <div class="refund_create-explain">
      <div class="refund_create-explain-left">
        退款说明
      </div>
      <div class="refund_create-explain-right">
        <textarea placeholder="最多50字" maxlength="50" cols="30" rows="2" wrap="hard">

        </textarea>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="refund_create-popup">
        <div class="refund_create-popup-list">
          <div class="refund_create-popup-list-item" v-for="item in reasonList">
            <div>{{item}}</div>
            <div  @click="popupVisible = false">
              <input :id="item" type="radio"  :value="item"   v-model="reason">
              <label :for="item"></label>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
    <div class="refund_create-commit" @click="onCommit()">
      提交
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderRefundsCreate',
    data() {
      return {
        imgList: [],
        size: 0,
        value: '',
        popupVisible: false,
        orderInfo: {},
        explain: '',
        reason: '',
        reasonList: [
          '多拍/拍错/不想要',
          '不想要'
        ],
        orderId: this.$route.query.orderId,
        account: this.$store.getters.account
      };
    },
    methods: {
      onCommit() {
        this.$http.post('/orderRefunds', {
          'explain': this.explain,
          'orderId': this.orderId,
          'price': this.orderInfo.totalAmount,
          'reason': this.reason
        }).then(res => {
          this.$router.replace({ path: '/orderRefunds/view', query: { orderRefundId: res.data } });
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    created() {
      this.$http.get('/orders/' + this.orderId)
        .then(res => {
          console.log(res.data);
          this.orderInfo = res.data;
        }).catch(error => {
          this.exception(error);
        });
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .refund_create {
    width: 720px;
    overflow: auto;
    &-reason {
      div, span {
        font-size: 25px;
      }
      padding: 10px;
      margin: 30px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      &-left {
        width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &-price {
      div, span {
        font-size: 25px;
      }
      padding: 10px;
      margin: 30px 0;
      width: 100%;
    }
    &-explain {
      div, span {
        font-size: 25px;
      }
      padding: 10px;
      margin: 30px 0 100px 0;
      display: flex;
      textarea {
        width: 500px;
        padding: 0 0 0 10px;
        font-size: 25px;
        border: none;
        outline: none;
      }
    }
    &-commit {
      background-color: #1AB6FD;
      height: 100px;
      width: 100%;
      line-height: 100px;
      text-align: center;
      font-size: 40px;
      font-weight: 300;
      color: white;
      position: fixed;
      bottom: 0;
    }
    &-popup {
      width: 720px;
      min-height: 300px;
      &-list {
        padding: 30px 30px;
        &-item {
          padding: 20px 10px;
          margin: 5px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div:nth-child(2) {
            position: relative;
          }
          &:not(:last-child) {
            border-bottom: 1PX solid #f5f5f5;
          }
          div {
            font-size: 28px;
            font-weight: 400;
          }
          label {
            position: absolute;
            left: 5px;
            top: 8px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid #13C1FE;
          }
          input {
            width: 30px;
            height: 30px;
            opacity: 0;
          }
          input:checked + label {
            background-color: #13C1FE;
            border: 1PX solid #13C1FE;
          }
          input:checked + label::after {
            position: absolute;
            content: "";
            width: 7px;
            height: 12px;
            top: 6px;
            left: 8px;
            border: 1PX solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
</style>

<style scoped>

  .refund-reason-choose {
    width: 720px;
    height: calc(421px - 114px);
    background: rgba(255, 255, 255, 1);
  }

  .refund-reason-choose-item {
    margin-top: 40px;
  }

  .refund-reason-choose-item {
    width: 720px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .refund-reason-choose-item label {
    font-size: 32px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
  }

  .refund-reason-choose-item input {
    width: 34px;
    height: 34px;
    background: rgba(19, 193, 254, 1);
  }

  .refund-reason-close {
    width: 720px;
    height: 114px;
    background: rgba(19, 193, 254, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
  }
</style>
