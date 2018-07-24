<template>
  <div class="f_body">
    <mt-header title="设置">
      <router-link to="#" slot="left">
        <mt-button @click="$router.go(-1)" icon="back"></mt-button>
      </router-link>
    </mt-header>
    <router-link class="f_setting_list" to="/version">
      <span>当前版本</span>
      <img src="static/img/order/right.png">
    </router-link>
    <router-link class="f_setting_list" to="/about">
      <span>关于我们</span>
      <img src="static/img/order/right.png">
    </router-link>
    <div class="f_footer">
      <button @click="logout">退出当前账号</button>
    </div>
  </div>
</template>
<script>
  const URL_PATH = process.env.URL_PATH;
  export default {
    methods: {
      logout() {
        this.$http.get(URL_PATH + '/accounts/logout', {
          headers: {
            'Authorization': this.$store.getters.token
          }
        });
        this.$store.commit('setToken', null);
        this.$store.commit('setAccount', {});
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

  body {
    background: #f5f5f5;
  }

  .f_setting_list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
    margin-top: 0.5rem;
    box-sizing: border-box;
    padding: 0.5rem;
    font-size: 1.4rem;
    color: #969696;
  }

  .f_footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .f_footer > button {
    width: 100%;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 1rem;
    color: #e2f3f4;
    background: #1AB6FD;
  }
</style>
