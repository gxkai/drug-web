<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="hairline-bottom"
            @click="onRead(item)"
          >
            <div class="wrapper">
              <div class="item1">
                <van-tag
                  :type="item.isRead ? 'success' : 'danger'"
                  size="large"
                  >{{ item.isRead ? '已读' : '未读' }}</van-tag
                >
              </div>
              <div class="item2">
                <span>{{ item.title }}</span>
              </div>
              <div class="item3">
                <span>{{
                  item.createdDate | dateFmt('YYYY-MM-DD hh:mm:ss')
                }}</span>
              </div>
            </div>
          </div>
          <new-end
            v-if="finished === true"
            :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
          />
        </van-list>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>

<script>
import list from '@/mixins/list';
export default {
  name: 'Messages',
  mixins: [list],
  data() {
    return {
      messageType: this.$route.query.messageType,
      title: this.$route.query.title
    };
  },
  created() {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.onRefresh();
    });
  },
  methods: {
    async onLoad() {
      this.loadMore();
      const params = {
        messageType: this.messageType
      };
      const data = await this.$http.get(
        '/api/app/messages',
        this.getParams(params)
      );
      this.pushToList(data.list);
    },
    async onRead(item) {
      this.loadPageMessagesView(item.messageId);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
/deep/ .van-tag {
  font-size: 20px;
}
.wrapper {
  padding: 10px 15px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  background-color: white;
  .item1 {
    grid-row: 1/3;
    grid-column: 1/2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item2 {
    grid-row: 1/2;
    grid-column: 2/3;
    span {
      font-size: $size-small;
      font-weight: normal;
      color: rgba(51, 51, 51, 1);
    }
  }
  .item3 {
    grid-row: 2/3;
    grid-column: 2/3;
    margin-top: 10px;
    span {
      font-size: $size-small;
      font-weight: normal;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
