export default {
  data() {
    return {
      payType: 'KRCB',
      show: false,
      payAmount: 0,
      address: undefined,
      isMedicarePay: false,
      accountRemark: '',
      shop: {},
      active: 0
    };
  },
  computed: {
    deliveryType() {
      if (this.active === 0) {
        return 'SELF';
      } else {
        return 'DELIVERY';
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.address = vm.$route.params.address;
    });
  },
  beforeRouteLeave(to, from, next) {
    to.params.address = this.address;
    next();
  },
  methods: {
    preOrder() {
      if (this.deliveryType === 'DELIVERY') {
        if (this.address === undefined) {
          this.$toast('地址还没维护呢');
          return;
        }
      }
      this.show = true;
    },
    async orderOption(json, isShop) {
      if (this.isMedicarePay === true) {
        this.$dialog
          .confirm({
            title: '提示信息',
            message:
              '如选择医保支付，支付成功后，请耐心等待30S，订单状态才会更新。'
          })
          .then(async () => {
            this.fetchPay(json, isShop);
          })
          .catch(() => {
            return false;
          });
      } else {
        this.fetchPay(json, isShop);
      }
    },
    async fetchPay(json, isShop) {
      let order = await this.$http.post(
        `/api/orders${isShop ? '/shop' : ''}`,
        json
      );
      let url = await this.$http.get(`/api/orders/${order.id}/pay`);
      if (url === '') {
        await this.$http.get('/orders/callback', {
          MerOrderNo: order.number,
          orderNo: '0000001'
        });
        this.$toast('订单提交成功');
        this.$router.replace('/orders');
        return;
      }
      window.location.href = url;
    }
  }
};
