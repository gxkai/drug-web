<template>
  <new-layout class="shop-drug-spec">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
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
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
</style>

<script>
  import appraise from './appraise';
  import info from './info';
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

