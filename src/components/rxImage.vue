<template>
  <div class="rx-image" :class="size">
    <img v-lazy="url"/>
    <van-tag type="danger" round class="tag" v-if="rx">处</van-tag>
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
    }
  }
  .small {
    /deep/ .van-tag {
      font-size: 10px !important;
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
  .medium {
    /deep/ .van-tag {
      font-size: 20px !important;
    }
    img {
      width: 180px;
      height: 180px;
    }
  }
  .large {
    /deep/ .van-tag {
      font-size: 25px !important;
    }
    img {
      width: 220px;
      height: 220px;
    }
  }
</style>
