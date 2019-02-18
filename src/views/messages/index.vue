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
          <div v-for="item in list">
            <new-white-space/>
            <new-wing-blank class="item">
              <div class="createdDate">{{timeConvert(item.createdDate)}}</div>
              <div class="title">{{item.title}}</div>
              <div class="content">{{item.content}}</div>
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
        messageType: this.$route.query.messageType,
        title: this.$route.query.title
      };
    },
    created() {
    },
    mounted() {
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
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .item {
    background-color: white;
    display: flex;
    flex-direction: column;
    .createdDate {
      align-self: center;
      font-size: 25px;
      color: rgba(102, 102, 102, 1);
    }
    .title {
      font-size: 30px;
      color: rgba(51, 51, 51, 1);
      margin-top: 20px;
    }
    .content {
      font-size: 25px;
      color: rgba(102, 102, 102, 1);
      margin-top: 15px;
    }
  }
</style>
