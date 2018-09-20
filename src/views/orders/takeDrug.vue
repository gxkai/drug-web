<template>
  <div class="main">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="完成"
      @click-right="$router.push('/orders')"
      ref="header"
    />
    <new-take-list :order="order"></new-take-list>
  </div>
</template>


<script>
  export default {
    name: 'orderPay',
    data() {
      return {
        orderId: this.$route.query.orderId,
        order: []
      };
    },
    computed: {
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.post('/orders/' + this.orderId + '/hospital')
          .then(res => {
            this.order = res.data;
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

