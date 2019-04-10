<template>
  <div class="wrapper">
    <div class="left">
      <new-line width="0.083rem" height="0.39rem" :color="lineColor" v-if="showLine"/>
      <span :style="{color: leftColor,fontStyle: leftStyle, fontFamily: leftFamily}" class="van-ellipsis text">
              {{leftText}}
      </span>
    </div>
    <div class="center van-ellipsis">
      <slot/>
    </div>
    <div class="right" @click="$emit('click-right')">
      <span :style="{color: rightColor}" class="van-ellipsis text">
          {{rightText}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    props: {
      showLine: {
        default: true
      },
      lineColor: {
        default: '#d7000e'
      },
      leftText: {
        default: ''
      },
      leftColor: {
        default: '#d7000e'
      },
      leftStyle: {
        default: 'normal'
      },
      leftFamily: {
        default: 'HiraginoSansGB-W3'
      },
      rightText: {
        default: ''
      },
      rightColor: {
        default: '#d7000e'
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
  .wrapper {
    background-color: white;
    display: grid;
    grid-template-columns: 200px 1fr auto;
    align-items: center;
    grid-column-gap: 10px;
    padding: 10px 15px;
    .left {
      display: flex;
      overflow: hidden;
      align-items: center;
      .text {
        margin-left: 20px;
        font-size: $size-large;
      }
    }
    .center {
    }
    .right {
      justify-self: right;
      .text {
        font-size: $size-mini;
      }
    }
  }
</style>
