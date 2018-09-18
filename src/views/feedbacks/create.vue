<template>
  <div class="container">
    <new-header title="我的意见">
      <div slot="left"><router-link tag="i" to="/accounts" class="iconfont ic-arrow-right"></router-link></div>
      <div slot="right">
        <span @click="commit()" class="text-l-25">提交</span>
      </div>
     </new-header>
    <div>
      <textarea name="" rows="" cols="" v-model="content"
                placeholder="您的意见对我们非常重要，我们会不断的优化和改善，努力为您带来更高的体验，谢谢"></textarea>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    name: 'feedbacks',
    data() {
      return {
        content: ''
      };
    },
    methods: {
      commit() {
        this.$http.post('/feedbacks', {
          'content': this.content
        })
          .then((res) => {
            let instance = Toast('感谢您的反馈!');
            setTimeout(() => {
              instance.close();
              this.$router.go(-1);
            }, 2000);
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    },
    created: function () {
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .container {
    background-color: lightgrey;
    height: 100vh;
  }
  textarea{
    display: block;
    margin-top: 19px;
    width:720px;
    height:360px;
    background:rgba(255,255,255,1);
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:40px;
    padding-top: 99px;
    padding-left: 26px;
    padding-right: 23px;
    outline: 0;
  }
</style>
