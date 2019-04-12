<template>
  <div class="info-cell">
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
    padding: 10px 41px;
    div {
      span {
        font-size: $size-mini;
      }
    }
    .left {
      span {
        color: $gray;
      }
    }
  }
</style>
