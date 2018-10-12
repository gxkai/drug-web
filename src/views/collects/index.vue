<template>
  <new-layout class="collects">
    <div slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <new-collect-tab :state.sync="state"></new-collect-tab>
    </div>
    <div slot="center">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </div>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
</style>

<script>
  import drugs from '../../views/collects/child/drugs';
  import shops from '../../views/collects/child/shops';
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
