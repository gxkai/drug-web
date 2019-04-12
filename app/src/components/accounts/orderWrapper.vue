<template>
  <header>
    <div class="left">
                <span>
                  我的订单
                </span>
    </div>
    <div class="center" @click="loadPageOrders(0)">
                <span>
                  全部订单
                </span>
    </div>
    <div class="right" @click="loadPageOrders(0)">
      <van-icon
        name="arrow"
        color="#666666"
        size="0.4166rem"
        class="arrow"
      ></van-icon>
    </div>
  </header>
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
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
  .left {
  span {
    font-size: $size-small;
  }
  }
  .center {
    justify-self: right;
  span {
    color: $gray;
    font-size: $size-small;
  }
  }
  .right {
    margin-top: 5px;
  }
  }
</style>
