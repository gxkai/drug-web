<template>
  <div>
    <div class="info-wrapper">
      <info-cell :desc="shopDrug.name || '暂无'" title="通用名" />
      <info-cell :desc="shopDrug.origin.brand || '暂无'" title="商品品牌" />
      <info-cell :desc="shopDrug.sfda || '暂无'" title="批准文号" />
      <info-cell :desc="shopDrug.spec || '暂无'" title="包装规格" />
      <info-cell :desc="shopDrug.form || '暂无'" title="剂型/型号" />
      <info-cell :desc="shopDrug.enName || '暂无'" title="英文名称" />
      <info-cell :desc="shopDrug.pinyinName || '暂无'" title="汉语拼音" />
      <info-cell :desc="shopDrug.validity || '暂无'" title="有效期" />
      <info-cell :desc="shopDrug.origin.company || '暂无'" title="生产企业" />
    </div>
    <div class="pic-wrapper">
      <img
        v-lazy="getImgURL(fileId, 'LARGE_PIC')"
        v-for="(fileId, index) in shopDrug.fileIds"
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
  name: 'DrugInfo',
  components: {
    infoCell
  },
  props: ['shopDrug'],
  data() {
    return {};
  },
  created() {
    console.log(this.shopDrug);
  }
};
</script>
