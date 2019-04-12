<template>
  <div class="cell">
    <div class="left">
      <van-icon :name="icon" size=".4166rem" color="#ff0000" v-show="icon !== undefined"/>
      <span>
        {{title}}
      </span>
    </div>
    <div class="right">
      <span>
        {{desc}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    props: {
      icon: {},
      title: {},
      desc: {}
    },
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
  .cell {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 10px;
    div {
      word-break: break-word;
    }
    .left {
      span {
        font-size: $size-mini;
        color: $gray;
        margin-left: 10px;
        min-width: 100px;
        display: inline-block;
      }
    }
    .right {
      span {
        font-size: $size-small;
      }
    }
  }
</style>
