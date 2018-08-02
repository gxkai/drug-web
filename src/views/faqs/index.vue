<template>
  <div class="container">
    <new-header title="常见问题">
      <router-link tag="i" to="/accounts" class="icon-font ic-arrow-right" slot="left"></router-link>
    </new-header>

    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(questionContent,index) in questionList">
        <div class="my-question-lists">
          <span  class="question">{{index+1}}、{{ questionContent.question }}</span>
          <span class="reply">{{ questionContent.answer }}</span>
        </div>
      </li>
      <new-no-data v-if="questionList.length===0"></new-no-data>
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
        loading: false
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
        }
      },
      loadData() {
        this.$http.get('/faqs?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            this.questionList = this.questionList.concat(res.data.list);
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.loading = true;
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
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }
  .container{
    width:720px;
    height:100vh;
  }
  .my-question-lists {
    width: 680px;
    background: rgba(255, 255, 255, 1);
    margin: auto;
  }

  .question {
    display: block;
    margin-top: 20px;
    width: 680px;
    font-size: 22px;

    color: rgba(102, 102, 102, 1);
    line-height: 30px;
  }

  .reply {
    display: block;
    width: 680px;
    font-size: 20px;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    margin-top: 17px;
    margin-bottom: 50px;
  }
</style>
