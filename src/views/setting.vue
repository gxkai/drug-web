<template>
  <div class="setting-container">
    <new-header title="设置">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
      </div>
    </new-header>
    <div class="body">
      <router-link tag="div" class="a-content-list flex-stream-sb padding-10" to="/version">
        <span>当前版本</span>
        <i class="iconfont ic-youjiantou"></i>
      </router-link>
      <router-link tag="div" class="a-content-list flex-stream-sb padding-10" to="/about">
        <span>关于我们</span>
        <i class="iconfont ic-youjiantou"></i>
      </router-link>
    </div>
    <div class="setting-fixed">
      <button class="sign-out" @click="logout" v-if="JSON.stringify($store.getters.account) !== '{}'">退出当前账号</button>
    </div>

  </div>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('LOGIN_OUT').then(res => {
          this.$router.push('/accounts');
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    created() {
    }
  };
</script>

<style scoped>
  .body {
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
  }
  .body .iconfont {
    font-size: 40px;
  }

  .setting-container {
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }

  .setting-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 720px;
  }
  .setting-fixed button {
    font-size:30px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
  }

  .sign-out {
    width: 720px;
    height: 100px;
    background: rgba(19, 193, 254, 1);
    border: 0;
    color: white;
    letter-spacing: 2px;
  }

  .a-content-list {
    display: block;
    width: 720px;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    margin-top: 15px;
  }

  .flex-stream-sb {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .padding-10 {
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
