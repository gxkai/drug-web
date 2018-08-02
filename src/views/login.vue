<template>
  <div class="top">
    <div class="mid1">
      <div class="font1">
        药品网上服务平台
      </div>
    </div>
    <swiper class="mid2" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="slide1">
        <div class="input1">
          <div class="left">
            <i class="icon-font ic-shouji shouji"></i>
          </div>
          <input type="number" class="right" placeholder="请输入手机号码" v-model="username">
        </div>
        <div class="input2">
          <div class="left">
            <i class="icon-font ic-icon2 icon2"></i>
          </div>
          <div class="right">
            <input class="input21" type="password" placeholder="请输入密码" v-model="password">
          </div>
        </div>
        <button class="button1" @click="login()">
          登录
        </button>
      </swiper-slide>
      <swiper-slide class="slide2">
        <div class="input1">
          <div class="left">
            <i class="icon-font ic-shouji shouji"></i>
          </div>
          <div class="right">
            <input type="number" class="input11" placeholder="请输入手机号码" v-model="registerUsername">
            <button class="button1" @click="getCaptcha()" v-show="showCode">获取验证码</button>
            <button class="button1" v-show="!showCode">{{count}}</button>
          </div>
        </div>
        <div class="input2">
          <div class="left">
            <i class="icon-font ic-anquanrenzheng anquanrenzheng"></i>
          </div>
          <div class="right">
            <input class="input21"  placeholder="请输入验证码" v-model="captcha">
          </div>
        </div>
        <div class="input3">
          <div class="left">
            <i class="icon-font ic-xinmima xinmima"></i>
          </div>
          <div class="right">
            <input class="input31" placeholder="请输入密码" type="password" v-model="registerPassword">
          </div>
        </div>
        <button class="button2" @click="register()">
          注册
        </button>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <router-link tag="div" class="foot1" to="/forget">忘记密码？</router-link>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'login',
    data() {
      return {
        swiperOption: {
          autoplay: false,
          speed: 1000,
          effect: 'cube',
          pagination: '.swiper-pagination',
          paginationType: 'bullets',
          paginationClickable: true,
          notNextTick: true
        },
        cubeEffect: {
          slideShadows: true,
          shadow: false,
          shadowOffset: 20,
          shadowScale: 0.64
        },
        showCode: true,
        count: '',
        time: null,
        username: '18896781024',
        password: '123456',
        clientId: '1',
        registerUsername: '18896781024',
        captcha: '',
        registerPassword: '123456'
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
      getCaptcha() {
        this.$http.post('/captchas', {
          'username': this.registerUsername,
          'captchaType': 'ACCOUNT_REGISTER'
        })
          .then((res) => {
            console.log(res.data);
            this.setInt();
          })
          .catch((error) => {
            this.exception(error);
          });
      },
      checkCaptcha() {
        this.$http.post('/captchas/check', {
          'username': this.registerUsername,
          'captcha': this.captcha
        }).then(res => {
          this.register();
        }).catch(error => {
          this.exception(error);
        });
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
      login() {
        const userInfo = {
          'username': this.username,
          'password': this.password,
          'clientId': this.clientId
        };
        this.$store.dispatch('LOGIN', userInfo)
          .then((res) => {
            this.account = res;
            this.$router.push({path: '/accounts'});
          })
          .catch((error) => {
            this.exception(error);
          });
      },
      register() {
        const userInfo = {
          'username': this.registerUsername,
          'password': this.registerPassword,
          'captcha': this.captcha
        };
        this.$store.dispatch('REGISTER', userInfo)
          .then((res) => {
            this.username = this.registerUsername;
            this.password = this.registerPassword;
            MessageBox({
              title: '注册成功',
              message: '去登录?',
              showCancelButton: true
            }).then(action => {
              this.clearInt();
              this.swiper.slideTo(0, 1000, false);
            });
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .top {
    width: 100%;
  }

  .mid1 {
    width: 100%;
    height: 435px;
    background: rgba(26, 182, 253, 1);
  }

  .mid1 .font1 {
    font-size: 48px;
    font-family: MicrosoftYaHei;
    color: rgba(255, 255, 255, 1);
    padding-top: 212px;
    padding-left: 163px;
  }

  .mid2 {
    width: 660px;
    height: 500px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 32px rgba(51, 51, 51, 0.33);
    position: absolute;
    top: 380px;
    left: 30px;
  }

  /*slide1*/
  .slide1 .input1, .input2 {
    width: 489px;
    height: 70px;
    background: rgba(238, 238, 238, 1);
    position: absolute;
    border-radius: 5px;
    left: 86px;
  }

  .slide1 .input1 {
    top: 87px;
  }

  .slide1 .input2 {
    top: 195px;
  }

  .slide1 .input1 .left, .slide1 .input2 .left {
    width: 65px;
    height: 70px;
    float: left;
    background: rgba(238, 238, 238, 1);
  }

  .slide1 .input1 .right, .slide1 .input2 .right {
    width: 420px;
    height: 70px;
    border: 0;
    outline: none;
    float: right;
    background: rgba(238, 238, 238, 1);
    font-size: 24px;
    font-family: MicrosoftYaHei;
  }

  .slide1 .input2 .right .input21 {
    width: 420px;
    height: 70px;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background: rgba(238, 238, 238, 1);
    font-size: 24px;
    font-family: MicrosoftYaHei;
  }

  .slide1 .button1 {
    width: 198px;
    height: 59px;
    background: rgba(26, 182, 253, 1);
    position: absolute;
    left: 231px;
    top: 331px;
    border-radius: 30px;
    font-size: 32px;
    font-family: MicrosoftYaHei;
    color: rgba(255, 255, 255, 1);
    outline: none;
    border-width: 0;
  }

  .slide1 .shouji, .slide1 .ic-icon2 {
    color: #1AB5FB;
  }

  .slide1 .shouji:before, .slide1 .icon2:before {
    font-size: 50px;
  }

  /*slide2*/
  .slide2 .input1 {
    width: 489px;
    height: 70px;
    background: rgba(238, 238, 238, 1);
    border-radius: 5px;
    position: absolute;
    left: 86px;
    top: 87px;
  }

  .slide2 .input1 .left, .slide2 .input2 .left, .slide2 .input3 .left {
    width: 65px;
    height: 70px;
    float: left;
    background: rgba(238, 238, 238, 1);
  }

  .slide2 .shouji, .slide2 .anquanrenzheng, .slide2 .xinmima {
    color: #1AB5FB;
  }

  .slide2 .shouji:before, .slide2 .anquanrenzheng:before, .slide2 .xinmima:before {
    font-size: 50px;
  }

  .slide2 .input1 .right, .slide2 .input2 .right {
    width: 420px;
    height: 70px;
    border: 0;
    outline: none;
    float: right;
    background: rgba(238, 238, 238, 1);
    font-size: 24px;
    font-family: MicrosoftYaHei;
  }

  .slide2 .input1 .right .input11 {
    width: 260px;
    height: 70px;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background: rgba(238, 238, 238, 1);
    font-size: 24px;
    font-family: MicrosoftYaHei;
  }

  .slide2 .button1 {
    width: 155px;
    height: 70px;
    background: rgba(26, 182, 253, 1);
    border-radius: 5px;
    float: right;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    text-align: center;
    font-size: 26px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 254, 254, 1);
  }

  .slide2 .input2 {
    width: 489px;
    height: 70px;
    background: rgba(238, 238, 238, 1);
    border-radius: 5px;
    position: absolute;
    left: 86.1px;
    top: 170px;
  }

  .slide2 .input2 .right .input21 {
    width: 420px;
    height: 70px;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background: rgba(238, 238, 238, 1);
    font-size: 24px;
    font-family: MicrosoftYaHei;
  }

  .slide2 .input3 {
    width: 489px;
    height: 70px;
    background: rgba(238, 238, 238, 1);
    border-radius: 5px;
    position: absolute;
    left: 86.1px;
    top: 253px;
  }

  .slide2 .input3 .right .input31 {
    width: 420px;
    height: 70px;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background: rgba(238, 238, 238, 1);
    font-size: 24px;
    font-family: MicrosoftYaHei;
  }

  .slide2 .button2 {
    width: 198px;
    height: 59px;
    background: rgba(26, 182, 253, 1);
    border-radius: 30px;
    position: absolute;
    left: 231px;
    top: 359px;
    font-size: 32px;
    font-family: MicrosoftYaHei;
    color: rgba(255, 255, 255, 1);
    border: 0;
    outline: none;
  }

  .foot1 {
    text-align: center;
    width: 100%;
    font-size: 28px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    position: absolute;
    top: 1137px;
  }
</style>
