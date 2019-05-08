<template>
  <div>
    <new-layout>
      <template slot="center">
        <div v-show="active === 0">
          <div class="input-container">
            <div class="input-wrapper hairline-bottom">
              <div class="icon-wrapper">
                <van-icon name="wo-" size="0.5rem" color="#d7000e"/>
              </div>
              <input
                v-focus
                v-model="username"
                placeholder="请输入用户名"
                type="search"
              />
            </div>
            <div class="input-wrapper">
             <div class="icon-wrapper">
               <van-icon name="mima" size="0.5rem" color="#d7000e"/>
             </div>
              <input
                v-focus
                v-model="password"
                placeholder="请输入密码"
                type="password"
              />
            </div>
            <div class="login-wrapper" @click="login">
              <span>
                登陆
              </span>
            </div>
            <footer @click="active=1" v-show="active === 0">
              没有账户？注册
            </footer>
          </div>
        </div>
        <div v-show="active === 1">
          <div class="input-container">
            <div class="input-wrapper hairline-bottom">
              <div class="icon-wrapper">
                <van-icon name="wo-" size="0.5rem" />
              </div>
              <input
                v-focus
                v-model="registerUsername"
                placeholder="请输入用户名"
                type="search"
              />
              <div class="captcha" @click="getCaptcha">
                 <span>
                    {{ showCode ? count : '验证码' }}
                 </span>
                </div>
            </div>
            <div class="input-wrapper hairline-bottom">
              <div class="icon-wrapper">
                <van-icon name="yanzhengma" size="0.5rem" />
              </div>
              <input
                v-model="captcha"
                placeholder="请输入验证码"
                type="search"
              />
            </div>
            <div class="input-wrapper">
              <div class="icon-wrapper">
                <van-icon name="mima" size="0.5rem" />
              </div>
              <input
                v-model="registerPassword"
                placeholder="请输入密码"
                type="password"
              />
            </div>
            <div class="login-wrapper" @click="register">
              <span>
                注册
              </span>
            </div>
            <footer @click="active=0" v-show="active === 1">
              有账户？登陆
            </footer>
          </div>
        </div>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  /deep/ .center {
    display: flex;
    align-items: center;
    justify-content: center;
    background:-moz-linear-gradient(top,#ace,#f96);/*Mozilla*/
    background:-webkit-gradient(linear,0 50%,100% 50%,from(#ace),to(#f96));/*Old gradient for webkit*/
    background:-webkit-linear-gradient(top,#ace,#f96);/*new gradient for Webkit*/
    background:-o-linear-gradient(top,#ace,#f96); /*Opera11*/
  }
  footer {
    text-align: center;
    padding: 20px 0;
  }
.input-container {
  display: grid;
  align-items: center;
  justify-items: center;
  justify-content: center;
  grid-row-gap: 50px;
  grid-template-rows: repeat(5, 100px);
  grid-template-columns: 600px;
  .login-wrapper {
    background-color: $theme;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: $size-large;
  }
  .input-wrapper {
    background-color: white;
    display: grid;
    grid-template-columns: 100px 1fr auto;
    grid-template-rows: 100px;
    align-items: center;
    grid-column-gap: 20px;
    width: 100%;
    .icon-wrapper {
      background-color: $gray-light;
      opacity: .6;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input {
      height: 100%;
    }
    .captcha {
      color: white;
      background-color: #44bb00;
      padding: 10px;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<script>
export default {
  name: 'Login',
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
  computed: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    initData() {
      this.username = this.getUsername();
    },
    async getCaptcha() {
      let captcha = await this.$http.post('/api/app/captchas', {
        username: this.registerUsername,
        captchaType: 'ACCOUNT_REGISTER'
      });
      alert(captcha);
      this.setInt();
    },
    async checkCaptcha() {
      await this.$http.post('/api/app/captchas/check', {
        username: this.registerUsername,
        captcha: this.captcha
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
        username: this.username,
        password: this.password,
        clientId: this.clientId
      };
      const token = await this.$http.post('/api/app/accounts/login1', data);
      this.setToken(token);
      const account = await this.$http.get('/api/app/accounts');
      this.setAccount(account);
      this.setUsername(this.username);
      if (this.isMobile()) {
        this.setCurrentAddress(await this.getCurrentPosition());
      } else {
        this.setCurrentAddress(this.testPosition);
      }
      this.loadPageHome();
    },
    async register() {
      const userInfo = {
        username: this.registerUsername,
        password: this.registerPassword,
        captcha: this.captcha
      };
      await this.$http.post('/api/app/accounts', userInfo);
      this.username = this.registerUsername;
      this.password = this.registerPassword;
    }
  }
};
</script>
