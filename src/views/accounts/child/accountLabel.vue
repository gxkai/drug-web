<template>
  <div class="f_user_info_list">
    <div class="f_user_info_list_left">
      <span>{{label.label}}</span>
    </div>
    <div class="f_user_info_list_right">
      <span>{{label.value}}</span>
      <i class="icon iconfont ic-youjiantou"></i>
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
