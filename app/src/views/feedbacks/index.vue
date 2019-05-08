<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <feedback
            v-for="(item, index) in list"
            :item="item"
            :key="index"
            class="hairline-bottom"
            @click="loadPageFeedbacksView(item.id)"
          />
        </van-list>
      </van-pull-refresh>
    </template>
    <template slot="bottom">
      <new-submit-button name="新增" @click.native="add" />
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
import feedback from '@/components/feedbacks/feedback';
import list from '@/mixins/list';
export default {
  name: '',
  components: {
    feedback
  },
  mixins: [list],
  data() {
    return {
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      const data = await this.$http.get(
        '/api/app/feedbacks',
        this.getParams()
      );
      this.pushToList(data.list);
    },
    add() {
      this.loadPageFeedbackCreate();
    }
  }
};
</script>
