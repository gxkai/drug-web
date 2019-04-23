<template>
  <div class="register">

    <el-row class="register-row" type="flex" justify="center">
      <el-col :xs="{span: 14, offset: 5}" :sm="{span: 10, offset: 7}" :lg="{span: 6, offset: 9}">
        <el-card class="">
          <h3 class="title">立即注册</h3>

          <el-form :model="registerInfo" ref="registerInfo" @keyup.enter.native=''>
            <el-form-item prop="phoneNumber">
              <el-col :span="6">
                <el-input readonly v-model="registerInfo.place"></el-input>
              </el-col>
              <el-col :offset="1" :span="17">
                <el-input v-model="registerInfo.phone" :placeholder="$t('register.phonePlaceholder')"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="captcha" :rules="[{ required: true, message: $t('register.captchaRequired')}]">
              <el-col :span="16">
                <el-input v-model="registerInfo.captcha" :placeholder="$t('register.captchaPlaceholder')"></el-input>
              </el-col>
              <el-col :offset="1" :span="7">
                <span v-show="sendAuthCode" class="captcha" @click="getAuthCode">获取验证码</span>
                <span v-show="!sendAuthCode" class="captcha"> <span class="blue">{{authTime}} </span> 秒</span>
              </el-col>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: $t('register.pwdRequired')}]">
              <el-col :span="24">
                <el-input v-model="registerInfo.password" type="password" :placeholder="$t('register.pwdPlaceholder')"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="passwordAgain" :rules="[{ required: true, message: $t('register.pwdAgainRequired')}]">
              <el-col :span="24">
                <el-input v-model="registerInfo.passwordAgain" type="password" :placeholder="$t('register.pwdAgainPlaceholder')"></el-input>
              </el-col>
            </el-form-item>

            <el-row>
              <el-col :span="24">
                <el-button type="primary" class="register-btn" :loading="logging" @click="register">{{$t('register.register')}}</el-button>
              </el-col>
            </el-row>

            <el-row class="check-row">
              <el-checkbox v-model="registerInfo.checked"></el-checkbox>
              <div>阅读并同意<a @click='getServise'>《用户服务协议》</a></div>
            </el-row>

          </el-form>


        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  // import debounce from '@/utils/debounce'
  import Component from 'class-component'
  import axios from 'axios'
  @Component
  export default class Register extends Vue {
    registerInfo = {
      place: '86',
      phone: '',
      captcha: '',
      password: '',
      passwordAgain: '',
      checked: true
    }
    sendAuthCode = true
    authTime = 0

    logging = false
    phoneCaptcha = ''

    layout () {
      return 'empty'
    }

    async register () {
      if (this.registerInfo.captcha !== this.phoneCaptcha) {
        this.$message({
          message: '验证码错误！',
          type: 'warning'
        })
      }
      if (this.registerInfo.password !== this.registerInfo.passwordAgain) {
        this.$message({
          message: '密码输入不一致！',
          type: 'warning'
        })
      }
      let userRegister = {
        roleId: 'ROLE_CIRCULATE_SHOP',
        username: this.registerInfo.phone,
        captcha: this.registerInfo.captcha,
        password: this.registerInfo.password,
        reptPassword: this.registerInfo.passwordAgain
      }
      await axios.post(`/api/shop/users/register`, userRegister)
        .then(res => {
          console.log(res)
        })
      this.$router.push('/login')
    }

    async getAuthCode () {
      // 手机号码验证
      if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.registerInfo.phone)) {
        this.$message({
          message: '手机号码格式不匹配！',
          type: 'warning'
        })
      }
      let getCaptcha = {
        username: this.registerInfo.phone,
        captchaType: 'USER_REGISTER'
      }
      await axios.post(`/api/shop/captchas`, getCaptcha).then(res => {
        console.log(res.data)
        this.phoneCaptcha = res.data
        this.sendAuthCode = false
        this.authTime = 60 // 倒计时
        let authTimer = setInterval(() => {
          this.authTime--
          if (this.authTime <= 1) {
            this.sendAuthCode = true
            clearInterval(authTimer)
          }
        }, 1000)
      }).catch(error => {
        if (error.response.status === 400) {
          this.$message({
            message: error.response.data.message,
            type: 'warning'
          })
          this.$router.push('/register')
        }
      })
    }

    // 用户服务协议
    getServise () {
      this.$router.push('/userAgreement')
    }
  }
</script>

<style scoped lang="scss">
  /deep/.register{
    background: url(~/assets/img/login-bg.jpeg) no-repeat center center fixed;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    img.logo {
      position: fixed;
      top: 12px;
      left: 20px;
    }
    .register-row {
      height: 100%;
      flex-direction: column;
      .el-card {
        background-color: rgba(255, 255, 255, 0.5);
        .title{
          color: #20A0FF;
          text-align: center;
          font-size: 18px;
        }

        .el-form {
          margin-top: 4%;
          margin-bottom: 4%;
          .captcha {
            background-color: rgba(255, 255, 255, 0.5);
            max-height: 36px;
            cursor: pointer;
            display: block;
            text-align: center;
            .blue{
              color: #409EFF;
            }
          }
          .register-btn {
            width: 100%;
          }
          .check-row{
            display: flex;
            align-items: center;
            margin-top: 15px;
            font-size: 14px;
            .el-checkbox{
              margin-right: 10px;
            }
            a{
              cursor: pointer;
            }
          }
        }

      }
    }

  }

</style>
