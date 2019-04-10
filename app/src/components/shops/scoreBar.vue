<template>
  <div class="score-bar">
    <div class="item">
      <div class="desc">
        --
      </div>
      <div class="title">
        客户服务
      </div>
    </div>
    <div class="vertical-line">

    </div>
    <div class="item">
      <div class="desc">
        --
      </div>
      <div class="title">
        发货速度
      </div>
    </div>
    <div class="vertical-line">

    </div>
    <div class="item">
      <div class="desc">
        --
      </div>
      <div class="title">
        物流速度
      </div>
    </div>
    <div class="vertical-line">

    </div>
    <div class="item">
      <div class="desc">
        --
      </div>
      <div class="title">
        商品包装
      </div>
    </div>
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
  .score-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    grid-template-rows: 100px;
    background-color: white;
    align-items: center;
    justify-items: center;
    .vertical-line {
      width: 1px;
      height: 45px;
      background-color: #ffffff;
      border: solid 1px #cccccc;
    }
    .item {
      display: grid;
      grid-row-gap: 10px;
      justify-items: center;
      .desc {
        color: #ff0011;
        font-size: $size-least;
      }
      .title {
        font-size: $size-mini;
        color: $gray;
      }
    }
  }
</style>
