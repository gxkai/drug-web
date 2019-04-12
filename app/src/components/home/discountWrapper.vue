<template>
  <div v-if="discounts.length > 0">
    <left-title
      leftText="惠民促销"
      leftColor="#000000"
      rightText="惠民不停歇>"
    />
    <div class="swipe-wrapper van-hairline--top">
      <van-swipe :show-indicators="false" :width="200">
        <van-swipe-item
          v-for="(discount, index) in discounts"
          :key="index"
          @click="loadPageShopDrugs(discount.shopDrugId)"
          class="item"
        >
          <img v-lazy="getImgURL(discount.fileId, 'LARGE_LOGO')" />
          <span class="price1 price">
                  {{ `￥:${discount.price}` }}
                </span>
          <span class="price2 price">
                  {{ `原价${discount.price}` }}
                </span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
  import leftTitle from '@/components/home/leftTitle';
  export default {
    components: {
      leftTitle
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        discounts: []
      };
    },
    async created() {
      this.discounts = await this.$http.get('/api/drugs/discount');
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .swipe-wrapper {
    background-color: white;
    .item {
      width: 180px !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
      }
      .price {
        font-size: 30px;
      }
      .price1 {
        color: $theme;
      }
      .price2 {
        text-decoration: line-through;
      }
    }
  }
</style>
