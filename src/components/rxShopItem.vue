<template>
  <div class="rx_shop_item">
    <div class="rx_shop_item-left">
        <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
      <div class="rx_shop_item-left-icon" v-if="item.type === 'HOSPITAL'">
        医院
      </div>
      <div class="rx_shop_item-left-icon" v-else>
        药店
      </div>
    </div>
    <div class="rx_shop_item-right">
        <div class="elps">
          <div>{{item.name}}</div>
          <div class="text-red color-red">&yen;{{toFixedTwo(item.amount)}}</div>
        </div>
        <div class="elps">
          <new-star :score="item.score"></new-star>
        </div>
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
            <i v-if="key<item.drugs.length-1">&nbsp;</i>
          </span>
        </div>
    </div>
    <div class="rx_shop_item-cart_icon">
        <i class="iconfont ic-gouwuche1"></i>
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
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/less" lang="less">
  .rx_shop_item-cart_icon{
    right: 10px!important;
  }
  .rx_shop_item-cart_icon i{
    right: 10px!important;
  }
  .ic-gouwuche1{
    right: 10px!important;
  }
  .text-red {
    color: red;
  }
  .color-red{
    position: absolute;
    right: 50px;
    font-size: 34px!important;
    line-height: 40px;
    top: 35px;
  }
  .text-blue {
    color: #1AB6FD;
  }
  .rx_shop_item {
    width: 720px;
    display: flex;
    padding: 20px 0;
    position: relative;
    &-left {
      padding: 0 20px;
      img {
        width: 245px;
        height: 245px;
      }
      &-icon {
        position: absolute;
        left: 20px;
        top: 20px;
        background-color: #1AB6FD;
        font-size: 25px;
        padding: 5px 5px;
        color: white;
        font-weight: 100;
      }
    }
    &-right {
      width: 380px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div,span{
        font-size:25px;
      }
      &>div{
        &:nth-child(1) {
          width: 300px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    &-cart_icon {
      position: absolute;
      right: 0;
      bottom: 0;
      i {
        font-size: 50px;
        color: red;
      }
    }
  }

</style>
