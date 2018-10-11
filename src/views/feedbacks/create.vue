<template>
  <div class="feedback-create">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="提交"
      @click-right="commit()"
      ref="header"
    />
    <div ref="content">
    <textarea name="" rows="" cols="" v-model="content"
              placeholder="您的意见对我们非常重要，我们会不断的优化和改善，努力为您带来更高的体验，谢谢"></textarea>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .feedback-create {
    background-color: #f5f5f5;
    textarea {
      width:720px;
      min-height:360px;
      background:rgba(255,255,255,1);
      margin-top: 20px;
      padding: 70px 20px 20px 20px;
      -webkit-appearance: none;
      outline: none;
      border: none;
      resize: none;
      font-size: 30px;
      &::placeholder {
        font-size:24px;
        font-family:HiraginoSansGB-W3;
        font-weight:normal;
        color:rgba(153,153,153,1);
      }
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
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.content.style.overflow = 'auto';
    },
    methods: {
      commit() {
        this.$http.post('/feedbacks', {
          'content': this.content
        })
          .then((res) => {
            this.$toast('感谢您的反馈!');
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>
