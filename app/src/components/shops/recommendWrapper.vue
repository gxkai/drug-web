<template>
  <div class="recommend-wrapper">
    <div class="item"
         v-for="(item, index) in list"
         :key="index"
         @click="loadPageShopDrugs(item.id)">
      <new-image :url="getImgURL(item.fileId, 'LARGE_LOGO')" :rx="!item.otc" size="small"/>
      <span class="name">
            {{item.name}}
          </span>
      <span class="price">
            {{`￥${item.price}`}}
          </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      shopId: {}
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        list: []
      };
    },
    async created() {
      this.list = await this.$http.get(`/api/shops/${this.shopId}/drugs/recommend`);
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .recommend-wrapper {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 4px;
    .item {
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 49px 10px 10px;
    }
    .name {
      margin-top: 10px;
      font-size: $size-mini;
      color: #010000;
      word-break: break-word;
      text-align: center;
    }
    .price {
      margin-top: 10px;
      color: #ff0000;
      word-break: break-word;
    }
  }
</style>
