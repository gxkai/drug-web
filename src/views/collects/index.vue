<template>
  <div class="collects">
    <div id="header">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <new-collect-tab :state.sync="state"></new-collect-tab>
    </div>
    <div :style="contentStyle">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .collects {
    background-color: #f5f5f5;
  }
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
        state: 0,
        contentStyle: {
          height: 0,
          overflow: 'auto'
        }
      };
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
    },
    methods: {
    }
  };
</script>
