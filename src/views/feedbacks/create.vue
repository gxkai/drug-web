<template>
  <div class="container">
    <new-header title="我的意见">
      <router-link tag="i" to="/accounts" class="iconfont ic-arrow-right" slot="left"></router-link>
      <span slot="right" @click="commit()">提交</span>
    </new-header>
    <div>
      <textarea name="" rows="" cols="" v-model="content"
                placeholder="您的意见对我们非常重要，我们会不断的优化和改善，努力为您带来更高的体验，谢谢"></textarea>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

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
        }, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then((res) => {
            if (res.status === 200) {
              MessageBox('提示', '感谢您的反馈！');
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              MessageBox('提示', '提交失败');
            }
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
