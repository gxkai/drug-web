<template>
  <new-layout>
    <template slot="center">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="wrapper hairline-bottom"
        @click="clickItem(item)"
      >
        <img v-lazy="item.icon" />
        <span>
          {{ item.name }}
        </span>
        <van-icon name="arrow" class="icon" />
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: 100px 1fr 50px;
  align-items: center;
  background-color: white;
  padding: 20px;
  img {
    width: 65px;
    height: 65px;
    border-radius: 10px;
    justify-self: center;
  }
  .icon {
    justify-self: center;
  }
  span {
    word-break: break-word;
  }
}
</style>
<script>
export default {
  name: 'RepositoryTypes',
  data() {
    return {
      list: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const data = await this.$http.get('/api/app/repositoryTypes');
      this.list = data;
    },
    clickItem(item) {
      this.loadPageRepositories(item.name, item.id);
    }
  }
};
</script>
