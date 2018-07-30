<template>
  <div class="bind-container">
    <mt-header title="商品详情">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!--上方轮播开始-->
    <div class="broadcast">
      <div class="broadcast-content"></div>
      <div class="position-relative">
        <div class="broadcast-title position-absolute">
          <p class="drug-name elps">沙科舒 复方沙棘籽油栓</p>
          <p class="drug-function elps">清热燥湿，消肿止痛、杀虫止痒、活血生肌。</p>
          <p class="drug-price">¥29.79</p>
        </div>
        <div class="broadcast-title-two position-absolute">

        </div>
      </div>
    </div>
    <!--库存开始-->
    <div class="stock">
      <div class="d-inline-block fl width-percent-52">
        <span class="allow">国药准字：</span>
        <span class="stock-number d-inline-block">ZI9991076</span>
        <span class="d-inline-block">|</span>
      </div>
      <div class="d-inline-block fl width-percent-48">
        <span class="allow">库存：</span>
        <span>998</span>
      </div>
    </div>
    <div class="stock mt-l-0">
      <div class="d-inline-block fl width-percent-52">
        <span class="allow">包装规格：</span>
        <span class="stock-number d-inline-block">7盒/粒</span>
        <span class="d-inline-block">|</span>
      </div>
      <div class="d-inline-block fl width-percent-48">
        <span class="allow">是否处方：</span>
        <span>是</span>
      </div>
    </div>
    <!--库存结束-->

    <!--配送商家开始-->
    <div class="distribution mode">
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
          <div class="shop-details">
            <i class="icon iconfont ic-liwu-copy text-1AB6FD predetnt"></i>
            <span>商品详情</span>
            <i class="icon iconfont ic-youjiantou1 text-333333"></i>
          </div>
       <div class="shop-details">
         <i class="icon iconfont ic-pingjia text-1AB6FD predetnt"></i>
         <span>商品评价</span>
         <i class="icon iconfont ic-youjiantou1 text-333333"></i>
      </div>
     </div>
    <!--商品详情结束-->

    <!--公司信息开始-->
     <div class="company">
        <div class="companys">
            <div class="d-inline-block company-logo">

            </div>
          <div class="company-name d-inline-block">
              <p class="elps">上海凯尔康大药房有限责任公司</p>
              <p class="elps">星星</p>
          </div>
          <div class="d-inline-block fr">
            <i class="icon iconfont ic-anquan text-1AB6FD"></i>
          </div>
        </div>
        <!--客户服务开始-->
         <div class="width-percent-90 customer">
            <div class="d-inline-block width-percent-24 text-center">
                  <p>客户服务</p>
                  <p class="text-red">4.9分</p>
            </div>
           <div class="d-inline-block width-percent-24 text-center">
             <p>发货速度</p>
             <p class="text-red">4.9分</p>
           </div>
           <div class="d-inline-block width-percent-24 text-center">
             <p>物流速度</p>
             <p class="text-red">4.9分</p>
           </div>
           <div class="d-inline-block width-percent-24 text-center">
             <p>商品包装</p>
             <p class="text-red">4.9分</p>
           </div>

         </div>
        <!--客户服务结束-->
     </div>
    <!--公司信息结束-->
    <!--评论开始-->
    <div class="comment width-percent-100">
        <div class="content-comment width-percent-94 m-auto border-bottom-f1f1f1">
              <span class="d-inline-block fl">顾客评论（99+）</span>
              <span class="d-inline-block fr">查看全部评价</span>
        </div>
      <div class="stars width-percent-94 m-auto">
          <span class="fl d-inline-block">星星</span>
          <span class="fr d-inline-block">15*****</span>
      </div>
      <div class="width-percent-94 m-auto good-comment">
        <span>物流比较快，好评！</span>
      </div>
      <div class="times width-percent-94 m-auto">
        2017/7/22 18:55
      </div>




    </div>
    <!--评论结束-->
  </div>
</template>

<script>
    export default{
      name: 'drugShop',
      data() {
        return {
          drugImgs: []
        }
      },
      created(){
        let id = this.$route.query.id;
        this.$http.get(this.URL_PATH + '/shopDrugSpecs/' + id)
          .then(res => {
            if (res.status === 200) {
              this.shopDrugSpec = res.data;
              console.log(this.shopDrugSpec);
              this.shopDrugSpec.fileIds.forEach(fileId => {
                let URL = this.URL_PATH + '/files/' + fileId + '/image?resolution=LARGE_PIC';
                this.drugImgs.push(URL);
              });
              this.shopTotalAppraise = this.shopDrugSpec.shopTotalAppraise;
              this.pageList = this.shopDrugSpec.drugAppraises.list;
              this.drugAppraises = this.shopDrugSpec.drugAppraises;
              this.headImg = this.URL_PATH + '/files/' + this.shopDrugSpec.shopLogo + '/image?resolution=LARGE_LOGO';
              this.$storage.setStorage('shopDrugSpec', this.shopDrugSpec);
            }
          });
      }
    }
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
    z-index: 9;
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
  }

  .distribution {
    width: 720px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
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
  .shop-detail{
    width:720px;
    height:194px;
    background:rgba(255,255,255,1);
  }
  .shop-details{
    width:594px;
    height:69px;
    background:rgba(242,242,242,1);
    margin-left: 63px;
    margin-bottom: 17px;
    line-height: 69px;
  }
  .ic-youjiantou1{
    margin-left: 206px;
  }
  .shop-detail{
    margin-top: 21px;
  }
  .icon{width: auto!important;
    height: auto!important;}
  .predetnt{
    margin-left: 185px;
  }
  .ic-youjiantou1{
    float: right;
    margin-right: 25px;
  }
  .company{
    width:720px;
    height:277px;
    margin-top: 15px;
    background: white;
  }
  .companys{
    width: 720px;
  }
  .company-logo{
    width:114px;
    height:78px;
  }
  .company-name{
    width:305px;
    height:21px;
    font-size:22px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height:30px;
  }
  .ic-anquan{
    width: 58px;
    font-size:1rem;
  }
  .customer{
    margin: 25px 0px 0px 5%;
  }
  .comment{
    margin-top: 18px;
    width:720px;
    background: white;
  }
  .content-comment{
    height: 51px;
    line-height: 51px;
  }
  .stars{
    height: 17px;
    line-height: 17px;
    margin-top: 17px!important;
  }
  .times{
    margin-top: 8px;
    padding-bottom: 18px;
  }
  .good-comment{
    margin-top: 17px!important;
    color:rgba(102,102,102,1);
  }
</style>
