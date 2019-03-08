<template>
   <div class="coupon_item">
     <div class="coupon_item-image">
       <img v-lazy="item.type === 'ARTICLE'? getImgURL(item.fileId,'SMALL_PIC') : require('../assets/image/coupon/coupon-bg.png')">
     </div>
     <div class="coupon_item-text">
       <span v-if="item.type === 'TICKET'">满{{item.amount}}元减{{item.minus}}优惠券</span>
       <span v-if="item.type === 'ARTICLE'">{{item.name}}</span>
       <span>{{item.point}}</span>金币
     </div>
     <div class="coupon_item-button">
       <div @click.stop="onExchange()">立即兑换</div>
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
        this.$router.push({name: '/points/view', params: {couponId: this.item.id}});
      }
    }
  };
</script>

<style scope type="text/scss" lang="scss">
  .coupon_item {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    align-items: center;
    border: 1PX solid rgba(238,238,238,1);
    &-image {
      img {
        width: 160px;
        height: 160px;
      }
    }
    &-text {
      &>span {
        font-size:25px;
        font-family:MicrosoftYaHei;
        color:rgba(51,51,51,1);
        &:nth-child(2) {
          color: $themeColor;
          margin-left: 20px;
        }
      }
    }
    &-button {
      font-family:MicrosoftYaHei;
      color:rgba(64,64,64,1);
      margin-top: 10px;
      &>div {
        font-size:25px;
        width: 120px;
        border: 1PX solid black;
        background-color: white;
        text-align: center;
        border-radius: 10px;
      }
    }
  }
</style>
