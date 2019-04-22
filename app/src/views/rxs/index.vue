<template>
  <div>
    <new-layout>
      <template slot="top">
        <bg-wrapper :account="account" />
        <div class="search">
          <form action="" onsubmit="return false;">
            <input
              :placeholder="placeholder"
              v-model="keyword"
              class="van-icon"
              type="search"
              @keypress="search"
            />
          </form>
        </div>
      </template>
      <template slot="center">
        <article>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <div v-for="item in list" :key="item.id" @click="clickItem(item)">
                <rx :item="item" />
              </div>
              <new-end
                v-if="finished === true"
                :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
              />
            </van-list>
          </van-pull-refresh>
        </article>
      </template>
      <template slot="bottom">
        <new-footer-entry :value="1" />
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
article {
  margin-top: 50px;
}
.search {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 190px;
  z-index: 2;
  width: 100%;
  input {
    width: 690px;
    background-color: #ffffff;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.27);
    border-radius: 12px;
    border: none;
    outline: none;
    -webkit-appearance: none;
    padding: 10px 20px;
    font-size: $size-small;
    line-height: 40px;
    &::placeholder {
      text-align: center;
      color: #cccccc;
    }
  }
}
/deep/.van-nav-bar {
  .van-nav-bar__title,
  .van-nav-bar__text {
    color: white;
  }
  .van-nav-bar__arrow {
    &:before {
      color: white;
    }
  }
}
</style>
<script>
import list from '@/mixins/list';
import bgWrapper from '@/components/rxs/bgWrapper';
import rx from '@/components/rxs/rx';

export default {
  components: {
    bgWrapper,
    rx
  },
  mixins: [list],
  data() {
    return {
      keyword: '',
      placeholder: '\ue643 请输入诊断搜索'
    };
  },
  computed: {},
  watch: {
    keyword(n) {
      if (n.trim() === '') {
        this.onRefresh();
      }
    }
  },
  created() {},
  mounted() {
    setInterval(() => {
      this.list.map(e => {
        this.$set(e, 'leftTime', this.countDownTime(e.rxDate));
      });
    });
  },
  methods: {
    countDownTime(input) {
      // 获取当前时间
      var date = new Date();
      var now = date.getTime();
      // 设置截止时间
      var endDate = new Date(input + 3 * 24 * 60 * 60 * 1000);
      var end = endDate.getTime();
      // 时间差
      var leftTime = end - now;
      return leftTime;
    },
    search(e) {
      if (e.keyCode === 13) {
        this.onRefresh();
      }
    },
    async onLoad() {
      this.loadMore();
      const params = {
        keyword: this.keyword
      };
      const data = await this.$http.get('/api/rxs', this.getParams(params));
      this.pushToList(data.list);
    },
    clickItem(item) {
      this.loadPageRxsView(item.id);
    }
  }
};
</script>
