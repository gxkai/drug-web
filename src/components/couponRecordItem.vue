<template>
  <div class="item" @click="$router.push({path:'/points/view', query:{couponId:item.couponId}})">
    <div class="item-image">
      <img v-lazy="item.type === 'ARTICLE'? getImgURL(item.fileId,'SMALL_PIC') : require('../assets/image/coupon/coupon-bg.png')">
    </div>
    <div class="item-text">
      <div>
        {{item.name}}
      </div>
      <div>
        {{item.point}}金币
      </div>
      <div>
        {{dateConvert(item.expiryDate)}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'exchangeRecordItem',
    props: ['item']
  };
</script>

<style scoped type="text/scss" lang="scss">
  .item {
    width: 720px;
    height: 200px;
    background-color: white;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    &-image {
      width: 258px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 165px;
        height: 165px;
      }
    }
    &-text {
      width: calc(720px - 258px);
      align-self: center;
      > div {
        margin-bottom: 10px;
        &:nth-child(1) {
          font-size: 30px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:nth-child(2) {
          font-size: 20px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 0, 0, 1);
        }
        &:nth-child(3) {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          color: rgba(85, 85, 85, 1);
        }
      }
    }
  }
</style>
