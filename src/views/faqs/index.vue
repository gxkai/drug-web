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
          <!--<span class="f_question">问题地方换个地方还是如何让他输入体验会让她回头融为一体任意妄为特意让问题测试</span>-->
          <!--<span class="f_reply">回复个人用同一个地方个人同意突然有人通过浩特如何个人通过认购人同意让他有人提议回复测试</span>-->
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
        this.$http.get(this.URL_PATH + '/faqs?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            console.log(res);
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

  .f_my_question_lists {
    width: 720px;
    background: rgba(255, 255, 255, 1);
    padding-top: 10px;
    padding-left: 19px;
    padding-right: 21px;
  }

  .f_question {
    display: block;
    margin-top: 20px;
    width: 680px;
    height: 52px;
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 30px;
  }

  .f_reply {
    display: block;
    width: 680px;
    height: 43px;
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    margin-top: 17px;
    margin-bottom: 41px;
  }

</style>
