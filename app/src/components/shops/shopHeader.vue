<template>
  <header :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="left">
      <img v-lazy="getImgURL(shop.logo, 'SMALL_LOGO')" />
    </div>
    <div class="center">
      <span>
        {{ shop.name }}
      </span>
    </div>
    <div v-show="showCollected !== undefined" class="right" @click="onCollect">
      <div :class="[collected ? 'collect' : 'not-collect']">
        <van-icon :color="collected ? 'white' : '#999999'" name="xin-" />
        <span v-text="collected ? '收藏' : '未收藏'"> </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    shop: {},
    showCollected: {}
  },
  data() {
    return {
      collected: false,
      backgroundImage: require('@/assets/img/shops/backgroundImage.png')
    };
  },
  computed: {},
  watch: {},
  async created() {
    this.collected = await this.$http.get(
      `/api/app/collects/shop/one?shopId=${this.shop.id}`
    );
  },
  mounted() {},
  methods: {
    async onCollect() {
      let collected = !this.collected;
      let data = {
        shopId: this.shop.id,
        collected: collected
      };
      await this.$http.post('/api/app/collects/shop', data);
      this.collected = collected;
      this.$toast(`${collected ? '收藏成功' : '取消收藏成功'}`);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
header {
  background-size: cover;
  min-height: 160px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 10px;
  padding: 10px 28px;
  align-items: center;
  .left {
    img {
      width: 90px;
      height: 90px;
      border-radius: 10px;
    }
  }
  .center {
    span {
      font-size: $size-small * 1.2;
      color: #fffefe;
    }
    justify-self: center;
  }
  .right {
    div {
      padding: 10px 15px;
      display: flex;
      align-items: center;
      border-radius: 10px;
      span {
        font-size: $size-mini;
        color: #fffefe;
        margin-left: 5px;
      }
    }
    .collect {
      background-color: #ff0000;
    }
    .not-collect {
      background-color: $gray;
    }
  }
}
</style>
