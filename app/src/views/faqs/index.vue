<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-collapse v-model="activeNames">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div v-for="(item, index) in list" :key="index">
              <van-collapse-item :title="item.question" :name="index">
                {{ item.answer }}
              </van-collapse-item>
            </div>
            <new-end
              v-if="finished === true"
              :name="list.length > 0 ? 'END' : 'NONE'"
            />
          </van-list>
        </van-collapse>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
/deep/.van-collapse-item {
  .van-collapse-item__wrapper {
    .van-collapse-item__content {
      font-size: 37px !important;
    }
  }
  .van-cell {
    padding: 20px 15px;
    .van-cell__title {
      span {
        font-size: 40px !important;
      }
    }
    .van-cell__right-icon {
      font-size: 40px !important;
    }
  }
}
</style>
<script>
import list from '@/mixins/list';
export default {
  name: 'Faqs',
  mixins: [list],
  data() {
    return {
      activeNames: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      const data = await this.$http.get('/api/faqs', this.getParams());
      this.pushToList(data.list);
    }
  }
};
</script>
