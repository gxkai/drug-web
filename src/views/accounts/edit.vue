<template>
  <div class="account-container">
    <new-header title="账户信息">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>


    <div>
      <div class="content-list flex-stream-sb padding-10">
        <label for="">姓名</label>
        <input v-if="clicked" class="yourprivacy_in1" type="text" placeholder="请输入真实姓名" v-model="account.name"/>
        <input readonly v-else class="yourprivacy_in1" type="text" placeholder="请输入真实姓名" v-model="account.name"/>
      </div>
      <div class="content-list flex-stream-sb padding-10">
        <label for="">性别</label>
        <div v-if="clicked">
          <input id="MALE" type="radio" name="sex" value="MALE" v-model="account.gender"><label for="MALE">男</label>
          <input id="FEMALE" type="radio" name="sex" value="FEMALE" v-model="account.gender"><label for="FEMALE">女</label>
        </div>
        <div v-else>
          <input readonly type="text" :value="account.gender|transformGenderState">
        </div>
      </div>
      <div class="content-list flex-stream-sb padding-10">
        <label for="">身份证号</label>
        <input v-if="clicked" type="text" placeholder="请输入身份证" v-model="account.identityNumber"/>
        <input readonly v-else type="text" placeholder="请输入身份证" v-model="account.identityNumber"/>
      </div>
    </div>
    <button class="btn-fixed" @click="save" v-if="clicked">保存</button>
    <button class="btn-fixed" @click="change()" v-else>编辑</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: this.$store.getters.account,
        name: null,
        clicked: false
      };
    },
    created() {
    },
    methods: {
      change() {
        this.clicked = true;
      },
      save() {
        this.$http.put('/accounts', this.account)
          .then((res) => {
            this.$store.commit('SET_ACCOUNT', this.account);
            this.$router.go(-1);
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
    color: white;
  }

  .account-container{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }
  .content-list{
    width:720px;
    height:80px;
    background:rgba(255,255,255,1);
    margin-bottom: 15px;
  }
  .content-list label{
    font-size: 25px;
  }
  .content-list input{
    border: 0;
    text-align: right;
    box-sizing: border-box;
    padding-right: 10px;
    outline: 0;
    font-size: 25px;
  }
  .content-list input::placeholder{
    text-align: right;
  }
  .a-content-list span{
    color: #535353;
  }
  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .padding-10{
    padding:0 10px;
    box-sizing: border-box;
  }
  .btn-fixed{
    width:720px;
    height:77px;
    background:rgba(19,193,254,1);
    border-radius:5px;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
    color: white;
    letter-spacing: 2px;
    font-size: 30px;
  }
</style>
