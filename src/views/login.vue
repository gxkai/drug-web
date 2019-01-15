<template>
  <div class="login">
    <div :style="note" class="login-header">
      药品网上服务平台
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <div class="swiper-slide-login_tel">
          <div>
            <i class="iconfont ic-shouji shouji"></i>
          </div>
          <input type="number" placeholder="请输入手机号码" v-model="username">
        </div>
        <div class="swiper-slide-login_password">
          <div>
            <i class="iconfont ic-icon2"></i>
          </div>
          <input type="password" placeholder="请输入手机号码" v-model="password" maxlength="11">
        </div>
        <div class="swiper-slide-login_commit"
             @click="login()">
          登陆
        </div>
        <div class="swiper-slide-login_bullets">
          <div class="swiper-slide-login_bullets-empty"
          @click="swiper.slideTo(1, 1000, false)"></div>
          <div class="swiper-slide-login_bullets-full"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-slide-register_tel">
          <div class="swiper-slide-register_tel-left">
            <div>
              <i class="iconfont ic-shouji shouji"></i>
            </div>
            <input type="number" placeholder="请输入手机号码" v-model="registerUsername" maxlength="11">
          </div>
          <div class="swiper-slide-register_tel-captcha"
               @click="getCaptcha()"
               v-if="showCode">
            获取验证码
          </div>
          <div class="swiper-slide-register_tel-captcha"
               v-else>
            {{count}}
          </div>
        </div>
        <div class="swiper-slide-register_captcha">
          <div>
            <i class="iconfont ic-anquanrenzheng"></i>
          </div>
          <input type="password" placeholder="请输入验证码" v-model="captcha">
        </div>
        <div class="swiper-slide-register_password">
          <div>
            <i class="iconfont ic-icon2"></i>
          </div>
          <input type="password" placeholder="请输入手机密码" v-model="registerPassword">
        </div>
        <div class="swiper-slide-register_commit"
             @click="register()">
          注册
        </div>
        <div class="swiper-slide-register_bullets">
          <div class="swiper-slide-register_bullets-full"
          @click="swiper.slideTo(0, 1000, false)"></div>
          <div class="swiper-slide-register_bullets-empty"></div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="login-footer"
         @click="$router.push('/forget')">
      忘记密码?
    </div>
  </div>
</template>

<script>
  import { setToken, setAccount } from '../storage';

  export default {
    name: 'login',
    data() {
      return {
        note: {
          backgroundImage: 'url(' + require('../assets/image/blue-login.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        },
        swiperOption: {
          effect: 'cube',
          autoHeight: true,
          paginationType: 'bullets',
          pagination: '.swiper-pagination',
          paginationClickable: true
        },
        cubeEffect: {
          slideShadows: false,
          shadow: false,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        showCode: true,
        count: '',
        time: null,
        username: '17751239248',
        password: '000000',
        clientId: '1',
        registerUsername: '',
        captcha: '',
        registerPassword: ''
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      async getCaptcha() {
        let captcha = await this.$http.post('/captchas', {
          'username': this.registerUsername,
          'captchaType': 'ACCOUNT_REGISTER'
        });
        alert(captcha);
        this.setInt();
      },
      async checkCaptcha() {
        await this.$http.post('/captchas/check', {
          'username': this.registerUsername,
          'captcha': this.captcha
        });
        this.register();
      },
      setInt() {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.showCode = false;
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
        this.showCode = true;
        clearInterval(this.timer);
        this.timer = null;
      },
      async login() {
        const data = {
          'username': this.username,
          'password': this.password,
          'clientId': this.clientId
        };
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '登陆中...'
        });
        const token = await this.$http.post('/accounts/login1', data);
        setToken(token);
        const account = await this.$http.get('/accounts');
        console.log(account);
        setAccount(account);
        this.$toast.clear();
        this.$router.push(`/home`);
      },
      async register() {
        const userInfo = {
          'username': this.registerUsername,
          'password': this.registerPassword,
          'captcha': this.captcha
        };
        await this.$http.post('/accounts', userInfo);
        this.username = this.registerUsername;
        this.password = this.registerPassword;
        this.$dialog.confirm({ message: '去登陆?' }).then(() => {
          this.clearInt();
          this.swiper.slideTo(0, 1000, false);
        });
      }
    }
  };
</script>
<style scoped type="text/scss" lang="scss">
  .swiper-container {
    position: relative;
    background-color: transparent;
    width: 600px!important;;
    margin-top: -60px;
    margin-left: 60px;
  }
  .swiper-wrapper {
    transform: rotateY(-48deg)!important;
  }

  .swiper-slide {
    background-color: white;
    width: 600px!important;
    height: 600px!important;
    box-shadow: 0px 0px 32px 0px rgba(51, 51, 51, 0.33);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &-login {
      &_tel, &_password {
        display: flex;
        align-items: center;
        background-color: #EEEEEE;
        border-radius: 5px;
        padding: 20px;
        i {
          font-size: 50px;
          color: $themeColor;
        }
        input {
          width: 350px;
          height: 50px;
          font-size: 30px;
          background-color: #EEEEEE;
          padding-left: 20px;
          &::placeholder {
            text-align: left;
            color: #CCCCCC;
          }
          outline: none;
          border: none;
        }
      }
      &_commit {
        font-size: 30px;
        background-color: $themeColor;
        padding: 5px 50px;
        border-radius: 30px;
        color: white;
        font-weight: 200;
      }
      &_bullets {
        display: flex;
        &-empty {
          width: 20px;height: 20px;background-color: $themeColor;border-radius: 50%;
        }
        &-full {
          width: 20px;height: 20px;background-color: gray;border-radius: 50%;margin-left: 10px;
        }
      }
    }
    &-register {
      &_tel {
        display: flex;
        align-items: center;
        background-color: #EEEEEE;
        border-radius: 5px;
        &-captcha {
          font-size: 20px;
          background-color: $themeColor;
          color: white;
          width: 130px;
          height: 90px;
          line-height: 90px;
          text-align: center;
        }
        &-left {
          padding: 20px;
          display: flex;
          align-items: center;
          i {
            font-size: 50px;
            color: $themeColor;
          }
          input {
            width: 220px;
            height: 50px;
            font-size: 25px;
            background-color: #EEEEEE;
            padding-left: 20px;
            &::placeholder {
              text-align: left;
              color: #CCCCCC;
            }
            outline: none;
            border: none;
          }
        }
      }
      &_captcha {
        display: flex;
        align-items: center;
        background-color: #EEEEEE;
        border-radius: 5px;
        padding: 20px;
        i {
          font-size: 50px;
          color: $themeColor;
        }
        input {
          width: 350px;
          height: 50px;
          font-size: 25px;
          background-color: #EEEEEE;
          padding-left: 20px;
          &::placeholder {
            text-align: left;
            color: #CCCCCC;
          }
          outline: none;
          border: none;
        }
      }
      &_password {
        display: flex;
        align-items: center;
        background-color: #EEEEEE;
        border-radius: 5px;
        padding: 20px;
        i {
          font-size: 50px;
          color: $themeColor;
        }
        input {
          width: 350px;
          height: 50px;
          font-size: 25px;
          background-color: #EEEEEE;
          padding-left: 20px;
          &::placeholder {
            text-align: left;
            color: #CCCCCC;
          }
          outline: none;
          border: none;
        }
      }
      &_commit {
        font-size: 30px;
        background-color: $themeColor;
        padding: 5px 50px;
        border-radius: 30px;
        margin-bottom: 20px;
        color: white;
        font-weight: 200;
      }
      &_bullets {
        display: flex;
        &-empty {
          width: 20px;height: 20px;background-color: $themeColor;border-radius: 50%;margin-left: 10px;
        }
        &-full {
          width: 20px;height: 20px;background-color: gray;border-radius: 50%;
        }
      }
    }
  }

  .login {
    width: 720px;
    &-header {
      height: 425px;
      width: 720px;
      text-align: center;
      line-height: 425px;
      font-size: 50px;
      color: white;
    }
    &-footer {
      width: 100%;
      position: fixed;
      bottom: 30px;
      text-align: center;
      font-size: 30px;
    }
  }
</style>
