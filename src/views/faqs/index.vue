<template>
  <div id="bgw">

    <mt-header title="常见问题">
      <router-link to="/accounts" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(questionContent,index) in questionList">
        <div class="f_my_question_lists">
          <span  class="f_question">{{index+1}}、{{ questionContent.question }}</span>
          <span class="f_reply">{{ questionContent.answer }}</span>
        </div>
      </li>
      <div style="text-align: center" v-show="allLoaded">已经见底了</div>
      <div style="text-align: center" v-show="nullLoaded">没有数据</div>
    </ul>

  </div>
</template>

<script>
  export default {
    name: 'faqs',

    data() {
      return {
        questionList: [],
        pageSize: 10,
        pageNum: 1,
        pages: null,
        loading: false,
        allLoaded: false,
        nullLoaded: false
      };
    },

    created: function () {
      this.loadMore();
    },

    methods: {
      loadMore() {
        if (this.pages === null || this.pageNum <= this.pages) {
          this.loadData();
          this.pageNum++;
        } else {
          this.loading = true;
          this.allLoaded = true;
        }
      },
      loadData() {
        this.$http.get('/faqs?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            this.questionList = this.questionList.concat(res.data.list);
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.loading = true;
              this.nullLoaded = true;
            }
          })
          .catch((error) => {
            if (error) {
            }
          });
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box
  }
  .f_my_question_lists {
    width: 680px;
    background: rgba(255, 255, 255, 1);
    margin: auto;
  }

  .f_question {
    display: block;
    margin-top: 20px;
    width: 680px;
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 30px;
  }

  .f_reply {
    display: block;
    width: 680px;
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    margin-top: 17px;
    margin-bottom: 50px;
  }
</style>
