<template>
  <div class="f_body">
    <mt-header>
      <router-link to="/accounts" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="f_medical_card_unbinding">
      <img src="static/img/blackchufang.png"/>
      <span>{{message}}</span>
      <div class="f_medical_card_btns">
        <router-link to="/accounts/bind" class="f_medical_card_btn">返回上一步</router-link>
        <router-link to="/" class="f_medical_card_index_btn">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '医保卡解绑成功'
      };
    },
    created: function () {
      if (this.$route.params.bind === 1) {
        this.message = '医保卡绑定成功';
      }
    }
  };
</script>

<style scoped>
  .mint-header {
    background: white;
    color: black
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .f_body {
    text-align: left;
  }

  .f_medical_card_unbinding {
    margin-top: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .f_medical_card_unbinding :nth-child(2) {
    margin: 1rem auto;
  }

  .f_medical_card_btns {
    width: 100%;
  }

  .f_medical_card_btn {
    outline: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    background: none;
    border: 1px #e4e4e4 solid;
    color: #666666;
    margin-right: 5%;
  }

  .f_medical_card_index_btn {
    outline: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    background: #1AB6FD;
    border: none;
    color: #fbfefe;
  }
</style>
