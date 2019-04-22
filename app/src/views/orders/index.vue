<template>
  <div>
    <new-layout>
      <template slot="center">
        <van-tabs v-model="active">
          <van-tab
            v-for="(item, index) in titles"
            :title="item === '' ? '全部' : $t(item)"
            :key="index"
          >
            <order-list :state="item" />
          </van-tab>
        </van-tabs>
      </template>
      <template slot="bottom">
        <new-footer-entry :value="4" />
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
/deep/ .van-tabs {
  &__wrap {
    height: 100px !important;
    position: fixed;
  }
  &--line {
    padding-top: 100px;
  }
  .van-tab {
    color: black !important;
    &--active {
      color: $theme !important;
    }
    span {
      line-height: 100px !important;
      font-size: 30px !important;
    }
  }
}
</style>
<script>
import orderList from '@/components/orders/orders';
export default {
  name: 'Orders',
  components: {
    orderList
  },
  data() {
    return {
      active: this.$route.query.active,
      titles: ['', 'TO_DELIVERY', 'TO_RECEIVED', 'TO_APPRAISE']
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
