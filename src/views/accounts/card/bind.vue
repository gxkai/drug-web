<!-- FIXME 字体大小 -->
<template>
  <div class="bind-container">
    <mt-header title="医保卡绑定">
      <router-link to="/accounts" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="content-lists">
      <div class="content-list">
        <i class="icon-font ic-xingming"></i>
        <input type="text" v-model="account.name" placeholder="请先维护账户信息" disabled/>
      </div>

      <div class="content-list">
        <i class="icon-font ic-Id"></i>
        <input type="number" v-model="account.identityNumber" placeholder="请先维护账户信息" disabled/>
      </div>

      <div class="content-list">
        <i class="icon-font ic-shouji" ></i>
        <input type="number" v-model="account.username" placeholder="请输入手机号码" disabled/>
      </div>

      <div class="content-list">
        <i class="icon-font ic-Id"></i>
        <input type="number" v-model="account.medicalNumber" placeholder="请输入医保卡编号"/>
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
      account: {}
    };
  },
  created() {
    this.account = this.$store.getters.account;
  },
  methods: {
    bind: function () {
      if (this.account.medicalNumber === '' || this.account.medicalNumber == null) {
        this.MessageBox('提示', '医保不能为空');
        return;
      }
      this.$http.put(this.URL_PATH + '/accounts', this.account, {
        headers: {
          'Authorization': this.$store.getters.token
        }
      })
        .then((res) => {
          this.$store.commit('SET_ACCOUNT', this.account);
          this.$router.push({
            name: '/accounts/bind/success',
            params: {
              bind: 1
            }
          });
        })
        .catch((error) => {
          this.exception.message(error);
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
  .bind-container{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }
  .content-list{
    width:720px;
    height:80px;
    background:rgba(255,255,255,1);
    margin-top: 15px;
  }

  .icon-font{
    font-size: 50px;
    color: #13c1fe;
    margin-top: 20px;
    margin-right: 180px;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  .content-lists input{
    background: transparent;
    outline: none;
    border: 0;
    color:rgba(204,204,204,1);
  }

  .bind-btn{
    width:421px;
    height:78px;
    background:#13C1FE;
    box-shadow:0px 0px 6px rgba(0,0,0,0.33);
    border: 0;
    color:rgba(255,255,255,1);
    border-radius: 50px;
  }

  .check-btn{
    width: 720px;
    margin-top: 48px;
    text-align: center;
  }

</style>
