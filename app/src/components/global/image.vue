<template>
  <div :class="size" class="rx-image">
    <img v-lazy="url" />
    <span v-if="rx" class="tag">Rx</span>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
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
