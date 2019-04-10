<template>
  <new-layout>
    <template slot="top">
      <new-search-bar :placeholder="placeholder" @click.native="loadPageShopsDrugs(shop.id)"/>
    </template>
    <template slot="center">
      <new-white-space/>
      <shopHeader :shop="shop" showCollected/>
      <new-white-space/>
      <score-bar/>
      <new-white-space/>
      <category-wrapper :shopId="shopId"/>
      <new-white-space/>
      <title-bar title="商家推荐"/>
      <new-white-space/>
      <recommend-wrapper :shopId="shopId"/>
    </template>
    <template slot="bottom">
      <shop-footer :shopId="shopId"/>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
</style>
<script>
  import shopHeader from '@/components/shops/shopHeader';
  import shopFooter from '@/components/shops/shopFooter';
  import scoreBar from '@/components/shops/scoreBar';
  import titleBar from '@/components/shops/titleBar';
  import categoryWrapper from '@/components/shops/categoryWrapper';
  import recommendWrapper from '@/components/shops/recommendWrapper';

  export default {
    components: {
      shopHeader,
      shopFooter,
      scoreBar,
      titleBar,
      categoryWrapper,
      recommendWrapper
    },
    name: 'shop',
    data() {
      return {
        shopId: this.$route.query.shopId,
        shop: {},
        placeholder: '\ue643搜索药品'
      };
    },
    async created() {
      this.shop = await this.$http.get(`/api/shops/${this.shopId}`);
    },
    mounted() {
    },
    methods: {
    }
  };
</script>
