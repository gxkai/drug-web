<template>
<div class="rx_shop_item">


  <div class="rx_shop_item-left">
    <img  v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
  </div>
  <div  class="rx_shop_item-right">
    <div>
      <span class="elps rx_shop_name">{{item.name}}</span>
    </div>
    <div  class="elps rx_shop_tel">电话：{{item.phone}}</div>
  <div  class="elps rx_shop_tel">价格区间：<span class="rx-indterval-grey">¥{{item.minAmount}}</span>至<span class="rx-indterval-grey">¥{{item.maxAmount}}</span></div>
  <div  class="elps rx_shop_tel">医保区间：<span class="rx-indterval-red">¥{{item.minMedicaidAmount}}</span>至<span class="rx-indterval-red">¥{{item.maxMedicaidAmount}}</span></div>
    <div  class="elps rx_shop_tel">
      <span class="rx-delivery" v-if="item.distribution==true">可配送</span>
      <span class="rx-since">可自提</span>
      距当前位置：{{item.distance | meter}}
       <span class="rx_shop_address"> <van-icon name="dizhi" size="2em" color="#a6a6a6"></van-icon></span>
    </div>
  </div>




<!--

    <div class="rx_shop_item-left">
        <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
      <div class="rx_shop_item-left-icon" v-if="item.type === 'HOSPITAL'">
        医院
      </div>
    </div>
    <div class="rx_shop_item-right">
        <div class="elps">
          <div>{{item.name}}</div>
          <div class="text-red">&yen;{{toFixedTwo(item.amount)}}</div>
        </div>
        <!--<div class="elps">-->
          <!--<van-rate-->
            <!--v-model="item.score"-->
            <!--:size="15"-->
            <!--:count="5"-->
            <!--disabled-->
            <!--disabled-color="red"-->
          <!--/>-->
        <!--</div>-->
        <div class="elps">
          电话：{{item.phone}}
        </div>
        <div class="elps">
          地址：{{item.address}}
        </div>
        <div class="elpsTwo">
          <span class="text-blue">可购买</span>
          <span v-for="(drug,key) in item.drugs" :key="key">
            {{drug}}
            <i v-if="key<item.drugs.length-1"></i>
          </span>
        </div>
    </div>
    <div class="rx_shop_item-cart_icon">
        <i class="iconfont ic-gouwuche1"></i>
    </div>
    <div class="rx_shop_item-peisong_icon"
    v-show="item.distribution === true">
      <i class="iconfont ic-peisong-"></i>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'rxShopItem',
    props: ['item'],
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
      console.log(this.item);
    },
    mounted() {
    },
    methods: {

    },
    filters: {
      meter(meter) {
        if (meter < 500) {
          return '<500米';
        } else {
          let kilometers = meter / 1000;
          return kilometers + '公里';
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
.rx_shop_item{
    width: 720px;
    height: 300px;
    background: #ffffff;
    position: relative;
    border-top: 10px solid #f3f3f3;
    border-bottom: 10px solid #f3f3f3;
    .rx_shop_item-left{
      display: inline-block;
      float: left;
      margin-top: 24px;
      img{
        width: 228px;
        height: 228px;
        margin-left: 13px;
      }
    }
    .rx_shop_item-right{
      width: 440px;
      display: inline-block;
      float: left;
      margin-left: 32px;
      margin-top: 24px;
      img{
        float: right;
        position: absolute;
        right: 0px;
        top: 0px;
      }
      .rx_shop_name{
        font-size:28px;
        font-weight:bold;
        color:rgba(102,102,102,1);

      }
      .rx_shop_hospital{
        width: 86px;
      }
      .rx_shop_tel{
        font-size:20px;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-top: 20px;
        .rx-indterval-grey{
          width:104px;
          height:33px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(222, 222, 222, 1);
          border-radius:1px;
          font-size:20px;
          font-weight:400;
          color:rgba(141,141,141,1);
          display: inline-block;
          text-align: center;
          line-height: 33px;
          margin-right: 5px;
          margin-left: 5px;
        }
        .rx-indterval-red{
          width:104px;
          height:33px;
          background:rgba(255,255,255,1);
          border:1px solid #E74A45;
          border-radius:1px;
          font-size:20px;
          font-weight:400;
          color:#E74A45;
          display: inline-block;
          text-align: center;
          line-height: 33px;
          margin-right: 5px;
          margin-left: 5px;
        }
        .rx-delivery{
          font-size: 20px;
          width:82px;
          height:33px;
          background:rgba(255,255,255,1);
          border:1px solid #F5003F;
          border-radius:7px;
          display:inline-block;
          float: left;
          color: #F5003F;
          text-align: center;
          line-height: 33px;
          margin-right: 15px;
        }
        .rx-since{
          font-size: 20px;
          width:82px;
          height:33px;
          background:rgba(255,255,255,1);
          border:1px solid #13C1FE;
          border-radius:7px;
          display:inline-block;
          float: left;
          color: #13C1FE;
          text-align: center;
          line-height: 33px;

          margin-right: 15px;
        }
      }
      .rx_shop_address{
        float: right;
      }
    }
  }
</style>
