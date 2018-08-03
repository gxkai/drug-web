<template>
  <div class="top position-relative">
    <div class="mid1">
      <div class="font1">
        药品网上服务平台
      </div>
    </div>

    <swiper :options="swiperOption">
      <swiper-slide class="login">
        <div class="tel">
          <i class="iconfont ic-shouji shouji"></i>
          <input type="number" placeholder="请输入手机号码" v-model="username" class="telephone"/>
        </div>
        <div class="password">
          <i class="iconfont ic-icon2 icon2"></i>
          <input type="password" placeholder="请输入密码" v-model="password" class="psd">
        </div>
        <div  @click="login()" class="login-btn">
          登录
        </div>
      </swiper-slide>
      <swiper-slide class="login">
        <div class="tel">
          <i class="iconfont ic-shouji shouji"></i>
          <input type="number" placeholder="请输入手机号码" v-model="registerUsername" class="telephone"/>
          <button class="button1" @click="getCaptcha()" v-show="showCode">获取验证码</button>
          <button class="button1" v-show="!showCode">{{count}}</button>
        </div>
        <div class="password mt-13">
          <i class="iconfont ic-anquanrenzheng icon2"></i>
          <input type="password" placeholder="请输入验证码" v-model="captcha" class="psd">
        </div>
        <div class="password mt-13">
          <i class="iconfont ic-xinmima icon2"></i>
          <input type="password" placeholder="请输入密码" v-model="registerPassword" class="psd">
        </div>
        <div  @click="register()" class="login-btn">
          注册
        </div>
      </swiper-slide>
    </swiper>


    <swiper class="mid2" :options="swiperOption" style="display: none">
      <swiper-slide class="slide1">
        <!--<div class="input1">
          <div class="left">
            <i class="iconfont ic-shouji shouji"></i>
          </div>
          <input type="number" class="right" placeholder="请输入手机号码" v-model="username">
        </div>
        <div class="input2">
          <div class="left">
            <i class="iconfont ic-icon2 icon2"></i>
          </div>
          <div class="right">
            <input class="input21" type="password" placeholder="请输入密码" v-model="password">
          </div>
        </div>
        <button class="button1" @click="login()">
          登录
        </button>-->
      </swiper-slide>
      <swiper-slide class="slide2">4444
        <!--<div class="input1">
          <div class="left">
            <i class="iconfont ic-shouji shouji"></i>
          </div>
          <div class="right">
            <input type="number" class="input11" placeholder="请输入手机号码" v-model="registerUsername">
            <button class="button1" @click="getCaptcha()" v-show="showCode">获取验证码</button>
            <button class="button1" v-show="!showCode">{{count}}</button>
          </div>
        </div>
        <div class="input2">
          <div class="left">
            <i class="iconfont ic-anquanrenzheng anquanrenzheng"></i>
          </div>
          <div class="right">
            <input class="input21"  placeholder="请输入验证码" v-model="captcha">
          </div>
        </div>
        <div class="input3">
          <div class="left">
            <i class="iconfont ic-xinmima xinmima"></i>
          </div>
          <div class="right">
            <input class="input31" placeholder="请输入密码" type="password" v-model="registerPassword">
          </div>
        </div>
        <button class="button2" @click="register()">
          注册
        </button>-->
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
          effect: 'cube'
        },
        cubeEffect: {
          slideShadows: true,
          shadow: false,
          shadowOffset: 0,
          shadowScale: 0
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



  /*slide1*/

  .foot1 {
    text-align: center;
    width: 100%;
    font-size: 28px;
    color: rgba(102, 102, 102, 1);
    position: absolute;
    top: 1137px;
  }
 .login{
   width:660px;
   height:500px!important;
   background:rgba(255,255,255,1);
   box-shadow:0px 0px 32px rgba(51,51,51,0.33);
 }
  .tel,.password{
    width:489px;
    height:69px;
    background:rgba(238,238,238,1);
    border-radius:5px;
    margin-left: 110px;
    line-height: 69px;
  }
  .tel{
    margin-top: 87px;
  }
  .password{
    margin-top: 38px;
  }
  .ic-shouji,.ic-icon2,.ic-anquanrenzheng,.ic-xinmima{
    margin-left: 16px;
    margin-top: 18px;
    font-size: 30px;
  }
  .telephone{
    display: inline-block;
    width: 304px;
    margin-left: 27px;
    border:none;
    background:rgba(238,238,238,1);
    height: 69px;
    line-height: 69px;
  }

  .psd{
    width: 304px;
    margin-left: 27px;
    border:none;
    background:rgba(238,238,238,1);
    height: 69px;
    line-height: 69px;
  }
  .login-btn{
    width:198px;
    height:59px;
    background:rgba(26,182,253,1);
    border-radius:30px;
    font-size:32px;
    text-align: center;
    line-height: 59px;
    margin-top: 66px;
    margin-left: 231px;
    color: white;
  }
  .mt-13{
    margin-top: 13px!important;
  }
  .button1{
    position: absolute;
    width:155px;
    height:70px;
    background:rgba(26,182,253,1);
    border-radius:5px;
    color: white;
    text-align: center;
    line-height: 70px;
    border: none;
    font-size:26px;
    left: 445px;
  }
  input{
    font-size:24px;
  }
  .swiper-wrapper{
    height: 500px!important;
  }
  .full{
    width: 720px;
  }
</style>
