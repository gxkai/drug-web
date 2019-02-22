<template>
  <new-layout>
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-cell :title="item.hospital"
                class="mt-l-20"
                :value="dateConvert(item.date)"
                is-link
                v-for="(item,index) in consumeInfo.list" :key="index"
                @click="linkToConsumeInfoMore(item)">
      </van-cell>
    </template>
  </new-layout>
</template>
<script>
  export default {
    data() {
      return {
        consumeInfo: this.$route.params.consumeInfo
      };
    },
    created() {
    },
    mounted() {
    }
  };
</script>
<style scoped type="text/scss" lang="scss">
</style>
