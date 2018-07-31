<template>
  <div class="forget">
    <div v-if="0 === this.state" class="body1">
      <div>
        <new-header title="忘记密码">
          <router-link tag="i" to="/login" class="iconfont ic-arrow-right" slot="left"></router-link>
        </new-header>
        <input type="number" class="input1" placeholder="请输入手机号码" v-model="username">
        <div class="line1"></div>
        <div class="input2">
          <div class="left">
            <input  class="input21" placeholder="请输入验证码" v-model="captcha">
          </div>
          <div class="right">
            <button class="button1" @click="getCaptcha()">获取验证码</button>
          </div>
        </div>
      </div>
      <button class="button2" @click="checkCaptcha()">下一步</button>
    </div>

    <div v-if="1 === this.state" class="body2">
      <div class="body1">
        <new-header title="找回密码">
          <router-link  tag="i" to="#" class="iconfont ic-arrow-right" slot="left"  @click="$router.go(-1)"></router-link>
        </new-header>
        <div class="input3">
          <div class="left">
            <span class="span1">新密码</span>
          </div>
          <div class="right">
            <input class="input31" placeholder="新密码长度为6-20位字符" v-model="password">
          </div>
        </div>
        <div class="line1"></div>
        <div class="input3">
          <div class="left">
            <span class="span1">确认密码</span>
          </div>
          <div class="right">
            <input class="input31" placeholder="请再次输入密码" v-model="passwordConfirm">
          </div>
        </div>
      </div>
      <button class="button2" @click="updatePassword()">下一步</button>
    </div>
    <div v-if="2 === this.state" class="body3">
      <new-header title="修改成功">
        <router-link  tag="i" to="/login" class="iconfont ic-arrow-right" slot="left" ></router-link>
      </new-header>
      <div class="img1">
        <img src="../assets/image/success.png" class="img11">
      </div>
      <div class="font1">
        密码修改成功
      </div>
    </div>
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui';

export default {
  data() {
    return {
      username: '',
      captcha: '',
      showCode: true,
      count: 0,
      time: null,
      state: 1,
      password: '',
      passwordConfirm: ''
    };
  },
  methods: {
    getCaptcha() {
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
        'username': this.username,
        'captchaType': 'PASSWORD'
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          this.exception(error);
        });
    },
    checkCaptcha() {
      this.$http.post('/accounts/forget', {'username': this.registerUsername, 'captcha': this.captcha})
        .then((res) => {
          this.state = 1;
        })
        .catch((error) => {
          this.exception(error);
        });
    },
    updatePassword() {
      if (this.password !== this.passwordConfirm) {
        MessageBox('提示', '输入密码不同');
        return;
      }
      this.$http.put('/accounts/forget', {
        'username': this.registerUsername,
        'captcha': this.captcha,
        'password': this.password
      })
        .then((res) => {
          this.state = 2;
        })
        .catch((error) => {
          this.exception(error);
        });
    }
  }
};
</script>
<style scoped>

  .body1 {
    width: 100%;
  }

  .body2 {
    width: 100%;
  }
  .input1 {
    width: 100%;
    height: 111px;
    background-color: rgba(255, 255, 255, 1);
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    outline: none;
    border: none;
  }

  .line1 {
    width:681px;
    height:1px;
    background:rgba(229,229,229,1);
    opacity: 0.58;
    margin: auto;
  }

  .input2 {
    width: 100%;
    height: 111px;
    display: flex;
  }

  .input2 .left {
    width: 520px;
    height: 111px;
    background-color: rgba(255, 255, 255, 1);
  }

  .input2 .left .input21 {
    width: 520px;
    height: 111px;
    background-color: rgba(255, 255, 255, 1);
    outline: none;
    border: none;
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .input2 .right {
    width: 200px;
    height: 111px;
    background-color: rgba(255, 255, 255, 1);
    float: right;
  }

  .input2 .right .button1 {
    height:45px;
    background:rgba(255, 255, 255, 1);
    border-radius:5px;
    margin-top: 17px;
    font-size:20px;
    font-family:HiraginoSansGB-W3;
    color:rgba(86,208,251,1);
    border-color:rgba(86,208,251,1) ;
  }

  .button2 {
    margin-top: 64px;
    width:720px;
    height:80px;
    background:rgba(19,193,254,1);
    opacity:0.7;
    border-radius:5px;
    font-size:34px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    outline: none;
    border: 0;
  }

  .input3 {
    width: 100%;
    display: inline-flex;
    height: 111px;
  }

  .input3 .left {
    width: 220px;
    height: 111px;
    background-color:rgba(255,255,255,1);
    display: flex;
    align-items:center;
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
  }

  .input3 .right {
    width: 500px;
    height: 111px;
    background-color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
  }

  .input3 .left .span1 {
    margin-left: 16px;
  }

  .input3 .right .input31 {
    width: 580px;
    height: 111px;
    background-color:rgba(255,255,255,1);
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    border: 0;
    outline: none;
  }

  .img1 {
    display: flex;
    justify-content: center;
    margin-top: 150px;
  }

  .img1 .img11 {
    width: 151px;
    height: 151px;
  }

  .font1 {
    font-size:36px;
    font-family:MicrosoftYaHei;
    color:rgba(19,193,254,1);
    text-align: center;
    margin-top: 24px;
  }
</style>
