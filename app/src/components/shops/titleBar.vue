<template>
  <div class="title-bar">
    <span class="horizon-line"> </span>
    <span class="name">
      {{ title }}
    </span>
    <div class="horizon-line"></div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    title: {}
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

<style scoped type="text/scss" lang="scss">
.title-bar {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 10px;
  grid-template-rows: 65px;
  background-color: white;
  justify-content: center;
  align-items: center;
  .horizon-line {
    width: 44px;
    height: 1px;
    background-color: $gray-light;
  }
}
</style>
