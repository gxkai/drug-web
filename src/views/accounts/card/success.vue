<template>
  <div class="bind-container">
    <mt-header>
      <router-link to="/accounts" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div >
      <div class="div-img">
        <div>
        <img src="../../../assets/image/blackchufang.png"/>
        </div>
        <span>{{message}}</span>
      </div>
      <div class="div-btn">
        <router-link to="/accounts/bind" class="bind-success-btn btn-white box-center">随意逛逛</router-link>
        <router-link to="/" class="bind-success-btn btn-1AB6FD box-center">返回首页</router-link>
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

  .bind-container{
    width: 720px;
    height: 100vh;
  }
  a,a:hover{
    color: white;
    text-decoration: none;
  }

  .box-center{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .div-img{
    width: 720px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .div-btn{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 88px;
  }
  .bind-success-btn{
    width:177px;
    height:51px;
    border-radius:20px;
  }

  .btn-white{
    background:white;
    border: 1px #BFBFBF solid;
    color:rgba(102,102,102,1);
  }

  .btn-1AB6FD{
    background:#1AB6FD;
  }
</style>
