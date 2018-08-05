<template>
  <div class="main">
    <new-header title="取药信息">
      <i class="iconfont ic-arrow-right" slot="left" @click.stop="$router.go(-1)"></i>
    </new-header>
    <new-take-list :list="list" :hospitalName="hospitalName"></new-take-list>
  </div>
</template>


<script>
  export default {
    name: 'orderPay',
    data() {
      return {
        deliveryType: this.$route.query.deliveryType,
        rxId: this.$route.query.rxId,
        hospitalName: this.$route.query.hospitalName,
        list: []
      };
    },
    computed: {
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('/orders/hospital?rxId=' + this.rxId).then(res => {
          this.list = res.data;
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    components: {}
  };
</script>
<style scoped>
  .main {
    background-color: rgba(246, 246, 246, 1);
    height: 100vh;
    width: 720px;
  }
</style>

