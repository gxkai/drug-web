<template>
<div class="refund-box is-flex flex-row flex-item p-lr-20 position-relative">
  <span class="toc-tip position-absolute all-center" v-if="drug.otc">非处</span>
  <span class="toc-tip position-absolute all-center bg-2BB292" v-else>处</span>
  <img class="is-200x200" v-lazy="getImgURL(drug.fileId, 'LARGE_LOGO')">
  <div class="box-right pl-40 is-flex flex-column flex-sa">
    <span>{{ pages.shopName }}</span>
    <span>规格： {{ drug.spec }}</span>
    <div class="is-flex flex-sb box-right-price">
      <span>&yen; {{ drug.price }}</span>
      <span>x {{drug.quantity}}</span>
    </div>
    <div class="is-flex mt-40 flex-end box-right-link">
      <span class="btn-refund">退</span>
      <span class="ml-10">{{pages.state|transformOrderState}}</span>
      <span @click="$router.push({path:'/orderRefunds/view',query:{orderRefundId:pages.id}})">查看详情</span>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    name: 'drugs',
    props: ['pages', 'drug']
  };
</script>

<style scoped>
  .is-flex{
    display: flex !important;
  }
  .flex-row{
    flex-direction: row;
  }
  .flex-column{
    flex-direction: column;
  }
  .flex-sa{
    justify-content: space-around;
  }
  .flex-sb{
    justify-content: space-between;
  }
  .flex-end{
    justify-content: flex-end;
  }
  .flex-item{
    align-items: center;
  }
  .is-200x200{
    width: 200px;
    height: 200px;
  }
  .p-lr-20{
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .box-right{
    width: 450px;
    height: 100px;
  }
  .ml-10{
    margin-left: 10px !important;
  }
  .pl-40{
    padding-left: 40px !important;
  }
  .mt-40{
    margin-top: 40px !important;
  }
  /*处方标识*/
  .toc-tip{
    left: 5px;
    top: 5px;
    width:50px;
    height:30px;
    background:#bfbfbf;
    color:#666666;
    border-radius:100px / 50px;
  }
  .all-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .bg-2BB292{
    background: #2BB292;
    color: white;
  }
  .refund-box{
    width:720px;
    height:215px;
    background:rgba(246,246,246,1);
  }

  .box-right>span:nth-child(1) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .box-right>span:nth-child(2) {
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
  }
  .box-right-price>span:nth-child(1) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,0,0,1);
  }
  .box-right-price>span:nth-child(2) {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
  }

  .box-right-link>span:nth-child(1) {
    width:37px;
    height:37px;
    border-radius: 50%;
    border: 1px solid #13C1FE;
    text-align: center;
    color: #13C1FE;
    display: inline-block;
  }
  .box-right-link>span:nth-child(2) {
    font-size:18px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
  }
  .box-right-link>span:nth-child(3) {
    margin-left: 20px;
  }
</style>
