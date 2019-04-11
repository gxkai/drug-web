<template>
  <div>
    <div class="info-wrapper">
      <info-cell title="通用名" :desc="shopDrug.name || '暂无'" />
      <info-cell title="商品品牌" :desc="shopDrug.origin.brand || '暂无'" />
      <info-cell title="批准文号" :desc="shopDrug.sfda || '暂无'" />
      <info-cell title="包装规格" :desc="shopDrug.spec || '暂无'" />
      <info-cell title="剂型/型号" :desc="shopDrug.form || '暂无'" />
      <info-cell title="英文名称" :desc="shopDrug.enName || '暂无'" />
      <info-cell title="汉语拼音" :desc="shopDrug.pinyinName || '暂无'" />
      <info-cell title="有效期" :desc="shopDrug.validity || '暂无'" />
      <info-cell title="生产企业" :desc="shopDrug.origin.company || '暂无'" />
    </div>
    <div class="pic-wrapper">
      <img
        v-lazy="getImgURL(fileId, 'LARGE_PIC')"
        v-for="(fileId,index) in shopDrug.fileIds"
        :key="index"
      />
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.info-wrapper {
  display: grid;
  grid-template-rows: 10px;
  padding: 20px 0;
}
.pic-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
<script>
import infoCell from '@/components/shopDrugs/infoCell';
export default {
  name: 'drugInfo',
  props: ['shopDrug'],
  components: {
    infoCell
  },
  data() {
    return {};
  },
  created() {
    console.log(this.shopDrug);
  }
};
</script>
