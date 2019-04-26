<template>
  <div class="login">
    <div class="login--head">
      <div class="login--head__tab">
        <el-row class="login-row" type="flex" justify="center">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户登录" name="loginTab">
              <!--用户登录-->
              <div class="login-container tab-container">
                <el-form :model="user" ref="user" @keyup.enter.native='!logging && login()'>
                  <el-form-item prop="userName" :rules="[{ required: true, message: $t('login.userRequired')}]">
                    <el-col :span="24">
                      <el-input v-model="user.userName" autofocus :placeholder="$t('login.userPlaceholder')">
                        <i slot="prefix" class="icon-zhanghao"></i>
                      </el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item prop="password" :rules="[{ required: true, message: $t('login.pwdRequired')}]">
                    <el-col :span="24">
                      <el-input v-model="user.password" type="password" :placeholder="$t('login.pwdPlaceholder')">
                        <i slot="prefix" class="icon-denglumima"></i>
                      </el-input>
                    </el-col>
                  </el-form-item>
                  <el-row>
                    <el-col :span="24">
                      <el-button type="primary" class="login-btn" :loading="logging" @click="login">{{$t('login.login')}}</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>

            </el-tab-pane>
            <el-tab-pane label="用户注册" name="registerTab">
              <!--用户注册-->
              <div class="register-container tab-container">

                <el-form :model="registerInfo" ref="registerInfo" @keyup.enter.native=''>
                  <el-form-item prop="phoneNumber">
                    <el-col :span="24">
                      <el-input v-model="registerInfo.phone" :placeholder="$t('register.phonePlaceholder')">
                        <i slot="prefix" class="icon-zhanghao"></i>
                      </el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item prop="captcha" :rules="[{ required: true, message: $t('register.captchaRequired')}]">
                    <el-col :span="16">
                      <el-input v-model="registerInfo.captcha" :placeholder="$t('register.captchaPlaceholder')">
                        <i slot="prefix" class="icon-anquan"></i>
                      </el-input>
                    </el-col>
                    <el-col :offset="1" :span="7">
                      <span v-show="sendAuthCode" class="captcha" @click="getAuthCode">获取验证码</span>
                      <span v-show="!sendAuthCode" class="captcha"> <span class="blue">{{authTime}} </span> 秒</span>
                    </el-col>
                  </el-form-item>
                  <el-form-item prop="password" :rules="[{ required: true, message: $t('register.pwdRequired')}]">
                    <el-col :span="24">
                      <el-input v-model="registerInfo.password" type="password" :placeholder="$t('register.pwdPlaceholder')">
                        <i slot="prefix" class="icon-denglumima"></i>
                      </el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item prop="passwordAgain" :rules="[{ required: true, message: $t('register.pwdAgainRequired')}]">
                    <el-col :span="24">
                      <el-input v-model="registerInfo.passwordAgain" type="password" :placeholder="$t('register.pwdAgainPlaceholder')">
                        <i slot="prefix" class="icon-denglumima"></i>
                      </el-input>
                    </el-col>
                  </el-form-item>

                  <el-row>
                    <el-col :span="24">
                      <el-button type="primary" class="register-btn" :loading="logging" @click="register">{{$t('register.register')}}</el-button>
                    </el-col>
                  </el-row>
                </el-form>

              </div>

            </el-tab-pane>
          </el-tabs>
        </el-row>
      </div>
    </div>

    <div class="login--foot">
      <p>版权所有：江苏网进科技股份有限公司 © 2018</p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import axios from 'axios'
  @Component
  export default class Login extends Vue {
    user = {
      userName: '',
      password: ''
    }
    loginToken = ''
    rules = {}
    logging = false

    activeName = 'loginTab'

    handleClick (tab, event) {
      console.log(tab, event)
    }

    layout () {
      return 'empty'
    }

    beforeMount () {
    }

    async login () {
      const goBackTo = this.$route.query.page || '/'
      this.logging = true

      const valid = this.$refs.user.validate()
      try {
        if (valid) {
          let params = {
            username: this.user.userName,
            password: this.user.password
          }
          await axios.post(`/api/shop/users/login`, params).then(res => {
            console.log(res)
          })
          await this.$store.dispatch('login', this.user)
          // this.authenticated = await this.$store.getters.authenticated
        }
      } catch (e) {
        this.$message.warning(e.message)
      } finally {
        // if (this.authenticated) {
        //   this.redirect(goBackTo)
        // }
      }

      this.logging = false
    }

    redirect (goTo) {
      this.$router.push(goTo)
    }

    // 注册
    registerInfo = {
      phone: '',
      captcha: '',
      password: '',
      passwordAgain: ''
    }
    sendAuthCode = true
    authTime = 0

    logging = false
    phoneCaptcha = ''

    async register () {
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
      this.$message({
        message: '注册成功！',
        type: 'success'
      })
      this.$router.push('/login')
    }

    async getAuthCode () {
      // 手机号码验证
      if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.registerInfo.phone) || this.registerInfo.phone === '') {
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
          this.$router.push('/login')
        }
      })
    }
    //
  }
</script>

<style scoped lang="scss">
  /deep/.login{
    width: 100%;
    height: 100%;
    position: relative;
    &--head{
      height: 780px;
      background: url(~/assets/img/circulation.jpg) no-repeat center center;
      background-size: cover;

      &__tab{
        background: rgba(67, 174, 239, 1);
        box-shadow: 0px 3px 6px 0px rgba(48, 134, 216, 0.79);
        border-radius: 5px;
        border: none;
        position: absolute;
        top: 190px;
        right: 16%;
        width: 25%;
        height: 450px;
        z-index: 99;
        box-sizing: border-box;
        padding: 20px;
        .login-row{
          background: #fff;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          .el-tabs{
            width: 100%;
            .el-tabs__nav-wrap::after{
              background-color: #fff;
            }
            .el-tabs__active-bar{
              background-color: #fff;
            }
            .el-tabs__item{
              width: 50%;
              text-align: center;
              font-size: 16px;
              height: 60px;
              line-height: 60px;
              padding: 0;
              &.is-active{
                color: #0896d8;
              }
            }
            #tab-loginTab{
              position: relative;
              &::after{
                content: '|';
                position: absolute;
                right: 0;
                top: 0;
                color:#0896d8;
              }
            }
            .el-tabs__nav{
              float: none;
              width: 100%;
            }
          }
          
          .tab-container{
            margin:0 20px;
            padding-bottom: 30px;
            .el-input--prefix{
              .el-input__inner{
                padding-left: 50px;
              }
              .el-input__prefix{
                left: 15px;
                i{
                  font-size: 20px;
                  line-height: 40px;
                  color: #555;
                }
              }
            }

            .el-form-item{
              margin-bottom: 25px;
            }

            .login-btn,.register-btn{
              width: 100%;
              height: 50px;
              border-radius: 3px;
              text-align: center;
              color: #fff;
              background: rgba(8, 150, 216, 1);
              box-shadow: 1px 5px 6px rgba(2, 102, 162, 1);
            }

          }

          .login-container{

          }

          .register-container{
            .blue{
              color: #409EFF;
            }
          }
          
        }

      }

    }
    &--foot{
      font-size: 14px;
      line-height: 3;
      text-align: center;
    }
  }

</style>
