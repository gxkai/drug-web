<template>
  <div class="base-layout">
    <div class="base-layout__header">
      <slot name="header"></slot>
    </div>
    <div class="base-layout__main">
      <slot></slot>
    </div>
    <div class="base-layout__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .base-layout {
    display: flex;
    flex-flow: column;
    height: 100vh;
    &__header{
      height: 100px;
      line-height: 100px;
    }
    &__main {
      flex: 1;
      overflow: auto;
      background-color: #f5f5f5;
    }
  }

</style>
<script>
export default {
  name: 'baseLayout',
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
