<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.go(-1)"
      id="header"
    />
    <div :style="contentStyle">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div v-for="item in list" class="message-main">
            <div class="message-date">{{formatDate(item.createdDate)}}</div>
            <div class="message-title">{{item.title}}</div>
            <div class="message-content">{{item.content}}</div>
          </div>
          <new-no-data v-show="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
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
        contentStyle: {
          height: 0,
          overflow: 'auto'
        },
        messageType: this.$route.query.messageType,
        title: this.$route.query.title
      };
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      onLoad() {
        this.pageNum++;
        this.$http.get('/messages', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize,
            'messageType': this.messageType
          }
        })
          .then(res => {
            this.isLoading = false;
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            console.log(this.list);
            if (res.data.list.length === 0) {
              this.finished = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .container {
    width: 720px;
    height: 100vh;
  }

  .message-main {
    width: 720px;
    background: rgba(255, 255, 255, 1);
    margin-top: 40px;
    flex-direction: column;
  }

  .message-date {
    font-size: 24px;
    color: rgba(102, 102, 102, 1);
    display: flex;
    justify-content: center;
  }

  .message-title {
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
    display: flex;
    margin-left: 35px;
    margin-top: 10px;
  }

  .message-content {
    font-size: 25px;
    color: rgba(102, 102, 102, 1);
    margin-left: 35px;
    margin-right: 35px;
    margin-top: 10px;
  }
</style>
