<template>
  <div class="submit-bar">
    <div class="submit-bar-left">
      <div class="submit-bar__text">
        <span>合计:</span>
        <span class="submit-bar__price">￥ {{toFixedTwo(price)}}</span>
      </div>
    </div>
    <div class="submit-bar-right" @click="$emit('submit')">
      立即支付
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    props: {
      price: {}
    },
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
  .submit-bar {
    display: flex;
    width: 720px;
    height: 100px;
    &__price {
      color: #FF0000;
    }
    &-left {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }
    &__text {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        font-weight: 500;
        padding: 0 10px;
      }
    }
    &-right {
      width: 180px;
      background-color: #f44;
      font-size: 30px;
      color: white;
      text-align: center;
      line-height: 100px;
    }
  }
</style>
