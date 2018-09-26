<template>
  <div class="insurance-consumeInfo">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="insurance-consumeInfo__content"
    ref="content">
      <van-cell :title="item.hospital"
                class="mt-l-20"
                :value="dateConvert(item.date)"
                is-link
                v-for="(item,index) in consumeInfo.list" :key="index"
                @click="linkToConsumeInfoMore(item)">
      </van-cell>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        consumeInfo: JSON.parse(this.$route.query.consumeInfo)
      };
    },
    created() {
    },
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight
      ) + 'px';
      this.$refs.content.style.overflow = 'auto';
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .insurance-consumeInfo {
    background-color: #f5f5f5;
  }
</style>
