<template>
  <div class="container">
     <div class="shopDrugSpec-main">
      <div>
        <span>通用名：</span>
        <span>{{shopDrugSpec.name}}</span>
      </div>
     <div>
       <span>商品品牌：</span>
       <span>{{shopDrugSpec.origin.brand}}</span>
     </div>
     <div>
       <span>批准文号：</span>
       <span>国药准字{{shopDrugSpec.sfda}}</span>
     </div>
     <div>
       <span>包装规格：</span>
       <span>{{shopDrugSpec.spec}}</span>
     </div>
     <div>
       <span>剂型/型号：</span>
       <span>{{shopDrugSpec.form}}</span>
     </div>
     <div>
       <span>英文名称：</span>
       <span>{{shopDrugSpec.enName}}</span>
     </div>
     <div>
       <span>汉语拼音：</span>
       <span>{{shopDrugSpec.pinyinName}}</span>
     </div>
     <div>
       <span>有效期：</span>
       <span>{{shopDrugSpec.validity}}</span>
     </div>
     <div>
       <span>生产企业：</span>
       <span>{{shopDrugSpec.origin.company}}</span>
     </div>
     <div>
       <img :src="drugImg" v-for="drugImg in shopDrugSpec.drugImgs"/>
     </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'drugInfo',
    data: {
      shopDrugSpec: []
    },
    created() {
      this.shopDrugSpec = JSON.parse(this.$route.query.shopDrugSpec);
    }
};
</script>
<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

  .container {
    width: 720px;
    height: 100vh;
  }

  .shopDrugSpec-main {
    width: 720px;
    padding: 30px 20px 0 20px;
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
  }

  .shopDrugSpec-main div {
    margin-bottom: 20px;
    display: flex;
  }

  .shopDrugSpec-main div :first-child{
    width: 150px;
    display: inline-block;
  }

  .shopDrugSpec-main div :last-child{
    width: 550px;
    word-break: break-all;
    display: inline-block;
  }

  .shopDrugSpec-main img{
    width:506px;
    height:361px;
    margin-top: 19px;
    margin: auto;
  }

</style>
