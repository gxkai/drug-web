<template>
  <div class="entry-wrapper">
    <div class="item item1">
      <new-icon
        name="daifukuan"
        color="#9CA2F9"
        size="0.8166rem"
        :info="count.toPayCount"
        @click="loadPageOrders(1)"
      />
      <span>
                  待付款
                </span>
    </div>
    <div class="item item2">
      <new-icon
        name="peijizhong-"
        color="#88c79a"
        size="0.8166rem"
        :info="count.toDeliveryCount"
        @click="loadPageOrders(2)"
      />
      <span>
                  调剂中
                </span>
    </div>
    <div class="item item3">
      <new-icon
        name="daishouhuo-"
        color="#88C79A"
        size="0.8166rem"
        :info="count.toReceivedCount"
        @click="loadPageOrders(3)"
      />
      <span>
                  待收货
                </span>
    </div>
    <div class="item item4">
      <new-icon
        name="daipingjia-"
        color="#7DCAF7"
        size="0.8166rem"
        :info="count.toAppraiseCount"
        @click="loadPageOrders(4)"
      />
      <span>
                  待评价
                </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        count: {
          toPayCount: 0,
          toDeliveryCount: 0,
          toReceivedCount: 0,
          toAppraiseCount: 0
        }
      };
    },
    async created() {
      this.count = await this.$http.get('/api/orders/count');
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .entry-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 100%;
    align-items: center;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        margin-top: 20px;
        font-size: $size-small;
        color: $gray-light;
      }
    }
  }
</style>
