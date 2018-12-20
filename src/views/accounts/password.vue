<template>
  <div class="account-container">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />

    <div class="password-content">
      <div class="password-list">
        <label>旧密码:</label><input placeholder="请输入旧密码" type="password">
      </div>
      <div class="password-list">
        <label>新密码:</label><input placeholder="新密码长度6-20字符" type="password" v-model="password"/>
      </div>
      <div class="password-list">
        <label>确认密码:</label><input placeholder="请再次输入密码" type="password" v-model="passwordConfirm"/>
      </div>
    </div>
    <button class="btn-fixed text-l-30" @click="save">确定</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        token: '',
        password: '',
        passwordConfirm: ''
      };
    },
    methods: {
      save() {
        if (this.password !== this.passwordConfirm) {
          this.$toast('输入密码不同');
          return;
        }
        this.$axios.put('/accounts/password', {password: this.password})
          .then((res) => {
            this.$router.go(-1);
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .mint-button--primary {
    background: #F60000;
    color: #e2e2e2;
  }

  .account-container {
    width: 720px;
    height: 100vh;
    background: #FFF;
  }

  .a-content-list span {
    color: #535353;
  }

  .btn-fixed {
    width: 720px;
    height: 77px;
    background: rgba(19, 193, 254, 1);
    border-radius: 5px;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
    color: white;
    letter-spacing: 2px;
  }

  .password-list {
    box-sizing: border-box;
    border-bottom: 1px solid #e5e5e5;
    margin: 65px auto;
    padding: 10px 0;

  }

  .password-list label {
    display: inline-block;
    width: 110px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }

  .password-list input {
    border: 0;
    color: #999;
    outline: 0;
    margin-left: 20px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }
  .password-list input::placeholder{
    text-align: left;
  }

  .password-content {
    margin: 0 10px;
  }

</style>


