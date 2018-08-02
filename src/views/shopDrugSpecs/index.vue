<template>
  <div class="bind-container">
    <new-header title="商品详情" ref="header">
      <i class="iconfont ic-arrow-right" slot="left" @click.stop="$router.push('/')"></i>
    </new-header>
    <drugView :shopDrugSpec="alldrugInfo" class="d-none"></drugView>
    <!--上方轮播开始-->
    <div class="broadcast">
      <div class="broadcast-content">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(drugImg,index) in drugImgs" :key="index">
            <img v-lazy="drugImg" class="width-percent-100"/>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="position-relative">
        <div class="broadcast-title position-absolute">
          <p class="drug-name elps text-center">{{shopDrugSpec.name}}</p>
          <p class="drug-function elps text-center">{{shopDrugSpec.introduce}}</p>
          <p class="drug-price text-center">¥{{shopDrugSpec.price}}</p>
        </div>
        <div class="broadcast-title-two position-absolute"></div>
      </div>
    </div>
    <!--库存开始-->
    <div class="stock">
      <div class="d-inline-block fl width-percent-52 fz20">
        <span class="allow">国药准字：</span>
        <span class="stock-number d-inline-block">{{shopDrugSpec.sfda.replace('国药准字','')}}</span>
        <span class="d-inline-block">|</span>
      </div>
      <div class="d-inline-block fl width-percent-48">
        <span class="allow">库存：</span>
        <span>{{shopDrugSpec.stock}}</span>
      </div>
    </div>
    <div class="stock mt-l-0 fz20">
      <div class="d-inline-block fl width-percent-52">
        <span class="allow">包装规格：</span>
        <span class="stock-number d-inline-block">{{shopDrugSpec.spec}}</span>
        <span class="d-inline-block">|</span>
      </div>
      <div class="d-inline-block fl width-percent-48">
        <span class="allow">类型：</span>
        <span>{{shopDrugSpec.isOtc | TYPES(shopDrugSpec.isOtc)}}</span>
      </div>
    </div>
    <!--库存结束-->

    <!--配送商家开始-->
    <div class="distribution mode fz20">
      <div class="width-percent-32 d-inline-block">
        <i class="icon iconfont ic-peisong text-1AB6FD business"></i>
        <span>商家配送</span>
      </div>
      <div class="width-percent-32 d-inline-block">
        <i class="icon iconfont ic-zitidai text-1AB6FD business"></i>
        <span>商家配送</span>
      </div>
      <div class="width-percent-32 d-inline-block">
        <i class="icon iconfont ic-mianfei text-1AB6FD business"></i>
        <span>商家配送</span>
      </div>
    </div>
    <!--配送商家结束-->

    <!--商品详情开始-->
    <div class="shop-detail">
      <div class="height-l-20"></div>
      <router-link :to="{path: '/shopDrugSpecs/view', query: {index: 1,shopDrugSpec: JSON.stringify(shopDrugSpec)}}" >
        <div class="shop-details">
          <i class="icon iconfont ic-liwu-copy text-1AB6FD predetnt"></i>
          <span class="text-666666">商品详情</span>
          <i class="icon iconfont ic-youjiantou1 text-333333"></i>
        </div>
      </router-link>
      <router-link :to="{path: '/shopDrugSpecs/view', query: {index: 0,shopDrugSpec: JSON.stringify(shopDrugSpec)}}">
        <div class="shop-details">
          <i class="icon iconfont ic-pingjia text-1AB6FD predetnt"></i>
          <span class="text-666666">商品评价</span>
          <i class="icon iconfont ic-youjiantou1 text-333333"></i>
        </div>
      </router-link>
    </div>
    <!--商品详情结束-->

    <!--公司信息开始-->
    <div class="company">
      <div class="companys">
        <div class="d-inline-block company-logo">
          <img v-lazy="headImg" class="logo"/>
        </div>
        <div class="company-name d-inline-block">
          <p class="elps">{{shopDrugSpec.shopName}}</p>
          <p class="elps">
            <new-star :size="shopTotalAppraise.serviceScore" disabled></new-star>
          </p>
        </div>
        <div class="d-inline-block fr">
          <i class="icon iconfont ic-anquan text-1AB6FD"></i>
        </div>
      </div>
      <!--客户服务开始-->
      <div class="width-percent-90 customer">
        <div class="d-inline-block width-percent-22 text-center">
          <p>客户服务</p>
          <p class="text-red">{{shopTotalAppraise.serviceScore}}分</p>
        </div>
        <div class="d-inline-block width-percent-22 text-center">
          <p>发货速度</p>
          <p class="text-red">{{shopTotalAppraise.deliveryScore}}分</p>
        </div>
        <div class="d-inline-block width-percent-22 text-center">
          <p>物流速度</p>
          <p class="text-red">{{shopTotalAppraise.describeScore}}分</p>
        </div>
        <div class="d-inline-block width-percent-22 text-center">
          <p>商品包装</p>
          <p class="text-red">{{shopTotalAppraise.packageScore}}分</p>
        </div>
        <router-link :to="{path:'/shops/view',query:{id:shopDrugSpec.shopId}}">
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
        <span class="d-inline-block fl">顾客评论（{{drugAppraises.total}}）</span>
        <router-link tag="span" :to="{path: '/shopDrugSpecs/view', query: {index: 0}}">
          <span class="d-inline-block fr">查看全部评价</span>
        </router-link>
      </div>
      <div v-for="drugAppraise in pageList">
        <div class="stars width-percent-94 m-auto">
          <span class="fl d-inline-block"> <new-star :size="drugAppraise.score" disabled></new-star></span>
          <span class="fr d-inline-block">{{drugAppraise.username}}</span>
        </div>
        <div class="width-percent-94 m-auto good-comment">
          <span class="elps">{{drugAppraise.content}}</span>
        </div>
        <div class="times width-percent-94 m-auto">
          {{timeConvert(drugAppraise.createdDate)}}
        </div>
      </div>
      <new-join-car :drugInfo="alldrugInfo"></new-join-car>
     </div>
    <!--评论结束-->
   </div>
</template>

<script>
import drugView from '@/views/shopDrugSpecs/view.vue';
export default {
  data() {
    return {
      shopTotalAppraise: '',
      drugImgs: [],
      shopDrugSpec: [],
      drugAppraises: '',
      headImg: '',
      pageList: '',
      createdDate: '',
      allDrugInfo: []
    };
  },
  created() {
    let id = '1';
    this.$http.get('/shopDrugSpecs/' + id)
      .then(res => {
        if (res.status === 200) {
          this.shopDrugSpec = res.data;
          this.alldrugInfo = res.data;
          this.shopDrugSpec.fileIds.forEach(fileId => {
            let URL = '/files/' + fileId + '/image?resolution=LARGE_PIC';
            this.drugImgs.push(URL);
          });
          this.shopTotalAppraise = this.shopDrugSpec.shopTotalAppraise;
          this.pageList = this.shopDrugSpec.drugAppraises.list;
          this.drugAppraises = this.shopDrugSpec.drugAppraises;
          this.headImg = '/files/' + this.shopDrugSpec.shopLogo + '/image?resolution=LARGE_LOGO';
        }
      });
  },
  mounted() {
    this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight) + 'px';
    this.$refs.body.style.overflow = 'scroll';
  },
  methods: {},
  components: {
    drugView: drugView
  },
  filters: {
    TYPES(drugtype) {
      if (drugtype) {
        return '非处方药';
      } else {
        return '处方药';
      }
    },
    timeConvert(date) {
      return this.timeConvert(date);
    }
  }
};
</script>

<style scoped>
  .bind-container {
    width: 720px;
    background: #f5f5f5;
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

  .broadcast-title {
    width: 670px;
    height: 160px;
    background: rgba(19, 193, 254, 1);
    margin: auto;
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
    height: 29px;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    line-height: 29px;
    margin-top: 33px;
    margin-left: 170px;
  }

  .drug-function {
    width: 349px;
    height: 18px;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
    margin-top: 15px;
    margin-left: 170px;
  }

  .drug-price {
    width: 110px;
    height: 25px;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
    margin-top: 13px;
    margin-left: 283px;
  }

  .stock {
    margin-top: 24px;
    width: 720px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    line-height: 80px;
  }

  .allow {
    margin-left: 59px;
    color: #13C1FE;
    font-size: 20px;
  }

  .stock-allow {
    width: 200px;
    height: 20px;
    font-size: 20px;
    line-height: 30px;
  }

  .stock-line {
    width: 1px;
    height: 18px;
    background: rgba(125, 125, 125, 1);
  }

  .stock-number {
    width: 150px;
    font-size: 20px;
  }

  .distribution {
    width: 720px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    font-size: 20px;
  }

  .business {
    margin-left: 58px;
    width: 34px;
    height: 27px;
  }

  .distribution {
    margin-top: 16px;
    line-height: 80px;
  }

  .mode ul li {
    width: 175px;
    float: left;
  }

  .mode ul li i {
    width: 27px;
  }

  .distribution ul {
    width: 720px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
  }

  .shop-detail {
    width: 720px;
    height: 194px;
    background: rgba(255, 255, 255, 1);
  }

  .shop-details {
    width: 594px;
    height: 69px;
    background: rgba(242, 242, 242, 1);
    margin-left: 63px;
    margin-bottom: 17px;
    line-height: 69px;
    font-size: 30px;
  }

  .ic-youjiantou1 {
    margin-left: 206px;
  }

  .shop-detail {
    margin-top: 21px;
  }

  .icon {
    width: auto !important;
    height: auto !important;
  }

  .predetnt {
    margin-left: 180px;
  }

  .ic-youjiantou1 {
    float: right;
    margin-right: 25px;
  }

  .company {
    width: 720px;
    height: 277px;
    margin-top: 15px;
    background: white;
  }

  .companys {
    width: 720px;
  }

  .company-logo {
    width: 114px;
    height: 78px;
  }

  .company-name {
    width: 305px;
    height: 21px;
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-left: 70px;
  }

  .ic-anquan {
    width: 58px;
    font-size: 1rem;
  }

  .customer {
    margin: 25px 0px 0px 5%;
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

  .stock span {
    font-size: 20px;
  }

  .customer div p:first-child {
    font-size: 19px;
  }

  .customer div p:last-child {
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
</style>
