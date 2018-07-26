<template>
  <div class="main">
    <new-header title="发表评论">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
      <span slot="right" @click="commit">发布</span>
    </new-header>
    <div class="body">
    <ul >
      <li>
        <div class="line1">
          <img src="../../assets/image/shopDrugs.png">
        </div>
        <div class="line"></div>
        <div class="line2">
        <div class="text" contenteditable="true" placeholder="宝贝满足你的期待吗？说说它的优点和不足的地方吧。">
        </div>
        </div>
        <div class="line3">
          <i class="iconfont ic-zhaoxiangji"></i>
          <span>你的评价能帮助其他小伙伴哦</span>
        </div>
      </li>
    </ul>
    <footer>
      <div class="title1">
        <i class="iconfont ic-shangchuanmoban"></i>
        <span>店铺评分</span>
      </div>
      <div class="content1">
        <div class="line1">
          <span>配送速度</span>
        </div>
        <div class="line2">
          <span>服务态度</span>
        </div>
        <div class="line3">
          <span>描述相符</span>
        </div>
        <div class="line4">
          <span>商品包装</span>
        </div>
      </div>
    </footer>
    </div>
    <!--<mt-header title="发表评论">-->
      <!--<router-link to="#" slot="left">-->
        <!--<mt-button icon="back" @click="$router.go(-1)"></mt-button>-->
      <!--</router-link>-->
      <!--<mt-button slot="right" @click="commit">发布</mt-button>-->
    <!--</mt-header>-->

    <!--<div class="f_appraise_lists" v-for="orderItem in orderItemList">-->
      <!--<div class="f_appraise_list">-->
        <!--<div class="f_appraise_list_up">-->
          <!--<img :src="orderItem.drugLogo"/>-->
          <!--<star-rating v-model="orderItem.score" star-size="25" active-color="red"></star-rating>-->
        <!--</div>-->
        <!--<div class="f_appraise_list_down">-->
          <!--<textarea name="" rows="10" cols="" placeholder="宝贝满足你的期待吗？说说它的优点和不足的地方吧" v-model="orderItem.content">{{orderItem.content}}</textarea>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="f_appraise_shops">-->
      <!--<div class="f_appraise_shops_title">-->
        <!--<span>店铺评分</span>-->
      <!--</div>-->
      <!--<div class="f_appraise_shops_list">-->
        <!--<span>配送速度：</span>-->
        <!--<star-rating v-model="deliveryScore" star-size="25" active-color="red"></star-rating>-->
      <!--</div>-->

      <!--<div class="f_appraise_shops_list">-->
        <!--<span>服务态度：</span>-->
        <!--<star-rating v-model="serviceScore" star-size="25" active-color="red"></star-rating>-->
      <!--</div>-->

      <!--<div class="f_appraise_shops_list">-->
        <!--<span>描述相符：</span>-->
        <!--<star-rating v-model="describeScore" star-size="25" active-color="red"></star-rating>-->
      <!--</div>-->


      <!--<div class="f_appraise_shops_list">-->
        <!--<span>商品包装：</span>-->
        <!--<star-rating v-model="packageScore" star-size="25" active-color="red"></star-rating>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  // import StarRating from 'vue-star-rating';

  export default {
    name: 'myAppraise',
    data() {
      return {
        orderId: '',
        orderItemList: [],
        deliveryScore: 5,
        serviceScore: 5,
        describeScore: 5,
        packageScore: 5,
        accountId: '',
        shopId: '',
        drugs: []
      };
    },
    created() {
      // this.accountId = this.$store.getters.account.id;
      // this.orderId = this.$route.query.orderId;
      // this.$http.get('/orders/' + this.orderId + '/appraise')
      //   .then(res => {
      //     this.orderItemList = res.data;
      //     this.orderItemList.forEach(item => {
      //       item.logo = this.getImgURL(item.fileId, 'lARGE_LOGO');
      //       item.score = 5;
      //       item.content = '';
      //     });
      //     this.shopId = this.orderItemList[0].shopId;
      //   });
    },
    methods: {
      commit: function () {
        this.drugs = this.orderItemList.filter((item, index, orderItemList) => {
          return index !== 'drugLogo' || index !== 'accountId' || index !== 'shopId' || index !== 'fileId';
        });
        this.$http.post('/drugAppraises', {
          'accountId': this.accountId,
          'orderId': this.orderId,
          'shopId': this.shopId,
          'deliveryScore': this.deliveryScore,
          'describeScore': this.describeScore,
          'packageScore': this.packageScore,
          'serviceScore': this.serviceScore,
          'drugs': this.drugs
        })
          .then(res => {
            if (res.status === 200) {
              this.$router.push('/drugAppraises/success');
            }
          });
      }
    }
    // components: {
    //   'star-rating': StarRating
    // }
  };
</script>

<style scoped>
  .main {
    background: rgba(241, 239, 240, 1);
    width: 720px;
    height: 100vh;
  }

  .body {
    width: 720px;
    height: calc(100vh - 130px);
    overflow: scroll;
  }
  li {
    width:720px;
    height:620px;
    background:rgba(255,255,255,1);
    margin-bottom: 20px;
  }
  li .line {
    width:720px;
    height:2px;
    background:rgba(199,199,199,1);
    opacity:0.4;
  }
  li .line1{
    display: flex;
    align-items: center;
    padding: 20px;
  }

  li .line1 img{
    height:98px;
  }

  li .line2 {
    padding: 20px;
    height: 340px;
    background:rgba(255,255,255,1);
  }
  li .line2 .text{
    height: 300px;
    word-break: break-all;
    word-wrap: break-word;
    outline: none;
  }

  li .line2 .text:empty::before{
    color: lightgrey;
    content: attr(placeholder);
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(204,204,204,1);
  }

  li .line3 {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background:rgba(255,255,255,1);
  }

  .ic-zhaoxiangji:before {
    font-size: 70px;
    color: #CCCCCC;
  }
  li .line3 span {
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(204,204,204,1);
  }

  .ic-shangchuanmoban {
    font-size: 50px;
    color: #CCCCCC;
  }
  footer {
    background:rgba(255,255,255,1);
    padding: 20px;
  }
  footer .title1 span {
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }

  footer .content1 div {
    padding: 10px;
  }
  /*.mint-header {*/
    /*background: white;*/
    /*color: black;*/
  /*}*/

  /*.mint-button--primary {*/
    /*background: #1AB6FD;*/
    /*color: #e2e2e2;*/
  /*}*/

  /*.f_drug_appraise_header {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*background: #1AB6FD;*/
    /*color: #fefeff;*/
    /*padding: 0.5rem;*/
    /*box-sizing: border-box;*/
  /*}*/

  /*.f_drug_appraise_header > button {*/
    /*background: none;*/
    /*border: 1px #fefeff solid;*/
    /*border-radius: 5px;*/
    /*color: #fefeff;*/
    /*box-sizing: border-box;*/
    /*padding: 0.2rem;*/
    /*margin-top: 0.2rem;*/
  /*}*/

  /*.f_drug_appraise_lists_title img {*/
    /*width: 100%;*/
  /*}*/

  /*.f_drug_appraise_list {*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*padding: 0.5rem;*/
    /*border-bottom: 1px #fcfcfc solid;*/
  /*}*/

  /*.f_drug_appraise_list > img {*/
    /*width: 20%;*/
  /*}*/

  /*.f_drug_appraise_list > button {*/
    /*width: 30%;*/
    /*background: none;*/
    /*outline: none;*/
    /*border: 1px #2cbbc0 solid;*/
    /*color: #2cbbc0;*/
    /*border-radius: 5px;*/
  /*}*/

  /*.f_drug_appraises_list > button {*/
    /*width: 30%;*/
    /*background: none;*/
    /*outline: none;*/
    /*border: 1px #2cbbc0 solid;*/
    /*color: #2cbbc0;*/
    /*border-radius: 5px;*/
  /*}*/

  /*textarea {*/
    /*width: 100%;*/
    /*background-color: transparent;*/
    /*scrollbar-arrow-color: yellow;*/
    /*scrollbar-base-color: lightsalmon;*/
    /*overflow: hidden;*/
    /*color: #666464;*/
    /*height: 100px;*/
    /*outline: none;*/
    /*resize: none;*/
    /*padding: 0.5rem;*/
    /*box-sizing: border-box;*/
  /*}*/

</style>
