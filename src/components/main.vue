<template>
  <div :style="{background:color}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'newMain',
    props: {
      color: {
        default: 'rgba(241, 239, 240, 1)'
      }
    }
  };
</script>

<style scoped>
  div {
    width: 720px;
    height: 100vh;
  }
</style>
