<template>
  <new-layout class="collects">
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <new-collect-tab :state.sync="state"></new-collect-tab>
    </template>
    <template slot="center">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
</style>

<script>
  import drugs from '../../views/collects/drugs';
  import shops from '../../views/collects/shops';
  export default {
    name: 'collects',
    components: {
      drugs,
      shops
    },
    computed: {
      component() {
        switch (this.state) {
          case 1:
            return shops;
          default:
            return drugs;
        }
      }
    },
    data() {
      return {
        state: 0
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
