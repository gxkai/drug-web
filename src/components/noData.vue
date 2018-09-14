<template>
  <div>没有更多数据了</div>
</template>

<script>
  export default {
    name: 'noData',
    props: {
      length: {
        type: Number,
        default: 0
      }
    }
  };
</script>

<style scoped>
  div {
    text-align: center;
    font-size: 30px;
    padding: 20px;
  }
</style>
