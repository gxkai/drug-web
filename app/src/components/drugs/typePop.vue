<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <info-cell
        v-for="(item, index) in list"
        :title="item.name"
        :checked="result.includes(item) > 0"
        :key="index"
        is-radio
        @click.native="selectItem(result, item)"
      />
      <new-end
        v-if="finished === true"
        :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import infoCell from '@/components/drugs/infoCell';
import list from '@/mixins/list';
export default {
  name: '',
  components: {
    infoCell
  },
  mixins: [list],
  props: {
    result: {},
    params: {},
    type: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      this.loadMore();
      let url;
      switch (this.type) {
        case 'name':
          url = '/api/app/drugs/name';
          break;
        case 'spec':
          url = '/api/app/specs';
          break;
        case 'origin':
          url = '/api/app/origins';
          break;
        case 'form':
          url = '/api/app/forms';
          break;
        default:
          break;
      }
      const data = await this.$http.get(url, this.getParams(this.params));
      this.pushToList(data);
    },
    selectItem(result, item) {
      let index = result.findIndex(e => item === e);
      if (index === -1) {
        result.push(item);
      } else {
        result.splice(index, 1);
      }
      this.$emit('update:result', result);
    }
  }
};
</script>

<style scoped></style>
