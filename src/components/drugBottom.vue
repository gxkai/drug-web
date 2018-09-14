<template>
  <footer>
    <div id="cartBottomModel"></div>
    <transition name="slide-fades">
      <div class="drug-bottom bg-white" ref="allBottoms">
        <div>
          <div class="drug-top position-relative">
            <div class="left d-inline-block fl position-relative width-percent-30">
              <img :src="getImgURL(drugSpec.logo,'SMALL_LOGO')" class="drug-img"/>
            </div>
            <div class="right d-inline-block fl width-percent-70">
              <div class="drug-close text-right width-percent-100">
                <i class="icon iconfont ic-guanbi2" @click="close()"></i>
              </div>
              <div>
                <span
                  class="d-block elpsTwo drug-title">{{drugInfo.name}} {{drugSpec.name}} -{{drugInfo.originName}}</span>
                <span class="text-1AB6FD drug-country">{{drugInfo.sfda}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="drug-spec width-percent-96 m-auto">
          <div v-for="item in drugSpecs">
            <div class="radio-item">
              <label for="item.id">{{item.name}}</label><input type="radio"  v-model="drugSpec" :value="item"
                                                               id="item.id"/>
            </div>
          </div>
        </div>
        <div class="bg-13C1FE text-white text-center drug-choose" @click="close()">
          选择
        </div>
      </div>
    </transition>
  </footer>
</template>

<script>
  export default {
    name: 'drugBottom',
    value: '',
    props: ['drugSpecs', 'drugSpec', 'drugInfo'],
    data() {
      return {
      };
    },
    watch: {
      drugSpec(value) {
        this.$emit('update:drugSpec', value);
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    },
    created() {
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
    font-size: 50px;
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
    border: 1PX solid #f5f5f5;
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
    min-height: 397px;
    padding: 20px;
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

  .radio-item {
    width: 668px;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .radio-item label {
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .radio-item input {
    width: 29px;
    height: 29px;
  }
</style>
