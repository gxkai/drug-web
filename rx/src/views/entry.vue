<template>
  <div></div>
</template>

<script>
  import { setData, setToken, setAccount } from '../assets/js/auth';

  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        toPath: this.getUrlKey('toPath'),
        data: JSON.parse(this.getUrlKey('data'))
      };
    },
    async created() {
      this.fetchUrlToPush();
    },
    mounted() {
    },
    methods: {
      async fetchUrlToPush() {
        switch (this.toPath) {
          case 'rxs':
          case 'myorder' :
            this.login();
        }
      },
      async login() {
        console.log(this.data);
        setData(this.data);
        try {
          this.$toast.loading({
            duration: 0,
            forbidClick: true,
            loadingType: 'spinner',
            message: '登陆中...'
          });
          const token = await this.$http.post('/accounts/login', this.data);
          setToken(token);
          const account = await this.$http.get('/accounts');
          setAccount(account);
          if (this.toPath === 'rxs') {
            await this.getRx();
          }
          this.$toast.clear();
          this.$router.push(`/${this.toPath}`);
        } catch (e) {
          this.$toast('登陆失败');
        }
      },
      async getRx() {
        console.log(this.data);
        console.log('hospitalId', this.data.hospitalId);
        const hospitalCode = this.getHospitalCode(this.data.hospitalId);
        let str = '';
        this.data.key.forEach(e => {
          str += '&code=' + e.prescriptionNum;
        });
        console.log('/rxs/code?hospitalCode=' + hospitalCode + str);
        await this.$http.get('/rxs/code?hospitalCode=' + hospitalCode + str);
      }
    }
  };
</script>

<style scoped>

</style>
