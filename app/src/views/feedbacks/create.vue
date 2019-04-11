<template>
  <new-layout>
    <template slot="center">
      <textarea
        name=""
        rows=""
        cols=""
        v-model="content"
        maxlength="100"
        placeholder="您的意见对我们非常重要，我们会不断的优化和改善，努力为您带来更高的体验，谢谢。~_~最多100字哦。"
      ></textarea>
    </template>
    <template slot="bottom">
      <new-submit-button name="提交" @click.native="commit" />
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
textarea {
  width: 720px;
  min-height: 360px;
  background: rgba(255, 255, 255, 1);
  margin-top: 20px;
  padding: 70px 20px 20px 20px;
  font-size: 30px;
  &::placeholder {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    font-weight: normal;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
<script>
export default {
  name: 'feedbacks',
  data() {
    return {
      content: ''
    };
  },
  mounted() {},
  methods: {
    async commit() {
      const params = {
        content: this.content
      };
      await this.$http.post('/api/feedbacks', params);
      this.$toast('成功');
      this.$router.go(-1);
    }
  }
};
</script>
