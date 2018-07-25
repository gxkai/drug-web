<template>
  <div class="a-content-list flex-stream-sb padding-10">
    <div class="f_user_info_list_left">
      <span>{{label.label}}</span>
    </div>
    <div class="a-content-list flex-stream-sb padding-10">
      <span>{{label.value}}</span>
      <i class=" iconfont ic-youjiantou"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'account-label',
    props: ['label']
  };
</script>

<style scoped>

</style>
