<template>
  <div class="container">
    <div class="shopDrugSpec-main">
      <div class="text">
        <div>
          <span>通用名：</span>
          <span>{{shopDrugSpec.name||'暂无'}}</span>
        </div>
        <div>
          <span>商品品牌：</span>
          <span>{{shopDrugSpec.origin.brand||'暂无'}}</span>
        </div>
        <div>
          <span>批准文号：</span>
          <span>国药准字{{shopDrugSpec.sfda||'暂无'}}</span>
        </div>
        <div>
          <span>包装规格：</span>
          <span>{{shopDrugSpec.spec||'暂无'}}</span>
        </div>
        <div>
          <span>剂型/型号：</span>
          <span>{{shopDrugSpec.form||'暂无'}}</span>
        </div>
        <div>
          <span>英文名称：</span>
          <span>{{shopDrugSpec.enName||'暂无'}}</span>
        </div>
        <div>
          <span>汉语拼音：</span>
          <span>{{shopDrugSpec.pinyinName||'暂无'}}</span>
        </div>
        <div>
          <span>有效期：</span>
          <span>{{shopDrugSpec.validity||'暂无'}}</span>
        </div>
        <div>
          <span>生产企业：</span>
          <span>{{shopDrugSpec.origin.company||'暂无'}}</span>
        </div>
      </div>
      <div class="images">
        <img :src="getImgURL(fileId,'LARGE_PIC')" v-for="fileId in shopDrugSpec.fileIds"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'drugInfo',
    props: ['shopDrugSpec'],
    data: {},
    created() {
      console.log(this.shopDrugSpec);
    }
  };
</script>
<style scoped>

  .container {

    height: 100vh;
    padding: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .shopDrugSpec-main {
    width: 720px;
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
  }


  .shopDrugSpec-main div {
    margin-bottom: 20px;
  }

  .text {
    padding: 20px;
  }
  .text>div>span {
    font-size: 25px;
  }
  .images {
    width: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }

  .images > img {
    width: 600px;
    height: 600px;
    padding: 10px;
    margin-bottom: 10px;
   }
</style>
