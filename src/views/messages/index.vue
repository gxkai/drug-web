<template>
  <div class="f_body" style="overflow: scroll">
    <mt-header :title="titles">
      <router-link to="/messageTypes" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div style="height: 100vh;overflow: scroll;">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li class="f_message_info_list" v-for="item in pageList">
          <span style="color: #878787;">{{formatDate(item.createdDate)}}</span>
          <div class="f_message_info_list_tips">
            <div class="f_message_info_list_tips_left">
              <span style="margin: 0.5rem 0">{{item.title}}</span>
              <span style="color: #878787">{{item.content}}</span>
            </div>
          </div>
        </li>
        <div v-show="allLoaded" style="text-align: center">就这么多啦,回顶部再看看吧</div>
        <div v-show="nullLoaded" style="text-align: center">没有数据</div>
      </ul>
    </div>
  </div>
</template>

<script>
  // import timeConvert from 'static/js/timeConvert';

  export default {
    name: 'messages',

    data() {
      return {
        formatDate: this.timeConvert.formatDate,
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
    created() {
    },
    methods: {
      loadMore() {
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
  .mint-header {
    background: #1AB6FD;
    color: white;
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .f_body {
    background: #f5f5f5;
  }

  .f_message_info_list {
    padding: 0.5rem;
    background: white;
    margin-bottom: 0.5rem;
  }

  .f_message_info_list > span {
    display: block;
    text-align: center;
  }

  .f_message_info_list_tips {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .f_message_info_list_tips_left {
    display: flex;
    flex-direction: column;
  }
</style>
