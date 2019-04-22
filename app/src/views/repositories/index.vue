<template>
  <new-layout>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <nav-bar
            v-for="(item, index) in list"
            :key="index"
            :item="item"
            @click.native="clickItem(item)"
          />
          <new-end
            v-if="finished === true"
            :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
          />
        </van-list>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
import list from '@/mixins/list';
import navBar from '@/components/repositories/navBar';
export default {
  name: 'Repositories',
  components: {
    navBar
  },
  mixins: [list],
  data() {
    return {
      repositoryTypeId: this.$route.query.repositoryTypeId,
      title: this.$route.query.title
    };
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      const params = {
        repositoryTypeId: this.repositoryTypeId
      };
      const data = await this.$http.get(
        '/api/repositories/',
        this.getParams(params)
      );
      this.pushToList(data.list);
    },
    clickItem(item) {
      this.loadPageRepositoriesView(item.id);
    }
  }
};
</script>
