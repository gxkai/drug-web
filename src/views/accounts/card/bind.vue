<template>
  <div class="bind-container">
    <new-header title="医保卡绑定">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>

    <div class="content-lists">
      <div class="content-list">
        <i class="iconfont ic-xingming"></i>
        <input type="text" v-model="account.name" placeholder="请先维护账户信息" />
      </div>

      <div class="content-list">
        <i class="iconfont ic-Id"></i>
        <input type="number" v-model="account.identityNumber" placeholder="请先维护账户信息" />
      </div>

      <div class="content-list">
        <i class="iconfont ic-shouji"></i>
        <input type="number" v-model="account.username" placeholder="请输入手机号码" disabled/>
      </div>

      <div class="content-list">
        <i class="iconfont ic-Id"></i>
        <input type="number" v-model="account.medicaidNumber" placeholder="请输入医保卡编号"/>
      </div>
    </div>

    <div class="check-btn">
      <button class="bind-btn" @click="bind()">确认绑定</button>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        account: this.$store.getters.account,
        fromPath: ''
      };
    },
    created() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fromPath = from.path;
      });
    },
    methods: {
      bind() {
        this.$http.put('/accounts', this.account)
          .then(res => {
            this.$store.commit('SET_ACCOUNT', this.account);
            if (this.fromPath.includes('/orders/create')) {
              this.$router.go(-1);
            } else {
              this.$router.push({
                path: '/accounts/card/bind/success'
              });
            }
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .mint-header {
    background: #1AB6FD;
    color: white
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .bind-container {
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }

  .content-list {
    width: 720px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    margin-top: 15px;
  }

  .content-list .iconfont {
    font-size: 50px;
    color: #13c1fe;
    margin: 20px 180px 20px 20px;
  }

  .content-lists input {
    background: transparent;
    outline: none;
    border: 0;
    color: rgba(204, 204, 204, 1);
    width: 400px;
    font-size: 25px;
  }

  .content-lists input::placeholder {
    text-align: left;
  }

  .bind-btn {
    width: 421px;
    height: 78px;
    background: #13C1FE;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.33);
    border: 0;
    color: rgba(255, 255, 255, 1);
    border-radius: 50px;
    font-size: 30;
  }

  .check-btn {
    width: 720px;
    margin-top: 48px;
    text-align: center;
  }

</style>
