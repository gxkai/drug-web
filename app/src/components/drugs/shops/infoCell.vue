<template>
  <div class="info-cell hairline-bottom">
    <div class="left">
              <span>
                {{title}}：
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
    props: ['title', 'desc'],
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
    grid-template-columns: 140px 1fr;
    padding: 33px;
    div {
      word-break: break-word;
    }
    .left {
      span {
        font-size: $size-small;
      }
    }
    .right {
      span {
        font-size: $size-small;
        color: $gray;
      }
    }
  }
</style>
