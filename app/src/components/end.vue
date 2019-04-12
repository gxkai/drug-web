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
  name: 'end',
  props: {
    name: { default: '我是有底线的' }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.title-bar {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 10px;
  grid-template-rows: 65px;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
  .name {
    color: $gray-light;
    font-size: $size-small;
  }
  .horizon-line {
    width: 44px;
    height: 1PX;
    background-color: $gray-light;
  }
}
</style>
