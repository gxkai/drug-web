<template>
  <div :style="{background:color}"></div>
</template>

<script>
  export default {
    name: 'newLine',
    props: {
      color: {
        type: String,
        default: 'gainsboro'
      }
    }
  };
</script>

<style scoped>
  div {
    height: 2px;
    width: 681px;
    margin: auto;
  }
</style>
