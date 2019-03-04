<template>
 <!-- <new-layout class="shop-drug-spec">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <new-drug-tab :state.sync="state"></new-drug-tab>
    </template>
    <template slot="center">
      <keep-alive>
        <component :is="component" :shopDrugSpec="shopDrugSpec" ></component>
      </keep-alive>
    </template>
  </new-layout>-->
  <new-layout class="collects">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-tabs v-model="active">
        <van-tab title="详情">
          <component is="info" :shopDrugSpec="shopDrugSpec"></component>
        </van-tab>
        <van-tab title="评价">
          <component is="appraise" :shopDrugSpec="shopDrugSpec"></component>
        </van-tab>
      </van-tabs>
    </template>
  </new-layout>
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
        color: $themeColor !important;
      }
      span {
        line-height: 100px !important;
        font-size: 25px !important;
      }
    }
  }
</style>

<script>
  import appraise from './appraise';
  import info from './info';
  export default {
    name: 'appraiseInfo',
    components: {
      appraise,
      info
    },
    computed: {
    },
    data() {
      return {
        shopDrugSpec: this.$route.params.shopDrug,
        active: this.$route.params.state || 0
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  };
</script>

