<template>
  <div class="points-container">

    <new-header title="每日签到">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>


    <div class="position-relative">
      <img src="../../assets/image/coupon/signin-bg.png" class="sign-bg"/>
      <div class="points-info">
        <p class="all-points">275积分</p>
        <p class="has-signed width-percent-100">&nbsp;&nbsp;已签到</p>
        <p class="text-center text-13C1FE continuity width-percent-100">&nbsp;&nbsp;连续5天</p>
        <p class="text-center has-signed2 text-white width-percent-100">今日已签到，获得15积分</p>
      </div>
    </div>


    <div class="bg-white">
      <div class="width-percent-96 m-auto">
        <div class="change-point">
          <i class="iconfont ic-liwu-copy text-13C1FE"></i>
          <span class="fz28">积分兑换</span>
          <span class="fz20 fr">查看更多 <i class="iconfont ic-youjiantou"></i></span>
        </div>
      </div>

      <div class="signin-gift">
         <ul>
            <li :style="{backgroundImage: 'url(' + require('../../assets/image/coupon/wallet.png') +')',backgroundSize:'100%'}">
              580积分兑换
            </li>
           <li :style="{backgroundImage: 'url(' + require('../../assets/image/coupon/wallet.png') +')',backgroundSize:'100%'}">
             580积分兑换
           </li>
           <li :style="{backgroundImage: 'url(' + require('../../assets/image/coupon/wallet.png') +')',backgroundSize:'100%'}">
             580积分兑换
           </li>
         </ul>
      </div>

      <div id="whole" v-show="show"></div>
      <div class="signin-points" v-show="show">
          <div class="width-percent-100 text-right">
            <i class="iconfont ic-guanbi"></i>
          </div>
          <div>
              <img :src="require('../../assets/image/coupon/golen.png')" class="golden"/>
          </div>
          <div class="text-center scccsess">签到成功</div>
          <div class="text-center controduction">恭喜你获得</div>
          <div class="text-center five-points">5积分</div>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    name: 'newPayList',
    data() {
      return {
        headTitle: '多力葵花籽油',
        show: false
      };
    },
    methods: {}
  };
</script>

<style scoped>
  .points-container {
    width: 720px;
    background: #f5f5f5;
  }

  .sign-bg {
    width: 720px;
    height: 371px;
  }

  .all-points {
    width: 130px;
    height: 27px;
    text-align: left;
    font-size: 30px;
  }

  .points-info {
    position: absolute;
    top: 23px;
    left: 0px;
    width: 720px;
  }

  .all-points {
    color: white;
    top: 23px;
    margin-left: 22px;
  }

  .has-signed {
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    color: #13C1FE;
    margin-top: 30px;
  }

  .has-signed2 {
    margin-top: 99px;
    font-size: 29px;
  }

  .continuity {
    font-size: 29px;
    margin-top: 20px;
  }
  .fz28{
    font-size: 28px;
  }
  .fz20{
    font-size: 20px;
  }

  .change-point {
    height: 76px;
    line-height: 76px;
  }
  .ic-liwu-copy{
     font-size: 24px;
  }
  .signin-gift ul li{
    width:228px;
    height:146px;
    color: white;
    font-size:25px;
    text-align: center;
    line-height: 146px;
    margin-left: 10px;
    float: left;
  }
  .signin-points{
    position: absolute;
    width:400px;
    height:452px;
    background:rgba(255,255,255,1);
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -226px;
    z-index: 999;
  }
  .golden{
    width:154px;
    height:105px;
    margin-top: 67px;
    margin-left: 123px;
  }

  .scccsess{
    font-size:31px;
    color: #333333;
    margin-top: 37px;
  }
  .controduction{
    font-size:18px;
    color: #333333;
    margin-top: 22px;
  }
  .five-points{
    font-size:31px;
    color: #FF0000;
    margin-top: 19px;
  }
  .ic-guanbi{
    margin-top: 18px;
    margin-right: 14px;
    color: #999999;
  }
</style>
