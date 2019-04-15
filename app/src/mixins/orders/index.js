export default {
  data() {
    return {
      show: false,
      refundShow: false,
      qrCode: '',
      reason: '',
      order: ''
    };
  },
  created() {},
  methods: {
    onOrder(order) {
      this.$router.push({ path: '/orders/view', query: { orderId: order.id } });
    },
    async onCancel(order) {
      await this.$http.put(`/api/orders/${order.id}/close`);
      order.state = 'CLOSED';
    },
    async onPay(order) {
      window.location.href = await this.$http.get(
        `/api/orders/${order.id}/pay`
      );
    },
    onRefund(order) {
      this.order = order;
      this.refundShow = true;
    },
    onRefundConfirm() {},
    onAppraise(order) {
      this.loadPageDrugAppraisesCreate(order.id);
    },
    async onConfirm(order) {
      await this.$http.put(`/api/orders/${order.id}/complete`);
      order.state = 'TO_APPRAISE';
    },
    async onQrCode(order) {
      this.qrCode = await this.$http.get(`/api/orders/${order.id}/qrCode`);
      this.show = true;
    }
  }
};
