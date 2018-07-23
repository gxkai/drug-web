<template>
  <div class="f_body">

    <mt-header title="我的意见">
      <router-link to="/accounts" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="commit()">提交</mt-button>
    </mt-header>

    <div class="f_opinion_text">
      <textarea name="" rows="" cols="" v-model="content"
                placeholder="您的意见对我们非常重要，我们会不断的优化和改善，努力为您带来更高的体验，谢谢111100111"></textarea>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'feedbacksCreate',
    data() {
      return {
        content: ''
      };
    },
    methods: {
      commit() {
        let newUrl = this.URL_PATH + '/feedbacks';
        this.$http.post(newUrl, {
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

  textarea{
    width:720px;
    background:rgba(255,255,255,1);
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    line-height:40px;
    padding-top: 99px;
    padding-left: 26px;
    padding-right: 23px;
    padding-bottom: 197px;
  }

  .f_body {
    width:720px;
    height:1334px;
  }

</style>
