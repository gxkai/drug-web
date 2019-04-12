<template>
    <div>
      <info-cell title="商品名称" :desc="item.name"/>
      <info-cell title="品牌名称" :desc="item.brandName"/>
      <info-cell title="拼音名称" :desc="item.pinyinName"/>
      <info-cell title="英文名称" :desc="item.enName"/>
      <info-cell title="国药准字" :desc="item.sfda"/>
      <info-cell title="有效期" :desc="item.validity"/>
    </div>
</template>

<script>
  import infoCell from '@/components/drugs/shops/infoCell';
  export default {
    components: {
      infoCell
    },
    props: {
      item: {}
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped>

</style>
