<template>
  <div class="register">
    <img class="logo" src="~/assets/img/logo.svg">
    <el-row class="register-row" type="flex" justify="center">
      <el-col :xs="{span: 14, offset: 5}" :sm="{span: 10, offset: 7}" :lg="{span: 6, offset: 9}">
        <el-card class="">
          <h3 class="title">欢迎注册</h3>

          <el-form :model="registerInfo" ref="registerInfo" @keyup.enter.native=''>
            <el-form-item prop="phoneNumber">
                <el-col :span="8">
                  <el-select v-model="registerInfo.place" placeholder="请选择">
                    <el-option
                      v-for="item in placeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :offset="1" :span="15">
                  <el-input v-model="registerInfo.phone" :placeholder="$t('register.phonePlaceholder')"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item prop="captcha" :rules="[{ required: true, message: $t('register.captchaRequired')}]">
              <el-col :span="12">
                <el-input v-model="registerInfo.captcha" :placeholder="$t('register.captchaPlaceholder')"></el-input>
              </el-col>
              <el-col :offset="1" :span="11">
                <div v-html="captchaSvg" @click='refreshCaptcha' class="captcha"></div>
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
  import debounce from '@/utils/debounce'
  import Component from 'class-component'

  @Component
  export default class Register extends Vue {
    registerInfo = {
      place: '',
      phone: '',
      captcha: '',
      password: '',
      passwordAgain: '',
      checked: true
    }
    placeOptions = [
      {
        value: '中国大陆',
        label: '中国大陆'
      },
      {
        value: '中国香港',
        label: '中国香港'
      },
      {
        value: '中国澳门',
        label: '中国澳门'
      },
      {
        value: '中国台湾',
        label: '中国台湾'
      }
    ]
  
    captchaSvg = ''
    logging = false

    layout () {
      return 'empty'
    }

    mounted () {
      this.getCaptcha()
    }

    // register
    register () {
  
    }

    redirect (goTo) {
      this.$router.push(goTo)
    }
    getCaptcha () {
      const params = {}
      if (this.$refs.captcha) {
        params.width = this.$refs.captcha.$el.clientWidth || 150
        params.height = this.$refs.captcha.$el.clientHeight || 36
      }
      this.captchaSvg = this.$axios.get('/hpi/auth/captcha', { params })
        .then(response => {
          const authenticated = this.$store.getters.authenticated
          if (authenticated) {
            this.redirect('/register')
          }
          const data = response.data
          return data
        })
        .then(captcha => {
          this.captchaSvg = captcha
        })
        .catch(error => {
          const errorMessage = error.toString()
          this.captchaSvg = `<small style="line-height:1em;display:block;">${errorMessage}</small>`
        })
    }

    refreshCaptcha = debounce(this.getCaptcha, 500)

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
