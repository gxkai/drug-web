<template>
  <div v-if="discounts.length > 0">
    <left-title
      left-text="惠民促销"
      left-color="#000000"
      right-text="惠民不停歇>"
    />
    <div class="swipe-wrapper van-hairline--top">
      <van-swipe :show-indicators="false" :width="200">
        <van-swipe-item
          v-for="(discount, index) in discounts"
          :key="index"
          class="item"
          @click="loadPageShopDrugs(discount.shopDrugId)"
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
  name: '',
  components: {
    leftTitle
  },
  mixins: [],
  data() {
    return {
      discounts: []
    };
  },
  computed: {},
  watch: {},
  async created() {
    this.discounts = await this.$http.get('/api/app/drugs/discount');
  },
  mounted() {},
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
