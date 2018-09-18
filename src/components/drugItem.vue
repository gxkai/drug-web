<template>
  <div class="drug_item"
  @click="linkToDrugShop(item.id, item.drugId)">
      <div class="drug_item-left">
        <div class="rx_mark">处</div>
        <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
      </div>
      <div class="drug_item-right">
        <div class="drug_item-right-info">
        <div class="drug_item-right-info_name">
          {{ item.name }}
        </div>
        <div class="drug_item-right-info_sfda">
          {{ item.sfda }}
        </div>
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
<style scoped type="text/less" lang="less">
  .drug_item {
    display: flex;
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
              color: #13C1FE;
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
    props: ['item']
  };
</script>

<!--<style scoped>-->
  <!--.mt-20 {-->
    <!--margin-top: 20px !important;-->
  <!--}-->

  <!--.is-flex {-->
    <!--display: flex !important;-->
  <!--}-->

  <!--.flex-row {-->
    <!--flex-direction: row;-->
  <!--}-->

  <!--.flex-column {-->
    <!--flex-direction: column;-->
  <!--}-->

  <!--.flex-sa {-->
    <!--justify-content: space-around;-->
  <!--}-->

  <!--.flex-sb {-->
    <!--justify-content: space-between;-->
  <!--}-->

  <!--.flex-item {-->
    <!--align-items: center;-->
  <!--}-->

  <!--.is-200x200 {-->
    <!--width: 200px;-->
    <!--height: 200px;-->
  <!--}-->

  <!--.p-lr-20 {-->
    <!--padding-left: 20px;-->
    <!--padding-right: 20px;-->
    <!--box-sizing: border-box;-->
  <!--}-->

  <!--.box-right {-->
    <!--width: 450px;-->
    <!--height: 100px;-->
  <!--}-->

  <!--.pl-40 {-->
    <!--padding-left: 40px !important;-->
  <!--}-->

  <!--/*处方标识*/-->
  <!--.toc-tip {-->
    <!--left: 5px;-->
    <!--top: 5px;-->
    <!--background: #bfbfbf;-->
    <!--color: #666666;-->
    <!--border-radius: 40%;-->
  <!--}-->

  <!--.all-center {-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--align-items: center;-->
    <!--justify-content: center;-->
  <!--}-->

  <!--.bg-2BB292 {-->
    <!--background: #2BB292;-->
    <!--color: white;-->
  <!--}-->

  <!--.refund-box {-->
    <!--width: 720px;-->
    <!--height: 215px;-->
    <!--background: white;-->
  <!--}-->

<!--</style>-->
