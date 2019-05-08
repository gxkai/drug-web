<template>
  <div>
    <info-cell :desc="item.mainComponents" title="主要成分" />
    <info-cell :desc="item.character" title="产品症状" />
    <info-cell :desc="item.untowardEffect" title="不良反应" />
    <info-cell :desc="item.taboo" title="禁忌" />
    <info-cell :desc="item.specName" title="规格" />
    <info-cell :desc="item.originName" title="厂商" />
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
