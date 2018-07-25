<template>
  <div class="container">
    <new-header :title="title">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>

    <div class="body-main">
      <div class="article-body">
        <span class="article-title">{{repositoryInfo.title}}</span>
        <div class="article-tips">
          <span>来源：{{repositoryInfo.source}}</span>
          <span class="article-date">发布时间：{{repositoryInfo.createdDate}}</span>
        </div>
        <div class="article-content" v-html="repositoryInfo.content"></div>
      </div>

      <div class="article-recommend">
        <div class="recommend-body">
          <div class="recommend-icon"></div>
          <span class="recommend-title">文章推荐</span>
        </div>
        <div class="recommend-list" v-for="(repositoryRecommend,index) in repositoryRecommendsList"
             @click="recommend(repositoryRecommend.id,index);">
          <span class="recomList-title">{{repositoryRecommend.title}}</span>
          <span class="recomList-con">{{repositoryRecommend.content}}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'repositoriesView',
    data: function () {
      return {
        repositoryInfo: '',
        repositoryRecommendsList: [],
        title: '',
        id: '',
        repositoryTypeId: '',
        pageNum: 0,
        formatDate: this.timeConvert2
      };
    },
    created: function () {
      this.title = this.$route.query.title;
      this.id = this.$route.query.id;
      this.repositoryTypeId = this.$route.query.repositoryTypeId;
      this.pageNum = Number(this.$route.query.pageNum);
      this.loadMore(this.id);
      this.getList(this.pageNum);
    },
    methods: {
      loadMore(id) {
        this.$http.get('/repositories/' + id)
          .then((res) => {
            this.repositoryInfo = this.formatData(res.data);
          });
      },
      formatData(list) {
        list.createdDate = this.formatDate(list.createdDate);
        return list;
      },
      getList(pageNum) {
        this.$http.get('/repositories/recommend?repositoryTypeId=' + this.repositoryTypeId + '&pageNum=' + pageNum)
          .then((res) => {
            console.log(res.data);
            this.repositoryRecommendsList = res.data;
          });
      },
      recommend(id, index) {
        this.loadMore(id);
        this.pageNum += index + 1;
        this.getList(this.pageNum);
      }
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box
  }

  .container {
    width: 720px;
    height: 100vh;
    background: rgba(255, 255, 255, 1);
  }

  .body-main {
    width: 681px;
    height: 963px;
    background: rgba(255, 255, 255, 1);
    margin: auto;
  }

  .article-body {
    background: rgba(255, 255, 255, 1);
  }

  .article-recommend {
    width: 681px;
    height: 390px;
    background: rgba(255, 255, 255, 1);
  }

  .article-title {
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(0, 0, 0, 1);
    display: flex;
    justify-content: center;
    margin-top: 23px;
    margin-top: 27px;
  }

  .article-tips {
    height: 15px;
    font-size: 16px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 88px;
  }

  .article-date {
    margin-left: 21px;
  }

  .article-content {
    width: 681px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin-top: 50px;
  }

  .recommend-body {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 31px;
    margin-top: 33px;
  }

  .recommend-icon {
    width: 8px;
    height: 26px;
    background: rgba(19, 193, 254, 1);
  }

  .recommend-title {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
  }

  .recommend-list {
    width: 624px;
    margin: auto;
  }

  .recomList-title {
    display: block;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 8px;
  }

  .recomList-con {
    display: block;
    width: 624px;
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 29px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
