<template>
  <div class="login">
    <div class="greenbg loginbg">
      <span class="login_circle"></span>
      <span class="login_title">E慧药</span>
      <span class="login_circle1"></span>
    </div>
    <div class="loginfooter color666 fz16">
      <router-link to="/forget">忘记密码？</router-link>
    </div>
    <div class="swiper-container" id="swiper">
      <!--<div class="swiper-wrapper">-->
        <!--<div class="swiper-slide">-->
          <!--<div class="loginMiddle">-->
            <!--<div class="loginMiddleBox">-->
              <!--<table class="pt1 register">-->
                <!--<tr>-->
                  <!--<i class="icon iconfont ic-shouji ic-fontsize" style="color:#1AB6FD!important;"></i>-->
                  <!--<input type="text" name="" placeholder="请输入手机号码" class="fz16 ccc" v-model="username">-->
                <!--</tr>-->
                <!--<tr class="lh2rem">-->
                  <!--<i class="icon iconfont ic-mima ic-fontsize" style="color:#1AB6FD!important;"></i>-->
                  <!--<input type="text" name="" placeholder="请输入密码" class="fz16 ccc" v-model="password">-->
                <!--</tr>-->
              <!--</table>-->
              <!--<div class="textCenter">-->
                <!--<span class="loginbtn" @click="login()">登录</span>-->
              <!--</div>-->
              <!--<div class="logincircle textCenter">-->
                <!--<span v-for="(item,index) in span" :key="index" :class="{blue:index===qwere}"></span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="swiper-slide">-->
          <!--<div class="loginMiddle">-->
            <!--<div class="loginMiddleBox">-->
              <!--<table class="pt1 register">-->
                <!--<tr>-->
                  <!--<i class="icon iconfont ic-shouji ic-fontsize" style="color:#1AB6FD!important;"></i>-->
                  <!--<input type="text" name="" placeholder="请输入手机号码" class="fz16 ccc textindent8px"-->
                         <!--v-model="registerUsername" style="width:75%;">-->
                  <!--<td>-->
                    <!--<span class="logincode" @click="getCode" v-show="showCode" style="width:6.75rem;text-align:center;">获取验证码</span>-->
                    <!--<span class="logincode" v-show="!showCode">倒计时{{count}}秒</span>-->
                  <!--</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<i class="icon iconfont icon-iconfontzhizuobiaozhun10"-->
                     <!--style="font-size:2.2rem;color:#1AB6FD!important;"></i>-->
                  <!--<input type="text" placeholder="请输入验证码" class="fz16 ccc textindent8px" v-model="captcha">-->
                <!--</tr>-->
                <!--<tr style="line-height:2rem;margin-bottom:0rem;line-height:4rem;">-->
                  <!--<i class="icon iconfont ic-mima ic-fontsize" style="color:#1AB6FD!important;"></i>-->
                  <!--<input type="text" placeholder="请输入密码" class="fz16 ccc textindent8px" v-model="registerPassword">-->
                <!--</tr>-->
              <!--</table>-->
              <!--<div class="textCenter">-->
                <!--<span class="loginbtn" @click="register()">注册</span>-->
              <!--</div>-->
              <!--<div class="logincircle textCenter">-->
                <!--<span v-for="(item,index) in span" :key="index" :class="{blue:index===qwere1}"></span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <Swiper :options="swiperOption">
        <SwiperSlide>
          <div class="loginMiddle">
            <div class="loginMiddleBox">
              <table class="pt1 register">
                <tr>
                  <i class="icon iconfont ic-shouji ic-fontsize" style="color:#1AB6FD!important;"></i>
                  <input type="text" name="" placeholder="请输入手机号码" class="fz16 ccc" v-model="username">
                </tr>
                <tr class="lh2rem">
                  <i class="icon iconfont ic-mima ic-fontsize" style="color:#1AB6FD!important;"></i>
                  <input type="text" name="" placeholder="请输入密码" class="fz16 ccc" v-model="password">
                </tr>
              </table>
              <div class="textCenter">
                <span class="loginbtn" @click="login()">登录</span>
              </div>
              <div class="logincircle textCenter">
                <span v-for="(item,index) in span" :key="index" :class="{blue:index===qwere}"></span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="loginMiddle">
            <div class="loginMiddleBox">
              <table class="pt1 register">
                <tr>
                  <i class="icon iconfont ic-shouji ic-fontsize" style="color:#1AB6FD!important;"></i>
                  <input type="text" name="" placeholder="请输入手机号码" class="fz16 ccc textindent8px"
                         v-model="registerUsername" style="width:75%;">
                  <td>
                    <span class="logincode" @click="getCode" v-show="showCode" style="width:6.75rem;text-align:center;">获取验证码</span>
                    <span class="logincode" v-show="!showCode">倒计时{{count}}秒</span>
                  </td>
                </tr>
                <tr>
                  <i class="icon iconfont icon-iconfontzhizuobiaozhun10"
                     style="font-size:2.2rem;color:#1AB6FD!important;"></i>
                  <input type="text" placeholder="请输入验证码" class="fz16 ccc textindent8px" v-model="captcha">
                </tr>
                <tr style="line-height:2rem;margin-bottom:0rem;line-height:4rem;">
                  <i class="icon iconfont ic-mima ic-fontsize" style="color:#1AB6FD!important;"></i>
                  <input type="text" placeholder="请输入密码" class="fz16 ccc textindent8px" v-model="registerPassword">
                </tr>
              </table>
              <div class="textCenter">
                <span class="loginbtn" @click="register()">注册</span>
              </div>
              <div class="logincircle textCenter">
                <span v-for="(item,index) in span" :key="index" :class="{blue:index===qwere1}"></span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'login',
  components: {
    'Swiper': swiper,
    'SwiperSlide': swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: false,
        speed: 1000,
        effect: 'cube'
      },
      cubeEffect: {
        slideShadows: true,
        shadow: false,
        shadowOffset: 20,
        shadowScale: 0.64
      },
      isLogin: true,
      showCode: true, // 验证码按钮最初显示
      count: '',
      time: null,
      username: '18896781024',
      password: '123456',
      span: [
        {},
        {}
      ],
      qwere: 0,
      qwere1: 1,
      registerUsername: '',
      captcha: '',
      registerPassword: ''
    };
  },
  methods: {
    change(index) {
      this.qwere = index;
      this.isLogin = this.qwere === 0;
    },
    getCode() {
      const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.showCode = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showCode = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      this.$http.post('/accounts/captcha', {
        'username': this.registerUsername,
        'captchaType': 'REGISTER'
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          this.exception(error);
        });
    },
    login() {
      this.regMobiile(this.username);
      const account = {
        'username': this.username,
        'password': this.password
      };
      this.$store.dispatch('LOGIN', account)
        .then((res) => {
          this.$router.push({path: '/'});
        })
        .catch((error) => {
          this.exception(error);
        });
    },
    register() {
      const account = {
        'username': this.registerUsername,
        'password': this.registerPassword,
        'captcha': this.captcha
      };
      this.$store.dispatch('REGISTER', account)
        .then((res) => {
          this.isLogin = true;
          MessageBox('提示', '注册成功');
        })
        .catch((error) => {
          this.exception(error);
        });
    }
  }
};
</script>

<style scoped>
  @import "../../node_modules/swiper/dist/css/swiper.min.css";
  .swiper-slide .swiper-slide-prev {
    width: 258px !important;
  }

  td input {
    background: none;
    border-bottom: 1px solid #eeeeee;
    width: 94%;
    height: 3rem;
    display: -webkit-inline-box;
    line-height: 2rem;
  }

  #swiper {
    position: absolute;
    top: 23%;
    width: 94%;
    margin-left: 3%;
  }

  .ic-fontsize {
    margin-top: 5px;
    font-size: 2rem;
    color: #1AB6FD;
  }
</style>
