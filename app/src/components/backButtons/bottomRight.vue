<template>
  <div v-show="$route.meta.showBackBottomRight" class="wrapper">
    <van-icon
      name="fanhui"
      color="#ffffff"
      size="0.6rem"
      @click="$router.go(-1)"
    />
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
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

<style scoped type="text/scss" lang="scss">
.wrapper {
  position: fixed;
  bottom: 120px;
  right: 20px;
  box-shadow: 0px 4px 19px 1px rgba(105, 19, 20, 0.33);
  background-color: rgb(225, 35, 37);
  border-radius: 50%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
</style>
