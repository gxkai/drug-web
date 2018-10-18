<template>
  <new-layout class="shop-drug-spec">
    <div slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <new-drug-tab :state.sync="state"></new-drug-tab>
    </div>
    <div slot="center">
      <keep-alive>
        <component :is="component" :shopDrugSpec="shopDrugSpec" ></component>
      </keep-alive>
    </div>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .shop-drug-spec {
    background-color: #f5f5f5;
  }
</style>

<script>
  import appraise from '../shopDrugSpecs/child/appraise';
  import info from '../shopDrugSpecs/child/info';
  export default {
    name: 'shop-drug-spec',
    components: {
      appraise,
      info
    },
    computed: {
      component() {
        switch (this.state) {
          case 1:
            return appraise;
          default:
            return info;
        }
      }
    },
    data() {
      return {
        shopDrugSpec: JSON.parse(this.$route.query.shopDrugSpec),
        state: this.$route.query.state || 0
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

