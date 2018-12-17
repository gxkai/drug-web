<template>
  <div class="rx_shop_item">
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
      console.log(this.item);
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .text-red {
    color: red;
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
        background-color: #2BB292;
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
          width: 220px;
          &>div:nth-child(2) {
            position: absolute;
            right: 50px;
            font-size: 34px!important;
            line-height: 40px;
            top: 35px;
          }
        }
      }
    }
    &-cart_icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      i {
        font-size: 50px;
        color: red;
      }
    }
    &-peisong_icon {
      position: absolute;
      right: 10px;
      top: 80px;
      i {
        font-size: 80px;
        color: #1AB6FD;
      }
    }
  }

</style>
