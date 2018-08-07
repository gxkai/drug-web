<!-- FIXME 字体大小 -->
<template>
  <div class="refund-container">
    <new-header title="申请退款">
      <div slot="left">
      <i class="iconfont ic-arrow-right"  @click="$router.go(-1)"></i>
      </div>
    </new-header>

    <new-refund :order="orderInfo"></new-refund>
    <div class="refund-reason">
      <div>
        <span>退款原因</span>
        <span>{{reason}}</span>
      </div>
      <div @click="handleClick()">
        <span>请选择<i class="iconfont ic-youjiantou"></i></span>
      </div>
    </div>
    <div class="refund-price">
      <div>
        <span>退款金额：</span>
        <span>￥{{orderInfo.totalAmount}}</span>
      </div>
    </div>
    <div class="refund-description">
      <div>
        <span>退款说明</span>
      </div>
      <div>
        <textarea placeholder="选填 最多50字" maxlength="50" rows="3" v-model="explain">
        </textarea>
      </div>
    </div>
    <div class="refund-image">

    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" closeOnClickModal="false">
      <div class="refund-reason-choose">
        <div class="refund-reason-choose-item" v-for="(item,index) in reasonList">
          <label for="index">{{item}}</label><input type="radio"  v-model="reason" :value="item"
                                                           id="index"/>
        </div>
      </div>
      <div class="refund-reason-close" @click="onClose()">
        <span>关闭</span>
      </div>
    </mt-popup>
    <div class="refund-commit" @click="onCommit()">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
  import {Popup} from 'mint-ui';

  export default {
    name: 'orderRefundsCreate',
    data() {
      return {
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
    component: {
      'mt-popup': Popup
    },
    methods: {
      handleClick() {
        this.popupVisible = true;
      },
      onClose() {
        this.popupVisible = false;
      },
      onCommit() {
        this.$http.post('/orderRefunds', {
          'explain': this.explain,
          'orderId': this.orderId,
          'price': this.orderInfo.totalAmount,
          'reason': this.reason
        }).then(res => {
          this.$router.push({path: '/orderRefunds/view', query: {id: res.data}});
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    created() {
      this.$http.get('/orders/' + this.orderId)
        .then(res => {
          this.orderInfo = res.data;
        }).catch(error => {
          this.exception(error);
        });
    }
  };
</script>

<style scoped>
  .refund-reason {
    width:719px;
    height:60px;
    background:rgba(246,246,246,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  .refund-reason div:nth-child(1) {
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    margin-left: 21px;
  }
  .refund-reason div:nth-child(1)>span:nth-child(2){
    color: #0f81cc;
  }
  .refund-reason div:nth-child(2) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
  }

  .refund-price {
    width:719px;
    height:60px;
    background:rgba(246,246,246,1);
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .refund-price div:nth-child(1) {
    margin-left: 21px;
  }
  .refund-price div:nth-child(1) span:nth-child(1) {
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .refund-price div:nth-child(1) span:nth-child(2) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,0,0,1);
  }

  .refund-description {
    width:719px;
    height:116px;
    background:rgba(246,246,246,1);
    margin-top: 15px;
    display: flex;
  }

  .refund-description> div:nth-child(1) {
    width: 131px;
    height: 116px;
  }

  .refund-description> div:nth-child(1) span:nth-child(1) {
    margin-left: 20px;
    line-height:45px;
  }

  .refund-description> div:nth-child(2) {
    width: calc(720px - 131px);
    height: 116px;
  }
  .refund-description> div:nth-child(2) textarea {
    width: calc(720px - 131px);
    height: 116px;
    background:rgba(246,246,246,1);
    resize: none;
    outline: none;
    border: 0;
    line-height:45px;
  }

  .refund-reason-choose {
    width:720px;
    height:calc(421px - 114px);
    background:rgba(255,255,255,1);
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
    font-size:32px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height:30px;
  }
  .refund-reason-choose-item input {
    width:34px;
    height:34px;
    background:rgba(19,193,254,1);
  }

  .refund-reason-close {
    width:720px;
    height:114px;
    background:rgba(19,193,254,1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:36px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
  }

  .refund-commit {
    width:720px;
    height:108px;
    background:rgba(19,193,254,1);
    font-size:36px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
  }
</style>
