<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="wrapper"
          @click="onOrder(item)"
        >
          <new-white-space />
          <header>
            <div class="left">
              <van-icon name="yaodian-" size="0.56rem" />
              <span>
                {{ item.shopName }}
              </span>
            </div>
            <div class="right">
              <span
                v-show="item.refundState === 'REFUNDING'"
                class="tag tag--pending"
              >
                {{ $t(item.state) }}
              </span>
              <span
                v-show="item.refundState === 'COMPLETE'"
                class="tag tag--succeed"
              >
                {{ $t(item.state) }}
              </span>
            </div>
          </header>
          <new-drug
            v-for="(item_, index_) in item.drugs"
            :item="item_"
            :key="index_"
            disabled
          />
          <order-footer :quantity="item.count" :amount="item.amount" />
        </div>
      </van-list>
      <new-end
        v-if="finished === true"
        :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
      />
    </van-pull-refresh>
  </div>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
import list from '@/mixins/list';
import orderFooter from '@/components/orders/orderFooter';
export default {
  name: '',
  components: {
    orderFooter
  },
  mixins: [list],
  props: {
    state: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      const data = await this.$http.get(
        '/api/app/orderRefunds',
        this.getParams({ OrderRefundState: this.state })
      );
      this.pushToList(data.list);
    },
    onOrder(order) {
      this.$router.push({ path: '/orders/view', query: { orderId: order.id } });
    }
  }
};
</script>
