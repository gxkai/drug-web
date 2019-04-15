<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div v-for="(item, index) in list" :key="index" class="item">
        <new-white-space />
        <new-shop :item="item" />
      </div>
      <new-end
        v-if="finished === true"
        :name="list.length > 0 ? 'END' : 'NONE'"
      />
    </van-list>
  </van-pull-refresh>
</template>
<script>
import list from '@/mixins/list';
export default {
  name: 'CollectDrugs',
  mixins: [list],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      const data = await this.$http.get('/api/collects/shop', this.getParams());
      const list = data.list;
      this.pushToList(list);
    }
  }
};
</script>
