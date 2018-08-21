<template>
   <div class="item">
     <div class="item-image">
       <img v-lazy="getImgURL(item.fileId,'SMALL_LOGO')">
     </div>
     <div class="item-text">
       满{{item.amount}}元减{{item.minus}}优惠券
       <span>{{item.point}}</span>金币
     </div>
     <div class="item-button">
       <button @click.stop="onExchange()">立即兑换</button>
     </div>
  </div>
</template>

<script>
  export default {
    name: 'coupon',
    value: '',
    props: ['item'],
    data() {
      return {
      };
    },
    created() {
    },
    watch: {
    },
    methods: {
      onExchange() {
        this.$router.push({path: '/points/view', query: {couponId: this.item.id}});
      }
    }
  };
</script>

<style scope type="text/less" lang="less">
  .item {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    align-items: center;
    border: 1PX solid rgba(238,238,238,1);
    &-image {
      width: 160px;
      img {
        width: 100%;
      }
    }
    &-text {
      font-size:20px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
      span {
        color: #FE0000;
        margin-left: 20px;
      }
    }
    &-button {
      font-size:16px;
      font-family:MicrosoftYaHei;
      color:rgba(64,64,64,1);
      margin-top: 10px;
      button {
        width: 120px;
        border: 1PX solid black;
        background-color: white;
        border-radius: 10px;
      }
    }
  }
</style>
