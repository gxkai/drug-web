<template>
  <div class="insurance-consume">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="insurance-consume__content"
    ref="content">
      <van-cell :title="item.year"
                is-link
                class="mt-l-20"
                v-for="(item,index) in items" :key="index"
                @click="linkToConsumeInfo(item)">
      </van-cell>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: []
      };
    },
    created() {
      this.$http.get('/accounts/medicaid/consume')
        .then(res => {
          this.items = res.data;
          console.log(res.data);
        })
        .catch(err => {
          this.exception(err);
        });
    },
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight
      ) + 'px';
      this.$refs.content.style.overflow = 'auto';
    }
  };
</script>
<style scoped type="text/less" lang="less">
  .insurance-consume {
    background-color: #f5f5f5;
  }

</style>
