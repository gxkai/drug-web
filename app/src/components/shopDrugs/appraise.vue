<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <appraise-cell
          v-for="(item, index) in list"
          :item="item"
          :key="index"
        />
        <new-end
          v-if="finished === true"
          :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import list from '@/mixins/list';
import appraiseCell from '@/components/shopDrugs/appraiseCell';
export default {
  name: 'DrugAppraise',
  components: {
    appraiseCell
  },
  mixins: [list],
  props: ['shopDrug'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      const params = {
        shopDrugId: this.shopDrug.id
      };
      const data = await this.$http.get(
        '/api/app/drugAppraises',
        this.getParams(params)
      );
      this.pushToList(data.list);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss"></style>
