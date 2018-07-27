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

        <div v-show="allLoaded" style="text-align: center">就这么多啦,回顶部再看看吧</div>
        <div v-show="nullLoaded" style="text-align: center">没有数据</div>
      </div>
    </div>
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
        allLoaded: false,
        pageList: [],
        nullLoaded: false,
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
        console.log('12312312');
        if (this.pages === null || this.pageNum <= this.pages) {
          this.pageNum++;
          this.loadData();
        } else {
          this.loading = true;
          this.allLoaded = true;
        }
      },
      loadData() {
        this.$http.get('/messages?' + '&messageType=' + this.messageType + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then((res) => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.nullLoaded = true;
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
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    display: flex;
    justify-content: center;
  }

  .message-title {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    display: flex;
    margin-left: 35px;
  }

  .message-content {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    margin-left: 35px;
    margin-right: 35px;
  }
</style>
