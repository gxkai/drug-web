<template>
  <div
  class="no-data"
  >{{name}}</div>
</template>

<script>
  export default {
    name: 'noData',
    props: {
      name: {default: '没有更多数据了'}
    }
  };
</script>

<style scoped>
  .no-data {
    text-align: center;
    font-size: 25px;
    padding: 20px;
    color: #999999;
  }
</style>
