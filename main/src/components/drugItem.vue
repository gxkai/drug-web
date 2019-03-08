<template>
  <div class="drug_item"
  @click="linkToDrugShop(item.id)">
      <div class="drug_item-left">
        <div class="rx_mark" v-if="item.otc === false">处</div>
        <img v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')">
      </div>
      <div class="drug_item-right">
        <div class="drug_item-right-info">
        <div class="drug_item-right-info_name">
          {{ item.name }}{{item.spec}}{{item.form}}
          <!--<span class="drug_item-right-info_promotion1">卷</span>-->
          <!--<span class="drug_item-right-info_promotion">促</span>-->

        </div>
        <div class="drug_item-right-info_sfda">
          {{ item.originName }}
        </div>
        <div class="drug_item-right-info_sfda">
          国药准字：{{ item.sfda }}
        </div>
        <div class="drug_item-right-info_sfda" style="display: none">
          销量：{{ item.sales }}
        </div>
        <!--<div class="drug_item-right-info_sales">-->
          <!--已销售 {{ item.sales || 0}}-->
        <!--</div>-->
        </div>
        <div class="drug_item-right-sale">
          <div class="drug_item-right-sale_price">
            <span>&yen;{{toFixedTwo(item.price)}}</span>
            <span>元起</span>
          </div>
          <div class="drug_item-right-sale_count drug_item-right-sale_counts">
            <span>销量</span>
            <span>{{item.sales}}</span>
          </div>
          <div class="drug_item-right-sale_count" style="display: none;">
            <span>{{item.shopCount}}个</span>
            <span>商家在售</span>
          </div>
        </div>
      </div>
  </div>

</template>
<style scoped type="text/scss" lang="scss">
  .drug_item {
    display: flex;
    margin-top: 20px;
    background-color: white;
    width: 720px;
    &-left {
      padding: 20px;
      img {
        width: 200px;
        height: 200px;
      }
      .rx_mark{
        width:50px;
        height: 25px;
        line-height: 22px;
        text-align: center;
        display: inline-block;
        border-radius: 25px/12.5px;
      }
    }
    &-right {
      padding: 20px;
      width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-info {
        &_name {
          font-size: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          line-clamp: 2;
         }
        &_promotion,&_promotion1{
          width:50px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          display: inline-block;
          border-radius: 25px/12.5px;
          font-size: 19px;
          float: right;
          display: inline-block;
          margin-top: 10px;
        }
        &_promotion{
          background: #F60000;
          color: #ffffff;
          right: 45px;
          top: 10px;
          margin-right: 13px;
         }
        &_promotion1{
          background: #ffbe00;
          color: #ffffff;
          right: 55px;
          top: 10px;

        }
        &_sfda {
          color: #999999;
          font-size: 22px;
          padding: 3px 0;
        }
        &_sales {
          color: #999999;
          font-size: 25px;
          padding: 10px 0;
        }
      }
      &-sale {
        display: flex;
        justify-content: space-between;
        &_price {
          &>span {
            &:nth-child(1) {
              color: $themeColor;
              font-size: 30px;
              font-weight:bold;
            }
            &:nth-child(2) {
              color: #999999;
              font-size: 25px;
              font-weight:bold;
            }
          }
        }
        &_count {
          &>span {
            &:nth-child(1) {
              color: $themeColor;
              font-size: 30px;
            }
            &:nth-child(2) {
              color: #999999;
              font-size: 25px;
            }
          }
        }
        &_counts{
          span{
            font-size: 23px!important;
            line-height: 40px;
          }
         }
      }
    }
  }
</style>
<script>
  export default {
    name: 'drug-shops',
    props: ['item'],
    created() {
      console.log(this.item);
    }
  };
</script>
