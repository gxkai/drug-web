<template>
  <div class="position-relative">
    <!--<div class="J_AddInToCart_header">-->
      <!--<router-link :to="{path:'/rxs/shops',query:{id:id}}">-->
        <!--<i class="icon iconfont icon-fanhui"></i>-->
      <!--</router-link>-->
      <!--<div>{{shopName}}</div>-->
      <!--<div>-->
         <!--<router-link to="/messageTypes">-->
            <!--<i style="position:relative" class="icon iconfont  text-white icon-xiaoxi">-->
                <!--<div class="J_AddInToCart_header_hong"></div>-->
            <!--</i>-->
         <!--</router-link>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="d_prescription_titleImg">-->
      <!--<img src="static/img/rxs/bglist.png"/>-->
    <!--</div>-->
    <!--<div id="d_Model" v-show="show"></div>-->

    <new-header :title="shopName">
      <router-link to="/messageTypes" slot="left">
        <i class=" iconfont ic-xiaoxi"></i>
      </router-link>
    </new-header>

   <!--<mt-popup v-model="popupVisible" position="left" @click="popup">-->
   <!--</mt-popup>-->
    <div class="J_AddInToCart_ispf d_bottomnone bg-white" style="height:1.7rem;line-height: 1.7rem;margin-bottom: 0.25rem;">
          <span>
            <i class="icon iconfont ic-changshangbaojia"></i>
            选择厂商
          </span>
      <span class="J_AddInToCart_tu">
         <i class="icon iconfont" style="color:#1AB6FD!important;" @click="lookMore(index)" :class="{'icon-xiala':isActive}"></i>
         <i class="icon iconfont" style="color:#1AB6FD!important;" @click="lookMore(index)" :class="{'icon-youjiantou':!isActive}"></i>
      </span>
    </div>

    <div v-show="show" class="shadow-box">
      <div class="shadow-content">
        <div>
          <span><i class="iconfont ic-changshangbaojia"></i>&nbsp;选择厂商</span>
          <span><i class="icon iconfont ic-guanbi2" @click="takeUp"></i></span>
        </div>
        <div>
            <tr class="">
              <div>
                <i class=" iconfont ic-changfang"></i>
                <span>厂商名称</span>
              </div>
              <td>
                <i class=" iconfont ic-jiage" ></i>
                <span>价格</span>
              </td>
            </tr>
            <tr v-for="(origin,index) in origins" @click="choose(index)">
              <td>{{origin.originName}}</td>
              <td>¥ {{origin.price}}</td>
            </tr>
          </div>
      </div>
    </div>

    <ul>
      <li v-for="(cart,index) in carts" :key="index">
        <new-rx-shop-drugs :isOtc="cart.isOtc" :name="cart.name" :spec="cart.spec" :imgUrl="cart.imgUrl" :price="cart.price"></new-rx-shop-drugs>
      </li>
    </ul>

    <!-- TODO rxBottom -->
    <!--<rxBottom @createCart="createCart"></rxBottom>-->
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        id: '',
        shopId: '',
        shopName: '',
        drugs: [],
        show: false,
        origins: [],
        index: 0,
        carts: [],
        account: {},
        isActive: true
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.shopId = this.$route.query.shopId;
      this.shopName = this.$route.query.shopName;
      if (this.$store.getters.account) {
        this.account = this.$store.getters.account;
      }
      this.getDrugs();
    },
    methods: {
      popup() {
        this.show = false;
      },
      getDrugs() {
        this.$http.get('/rxs/' + this.id + '/shops/' + this.shopId + '/drugs', {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then(res => {
            this.drugs = res.data;
            this.initCart();
            console.log(res.data);
            // getImages(this.carts, this, 'LARGE_LOGO');
          });
      },
      lookMore(index) {
        this.origins = this.drugs[index].drugs;
        this.index = index;
        this.show = true;
        this.popupVisible = true;
        this.isActive = !this.isActive;
      },
      takeUp() {
        this.show = false;
        this.popupVisible = false;
      },
      initCart() {
        this.drugs.forEach(drug => {
          this.carts.push({
            accountId: this.account.id,
            shopId: this.shopId,
            rxId: this.id,
            drugSpecId: drug.drugs[0].drugSpecId,
            shopDrugSpecId: drug.drugs[0].shopDrugSpecId,
            name: drug.name,
            spec: drug.spec,
            brand: drug.drugs[0].brand,
            price: drug.drugs[0].price,
            quantity: drug.quantity,
            fileId: drug.drugs[0].fileId
          });
        });
      },
      choose(index) {
        let cart = this.carts[this.index];
        cart.drugSpecId = this.origins[index].drugSpecId;
        cart.shopDrugSpecId = this.origins[index].shopDrugSpecId;
        cart.brand = this.origins[index].brand;
        cart.price = this.origins[index].price;
        cart.fileId = this.origins[index].fileId;
        // this.getImage(cart, this, 'LARGE_LOGO');
        console.log(cart);
        this.show = false;
      },
      createCart() {
        this.carts.forEach(cart =>
          this.$http.post('/carts', cart)
        );
        Toast({
          message: '加入购物车成功',
          position: 'middle',
          duration: 2000
        });
      }
    }
  };
</script>

<style scoped>

  .shadow-box{
    width: 720px;
    height: 100vh;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#000;
    opacity:0.7;
    z-index: 19950502;
  }
  .shadow-content{
    background: white;
    width: 680px;
    margin: 185px auto;
    color: black;
  }

  /*body {*/
    /*background: #f5f5f5;*/
  /*}*/
  /*#d_model_conetnt {*/
    /*background: white;*/
    /*z-index: 9999999;*/
    /*top: 50%;*/
    /*margin-top: -25%;*/
    /*position: absolute;*/
    /*width: 26rem;*/
    /*left: 50%;*/
    /*margin-left: -13rem;*/
  /*}*/

  /*.J_AddInToCart_header {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*padding: 0 2%;*/
    /*padding-right: 5%;*/
    /*height: 5rem;*/
    /*line-height: 5rem;*/
    /*font-size: 1.4rem;*/
    /*width: 100%;*/
    /*background: #1AB6FD;*/
    /*color: white;*/
  /*}*/

  /*.icon-fanhui {*/
    /*color: white;*/
  /*}*/

  /*#d_model_conetnt table {*/
    /*width: 96%;*/
    /*margin: auto;*/
  /*}*/

  /*#d_model_conetnt table tr {*/
    /*height: 3rem;*/
    /*line-height: 3rem;*/
  /*}*/

  /*#d_model_conetnt table tr td:nth-child(2) {*/
    /*color: #ff0000;*/
  /*}*/

  /*#d_model_conetnt table tr td:first-child {*/
    /*width: 17rem;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*display: inline-block;*/
  /*}*/

  /*.J_AddInToCart_header .icon {*/
    /*font-size: 2rem;*/
  /*}*/

  /*.J_AddInToCart_timg img {*/
    /*width: 100%;*/
  /*}*/

  /*.J_AddInToCart_receipt {*/
    /*display: flex;*/
    /*margin-top: 1rem;*/
    /*padding: 0 3%;*/
  /*}*/

  /*.J_AddInToCart_receipt1 {*/
    /*min-width: 13%;*/
    /*line-height: 4rem;*/
    /*height: 4rem;*/
  /*}*/

  /*.J_AddInToCart_receipt1 .icon {*/
    /*font-size: 3rem;*/
  /*}*/

  /*.J_AddInToCart_receipt2 {*/
    /*width: 90%;*/

  /*}*/

  /*.J_AddInToCart_receipt2 div {*/
    /*height: 2rem;*/
    /*line-height: 2rem;*/
    /*font-size: 0.9rem;*/
    /*display: flex;*/
  /*}*/

  /*.J_AddInToCart_receipt2 div span {*/
    /*display: inline-block;*/
    /*min-width: 20%;*/
    /*text-align: left;*/
  /*}*/

  /*.J_AddInToCart_ispf {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*height: 3rem;*/
    /*line-height: 3rem;*/
    /*font-size: 1.2rem;*/
    /*padding: 0 3%;*/
    /*border-bottom: 1px solid #b8b8b8;*/
    /*padding-bottom: 2rem;*/
  /*}*/

  /*.J_AddInToCart_zi {*/
    /*color: red;*/
  /*}*/

  /*.J_AddInToCart_tu .icon {*/
    /*font-size: 1.8rem;*/
  /*}*/

  /*.J_AddInToCart_check {*/
    /*text-align: right;*/
    /*margin-right: 3%;*/
    /*color: red;*/
    /*height: 2rem;*/
    /*line-height: 2rem;*/
  /*}*/

  /*.J_AddInToCart_yao {*/
    /*display: flex;*/
    /*width: 100%;*/
    /*margin: auto;*/
  /*}*/

  /*.J_AddInToCart_yao_d1 {*/
    /*width: 30%;*/
    /*position: relative;*/
    /*margin-right: 3%;*/
  /*}*/

  /*.J_AddInToCart_yao_d1_img1 {*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/

  /*.J_AddInToCart_yao_d1_img2 {*/
    /*width: 17%;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
  /*}*/

  /*.J_AddInToCart_yao_d2 div {*/
    /*line-height: 2.3rem;*/

  /*}*/

  /*.J_AddInToCart_yao_d2_d2 {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*color: #999;*/
    /*font-size: 0.9rem;*/
  /*}*/

  /*.J_AddInToCart_yao_d2_d3 {*/
    /*font-size: 1.2rem;*/
    /*color: red;*/
  /*}*/

  /*.J_AddInToCart_shop {*/
    /*margin-top: 2rem;*/
    /*line-height: 2rem;*/
    /*height: 2rem;*/
    /*font-size: 1.2rem;*/
    /*padding: 0 3%;*/
  /*}*/

  /*.J_AddInToCart_abbill {*/
    /*padding: 0.5rem 3%;*/
  /*}*/

  /*.J_AddInToCart_abbill > div {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*height: 1.5rem;*/
    /*line-height: 1.5rem;*/
  /*}*/

  /*.J_AddInToCart_gtotal {*/
    /*color: #999;*/
    /*font-size: 0.9rem;*/
  /*}*/

  /*.J_AddInToCart_freight {*/
    /*color: #999;*/
    /*font-size: 0.9rem;*/
  /*}*/

  /*.J_AddInToCart_medicali_d2 {*/
    /*color: red;*/
    /*font-size: 0.9rem;*/
  /*}*/

  /*.J_AddInToCart_youneedpay_d2 {*/
    /*font-size: 1.1rem;*/
    /*color: red;*/
  /*}*/

  /*.J_AddInToCart_button {*/
    /*width: 20%;*/
    /*height: 2rem;*/
    /*line-height: 2rem;*/
    /*color: #20b7bd;*/
    /*border: 1px solid #20b7bd;*/
    /*border-radius: 2rem;*/
    /*text-align: center;*/
    /*font-size: 1.1rem;*/
    /*float: right;*/
    /*margin: 1rem 3% 0 1rem ;*/
  /*}*/

  /*.J_AddInToCart_aboutbill {*/
    /*margin-top: 1rem;*/
    /*padding: 0 3%;*/
    /*color: #999;*/
    /*margin-bottom: 4rem;*/
  /*}*/

  /*.J_AddInToCart_aboutbill div {*/
    /*height: 1.5rem;*/
    /*line-height: 1.5rem;*/
  /*}*/

  /*.J_AddInToCart_bd {*/
    /*width: 100%;*/
    /*height: 2rem;*/
    /*margin-top: 1rem;*/
  /*}*/

  /*.J_AddInToCart_header_hong {*/
    /*width: 0.6rem;*/
    /*height: 0.6rem;*/
    /*background-color: red;*/
    /*border-radius: 0.6rem;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
  /*}*/

  /*.J_AddInToCart_receipt3 {*/
    /*position: absolute;*/
    /*right: 3%;*/
    /*top: 1rem;*/
  /*}*/

  /*#AddInToCart ul {*/
    /*margin-bottom: 1rem;*/
  /*}*/

  /*.d_prescription_titleImg img {*/
    /*width: 100%;*/
    /*margin-top: 1rem;*/
  /*}*/

  /*.icon-xiala {*/
    /*color: #1AB6FD;*/
  /*}*/

  /*.J_AddInToCart_yao_d2 {*/
    /*flex-direction: column;*/

  /*}*/

  /*.d_model_conetnt_black {*/
    /*color: #1AB6FD !important;*/
  /*}*/

  /*#d_model_conetnt table tr {*/
    /*border-bottom: 1px solid #e5e5e5;*/
  /*}*/

  /*.ic-qian, .ic-yao, .ic-yaopinshuju, .ic-changshangbaojia, .ic-changfang, .ic-jiage, .ic-guanbi2 {*/
    /*color: #1AB6FD;*/
  /*}*/
  /*#ic_guanbi2{*/
     /*color: #1AB6FD;*/
  /*}*/

  /*.J_AddInToCart_yao_d2_d1, .J_AddInToCart_yao_d2_d2, .J_AddInToCart_yao_d2_d3 {*/
    /*color: #000000;*/
    /*font-size: 1.2rem;*/
  /*}*/

  /*.d_rxs_shop_price {*/
    /*color: #ff0000;*/
  /*}*/

  /*.d_rxs_cartnmae {*/
    /*font-size: 1.1rem;*/
  /*}*/

  /*.d_bottomnone {*/
    /*border-bottom: 0px;*/
  /*}*/
  /*.elips{*/
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*width:70%;*/
  /*}*/

  /*ul li {*/
    /*padding-bottom: 1.5rem;*/
  /*}*/
  /*#icon_xiaoxi{color: white;}*/
  /*#AddInToCart{*/
    /*background:#f5f5f5;*/
    /*height: 100vh;*/
  /*}*/
</style>
