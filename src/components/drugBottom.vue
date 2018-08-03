<template>
  <footer>
   <div id="cartBottomModel"></div>
    <transition name="slide-fades">
    <div class="drug-bottom bg-white" ref="allBottoms">
      <div>
        <div class="drug-top position-relative">
          <div class="left d-inline-block fl position-relative width-percent-30">
            <img v-lazy="logoUrl" class="drug-img"/>
          </div>
          <div class="right d-inline-block fl width-percent-70">
            <div class="drug-close text-right width-percent-100">
              <i class="icon iconfont ic-guanbi2" @click="closed()"></i>
            </div>
            <div>
              <span class="d-block elpsTwo drug-title">{{drugInfo.name}} {{spec || ''}} -{{drugInfo.originName}}</span>
              <span class="text-1AB6FD drug-country">{{drugInfo.sfda}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="drug-spec width-percent-96 m-auto">
        <mt-radio title="选择规格" v-model="value" :options="tips" align="right">
        </mt-radio>
      </div>
      <div class="bg-13C1FE text-white text-center drug-choose" @click="sure">
        选择
      </div>
      </div>
    </transition>
  </footer>
</template>

<script>
  import {Toast} from 'mint-ui';
  import drugBottom from '@/components/drugBottom';
  export default {
    name: 'cartBottom',
    value: '',
    props: ['shopDrugSpec', 'tips', 'drugInfo', 'spec'],
    data() {
      return {
        hide: false,
        props: ['shopDrugSpec', 'tips', 'drugInfo', 'spec'],
        arrowdownhide: false,
        buyNumber: 1,
        accountId: '',
        logoUrl: this.tips[0].logoUrl,
        value: this.drugInfo.value
      };
    },
    components: {
      'drugBottom': drugBottom
    },
    methods: {
      closed() {
        this.$emit('close', '');
      },
      buy(flag) {
        if (flag === true) {
          this.buyNumber -= 1;
          if (this.buyNumber <= 1) {
            this.buyNumber = 1;
          }
        } else {
          this.buyNumber += 1;
        }
      },
      joinCar() {
        this.hide = true;
      },
      collect() {
        this.$http.post('/collects/drug?' + '&shopId=' + this.shopDrugSpec.shopId + '&drugSpecId=' + this.shopDrugSpec.drugSpecId + '&shopDrugSpecId=' + this.shopDrugSpec.id, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then(res => {
            if (res.status === 200) {
              Toast({
                message: '收藏成功',
                position: 'middle',
                duration: 3000
              });
            }
          });
      },
      // 向父组件传值
      sure() {
        this.$emit('close', this.value);
        this.tips.forEach(res => {
          if (this.value === res.value) {
            this.$emit('fication', res.label);
          }
        });
      }
    },
    created: function () {
      this.accountId = this.$store.getters.account.id;
    }
  };
</script>

<style>
  footer {
    width: 720px;
  }

  .cartBottomfooter {
    z-index: 999999;
  }

  .drug-top {
    width: 96%;
    height: 134px;
  }

  #cartBottomModel {
    width: 100%;
    height: 100%;
    top: 0px;
    background: #0000004d;
    position: absolute;
    z-index: 9;
  }

  .mint-cell-title {
    flex: 1;
  }

  .cartBottomfooterTop .left {
    width: 35%;
  }

  .cartBottomfooterTop .right {
    width: 65%;
    float: right;
  }

  .ic-guanbi2 {
    color: #13C1FE;
    width: 28px;
    height: 28px;
    font-size: 30px;
  }

  .cartBottomfooterTop div:nth-child(2) {
    margin-left: 2%;
  }

  .cartBottomfooterTop div:nth-child(2) span:first-child {
    font-size: 1.2rem;
  }

  .cartBottomfooter {
    position: absolute;
  }

  #allBottom {
    z-index: 9999999999999;
  }
  .drug-img {
    width: 164px;
    height: 154px;
    border: 1px solid #f5f5f5;
    margin-left: 29px;
    margin-top: -36px;
  }

  .drug-bottom {
    width: 720px;
    height: 492px;
    background: rgba(255, 255, 255, 1);
    z-index: 99;
    bottom: 0px;
    position: fixed;
  }

  .choose-rule {
    width: 720px;
    height: 60px;
    background: rgba(19, 193, 254, 1);
  }

  .iconfont {
    width: 0px;
    height: 0px;
  }

  .drug-title {
    font-size: 24px;
    width: 354px;
    margin-left: 30px;
  }

  .drug-close {
    height: 28px;
  }

  .drug-close .icon {
    float: right;
    text-align: right;
    margin-top: 35px;
    margin-right: 6px;
  }

  .drug-country {
    font-size: 20px;
    margin-left: 30px;
  }

  .drug-choose {
    font-size: 30px;
    width: 750px;
    position: fixed;
    bottom: 0px;
    height: 60px;
    line-height: 60px;
  }

  .ic-shijian2 {
    font-size: 30px;
  }

  .drug-spec {
    height: 397px;
  }

  .mint-radio.is-right {
    padding-right: 10px;
  }

  /*定义进入过渡的结束状态*/
  .slide-fades-enter-active {
    transition: all 0.5s ease;

  }

  /* 定义离开过渡的结束状态*/
  .slide-fades-leave-active {
    transition: all 0.5s ease;
  }

  /*离开过渡的结束状态*/
  .slide-fades-leave-active {
    bottom: 0rem !important;
  }

  .slide-fades-leave-to {
    bottom: -28rem !important;
  }

  /*进入过渡的开始状*/
  .slide-fades-enter {
    bottom: -22rem !important;
  }
</style>
