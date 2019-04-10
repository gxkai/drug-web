<template>
  <van-icon
    :name="name"
    :color="color"
    :size="size"
    :info="info"
    @click="$emit('click')"
    v-if="info > 0"
  />
  <van-icon
    :name="name"
    :color="color"
    :size="size"
    @click="$emit('click')"
    v-else
  />
</template>

<script>
  export default {
    props: {
      name: {},
      color: {},
      size: {},
      info: {
        type: Number,
        default: 0
      }
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

<style scoped type="text/scss" lang="scss">
  /deep/.van-icon .van-info {
    position: absolute;
    right: 0;
    top: -0.111111rem;
    color: #fff;
    font-size: 0.366667rem!important;
    font-weight: 500;
    font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 0.081667rem;
    min-width: 0.222222rem;
    height: 0.422222rem!important;
    line-height: 0.422222rem;
    border: 0.013889rem solid #fff;
    -webkit-border-radius: 0.222222rem;
    border-radius: 0.222222rem;
    background-color: #f44;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
    -webkit-transform-origin: 100%;
    -ms-transform-origin: 100%;
    transform-origin: 100%;
  }
</style>
