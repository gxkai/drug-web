<template>
  <div class="hairline-bottom wrapper">
    <div @click="$emit('back')">
      <van-icon
        v-show="showBack !== undefined"
        name="arrow-left"
        color="#999999"
        size=".46rem"
      />
    </div>
    <span class="center">
      {{ title }}
    </span>
    <div @click="$emit('close')">
      <van-icon
        v-show="showClose !== undefined"
        name="close"
        color="#999999"
        size=".46rem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    title: {},
    showBack: {},
    showClose: {}
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
.wrapper {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: 100px;
  grid-column-gap: 20px;
  align-items: center;
  justify-items: center;
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
