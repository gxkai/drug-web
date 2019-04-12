<template>
  <new-layout>
    <template slot="center">
      <header>
      </header>
      <div class="wrapper">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="loadPageShopDrugs(item.shopDrugId)"
        >
          <new-image
            :url="getImgURL(item.fileId, 'LARGE_LOGO')"
            :rx="!item.otc"
          />
          <span class="text text1">
                {{ item.name }}
              </span>
          <span class="text text2">
                {{ `${item.price}/${item.spec}` }}
              </span>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  header {
    background-image: url("../../assets/img/drugAppraises/评价成功.png");
    background-size: cover;
    height: 450px;
  }
  .wrapper {
    margin-top: 40px;
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
<script>
  export default {
    name: 'myAppraise',
    data() {
      return {
        list: []
      };
    },
    computed: {
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        // this.list = await this.$http.get('/api/drugAppraises/toAppraise');
        // 好货推荐
        this.list = await this.$http.get('/api/drugs/recommend');
      }
    }
  };
</script>
