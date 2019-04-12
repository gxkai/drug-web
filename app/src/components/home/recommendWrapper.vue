<template>
  <div>
    <central-title
      icon="aixin"
      color="#7d000e"
      text="好货推荐"
      v-if="recommends.length > 0"
    />
    <div class="normal-wrapper" v-if="recommends.length > 0">
      <div
        class="item"
        v-for="(recommend, index) in recommends"
        :key="index"
        @click="loadPageShopDrugs(recommend.shopDrugId)"
      >
        <new-image
          :url="getImgURL(recommend.fileId, 'LARGE_LOGO')"
          :rx="!recommend.otc"
        />
        <span class="text text1">
                {{ recommend.name }}
              </span>
        <span class="text text2">
                {{ `${recommend.price}/${recommend.spec}` }}
              </span>
      </div>
    </div>
  </div>
</template>

<script>
  import centralTitle from '@/components/home/centralTitle';
  export default {
    components: {
      centralTitle
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        recommends: []
      };
    },
    async created() {
      this.recommends = await this.$http.get('/api/drugs/recommend');
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  .normal-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .item {
      background-color: white;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text {
        font-size: $size-mini;
      }
      .text2 {
        color: $theme;
        font-size: $size-mini;
      }
    }
  }
</style>
