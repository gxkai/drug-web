<template>
  <div class="container">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="container-main">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div v-for="item in pageList" class="message-main">
          <div class="message-date">{{formatDate(item.createdDate)}}</div>
          <div class="message-title">{{item.title}}</div>
          <div class="message-content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <new-no-data v-if="loadingComplete"></new-no-data>
  </div>
</template>

<script>
  export default {
    name: 'messages',

    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        pageList: [],
        loading: true,
        loadingComplete: false,
        messageType: this.$route.query.messageType,
        titles: this.$route.query.titles
      };
    },
    components: {},
    created() {
      this.loadMore();
    },
    methods: {
      loadMore() {
        this.$http.get('/messages?' + '&messageType=' + this.messageType + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            if (res.data.list.length > 0) {
              this.pageList = this.pageList.concat(this.formatData(res.data.list));
              this.loading = false;
            } else {
              this.loadingComplete = true;
            }
          })
          .catch(err => {
            this.exception(err);
          });
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

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
