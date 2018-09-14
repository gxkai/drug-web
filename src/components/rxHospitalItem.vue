<template>
  <div class="rx_hospital_item">
    <div class="rx_hospital_item-left">
        <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
        <div class="rx_hospital_item-left-icon">
          医院
        </div>
    </div>
    <div class="rx_hospital_item-right">
        <div>
          {{item.name}}
        </div>
        <div>
          电话：{{item.phone}}
        </div>
        <div>
          地址：{{item.address}}
        </div>
        <div class="text-red">
          ¥{{item.amount}}
        </div>
    </div>
    <div class="rx_hospital_item-cart_icon">
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
      console.log(this.item);
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/less" lang="less">
  @import "../assets/less/index";
  .rx_hospital_item {
    width: 700px;
    margin-left: 10px;
    display: flex;
    padding: 20px 0;
    position: relative;
    border: 1PX solid #1AB6FD;
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
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div{
        width: 400px;
        font-size:25px;
        .ellipsis-one();
        &:nth-child(1) {
          font-size: 28px;
        }
        &:nth-child(4) {
          color: red;
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
  .text-red{color: red;}
  .ic-gouwuche1{
    right: 10px!important;
  }
  .rx_hospital_item-cart_icon{right:10px;}
  .rx_hospital_item-cart_icon i{right:10px;}
</style>
