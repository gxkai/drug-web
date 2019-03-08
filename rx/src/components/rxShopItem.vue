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
        <div class="elps">
          电话：{{item.phone}}
        </div>
        <div class="elps">
          地址：{{item.address}}
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

<style scoped type="text/less" lang="less">
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
    background-color: white;
    margin-top: 20px;
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
      justify-content: space-around;
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
