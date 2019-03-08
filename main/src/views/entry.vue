<template>
  <div class="entry">
    <van-button type="primary" v-if="show" @click="onRetry">点击重试</van-button>
  </div>
</template>

<script>
  import { setToken, setAccount } from '../storage';

  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        toPath: this.getUrlKey('toPath'),
        data: this.getUrlKey('data'),
        show: false
      };
    },
    async created() {
      if (this.data === null) {
        this.$router.push('/login');
      }
      console.log(this.toPath);
      console.log(this.data);
      this.fetchUrlToPush();
    },
    mounted() {
    },
    methods: {
      onRetry() {
        this.show = false;
        this.login();
      },
      async fetchUrlToPush() {
        switch (this.toPath) {
          case 'home':
            this.login();
        }
      },
      async login() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '登陆中...'
        });
        try {
          const token = await this.$http.post('/accounts/login', this.data);
          setToken(token);
          const account = await this.$http.get('/accounts');
          setAccount(account);
          this.$toast.clear();
          this.$router.push(`/${this.toPath}`);
        } catch (e) {
          this.$toast('登陆失败');
          this.show = true;
        }
      }
    }
  };
</script>

<style scoped>
  .entry {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
