<template>
  <div class="container">
    <van-nav-bar
      :title="$route.query.title"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="$router.push('/messageTypes')"
      ref="header"
    >
      <van-icon name="chat" slot="right"/>
    </van-nav-bar>

    <div class="body-main">
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           distanceinfinite-scroll-="10">
        <div v-for="(repositoryContent,index) in pageList" class="repList">
          <router-link
            :to="{path:'/repositories/view',query:{id:repositoryContent.id,repositoryTypeId:repositoryTypeId,title:title,pageNum:index+1}}">
            <div class="repList-left">
              <div class="rep-title">
                <span class="text-l-30">{{ repositoryContent.title }} </span>
                <i class="iconfont ic-youjiantou "></i>
              </div>
              <span class="rep-content elps">{{ repositoryContent.content | delHtmlTag(repositoryContent.content)}}</span>
            </div>
          </router-link>
        </div>
        <new-no-data v-if="loadingComplete"></new-no-data>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'repositories',
    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        pageList: [],
        loading: true,
        loadingComplete: false,
        repositoryTypeId: this.$route.query.repositoryTypeId
      };
    },
    created() {
      this.loadMore();
    },
    filters: {
      delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, '');
      }
    },
    methods: {
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get('/repositories?repositoryTypeId=' + this.repositoryTypeId + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            if (res.data.list.length > 0) {
              this.pageList = this.pageList.concat(res.data.list);
              this.loading = false;
            } else {
              this.loadingComplete = true;
            }
          });
      }
    }
  };
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100vh;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .body-main {
    background: rgba(255, 255, 255, 1);
  }

  .repList-left {
    width: 646px;
    background: rgba(255, 255, 255, 1);
    margin: auto;
    margin-bottom: 50px;
  }

  .rep-title {
    width: 656px;
    font-size: 26px;
    color: rgba(0, 0, 0, 1);
    margin-top: 22px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .rep-content {
    display: block;
    width: 646px;
    font-size: 25px;
    color: rgba(102, 102, 102, 1);
    margin-top: 11px;
    margin-bottom: 16px;
    align-items: center;
  }
  .ic-youjiantou {
    font-size: 40px;
    right: 12px;
  }

</style>
