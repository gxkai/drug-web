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
              <span>
                {{ $t(item.state) }}
              </span>
              <!-- <span class="tag tag&#45;&#45;pending">
                  {{$t(item.state)}}
               </span>
               <span class="tag tag&#45;&#45;succeed">
                  {{$t(item.state)}}
               </span>-->
            </div>
          </header>
          <new-drug
            v-for="(item_, index_) in item.list"
            :item="item_"
            :key="index_"
            disabled
          />
          <order-footer :quantity="item.quantity" :amount="item.amount" />
          <div class="submit-bar">
            <span v-if="item.state === 'TO_PAY'" @click.stop="onCancel(item)">
              取消订单
            </span>
            <span v-if="item.state === 'TO_PAY'" @click.stop="onPay(item)">
              去付款
            </span>
            <span
              v-if="item.state == 'TO_RECEIVED'"
              @click.stop="onConfirm(item)"
            >
              确认收货
            </span>
            <span
              v-if="item.state == 'TO_RECEIVED'"
              @click.stop="onQrCode(item)"
            >
              二维码收货
            </span>
            <span
              v-if="item.state == 'TO_APPRAISE'"
              @click.stop="onAppraise(item)"
            >
              我要评价
            </span>
            <!--<span v-if="item.state == 'TO_DELIVERY'" @click.stop="onRefund(item)">-->
              <!--退款-->
            <!--</span>-->
          </div>
        </div>
      </van-list>
      <new-end
        v-if="finished === true"
        :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
      />
    </van-pull-refresh>
    <refund-pop
      v-model="refundShow"
      :order.sync="order"
    />
    <van-popup v-model="show" position="center">
      <img v-lazy="qrCode" />
    </van-popup>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.wrapper {
  .submit-bar {
    background-color: white;
    padding: 24px 22px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
    span {
      border-radius: 26px;
      border: solid 1px #f63341;
      color: #f73341;
      padding: 10px 20px;
      letter-spacing: 1px;
      margin-left: 10px;
      margin-top: 10px;
      font-size: $size-small;
    }
  }
  header {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 10px 15px;
    background-color: white;
    .right {
      span {
        color: $theme;
      }
      .tag {
        padding: 10px 20px;
        border-radius: 20px 0px 0px 20px;
        color: white;
        font-size: 20px;
        &--pending {
          background-color: #d7000e;
        }
        &--succeed {
          background-color: #00a0e9;
        }
      }
    }
  }
}
</style>
<script>
import orders from '@/mixins/orders';
import list from '@/mixins/list';
import refundPop from '@/components/orders/refundPop';
import orderFooter from '@/components/orders/orderFooter';
export default {
  name: '',
  components: {
    refundPop,
    orderFooter
  },
  mixins: [orders, list],
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
        '/api/orders',
        this.getParams({ orderState: this.state })
      );
      const list = data.list;
      list.map(e => {
        e.quantity = e.list.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0);
      });
      this.pushToList(list);
    }
  }
};
</script>

<style scoped></style>
