<template>
  <div class="layout">
    <div class="layout--top">
      <slot name="top"></slot>
    </div>
    <div class="layout--center" :style="{backgroundColor: centerColor}">
      <slot name="center"></slot>
    </div>
    <div class="layout--bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .layout {
    display: flex;
    flex-flow: column;
    height: 100vh;
    width: 720px;
    &--center {
      flex: 1;
      overflow: auto;
    }
  }
</style>
<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    props: {
      centerColor: {
        default: '#f5f5f5'
      }
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
