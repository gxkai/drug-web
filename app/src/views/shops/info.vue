<template>
  <new-layout>
    <template slot="center">
      <shopHeader :shop="shop" />
      <new-white-space />
      <info-cell
        :desc="shop.address"
        icon="dingwei-"
        title="药店地址"
        @click="onLocation"
      />
      <new-white-space />
      <info-cell
        :desc="shop.phone"
        icon="dianhua-"
        title="药店电话"
        @click="onCall"
      />
      <new-white-space />
      <info-cell
        :desc="`${shop.openTime}-${shop.closeTime}`"
        icon="shijian"
        title="营业时间"
      />
      <new-white-space />
      <van-tabs v-model="active">
        <van-tab title="门店照片">
          <new-white-space />
          <div>
            <div>暂无</div>
          </div>
        </van-tab>
        <van-tab title="其他资质">
          <new-white-space />
          <div class="img-wrapper">
            <img
              v-lazy="getImgURL(item, 'LARGE_PIC')"
              v-for="(item, index) in shop.fileIds"
              :key="index"
            />
          </div>
        </van-tab>
      </van-tabs>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
/deep/ .van-tabs {
  &__wrap {
    height: 80px !important;
  }
  &--line {
    padding-top: 80px;
  }
  .van-tab {
    color: black !important;
    &--active {
      color: $theme !important;
    }
    span {
      line-height: 80px !important;
    }
  }
}
.img-wrapper {
  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  justify-items: center;
  padding: 20px 0;
  img {
    width: 340px;
    height: 260px;
  }
}
</style>
<script>
import infoCell from '@/components/shops/infoCell';
import shopHeader from '@/components/shops/shopHeader';

export default {
  name: 'Shop',
  components: {
    infoCell,
    shopHeader
  },
  data() {
    return {
      shop: {},
      shopId: this.$route.query.shopId,
      active: 0
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.shop = await this.$http.get(`/api/app/shops/${this.shopId}`);
    },
    onLocation() {
      this.loadPageIframe(
        this.jumpToBaidu(
          this.shop.name,
          this.shop.address,
          this.shop.lat,
          this.shop.lng
        ),
        '药店导航'
      );
    },
    onCall() {
      window.location.href = `tel:${this.shop.phone}`;
    }
  }
};
</script>
