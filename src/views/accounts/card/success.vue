<template>
  <div class="container">
    <new-header title="医保卡绑定成功">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>

    <div>
      <div class="div-img">
        <img src="../../../assets/image/success.png"/>
        <span>{{message}}</span>
      </div>

      <div class="div-btn">
        <router-link to="/accounts/card/bind" class="bind-success-btn btn-white box-center">随意逛逛</router-link>
        <router-link to="/" class="bind-success-btn btn-1AB6FD box-center">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    created: function () {}
  };
</script>

<style scoped>
  .container {
    width: 720px;
    height: 100vh;
  }

  .div-img img {
    width: 151px;
    height: 151px;
    display: block;
    margin: auto;
    margin-top: 140px;
  }

  .div-img span {
    height: 35px;
    font-size: 36px;
    font-family: MicrosoftYaHei;
    color: rgba(19, 193, 254, 1);
    line-height: 24px;
    display: block;
    text-align: center;
    margin-top: 48px;
    margin-bottom: 78px;
  }

  .div-btn {
    display: flex;
    justify-content: center;
  }

  .div-btn a {
    display: flex;
    float: left;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    align-items: center;
    justify-content: center;
  }

  .div-btn a:first-child {
    margin-right: 207px;
  }

  .bind-success-btn {
    width: 177px;
    height: 58px;
    border-radius: 20px;
  }

  .btn-white {
    background: white;
    border: 1px #BFBFBF solid;
    color: rgba(102, 102, 102, 1);
  }

  .btn-1AB6FD {
    background: #1AB6FD;
  }
</style>
