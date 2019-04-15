<template>
  <div class="layout">
    <div class="top">
      <slot name="top"></slot>
    </div>
    <div :style="{ backgroundColor: centerColor }" class="center">
      <slot name="center"></slot>
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  width: 720px;
  .center {
    overflow: auto;
  }
}
</style>
<script>
export default {
  name: '',
  mixins: [],
  props: {
    centerColor: {
      default: '#f5f5f5'
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
