<template>
  <new-layout center-color="white">
    <template slot="center">
      <van-tabs v-model="active" swipeable color="#F60000">
        <van-tab
          v-for="(item, index) in list"
          :title="item.type"
          :key="index"
          class="container"
        >
          <div
            v-for="item in item.drugType"
            :key="item.id"
            class="wrapper"
            @click="
              clickItem(item)
            "
          >
            <img v-lazy="getImgURL(item.fileId, 'MIDDLE_LOGO')" />
            <div>{{ item.type }}</div>
          </div>
        </van-tab>
      </van-tabs>
    </template>
    <template slot="bottom">
      <new-footer-entry :value="2" />
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
      font-size: 25px !important;
    }
  }
}
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  .wrapper {
    background-color: white;
    padding: 20px;
    display: flex;
    flex-flow: column;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    div {
      margin-top: 10px;
      font-size: 25px;
    }
  }
}
</style>
<script>
export default {
  name: 'DrugTypes',
  components: {},
  data() {
    return {
      list: [],
      active: 0
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.$toast.loading();
      this.list = await this.$http.get('/api/app/drugTypes');
    },
    clickItem(item) {
      this.loadPageDrugs(item.id);
    }
  }
};
</script>
