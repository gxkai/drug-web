<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <info-cell :title="item.name"  is-radio
                 :checked="result.includes(item)>0"
                 v-for="(item, index) in list"
                 :key="index"
                 @click.native="selectItem(result,item)"
      />
      <new-end v-if="finished === true" :name="list.length > 0 ? 'END' : 'NONE'"/>
    </van-list>
  </van-pull-refresh>
</template>

<script>
  import infoCell from '@/components/drugs/infoCell';
  import list from '@/mixins/list';
  export default {
    components: {
      infoCell
    },
    props: {
      result: {},
      params: {},
      type: {}
    },
    name: '',
    mixins: [list],
    watch: {
    },
    computed: {},
    data() {
      return {
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      async onLoad() {
        this.loadMore();
        let url;
        switch (this.type) {
          case 'name':
            url = '/api/drugs/name';
            break;
          case 'spec':
            url = '/api/specs';
            break;
          case 'origin':
            url = '/api/origins';
            break;
          case 'form':
            url = '/api/forms';
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

<style scoped>

</style>
