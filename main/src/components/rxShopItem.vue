<template>
  <div class="rx_shop_item">
    <div class="rx_shop_item-left">
      <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
    </div>
    <div class="rx_shop_item-right">
      <div>
        <span class="elps rx_shop_name">{{item.name}}</span>
      </div>
      <div class="elps rx_shop_tel">电话：{{item.phone}}</div>
      <div class="elps rx_shop_tel">价格区间：<span class="rx-indterval-grey">¥{{item.minAmount}}</span>至<span
        class="rx-indterval-grey">¥{{item.maxAmount}}</span></div>
      <div class="elps rx_shop_tel">医保区间：<span v-if="bursement" class="rx_bursement">暂无报销</span>
        <span class="rx-indterval-red" v-if="showPrice">¥{{item.minMedicaidAmount}}</span>
        <span v-if="showPrice" class="rx_bursement">至</span>
        <span class="rx-indterval-red" v-if="showPrice">¥{{item.maxMedicaidAmount}}</span></div>
      <div class="rx_shop_tel">
        <span class="rx-delivery" v-if="item.distribution==true && item.shopDistance < item.distance">可配送</span>
        <span class="rx-since">可自提</span>
        <span class="rx-distance van-ellipsis">距当前位置：{{item.distance | meter}}</span>
        <span class="rx_shop_address"> <van-icon name="dizhi" size=".5rem" color="#a6a6a6"></van-icon></span>
      </div>
    </div>
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
      return {
        showPrice: false,
        bursement: false
      };
    },
    created() {
      console.log(111);
      console.log(this.item.maxMedicaidAmount);
      if (this.item.maxMedicaidAmount === 0) {
        this.showPrice = false;
        this.bursement = true;
      } else {
        this.showPrice = true;
        this.bursement = false;
      }
    },
    mounted() {
    },
    methods: {},
    filters: {
      meter(meter) {
        if (meter < 1) {
          let meters = meter * 1000;
          return meters + '米';
        } else {
          let kilometers = meter;
          return kilometers + '公里';
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .rx_bursement {
    font-size: 20px;
  }

  .rx_shop_item {
    width: 720px;
    height: 300px;
    background: #ffffff;
    position: relative;
    border-top: 10px solid #f3f3f3;
    border-bottom: 10px solid #f3f3f3;
    .rx_shop_item-left {
      display: inline-block;
      float: left;
      margin-top: 24px;
      img {
        width: 228px;
        height: 228px;
        margin-left: 13px;
      }
    }
    .rx_shop_item-right {
      width: 440px;
      display: inline-block;
      float: left;
      margin-left: 32px;
      margin-top: 24px;
      img {
        float: right;
        position: absolute;
        right: 0px;
        top: 0px;
      }
      .rx_shop_name {
        font-size: 28px;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);

      }
      .rx_shop_hospital {
        width: 86px;
      }
      .rx_shop_tel {
        font-size: 20px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rx-indterval-grey {
          width: 104px;
          height: 33px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          border-radius: 1px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(141, 141, 141, 1);
          display: inline-block;
          text-align: center;
          line-height: 33px;
          margin-right: 5px;
          margin-left: 5px;
        }
        .rx-indterval-red {
          width: 104px;
          height: 33px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid $themeColor;
          border-radius: 1px;
          font-size: 20px;
          font-weight: 400;
          color: $themeColor;
          display: inline-block;
          text-align: center;
          line-height: 33px;
          margin-right: 5px;
          margin-left: 5px;
        }
        .rx-delivery {
          font-size: 20px;
          width: 82px;
          height: 33px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid $themeColor;
          border-radius: 7px;
          color: $themeColor;
          text-align: center;
          line-height: 33px;
          margin-right: 15px;
        }
        .rx-since {
          font-size: 20px;
          width: 82px;
          height: 33px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid $themeColor;
          border-radius: 7px;
          color: $themeColor;
          text-align: center;
          line-height: 33px;
          margin-right: 15px;
        }
        .rx-distance {
          font-size: 20px;
        }
      }
      .rx_shop_address {
        float: right;
      }
    }
  }
</style>
