<template>
  <new-layout class="setting">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-cell title="当前版本"
                is-link
                class="mt-l-20"
                to="/version">
      </van-cell>
    </template>
  </new-layout>
</template>
<script>
  export default {
    name: 'setting'
  };
</script>
