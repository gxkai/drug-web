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
          {{ item.name }}&nbsp;&nbsp;{{item.spec}}
        </div>
        <div class="drug_item-right-info_sfda">
          国药准字：{{ item.sfda }}
        </div>
        <!--<div class="drug_item-right-info_sales">-->
          <!--已销售 {{ item.sales || 0}}-->
        <!--</div>-->
        </div>
        <div class="drug_item-right-sale">
          <div class="drug_item-right-sale_price">
            <span>&yen;{{toFixedTwo(item.price)}}</span>
            <span>起</span>
          </div>
          <div class="drug_item-right-sale_count">
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
        &_sfda {
          color: #999999;
          font-size: 25px;
          padding: 10px 0;
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
              color: #FF0000;
              font-size: 30px;
            }
            &:nth-child(2) {
              color: #999999;
              font-size: 25px;
            }
          }
        }
        &_count {
          &>span {
            &:nth-child(1) {
              color: #F60000;
              font-size: 30px;
            }
            &:nth-child(2) {
              color: #999999;
              font-size: 25px;
            }
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
