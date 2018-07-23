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
  .mint-header {
    background: #12b1f9;
    color: white;
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .f_body {
    background: #f5f5f5;
    height: 100%;
    width: 100%;
  }

  .f_opinion_text {
    width:720px;
    height:360px;
    background:rgba(255,255,255,1);
    border: 1px red solid;
  }

  textarea {
    /*width: 100%;*/
    /*border: 0;*/
    /*height: 100px;*/
    /*outline: none;*/
    /*resize: none;*/
    /*background: white;*/
    /*padding: 2rem 1rem 0 1rem;*/
    /*box-sizing: border-box;*/
    /*color: #a9a9a9;*/
    width:671px;
    height:64px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:40px;
  }

  .mint-header-title, .mint-header-button {
    color: #343434 !important;
  }

  .f_opinion_text textarea {
    font-size: 1.2rem;
  }

  .mint-header-title {
    color: #333333;
  }

  .mintui-back {
    color: #333333;
  }

  .mint-header-title {
    color: #333333 !important;
  }
</style>
