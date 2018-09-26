<template>
  <div class="insurance-account">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="insurance-account__content"
         ref="content">
      <van-cell title="姓名"
                class="mt-l-20"
                :value="accountInfo.name">
      </van-cell>

      <van-cell title="医保编号" class="mt-l-20"
                :value="accountInfo.medicaidNumber">
      </van-cell>

      <van-cell title="历史账户余额" class="mt-l-20"
                :value="accountInfo.allBalance">
      </van-cell>

      <van-cell title="本年预划额度" class="mt-l-20"
                :value="accountInfo.limit">
      </van-cell>

      <van-cell title="本年账户划入" class="mt-l-20"
                :value="Number(accountInfo.shift)">
      </van-cell>

      <van-cell title="本年消费累计" class="mt-l-20"
                :value="accountInfo.consume">
      </van-cell>

      <van-cell title="医保账户余额" class="mt-l-20"
                :value="accountInfo.balance">
      </van-cell>

      <van-cell title="累计月数" class="mt-l-20"
                :value="accountInfo.month">
      </van-cell>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        accountInfo: []
      };
    },
    created() {
      this.$http.get(this.$medicaid, {params: {ic: '1'}})
        .then(res => {
          this.accountInfo = res.data;
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
  .insurance-account {
    background-color: #f5f5f5;
  }
</style>
