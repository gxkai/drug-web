<template>
  <div>
    <new-layout>
      <template slot="center">
        <van-tabs v-model="active">
          <van-tab title="登陆">
            <div class="input-container">
              <div class="input-wrapper hairline-bottom">
                <van-icon name="wo-" size="0.5rem"/>
                <input placeholder="请输入用户名" type="search" v-focus v-model="username"/>
              </div>
              <div class="input-wrapper">
                <van-icon name="mima" size="0.5rem"/>
                <input placeholder="请输入密码" type="password" v-focus v-model="password"/>
              </div>
            </div>
            <div class="submit-button" @click="login">
              登陆
            </div>
          </van-tab>
          <van-tab title="注册">
            <div class="input-container">
              <div class="input-wrapper hairline-bottom">
                <van-icon name="wo-" size="0.5rem"/>
                <input placeholder="请输入用户名" type="search" v-focus v-model="registerUsername"/>
                <span class="captcha" @click="getCaptcha">
                  {{showCode?count:'验证码'}}
                </span>
              </div>
              <div class="input-wrapper hairline-bottom">
                <van-icon name="yanzhengma" size="0.5rem"/>
                <input placeholder="请输入验证码" type="search"  v-model="captcha"/>
              </div>
              <div class="input-wrapper">
                <van-icon name="mima" size="0.5rem"/>
                <input placeholder="请输入密码" type="password"  v-model="registerPassword"/>
              </div>
            </div>
            <div class="submit-button" @click="register">
              注册
            </div>
          </van-tab>
        </van-tabs>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .submit-button {
    margin-top: 30px;
    background-color: $theme;
    padding: 10px 20px;
    color: white;
    font-weight: 100;
    border-radius: 10px;
  }
  .input-container {
    border: 1Px solid rgba(0,0,0,0.1);
    .input-wrapper {
      background-color: white;
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: 120px;
      align-items: center;
      padding: 0 20px;
      grid-column-gap: 20px;
      min-width: 600px;
      input {
        height: 100%;
        width: 400px;
      }
      .captcha {
        color: white;
        background-color: #44bb00;
        padding: 10px;
      }
    }
  }
  /deep/ .van-tabs {
    &__wrap {
      height: 100px !important;
      position: fixed;
    }
    &--line {
      padding-top: 100px;
    }
    .van-tab {
      color: black !important;
      &--active {
        color: $theme !important;
      }
      &__pane {
        margin-top: 100px;
        display: grid;
        justify-items: center;
      }
      span {
        line-height: 100px !important;
        font-size: 30px !important;
      }
    }
  }
</style>
<script>
  export default {
    name: 'login',
    data() {
      return {
        active: 0,
        showCode: false,
        count: '',
        time: null,
        username: '',
        password: '000000',
        clientId: '1',
        registerUsername: '',
        captcha: '',
        registerPassword: ''
      };
    },
    computed: {
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      initData() {
        this.username = this.getUsername();
      },
      async getCaptcha() {
        let captcha = await this.$http.post('/api/captchas', {
          'username': this.registerUsername,
          'captchaType': 'ACCOUNT_REGISTER'
        });
        alert(captcha);
        this.setInt();
      },
      async checkCaptcha() {
        await this.$http.post('/api/captchas/check', {
          'username': this.registerUsername,
          'captcha': this.captcha
        });
        this.register();
      },
      setInt() {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.showCode = true;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.clearInt();
            }
          }, 1000);
        }
      },
      clearInt() {
        this.showCode = false;
        clearInterval(this.timer);
        this.timer = null;
      },
      async login() {
        const data = {
          'username': this.username,
          'password': this.password,
          'clientId': this.clientId
        };
        const token = await this.$http.post('/api/accounts/login1', data);
        this.setToken(token);
        const account = await this.$http.get('/api/accounts');
        this.setAccount(account);
        this.setUsername(this.username);
        this.loadPageHome();
      },
      async register() {
        const userInfo = {
          'username': this.registerUsername,
          'password': this.registerPassword,
          'captcha': this.captcha
        };
        await this.$http.post('/api/accounts', userInfo);
        this.username = this.registerUsername;
        this.password = this.registerPassword;
      }
    }
  };
</script>
