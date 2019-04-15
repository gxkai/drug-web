<template>
  <div>
    <info-cell :desc="item.name" title="商品名称" />
    <info-cell :desc="item.brandName" title="品牌名称" />
    <info-cell :desc="item.pinyinName" title="拼音名称" />
    <info-cell :desc="item.enName" title="英文名称" />
    <info-cell :desc="item.sfda" title="国药准字" />
    <info-cell :desc="item.validity" title="有效期" />
  </div>
</template>

<script>
import infoCell from '@/components/drugs/shops/infoCell';
export default {
  name: '',
  components: {
    infoCell
  },
  mixins: [],
  props: {
    item: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
