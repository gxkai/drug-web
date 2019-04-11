<template>
  <div class="info-wrapper" @click="$emit('click')">
    <div class="left">
          <span>
            {{title}}：
          </span>
    </div>
    <div class="right">
      <van-icon :name="icon" color="#d7000e"/>
      <span>
            {{desc}}
          </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {},
      icon: {},
      desc: {}
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
  .info-wrapper {
    background-color: white;
    padding: 10px 15px;
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 80px;
    align-items: center;
    .left {
      span {
        font-size: $size-small;
        color: $gray;
      }
    }
    .right {
      span {
        font-size: $size-small;
        color: #000000;
        word-break: break-word;
      }
    }
  }
</style>
