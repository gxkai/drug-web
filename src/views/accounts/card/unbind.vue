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
          <i class="iconfont ic-xingming"></i>
          <span>{{this.account.name}}</span>
        </div>

        <div class="content-list">
          <i class="iconfont ic-Id"></i>
          <span>{{this.account.identityNumber}}</span>
        </div>

        <div class="content-list">
          <i class="iconfont ic-shouji" ></i>
          <span>{{this.account.username}}</span>
        </div>

        <div class="content-list">
          <i class="iconfont ic-Id"></i>
          <span>{{this.account.medicalNumber}}</span>
        </div>
      </div>
      <div class="check-btn">
        <button class="bind-btn" @click="unbind()">解除绑定</button>
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
      if (this.$store.getters.account) {
        this.account = this.$store.getters.account;
      }
    },
    methods: {
      unbind: function () {
        this.account.medicalNumber = null;
        this.$http.put('/accounts', this.account)
          .then((res) => {
            this.$store.commit('SET_ACCOUNT', this.account);
            this.$router.push({path: '/accounts/bind/success'});
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

   .iconfont{
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
