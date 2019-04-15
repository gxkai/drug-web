export default {
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      pageNum: 0,
      pageSize: 15,
      list: []
    };
  },
  methods: {
    onRefresh() {
      this.finished = false;
      this.list = [];
      this.pageNum = 0;
      this.onLoad();
    },
    getParams(params) {
      return Object.assign(
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        params
      );
    },
    pushToList(list) {
      this.isLoading = false;
      this.loading = false;
      this.list = this.list.concat(list);
      console.log(this.list);
      if (list.length === 0) {
        this.finished = true;
      }
    },
    loadMore() {
      this.pageNum++;
    },
    onLoad() {}
  }
};
