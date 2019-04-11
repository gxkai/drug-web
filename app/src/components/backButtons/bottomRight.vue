<template>
    <div class="wrapper" v-show="$route.meta.showBackBottomRight">
      <van-icon name="fanhui" @click="$router.go(-1)"  color="#ffffff" size="1rem"/>
    </div>
</template>

<script>
  export default {
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

<style scoped type="text/scss" lang="scss">
  .wrapper {
    position: fixed;
    bottom: 120px;
    right: 20px;
    box-shadow: 0px 4px 19px 1px
    rgba(105, 19, 20, 0.33);
    background-color: rgb(225,35,37);
    border-radius: 50%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
</style>
