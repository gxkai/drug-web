<template>
  <van-tabbar :value="value" :fixed="false">
    <van-tabbar-item icon="shouye-" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="chufang-" to="/rxs">处方单</van-tabbar-item>
    <van-tabbar-item icon="fenlei-" to="/drugTypes">分类</van-tabbar-item>
    <van-tabbar-item icon="gouwuche-" to="/carts">购物车 </van-tabbar-item>
    <van-tabbar-item icon="wo-" to="/accounts">我</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: { value: {} },
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
