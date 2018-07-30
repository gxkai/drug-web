<template>
  <div class="setting-container">
    <mt-header title="设置">
      <router-link to="#" slot="left">
        <mt-button @click="$router.go(-1)" icon="back"></mt-button>
      </router-link>
    </mt-header>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/version">
      <span>当前版本</span>
      <i class="iconfont ic-youjiantou"></i>
    </router-link>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/about">
      <span>关于我们</span>
      <i class="iconfont ic-youjiantou"></i>
    </router-link>
    <div class="setting-fixed">
      <button class="sign-out" @click="logout">退出当前账号</button>
    </div>

  </div>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$http.get('/accounts/logout', {
          headers: {
            'Authorization': this.$store.getters.token
          }
        });
        this.$store.commit('SET_TOKEN', null);
        this.$store.commit('SET_ACCOUNT', {});
        localStorage.clear();
        this.$router.push({path: '/'});
        location.reload();
      }
    }
  };
</script>

<style scoped>
  .mint-header {
    background: white;
    color: #555
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .setting-container{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }


  .setting-fixed{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 720px;
  }

  .sign-out{
    width: 720px;
    height:100px;
    background:rgba(19,193,254,1);
    border: 0;
    color: white;
    letter-spacing: 2px;
  }

  .a-content-list{
    display: block;
    width:720px;
    height:80px;
    background:rgba(255,255,255,1);
    margin-top: 15px;
  }

  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .padding-10{
    padding:0 20px;
    box-sizing: border-box;
  }
</style>
