<template>
  <div class="rx-image" :class="size">
    <img v-lazy="url"/>
    <span class="tag" v-if="rx">Rx</span>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      url: {
        default: ''
      },
      rx: {
        default: false
      },
      size: {
        default: 'medium'
      }
    },
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
  .rx-image {
    position: relative;
    .tag {
      position: absolute;
      top: 0;
      width: 42px;
      height: 30px;
      background-color: #ff2905;
      font-size: 22px;
      color: #ffffff;
      text-align: center;
      border-radius: 22px;
      line-height: 30px;
    }
  }
  .small {
    img {
      width: 230px;
      height: 190px;
    }
  }
  .medium {
    img {
      width: 260px;
      height: 200px;
    }
  }
  .large {
    img {
      width: 230px;
      height: 230px;
    }
  }
</style>
