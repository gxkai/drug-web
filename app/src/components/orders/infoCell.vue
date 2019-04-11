<template>
  <div class="info-cell hairline-bottom">
    <div class="left">
              <span>
                {{title}}：
              </span>
    </div>
    <div class="right">
              <span :style="{color:color}">
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
      title: {},
      desc: {},
      color: {
        default: '#000000'
      }
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
  .info-cell {
    background-color: white;
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 22px 34px;
    .left {
      span {
        font-size: $size-small;
      }
    }
    .right {
      justify-self: right;
      span {
        font-size: $size-small;
        color: $gray;
      }
    }
  }
</style>
