<template>
  <div class="points-container">
    <new-header :title="headTitle">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>

    <div class="exchange-shop">

    </div>

    <div class="exchange-info">
      <div class="exchange-info-title">
        <p class="height-24"></p>
        <p class="fz30 exchange-p1">多力葵花籽油</p>
        <p class="text-red exchange-p2 fz20">620金币</p>
      </div>
      <div class="width-percent-96 m-auto exchange-line">
      </div>
      <div class="exchange-date">
        <span class="d-inline-block fl effective-date"><i class="iconfont ic-riqi1"></i>有效期</span>
        <span class="d-inline-block fr">2018-8-2至2018-9-13</span>
      </div>
    </div>

    <div class="exchange-content bg-white width-percent-100 bg-white">
      <div class="width-percent-96 m-auto couponshop-detail">
        <p class="exchange-content-p">商品详情</p>
        <div class="fz20">
          葵花子，又叫葵瓜子，是向日葵的果实。它的子仁中含脂肪30%-45%，最多的可达60%。葵花子油颜色金黄，澄清透明，气味清香，是一种重要的食用油。它含有大量的亚油酸等人体必需的不饱和脂肪酸，可以促进人体细胞的再生和成长，保护皮肤健康，并能减少胆固醇在血液中的淤积，是一种高级营养油。它颜色金黄、澄清透明，具有芳香气味。葵花籽油在世界范围内的消费量在所有植物油中排在棕榈油、豆油和菜籽油之后，居第四位。全球葵花籽油产量稳定在1000万～1200万吨之间，葵花籽油是欧洲国家重要的食用油品种之一。国际上许多国家和地区，如台湾、香港、日本、韩国的葵花籽油消费比例高达70%。
        </div>
        <div class="fz20">
          兑换流程
        </div>
        <div class="fz20">
          1、兑换后在我的积分兑换流程里获得【兑换码】并复制；
          2、点击立即购买-填写收件信息-下一步“使用优惠“输入兑换码完成付款。
        </div>
      </div>
    </div>

    <div class="bg-FA5E38 exchange-btn" @click="change()">
      马上兑换
    </div>
    <div id="whole" v-show="show"></div>

    <transition v-show="show" name="slide-fade">
      <div class="collect-info bg-white" v-show="show">
        <div class="receiver">
             <span class="d-inline-block recept">
              收货信息
            </span>
          <span class="d-inline-block">
                 <i class="iconfont ic-guanbi2 text-13C1FE" @click="close()"></i>
            </span>
        </div>
        <div class="width-percent-100">
          <ul class="consignee width-percent-98 m-auto">
            <li>
              <i>收货人</i>
              <input type="text" placeholder="请输入收货人姓名"/>
            </li>
            <li>
              <i>手机号码</i>
              <input type="text" placeholder="请输入收货人号码"/>
            </li>
            <li>
              <i>详细地址</i>
              <input type="text" placeholder="请输入街道门牌信息等"/>
            </li>
          </ul>
          <div class="sure-btn">确认</div>
        </div>
      </div>
    </transition>

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
    methods: {
      change() {
        this.show = !this.show;
      },
      close() {
        this.show = !this.show;
      }
    }
  };
</script>

<style scoped>
  .points-container {
    width: 720px;
    background: #f5f5f5;
  }

  .exchange-shop {
    width: 720px;
    height: 300px;
    background: rgba(255, 255, 255, 1);
  }

  .exchange-info {
    width: 720px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    margin-top: 15px;
  }

  .fz30 {
    font-size: 30px;
  }

  .fz20 {
    font-size: 20px;
  }

  .exchange-p1 {
    margin: 0px 0px 19px 29px;
  }

  .exchange-p2 {
    margin: 0px 0px 19px 29px;
  }

  .effective-date {
    margin: 0px 0px 19px 29px;
  }

  .exchange-date {
    font-size: 24px;
  }

  .ic-riqi1 {
    margin-right: 30px;
  }

  .exchange-date span:nth-child(2) {
    margin: 0px 17px 19px 29px;
  }

  .height-24 {
    width: 720px;
    height: 24px;
  }

  .exchange-line {
    margin-top: 26px !important;
    height: 2px;
    border-bottom: 1px solid #f5f5f5;
  }

  .exchange-content {
    margin-top: 15px;
  }

  .exchange-content-p {
    font-size: 24px;
    padding-top: 19px;
    font-weight: bold;
  }

  .exchange-btn {
    width: 347px;
    height: 53px;
    background: rgba(250, 94, 56, 1);
    border-radius: 27px;
    color: white;
    margin-left: 187px;
    font-size: 24px;
    text-align: center;
    line-height: 53px;
    margin-top: 46px;
    margin-bottom: 34px;
  }

  .recept {
    margin-left: 302px;
    font-size: 30px;
  }

  .ic-guanbi2 {
    margin-left: 254px;
    font-size: 30px;
  }

  .collect-info {
    position: fixed;
    bottom: 0px;
    z-index: 999;
    width:720px;
    height:643px;
  }

  .consignee {
  }

  .consignee li {
    width: 100%;
    height: 79px;
    border-bottom: 1px solid #f5f5f5;
    line-height: 79px;
  }

  i {
    font-style: normal;
  }
  .sure-btn{
    width:720px;
    height:96px;
    background:rgba(19,193,254,1);
    font-size:36px;
    line-height: 96px;
    text-align: center;
    color: white;
    bottom: 0px;
    position: absolute;
    bottom: 0px;
  }
  .consignee li i{
    width: 180px;
    display: inline-block;
  }

  iuput:focus{
    outline: none;
  }
  .receiver{
    margin: 23px 0 60px 0px;
  }
  .consignee li input{
    border: none;
  }
  /*定义进入过渡的结束状态*/
  .slide-fade-enter-active {
    transition:all 0.5s ease;

  }
 /*进入过渡的开始状*/
  .slide-fade-enter{
    bottom:-643px!important;
  }
</style>
