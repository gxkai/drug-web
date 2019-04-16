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
            <orders :state="item" />
          </van-tab>
        </van-tabs>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
/deep/ .van-tabs {
  &__wrap {
    height: 100px !important;
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
import orders from '@/components/orderRefunds/orders';
export default {
  name: 'Orders',
  components: {
    orders
  },
  data() {
    return {
      active: this.$route.query.active,
      titles: ['', 'REFUNDING', 'COMPLETE', 'FAIL']
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
