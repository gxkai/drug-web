<template>
  <new-layout class="setting">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      slot="top"
    />
    <div slot="center">
      <van-cell title="当前版本"
                is-link
                class="mt-l-20"
                to="/version">
      </van-cell>
    </div>
  </new-layout>
</template>
<script>
  export default {
    name: 'setting'
  };
</script>
