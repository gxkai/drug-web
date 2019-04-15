<template>
  <div></div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  async created() {
    let orderId = await this.$http.get('/api/orders/number', {
      number: this.$route.query.MerOrderNo
    });
    this.loadPageOrdersView(orderId);
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
