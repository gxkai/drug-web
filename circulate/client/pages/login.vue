<template>
  <div class="login container">
    <el-row class="login-row" type="flex" justify="center">
      <el-col :xs="{span: 14, offset: 5}" :sm="{span: 10, offset: 7}" :lg="{span: 6, offset: 14}">
        <el-card>
          <el-form :model="user" ref="user" @keyup.enter.native='!logging && login()'>
            <el-form-item prop="userName" :rules="[{ required: true, message: $t('login.userRequired')}]">
              <el-col :span="24">
                <el-input v-model="user.userName" autofocus :placeholder="$t('login.userPlaceholder')"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: $t('login.pwdRequired')}]">
              <el-col :span="24">
                <el-input v-model="user.password" type="password" :placeholder="$t('login.pwdPlaceholder')"></el-input>
              </el-col>
            </el-form-item>
            <!--<el-form-item prop="captcha" :rules="[{ required: true, message: $t('login.captchaRequired')}]">-->
              <!--<el-col :span="12">-->
                <!--<el-input v-model="user.captcha" :placeholder="$t('login.captchaPlaceholder')"></el-input>-->
              <!--</el-col>-->
              <!--<el-col :offset="1" :span="11" ref="captcha">-->
                <!--<div v-html="captchaSvg" @click='refreshCaptcha' class="captcha"></div>-->
              <!--</el-col>-->
            <!--</el-form-item>-->
            <el-row>
              <el-col :span="24">
                <el-button type="primary" class="login-btn" :loading="logging" @click="login">{{$t('login.login')}}</el-button>
              </el-col>
            </el-row>
            <!--<el-row>
              <el-col :span="5">
                <el-checkbox v-model="keepPwd">记住密码</el-checkbox>
              </el-col>
              <el-col :offset='14' :span="5">
                <label>忘记密码?</label>
              </el-col>
            </el-row>-->
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
  export default class Login extends Vue {
    user = {
      userName: '',
      password: ''
    }
    // authenticated = false
    rules = {}
    // captchaSvg = ''
    logging = false
    layout () {
      return 'empty'
    }

    async login () {
      console.log(this.$router)
      let params = {
        username: this.user.userName,
        password: this.user.password
      }

      await axios.post(`/api/shop/users/login`, params)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            window.localStorage['token'] = res.data
            if (localStorage.getItem('token')) {
              this.$router.push('/')
            } else {
              this.$router.push('/login')
            }
          } else {
            this.$message({
              message: '用户名或密码错误！',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="scss">
  .login {
    background: url(~/assets/img/circulation.jpg) no-repeat center center fixed;
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
    .login-row {
      height: 100%;
      flex-direction: column;
    }
  }
  .el-card {
    background-color: rgba(255, 255, 255, 0.5);
    .el-form {
      margin-top: 4%;
      margin-bottom: 4%;
      .captcha {
        background-color: rgba(255, 255, 255, 0.5);
        max-height: 36px;
        cursor: pointer;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
