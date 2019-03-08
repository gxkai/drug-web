<template>
  <div class="wrapper">
    <div class="header">
      药品网上服务平台辅助APP
    </div>
    <van-radio-group v-model="radio" class="radio-group">
      <van-radio name="1">药房登陆</van-radio>
      <van-radio name="2">药师、客服登陆</van-radio>
    </van-radio-group>
    <van-cell-group class="cell-group">
      <van-field
        v-model="model.username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="model.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button size="large" class="submit" @click.native="submit">登陆</van-button>
  </div>
</template>

<script>
import {setAccount, setToken, getUsername, setUsername} from '../storage';
export default {
  name: 'login',
  data() {
    return {
      radio: '1',
      model: {
        username: '',
        password: ''
      }
    };
  },
  computed: {},
  beforeRouteEnter(to, from , next) {
    next(vm => {
      vm.model.username = getUsername();
    })
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async submit() {
      switch (this.radio) {
        case '1':
          let token1 = await this.$shop.post('/api/shop/users/login', this.model);
          setToken(token1);
          setUsername(this.model.username);
          this.$router.push('/shop');
          break;
        case '2':
          let token2 = await this.$supervise.post('/api/supervise/login', this.model);
          setToken(token2);
          setUsername(this.model.username);
          let admin = await this.$supervise.get('/api/supervise/admins');
          setAccount(admin);
          this.$router.push('/chats');
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped type="text/scss" lang="scss">
  /deep/ .van-cell {
    line-height: 1.375rem !important;
  }

  /deep/ .van-field .van-cell__title {
    max-width: 2.40625rem !important;
  }

  .wrapper {
    .header {
      background-image: url("../assets/image/login/login.png");
      height: 425px;
      width: 640px;
      text-align: center;
      line-height: 425px;
      font-size: 40px;
      color: white;
    }
    .radio-group {
      display: flex;
      justify-content: space-evenly;
      margin: 40px 20px;
    }
    .cell-group {
      margin: 10px 20px;
    }
    .submit {
      margin: 10px 0;
      background-color: #d71a18;
      color: white;
      font-weight: 100 !important;
      width: 80%;
      margin-left: 10%;
      margin-top: 10%;
      border-radius: 10px;
      height: 70px;
      line-height: 70px;
    }
  }
  /deep/ .van-icon-checked{
    color: #d71a18!important;
  }
  /deep/ .van-radio .van-icon-checked {
    color: #d71a18!important;
  }
</style>
