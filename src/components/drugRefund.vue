<template>
<div class="drug_refund" @click="linkToOrderRefundView(pages.id)">
  <div class="drug_refund-left">
    <span class="rx_mark">处</span>
    <img :src="getImgURL(drug.fileId, 'LARGE_LOGO')">
  </div>
  <div class="drug_refund-center">
    <div>
      {{ drug.name }}
    </div>
    <div>
      规格&#58;{{ drug.spec }}
    </div>
    <div>
      <div>
        &yen;{{toFixedTwo(drug.price) }}
      </div>
      <div>
        x{{drug.quantity}}
      </div>
    </div>
  </div>
  <div class="drug_refund-state">
    <span>
      退
    </span>
    <span>
      {{transformRefundState(pages.refundState)}}
    </span>
  </div>
</div>
</template>
<style scoped type="text/less" lang="less">
  .drug_refund {
    background-color: #F6F6F6;
    position: relative;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    &-left {
      padding: 10px;
      img {
        width: 200px;
        height: 200px;
      }
    }
    &-center {
      padding: 10px 0 10px 30px;
      &>div {
        width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 30px;
        padding: 5px;
        &:nth-child(3) {
          display: flex;
          justify-content: space-between;
          &>div {
            &:nth-child(1) {
              color: red;
              font-size: 30px;
            }
            &:nth-child(2) {
              color: #999999;
              font-size: 30px;
            }
          }
        }
      }
    }
    &-state {
      position: absolute;
      right: 10px;
      bottom: 10px;
      &>span {
        &:nth-child(1) {
          border: 1PX solid #13C1FE;
          border-radius: 50%;
          color: #13C1FE;
          padding: 2px;
          margin: 0 10px;
          font-size: 25px;
        }
        &:nth-child(2) {
          color: #13C1FE;
          font-size: 25px;
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'drugs',
    props: ['pages', 'drug']
  };
</script>


<!--<style scoped>-->
  <!--.is-flex{-->
    <!--display: flex !important;-->
  <!--}-->
  <!--.flex-row{-->
    <!--flex-direction: row;-->
  <!--}-->
  <!--.flex-column{-->
    <!--flex-direction: column;-->
  <!--}-->
  <!--.flex-sa{-->
    <!--justify-content: space-around;-->
  <!--}-->
  <!--.flex-sb{-->
    <!--justify-content: space-between;-->
  <!--}-->
  <!--.flex-end{-->
    <!--justify-content: flex-end;-->
  <!--}-->
  <!--.flex-item{-->
    <!--align-items: center;-->
  <!--}-->
  <!--.is-200x200{-->
    <!--width: 200px;-->
    <!--height: 200px;-->
  <!--}-->
  <!--.p-lr-20{-->
    <!--padding-left: 20px;-->
    <!--padding-right: 20px;-->
    <!--box-sizing: border-box;-->
  <!--}-->
  <!--.box-right{-->
    <!--width: 450px;-->
  <!--}-->
  <!--.ml-10{-->
    <!--margin-left: 10px !important;-->
  <!--}-->
  <!--.pl-40{-->
    <!--padding-left: 40px !important;-->
  <!--}-->
  <!--.mt-40{-->
    <!--margin-top: 40px !important;-->
  <!--}-->
  <!--/*处方标识*/-->
  <!--.toc-tip{-->
    <!--left: 5px;-->
    <!--top: 5px;-->
    <!--width:50px;-->
    <!--height:30px;-->
    <!--background:#bfbfbf;-->
    <!--color:#666666;-->
    <!--border-radius:100px / 50px;-->
  <!--}-->
  <!--.all-center{-->
    <!--display: flex;-->
    <!--flex-direction: row;-->
    <!--align-items: center;-->
    <!--justify-content: center;-->
  <!--}-->
  <!--.bg-2BB292{-->
    <!--background: #2BB292;-->
    <!--color: white;-->
  <!--}-->
  <!--.refund-box{-->
    <!--width:720px;-->
    <!--height:215px;-->
    <!--background:rgba(246,246,246,1);-->
  <!--}-->

  <!--.box-right>span:nth-child(1) {-->
    <!--font-size:28px;-->
    <!--font-family:HiraginoSansGB-W3;-->
    <!--color:rgba(51,51,51,1);-->
  <!--}-->
  <!--.box-right>span:nth-child(2) {-->
    <!--font-size:24px;-->
    <!--font-family:HiraginoSansGB-W3;-->
    <!--color:rgba(153,153,153,1);-->
  <!--}-->
  <!--.box-right-price>span:nth-child(1) {-->
    <!--font-size:24px;-->
    <!--font-family:HiraginoSansGB-W3;-->
    <!--color:rgba(255,0,0,1);-->
  <!--}-->
  <!--.box-right-price>span:nth-child(2) {-->
    <!--font-size:24px;-->
    <!--font-family:HiraginoSansGB-W3;-->
    <!--color:rgba(153,153,153,1);-->
  <!--}-->

  <!--.box-right-link>span:nth-child(1) {-->
    <!--width:37px;-->
    <!--height:37px;-->
    <!--border-radius: 50%;-->
    <!--border: 1PX solid #13C1FE;-->
    <!--text-align: center;-->
    <!--color: #13C1FE;-->
    <!--display: inline-block;-->
  <!--}-->
  <!--.box-right-link>span:nth-child(2) {-->
    <!--font-size:30px;-->
    <!--font-family:HiraginoSansGB-W3;-->
    <!--color:rgba(19,193,254,1);-->
  <!--}-->
  <!--.box-right-link>span:nth-child(3) {-->
    <!--margin-left: 20px;-->
  <!--}-->

  <!--.box-bottom {-->
    <!--display: flex;-->
    <!--position: absolute;-->
    <!--right: 20px;-->
    <!--top: 10px;-->
    <!--align-items: center;-->
    <!--z-index: 999;-->
  <!--}-->
  <!--.box-bottom div:nth-child(1){-->
    <!--border: 1PX solid #1AB6FD;-->
    <!--border-radius: 50%;-->
    <!--padding: 0 10px;-->
    <!--font-size: 25px;-->
    <!--color: #1AB6FD;-->
  <!--}-->
  <!--.box-bottom div:nth-child(2) {-->
    <!--margin-left: 10px;-->
    <!--font-size: 25px;-->
    <!--color: #1AB6FD;-->
  <!--}-->
<!--</style>-->
