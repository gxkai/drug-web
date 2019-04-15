<template>
  <div class="title-bar">
    <span class="horizon-line"> </span>
    <span class="name">
      {{ name }}
    </span>
    <div class="horizon-line"></div>
  </div>
</template>

<script>
export default {
  name: 'End',
  props: {
    name: { default: '我是有底线的' }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.title-bar {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 20px;
  grid-template-rows: 65px;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  .name {
    color: $gray-light;
    font-size: $size-small;
  }
  .horizon-line {
    width: 160px;
    height: 1px;
    background-color: $gray-light;
    opacity: 0.5;
  }
}
</style>
