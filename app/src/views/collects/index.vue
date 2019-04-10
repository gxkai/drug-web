<template>
  <new-layout class="collects">
    <template slot="center">
      <van-tabs v-model="active">
        <van-tab title="药品">
          <component is="drugs"></component>
        </van-tab>
        <van-tab title="药房">
          <component is="shops"></component>
        </van-tab>
      </van-tabs>
    </template>
  </new-layout>
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
        font-size: $size-large !important;
      }
    }
  }
</style>

<script>
  import drugs from '@/components/collects/drugs';
  import shops from '@/components/collects/shops';
  export default {
    name: 'collects',
    data() {
      return {
        active: 0
      };
    },
    components: {
      drugs,
      shops
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  };
</script>
