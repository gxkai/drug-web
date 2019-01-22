<template>
  <div
    class="drug-info"
  >
    <div class="drug-info--text">
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
    <img v-lazy="getImgURL(fileId,'LARGE_PIC')"
         v-for="fileId in shopDrugSpec.fileIds"
         class="drug-info--pic"
    />
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .drug-info {
    background-color: white;
    &--text {
      padding: 60px 40px;
      &>div {
        margin-top: 20px;
        &>span {
          font-size:24px;
          font-family:HiraginoSansGB-W3;
          font-weight:normal;
          color:rgba(102,102,102,1);
          &:nth-child(1) {
            display: inline-block;
            width: 150px;
          }
        }
      }
    }
    &--pic {
      width: 500px;
      height: 350px;
      margin: 10px 110px;
    }
  }
</style>
<script>
  export default {
    name: 'drugInfo',
    props: ['shopDrugSpec'],
    data() {
      return {};
    },
    created() {
      console.log(this.shopDrugSpec);
    }
  };
</script>
