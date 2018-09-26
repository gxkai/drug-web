<template>
   <div class="coupon_item">
     <div class="coupon_item-image">
       <img :src="getImgURL(item.fileId,'SMALL_LOGO')">
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
        this.$router.push({path: '/points/view', query: {couponId: this.item.id}});
      }
    }
  };
</script>

<style scope type="text/less" lang="less">
  .coupon_item {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px;
    align-items: center;
    border: 1PX solid rgba(238,238,238,1);
    &-image {
      width: 160px;
      height: 160px;
      img {
        width: 100%;
      }
    }
    &-text {
      &>span {
        font-size:25px;
        font-family:MicrosoftYaHei;
        color:rgba(51,51,51,1);
        &:nth-child(2) {
          color: #FE0000;
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
