<template>
    <div></div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
      let orderId = this.$http.get('/api/orders/number', {number: this.$route.query.number});
      this.loadPageOrdersView(orderId);
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped>

</style>
