<template>
  <div class="container">
    <new-header :title="titles">
      <router-link tag="i" to="/messageTypes" class="iconfont ic-arrow-right" slot="left"></router-link>
    </new-header>
    <div class="container-main">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div v-for="item in pageList" class="message-main">
          <div class="message-date">{{formatDate(item.createdDate)}}</div>
          <div class="message-title">{{item.title}}</div>
          <div class="message-content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <new-no-data v-if="pageList.length===0"></new-no-data>
  </div>
</template>

<script>
  export default {
    name: 'messages',

    data() {
      return {
        formatDate: this.timeConvert,
        pageNum: 0,
        pageSize: 15,
        pages: null,
        pageList: [],
        loading: false,
        accountId: this.$store.getters.account.id,
        messageType: this.$route.query.messageType,
        titles: this.$route.query.titles
      };
    },
    components: {},
    created: function () {
      this.loadMore();
    },
    methods: {
      loadMore() {
        if (this.pages === null || this.pageNum <= this.pages) {
          this.pageNum++;
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      loadData() {
        this.$http.get('/messages?' + '&messageType=' + this.messageType + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.loading = true;
              return false;
            }
            this.pageList = this.pageList.concat(this.formatData(res.data.list));
          });
      },
      formatData: function (list) {
        for (let i in list) {
          list[i].createdDate = this.formatDate(list[i].createdDate);
        }
        return list;
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
    margin-top: 30px;
    flex-direction: column;
  }

  .message-date {
    font-size: 20px;
    color: rgba(102, 102, 102, 1);
    display: flex;
    justify-content: center;
  }

  .message-title {
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
    display: flex;
    margin-left: 35px;
  }

  .message-content {
    font-size: 20px;
    color: rgba(102, 102, 102, 1);
    margin-left: 35px;
    margin-right: 35px;
  }
</style>
