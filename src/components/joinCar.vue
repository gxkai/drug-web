<template>
  <div>
    <footer>
      <div @click.stop="$router.push({path:'/chats/view',query:{shopId:drugInfo.shopId}})" >
        <i class="iconfont ic-zixun"></i>
        <p>咨询</p>
      </div>
      <div @click.stop="$router.push({path:'/shops/view',query:{shopId:drugInfo.shopId}})">
        <i class="iconfont ic-drugstore"></i>
        <p>药店</p>
      </div>
      <div @click="onCollect()">
        <i class="iconfont ic-shoucang" :class="{active:isCollect}"></i>
        <p>收藏</p>
      </div>
      <div @click="$router.push('/carts')">
        <i class="iconfont ic-gouwuche2"></i>
        <p>购物车</p>
      </div>
      <div class="joincar" @click="joinCar()" v-if="drugInfo.otc">
        <p>加入购物车</p>
      </div>
      <div class="joincar" @click="joinCar()" v-else style="background-color: lightgrey">
        <p>加入购物车</p>
      </div>
      <div class="immediately-buy" @click.stop="onBuy()" v-if="drugInfo.otc">
        <p>立即购买</p>
      </div>
      <div class="immediately-buy" @click.stop="onBuy()" style="background-color: #889092" v-else>
        <p>立即购买</p>
      </div>
    </footer>



    <mt-popup v-model="popupVisible" @click="close()"></mt-popup>
    <transition name="slide-fade" v-show="show">
      <div class="hide-drug-detail" v-show="show">
        <div class=" drug-top">
          <div class="d-inline-block fl drug-img">
            <img :src="getImgURL(drugInfo.drugLogo,'LARGE_LOGO')"/>
          </div>
          <div class="drug-close">
            <i class="icon iconfont ic-guanbi2" @click="close()"></i>
          </div>
          <div>
            <!-- {{drugInfo}}-->
          </div>
          <div class="drug-info  elps">
            <p class="drug-title elps"> {{drugInfo.name}}</p>
            <p class="drug-price">¥{{drugInfo.price}}</p>
          </div>
        </div>
        <div class="drug-line"></div>
        <div class="drug-buy-number">
          <div class="d-inline-block fl drug-buy">购买数量</div>
          <div class="d-inline-block fr">
            <span class="drug-reduce d-inline-block" @click="drugReduce()">－</span>
            <span class="drug-number d-inline-block">{{number}}</span>
            <span class="drug-add d-inline-block" @click="drugAdd()">+</span>
          </div>
        </div>
        <div class="drug-sure" @click.stop="onConfirm()">确定</div>
      </div>
    </transition>

  </div>
</template>

<script>
  import { Toast, MessageBox } from 'mint-ui';
  export default {
    name: 'newFooter',
    props: {
      drugInfo: {
        type: Object,
        required: true
      },
      urlRouter: {
        type: String
      }
    },
    data() {
      return {
        number: 1,
        show: false,
        popupVisible: false,
        type: 0,
        isCollect: false
      };
    },
    created() {
      this.$http.get('/collects/drug/one?shopDrugSpecId=' + this.drugInfo.id)
        .then(res => {
          this.isCollect = res.data;
        }).catch(error => {
          this.exception(error);
        });
    },
    methods: {
      onCollect() {
        let data = {
          'shopId': this.drugInfo.shopId,
          'drugSpecId': this.drugInfo.drugSpecId,
          'shopDrugSpecId': this.drugInfo.id,
          'isCollect': !this.isCollect
        };
        this.$http.post('/collects/drug', data)
          .then(res => {
            this.isCollect = !this.isCollect;
          }).catch(error => {
            this.exception(error);
          });
      },
      onBuy() {
        if (this.drugInfo.otc) {
          this.show = !this.show;
          this.type = 1;
          this.popupVisible = true;
        } else {
          MessageBox('提示', '处方药不能立即购买');
        }
      },
      drugReduce() {
        if (this.number === 1) {
          this.number = 1;
          Toast('不能再减啦');
        } else {
          this.number--;
        }
      },
      drugAdd() {
        this.number++;
      },
      joinCar() {
        if (this.drugInfo.otc) {
          this.show = !this.show;
          this.type = 0;
          this.popupVisible = true;
        } else {
          MessageBox('提示', '处方药不能加入购物车');
        }
      },
      close() {
        this.popupVisible = false;
        this.show = !this.show;
      },
      onConfirm() {
        if (this.type === 0) {
          this.$http.post('/carts', [{
            shopId: this.drugInfo.shopId,
            drugSpecId: this.drugInfo.drugSpecId,
            shopDrugSpecId: this.drugInfo.id,
            quantity: this.number
          }]).then(res => {
            Toast({
              message: '加入成功',
              duration: 500
            });
            this.close();
          });
        } else {
          let drugInfoList = [];
          drugInfoList.push({
            shopDrugSpecId: this.drugInfo.id,
            quantity: this.number
          });
          let data = {
            'shopId': this.drugInfo.shopId,
            'shopName': this.drugInfo.shopName,
            'orderShopDrugSpecInfoDTOList': drugInfoList
          };
          this.$http.post('orders/shop/get', data)
            .then(res => {
              this.$router.push('/orders/create/fromShop?orderShopDrugSpecDTO=' + JSON.stringify(data));
            })
            .catch(err => {
              this.exception(err);
            });
        }
      }
    }
  };
</script>

<style scoped>
  footer{
    height: 141px;
    position: fixed;
    bottom: 0px;
    z-index: 999;
  }
  footer div:nth-child(1),footer div:nth-child(2),footer div:nth-child(3),footer div:nth-child(4) {
    margin-top: 15px;
  }
  .drug-buy-number{
    height: 86px;
  }
  .drug-top{
    height: 250px;
  }
  .drug-buy{
    margin: 30px 0 0 13px;
    font-size:24px;
  }
  .drug-reduce{
    width:36px;
    height:32px;
    background:rgba(238,238,238,1);
    opacity:0.6;
    border-radius:3px;
    text-align: center;
    line-height: 32px;
    margin-top: 26px;
    font-size:19px;
  }
  .drug-number{
    min-width:48px;
    height:32px;
    background:rgba(234,234,234,1);
    border-radius:3px;
    margin: 26px 7px 0px 7px;
    text-align: center;
    line-height: 32px;
    font-size:23px;
  }
  .drug-add{
    width:35px;
    height:32px;
    background:rgba(220,220,220,1);
    opacity:0.6;
    border-radius:3px;
    text-align: center;
    line-height: 32px;
    margin-top: 26px;
    margin-right: 26px;
    font-size:19px;
  }
  .hide-drug-detail{
    width:720px;
    height:455px;
    background: white;
    bottom: 0px;
    position: fixed;
    z-index: 9999;
  }
  .drug-sure{
    width:690px;
    height:90px;
    background:rgba(19,193,254,1);
    border-radius:8px;
    font-size:36px;
    color: white;
    text-align: center;
    line-height: 90px;
    margin-left: 14px;
  }
  .drug-info{
    margin-top: 100px;
  }
  .drug-price{
    width:85px;
    font-size:30px;
    color:rgba(255,1,1,1);
    margin-left: 30px;
  }
  .drug-img{
    width:220px;
    height: auto;
    background:rgba(255,255,255,1);
    margin-left: 30px;
    margin-top: 10px;
    border: 1PX solid #d0d0d0;
  }
  .drug-img img {
    width: 100%;
  }
  .drug-title{
    width:276px;
    font-size:26px;
  }
  .drug-line{
    width:690px;
    height:1PX;
    background:rgba(229,229,229,1);
    margin-left: 10px;
  }
  footer {
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: -2px;
    width: 720px;
    height: 100px;
    background: white;
    z-index: 999;
  }

  footer div {
    text-align: center;
  }

  footer div p {
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
  }

  footer div i {
    font-size: 35px;
  }

  .active {
    color: rgba(19, 193, 254, 1);
  }
  .joincar{
    width:154px;
    height:97px;
    background:rgba(240,43,43,1);
    color: white;
    line-height: 97px;
  }
  .immediately-buy{
    width:154px;
    height:97px;
    background:rgba(240,145,43,1);
    color: white;
    line-height: 97px;
  }
  footer div:first-child{
    width:12%;
    float: left;
  }
  footer div:nth-child(2){
    width:12%;
    float: left;
  }
  footer div:nth-child(3){
    width:12%;
    float: left;
  }
  footer div:nth-child(4){
    width:12%;
    float: left;
  }
  footer div:nth-child(5){
    width:26%;
    float: left;
  }
  footer div:nth-child(6){
    width:26%;
    float: left;
  }
  .drug-close{
    height: 10px;
    line-height: 10px;
    text-align: right;
  }



  /*定义进入过渡的结束状态*/
  .slide-fade-enter-active {
    transition:all 0.5s ease;

  }
  /* 定义离开过渡的结束状态*/
  .slide-fade-leave-active{
    transition:all 0.5s ease;
  }

  /*离开过渡的结束状态*/
  .slide-fade-leave-active {
    bottom:0rem!important;
  }

  .slide-fade-leave-to{
    bottom:-28rem!important;
  }

  /*进入过渡的开始状*/
  .slide-fade-enter{
    bottom:-22rem!important;
  }
  .active {
    color: red;
  }

  .ic-guanbi2{font-size: 30px;}
</style>
