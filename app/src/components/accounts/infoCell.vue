<template>
  <div class="info-cell hairline-bottom">
    <div class="left">
              <van-icon :name="leftIcon" v-show="leftIcon !== undefined" color="#d7000e" size="0.46rem"/>
              <span>
                {{title}}：
              </span>
    </div>
    <div class="right">
              <span>
                {{desc}}
              </span>
      <van-icon name="arrow" v-show="isLink !== undefined" color="#b9b9b9"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    props: ['title', 'desc', 'left-icon', 'is-link'],
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
    grid-column-gap: 20px;
    padding: 30px 41px;
    div {
      word-break: break-word;
    }
    .left {
      span {
        font-size: $size-normal;
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
