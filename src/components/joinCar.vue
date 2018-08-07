<template>
  <div>
    <footer v-bind:class="{spaceAround:drugInfo.otc}">
      <router-link tag="div" to="/chats" :class="{active:urlRouter === '/chats'}">
        <i class="iconfont ic-zixun"></i>
        <p>咨询</p>
      </router-link>
      <router-link tag="div" to="/shops" :class="{active:urlRouter === '/shops'}">
        <i class="iconfont ic-drugstore"></i>
        <p>药店</p>
      </router-link>
      <router-link tag="div" to="/collects" :class="{active:urlRouter === '/collects'}">
        <i class="iconfont ic-shoucang"></i>
        <p>收藏</p>
      </router-link>
      <router-link tag="div" to="/carts" :class="{active:urlRouter === '/carts'}">
        <i class="iconfont ic-gouwuche2"></i>
        <p>购物车</p>
      </router-link>
      <div v-if="!drugInfo.otc">
        <div class="joincar" @click="joinCar()">
          <p>加入购物车</p>
        </div>
        <!-- FIXME -->
        <div class="immediately-buy" @click.stop="onBuy">
          <p>立即购买</p>
        </div>
      </div>
    </footer>


    <mt-popup v-model="popupVisible" @click="close()"></mt-popup>
    <transition name="slide-fade" v-show="show">
      <div class="hide-drug-detail" v-show="show">
        <div class="width-percent-100 drug-top">
          <div class="d-inline-block fl">
            <img v-lazy="getImgURL(drugInfo.shopLogo,'LARGE_LOGO')" class="drug-img"/>
          </div>
          <div class="drug-close">
            <i class="icon iconfont ic-guanbi2" @click="close()"></i>
          </div>
          <div>
            <!-- {{drugInfo}}-->
          </div>
          <div class="drug-info d-inline-block fl elps">
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
  import {Toast} from 'mint-ui';

  export default {
    name: 'newFooter',
    data() {
      return {
        number: 1,
        show: false,
        popupVisible: false,
        type: 0
      };
    },
    created() {
    },
    props: {
      drugInfo: {
        type: Object,
        required: true
      },
      urlRouter: {
        type: String
      }
    },
    methods: {
      onBuy() {
        this.show = !this.show;
        this.type = 1;
        this.popupVisible = true;
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
        this.show = !this.show;
        this.type = 0;
        this.popupVisible = true;
      },
      close() {
        this.popupVisible = false;
        this.show = !this.show;
      },
      onConfirm() {
        if (this.type === 0) {
          this.$http.post('/carts', {
            shopId: this.drugInfo.shopId,
            drugSpecId: this.drugInfo.drugSpecId,
            shopDrugSpecId: this.drugInfo.id,
            quantity: this.number
          }).then(res => {
            Toast({
              message: '加入成功',
              duration: 500
            });
            this.close();
          });
        } else {
          this.$router.push('/orders/create/fromShop?shopDrugSpecId=' + this.drugInfo.id + '&quantity=' + this.number);
        }
      }
    }
  };
</script>

<style scoped>
  .spaceAround {
    justify-content: space-around;
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 720px;
    height: 100px;
    background: white;
    z-index: 9999;
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

  footer>div:nth-child(5) {
    display: flex;
  }
  .active {
    color: rgba(19, 193, 254, 1);
  }

  /*footer{*/
  /*height: 141px;*/
  /*position: absolute;*/
  /*bottom: 0px;*/
  /*}*/
  /*.drug-buy-number{*/
  /*height: 86px;*/
  /*}*/
  /*.drug-top{*/
  /*height: 250px;*/
  /*}*/
  /*.drug-buy{*/
  /*margin: 30px 0 0 13px;*/
  /*font-size:24px;*/
  /*}*/
  /*.drug-reduce{*/
  /*width:36px;*/
  /*height:32px;*/
  /*background:rgba(238,238,238,1);*/
  /*opacity:0.6;*/
  /*border-radius:3px;*/
  /*text-align: center;*/
  /*line-height: 32px;*/
  /*margin-top: 26px;*/
  /*font-size:19px;*/
  /*}*/
  /*.drug-number{*/
  /*min-width:48px;*/
  /*height:32px;*/
  /*background:rgba(234,234,234,1);*/
  /*border-radius:3px;*/
  /*margin: 26px 7px 0px 7px;*/
  /*text-align: center;*/
  /*line-height: 32px;*/
  /*font-size:23px;*/
  /*}*/
  /*.drug-add{*/
  /*width:35px;*/
  /*height:32px;*/
  /*background:rgba(220,220,220,1);*/
  /*opacity:0.6;*/
  /*border-radius:3px;*/
  /*text-align: center;*/
  /*line-height: 32px;*/
  /*margin-top: 26px;*/
  /*margin-right: 26px;*/
  /*font-size:19px;*/
  /*}*/
  /*.hide-drug-detail{*/
  /*width:720px;*/
  /*height:455px;*/
  /*background: white;*/
  /*bottom: 0px;*/
  /*position: fixed;*/
  /*z-index: 9999;*/
  /*}*/
  /*.drug-sure{*/
  /*width:690px;*/
  /*height:90px;*/
  /*background:rgba(19,193,254,1);*/
  /*border-radius:8px;*/
  /*font-size:36px;*/
  /*color: white;*/
  /*text-align: center;*/
  /*line-height: 90px;*/
  /*margin-left: 14px;*/
  /*}*/
  /*.drug-info{*/
  /*margin-top: 125px;*/
  /*margin-left: 22px;*/
  /*}*/
  /*.drug-price{*/
  /*width:85px;*/
  /*height:24px;*/
  /*font-size:30px;*/
  /*color:rgba(255,1,1,1);*/
  /*line-height:24px;*/
  /*}*/
  /*.drug-img{*/
  /*width:200px;*/
  /*height:200px;*/
  /*background:rgba(255,255,255,1);*/
  /*border-radius:3px;*/
  /*margin-top: 12px;*/
  /*margin-left: 10px;*/
  /*border: 1px solid #d0d0d0;*/
  /*}*/
  /*.drug-title{*/
  /*margin-bottom: 18px;*/
  /*width:276px;*/
  /*height:24px;*/
  /*font-size:26px;*/
  /*line-height:24px;*/
  /*}*/
  /*.drug-line{*/
  /*width:690px;*/
  /*height:1px;*/
  /*background:rgba(229,229,229,1);*/
  /*margin-left: 10px;*/
  /*}*/
  /*footer {*/
  /*align-items: center;*/
  /*justify-content: space-around;*/
  /*position: fixed;*/
  /*bottom: -2px;*/
  /*width: 720px;*/
  /*height: 100px;*/
  /*background: white;*/
  /*z-index: 999;*/
  /*}*/

  /*footer div {*/
  /*text-align: center;*/
  /*}*/

  /*footer div p {*/
  /*font-size: 22px;*/
  /*font-family: HiraginoSansGB-W3;*/
  /*}*/

  /*footer div i {*/
  /*font-size: 35px;*/
  /*}*/

  .active {
    color: rgba(19, 193, 254, 1);
  }

  .joincar {
    width: 154px;
    height: 97px;
    background: rgba(240, 43, 43, 1);
    color: white;
    line-height: 97px;
  }

  .immediately-buy {
    width: 154px;
    height: 97px;
    background: rgba(240, 145, 43, 1);
    color: white;
    line-height: 97px;
  }

  /*footer div:first-child{*/
  /*width:12%;*/
  /*float: left;*/
  /*}*/
  /*footer div:nth-child(2){*/
  /*width:12%;*/
  /*float: left;*/
  /*}*/
  /*footer div:nth-child(3){*/
  /*width:12%;*/
  /*float: left;*/
  /*}*/
  /*footer div:nth-child(4){*/
  /*width:12%;*/
  /*float: left;*/
  /*}*/
  /*footer div:nth-child(5){*/
  /*width:26%;*/
  /*float: left;*/
  /*}*/
  /*footer div:nth-child(6){*/
  /*width:26%;*/
  /*float: left;*/
  /*}*/
  .drug-close {
    height: 10px;
    line-height: 10px;
    text-align: right;
  }

  /*定义进入过渡的结束状态*/
  .slide-fade-enter-active {
    transition: all 0.5s ease;

  }

  /* 定义离开过渡的结束状态*/
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }

  /*离开过渡的结束状态*/
  .slide-fade-leave-active {
    bottom: 0rem !important;
  }

  .slide-fade-leave-to {
    bottom: -28rem !important;
  }

  /*进入过渡的开始状*/
  .slide-fade-enter {
    bottom: -22rem !important;
  }


</style>
