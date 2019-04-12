<template>
  <transition name="fade">
    <div class="wrapper" v-show="show&&$route.meta.showBackTopLeft">
      <van-icon name="arrow-left" @click="$router.go(-1)" color="white" />
    </div>
  </transition>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        show: true
      };
    },
    created() {
    },
    mounted() {
      let oldTop = 0;
      window.onscroll = () => {
        let top = document.scrollingElement.scrollTop;
        if (oldTop + 20 >= top) {
          this.show = true;
        } else {
          this.show = false;
        }
        oldTop = top;
      };
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .wrapper {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    opacity: 0.3;
    background-color: black;
    border-radius: 50%;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-right: 5px;
  }
</style>
