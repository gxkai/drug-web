<template>
  <new-layout
  >
    <template slot="top">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div v-for="item in list" @click="onRead(item)">
            <new-wing-blank class="item" py="3em">
                <div class="item1">
                  <van-tag :type="item.isRead?'success':'danger'" size="large">{{item.isRead?'已读':'未读'}}</van-tag>
                </div>
                <div class="item2">
                  <span>{{item.title}}</span>
                </div>
                <div class="item3">
                  <span>{{timeConvert(item.createdDate)}}</span>
                </div>
            </new-wing-blank>
          </div>
          <new-no-data v-show="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </template>
  </new-layout>
</template>

<script>
  export default {
    name: 'messages',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        messageType: this.$route.params.messageType,
        title: this.$route.params.title
      };
    },
    created() {
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.onRefresh();
      });
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      async onLoad() {
        this.pageNum++;
        const params = {
          'pageNum': this.pageNum,
          'pageSize': this.pageSize,
          'messageType': this.messageType
        };
        const data = await this.$http.get('/messages', params);
        this.isLoading = false;
        this.loading = false;
        this.list = this.list.concat(data.list);
        console.log(this.list);
        if (data.list.length === 0) {
          this.finished = true;
        }
      },
      async onRead(item) {
        await this.$http.put(`/messages/read?messageId=${item.messageId}`);
        item.isRead = true;
        this.$router.push({ name: `/messages/view`, params: { messageId: item.messageId } });
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  /deep/ .van-tag {
    font-size: 20px;
  }
  .item {
    display: grid;
    grid-template-columns: 100px auto;
    background-color: white;
    border-bottom: 1Px solid #999999;
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
        font-size: 13px;
        font-weight:normal;
        color:rgba(51,51,51,1);
      }
    }
    .item3 {
      grid-row: 2/3;
      grid-column: 2/3;
      span {
        font-size:10px;
        font-weight:normal;
        color:rgba(102,102,102,1);
      }
    }
  }
</style>
