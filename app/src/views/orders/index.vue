<template>
  <div>
    <new-layout>
      <template slot="center">
        <van-tabs v-model="active">
          <van-tab :title="item===''? '全部': $t(item)" v-for="(item,index) in titles" :key="index">
            <order-list :state="item"/>
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
    components: {
      orderList
    },
    name: 'orders',
    data() {
      return {
        active: this.$route.query.active,
        titles: [
          '',
          'TO_PAY',
          'TO_DELIVERY',
          'TO_RECEIVED',
          'TO_APPRAISE'
        ]
      };
    },
    watch: {
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  };
</script>
