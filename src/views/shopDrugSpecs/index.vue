<template>
  <div class="bind-container">
    <new-header title="商品详情" class="header">
      <div slot="left" @click.stop="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>
    <div class="body">
      <!--上方轮播开始-->
      <div class="broadcast">
        <div class="broadcast-content">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(fileId,index) in shopDrugSpec.fileIds" :key="index">
              <img :src="getImgURL(fileId,'LARGE_PIC')"/>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="position-relative">
          <div class="broadcast-title position-absolute">
            <p class="drug-name elps text-center">{{shopDrugSpec.name}}</p>
            <p class="drug-function elps">{{shopDrugSpec.introduce}}</p>
            <p class="drug-price">¥{{shopDrugSpec.price}}</p>
          </div>
          <div class="broadcast-title-two position-absolute"></div>
        </div>
      </div>
      <!--库存开始-->
      <div class="stock">
        <div class="elps">
          <div class="text-1AB6FD text-l-20">
            国药准字:
          </div>
          <div class="elps text-l-20">
            {{shopDrugSpec.sfda}}
          </div>
        </div>
        <div class="vertical-line"></div>
        <div class="elps text-l-20">
          <div class="text-1AB6FD text-l-20">
            库存:
          </div>
          <div class="elps text-l-20">
            {{shopDrugSpec.stock}}
          </div>
        </div>
        <div class="vertical-line "></div>
        <div class="elps text-l-20">
          <div class="text-1AB6FD text-l-20">包装规格:</div>
          <div class="elps text-l-20">
            {{shopDrugSpec.spec}}
          </div>
        </div>
      </div>
      <!--库存结束-->

      <!--配送商家开始-->
      <div class="distribution">
        <div>
          <div>
            <i class="iconfont ic-peisong"></i>
          </div>
          <div>商家配送</div>
        </div>
        <div>
          <div>
            <i class="iconfont ic-zitidai"></i>
          </div>
          <div>门店自提</div>
        </div>
        <div>
          <div>
            <i class="iconfont ic-mianfei"></i>
          </div>
          <div>免费配送</div>
        </div>
      </div>
      <!--配送商家结束-->

      <!--商品详情开始-->
      <div class="shop-detail">
        <div
          @click="$router.push({path: '/shopDrugSpecs/view', query: {index: 1,shopDrugSpec:JSON.stringify(shopDrugSpec)}})">
          <span class="iconfont ic-liwu-copy"></span>
          <span>商品详情</span>
          <span class="iconfont ic-youjiantou1"></span>
        </div>
        <div
          @click="$router.push({path: '/shopDrugSpecs/view', query: {index: 0,shopDrugSpec:JSON.stringify(shopDrugSpec)}})">
          <span class="iconfont ic-pingjia"></span>
          <span>商品评价</span>
          <span class="iconfont ic-youjiantou1"></span>
        </div>
      </div>
      <!--商品详情结束-->

      <!--公司信息开始-->
      <div class="company">
        <div class="companys">
          <div class="d-inline-block company-logo">
            <img :src="getImgURL(shopDrugSpec.id,'SMALL_LOGO')" class="logo"/>
          </div>
          <div class="company-name d-inline-block">
            <p class="elps text-l-25">{{shopDrugSpec.shopName}}</p>
            <p class="elps">
              <new-star :score="shopDrugSpec.shopTotalAppraise.score" size="small" disabled></new-star>
            </p>
          </div>
          <div class="d-inline-block fr mr-l-20 mt-l-15">
            <i class="icon iconfont ic-anquan text-1AB6FD"></i>
          </div>
        </div>
        <!--客户服务开始-->
        <div class="width-percent-90 customer">
          <div class="d-inline-block width-percent-22 text-center">
            <p>客户服务</p>
            <p class="text-red">{{shopDrugSpec.shopTotalAppraise.serviceScore}}分</p>
          </div>
          <div class="d-inline-block width-percent-22 text-center">
            <p>发货速度</p>
            <p class="text-red">{{shopDrugSpec.shopTotalAppraise.deliveryScore}}分</p>
          </div>
          <div class="d-inline-block width-percent-22 text-center">
            <p>物流速度</p>
            <p class="text-red">{{shopDrugSpec.shopTotalAppraise.describeScore}}分</p>
          </div>
          <div class="d-inline-block width-percent-22 text-center">
            <p>商品包装</p>
            <p class="text-red">{{shopDrugSpec.shopTotalAppraise.packageScore}}分</p>
          </div>
          <router-link :to="{path:'/shops/view',query:{shopId:shopDrugSpec.shopId}}">
            <div class="enter-shop text-white">
              进入店铺
            </div>
          </router-link>

        </div>
        <!--客户服务结束-->
      </div>
      <!--公司信息结束-->
      <!--评论开始-->
      <div class="comment width-percent-100">
        <div class="content-comment width-percent-94 m-auto border-bottom-f1f1f1">
          <span class="d-inline-block fl text-l-23">顾客评论（{{shopDrugSpec.drugAppraises.total}}）</span>
          <router-link tag="span"
                       :to="{path: '/shopDrugSpecs/view', query: {index: 0,shopDrugSpec:JSON.stringify(shopDrugSpec)}}">
            <span class="d-inline-block fr text-l-23">查看全部评价</span>
          </router-link>
        </div>

        <div v-for="drugAppraise in shopDrugSpec.drugAppraises.list">
          <div class="stars width-percent-94 m-auto">
            <span class="fl d-inline-block"> <new-star :score="drugAppraise.score" disabled></new-star></span>
            <span class="fr d-inline-block">{{drugAppraise.username|asterisk}}</span>
          </div>
          <div class="width-percent-94 m-auto good-comment">
            <span class="elps">{{drugAppraise.content}}</span>
          </div>
          <div class="times width-percent-94 m-auto">
            {{timeConvert(drugAppraise.createdDate)}}
          </div>
        </div>
      </div>
    </div>
    <new-join-car :drugInfo="shopDrugSpec"></new-join-car>
    <!--评论结束-->
  </div>
</template>

<script>
  import view from './view';

  export default {
    component: {
      'view': view
    },
    data() {
      return {
        shopDrugSpec: {}
      };
    },
    created() {
      this.$http.get('/shopDrugSpecs/' + this.$route.query.shopDrugSpecId)
        .then(res => {
          this.shopDrugSpec = res.data;
          this.shopDrugSpec.sfda = this.shopDrugSpec.sfda.replace('国药准字', '');
        }).catch(error => {
          this.exception(error);
        });
    },
    methods: {}
  };
</script>

<style scoped>
  .is-flex {
    display: flex !important;
  }

  .flex-sa {
    justify-content: space-around;
  }

  .bind-container {
    width: 720px;
    background: #f5f5f5;

  }

  .header {
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .body {
    margin-bottom: 141px;
    margin-top: 130px;
  }

  .broadcast {
    width: 720px;
    height: 625px;
    background: white;
  }

  .broadcast-content {
    width: 720px;
    height: 465px;
    background: white;
  }

  /*药品介绍*/

  .broadcast-title {
    width: 670px;
    height: 160px;
    background: rgba(19, 193, 254, 1);
    z-index: 1;
    margin-left: 22px;
  }

  .broadcast-title-two {
    width: 663px;
    height: 160px;
    background: rgba(220, 220, 220, 1);
    margin-top: 9px;
    margin-left: 37px;
  }

  .drug-name {
    width: 328px;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    margin: 10px auto;
  }

  .drug-function {
    max-width: 600px;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    margin: 10px auto;
    text-align: center;
  }

  .drug-price {
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }

  .stock{
    width: 720px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 30px 20px;
  }
  .stock>div {
    display: flex;
  }
  .stock>div:nth-child(1),.stock>div:nth-child(3),.stock>div:nth-child(5) {
    max-width: 200px;
  }

  /*配送方式*/

  .distribution {
    width: 720px;
    height: 80px;
    margin-top: 16px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .distribution > div {
    display: flex;
    align-items: center;
  }

  .distribution > div > div:nth-child(1) .iconfont {
    font-size: 30px;
    color: #13C1FE;
  }

  .distribution > div > div:nth-child(2) {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  /*详情 评价跳转*/

  .shop-detail {
    width: 720px;
    height: 194px;
    background: rgba(255, 255, 255, 1);
    margin-top: 21px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .shop-detail > div {
    width: 594px;
    height: 69px;
    background: rgba(242, 242, 242, 1);
  }

  .shop-detail > div {
    line-height: 69px;
  }

  .shop-detail > div > span:nth-child(1) {
    margin-left: 185px;
    font-size: 30px;
    color: #13C1FE;
  }

  .shop-detail > div > span:nth-child(2) {
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
  }

  .shop-detail > div > span:nth-child(3) {
    margin-left: 205px;
    font-size: 30px;
  }

  .icon {
    width: auto !important;
    height: auto !important;
  }

  .company {
    width: 720px;
    margin-top: 15px;
    background: white;
    padding-bottom: 20px;
  }

  .companys {
    width: 720px;
  }

  .company-logo {
    width: 114px;
  }

  .company-logo img {
    width: 100%;
    border-radius: 50%;
  }

  .company-name {
    width: 305px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    margin-left: 70px;
  }

  .ic-anquan {
    font-size: 50px;
  }

  .customer {
    margin: 25px 0px 1px 5%;
  }

  .comment {
    margin-top: 18px;
    width: 720px;
    background: white;
  }

  .content-comment {
    height: 51px;
    line-height: 51px;
    font-size: 20px;
  }

  .stars {
    height: 17px;
    line-height: 17px;
    margin-top: 17px !important;
    font-size: 20px;
  }

  .times {
    margin-top: 8px;
    padding-bottom: 18px;
    font-size: 16px;
  }

  .good-comment {
    margin-top: 17px !important;
    color: rgba(102, 102, 102, 1);
    font-size: 20px;
  }

  .customer div p:first-child {
    font-size: 20px;
  }

  .customer div p:last-child {
    margin-top: 10px;
    font-size: 18px;
  }

  .enter-shop {
    width: 450px;
    height: 50px;
    background: rgba(19, 193, 254, 1);
    border-radius: 25px;
    line-height: 50px;
    text-align: center;
    margin-left: 105px;
    margin-top: 33px;
    font-size: 24px;
    padding-bottom: 26px;
  }

  .logo {
    width: 114px;
    height: 78px;
    margin-left: 54px;
    margin-top: 17px;
  }

  .vertical-line {
    height: 30px;
    width: 1PX;
    background-color: black;
  }

  .broadcast-content img{
    height: 100%;
    width: 100%;
  }
</style>
