<template>
  <div class="container">
    <new-header :title="title">
      <router-link tag="i" to="/repositoryTypes" class="iconfont ic-arrow-right" slot="left"></router-link>
      <router-link tag="i" to="/messageTypes" class="iconfont ic-xiaoxi" slot="right"></router-link>
    </new-header>

    <div class="body-main">
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           distanceinfinite-scroll-="10">
        <div v-for="(repositoryContent,index) in pageList" class="repList">
          <router-link
            :to="{path:'/repositories/view',query:{id:repositoryContent.id,repositoryTypeId:repositoryTypeId,title:title,pageNum:index+1}}">
            <div class="repList-left">
              <div class="rep-title">
                <span>{{ repositoryContent.title }} </span>
                <i class="iconfont ic-youjiantou "></i>
              </div>
              <span class="rep-content">{{ repositoryContent.content | delHtmlTag(repositoryContent.content)}}</span>
            </div>
          </router-link>
        </div>
        <div v-show="allLoaded" style="text-align: center;font-size:15px;font-family:HiraginoSansGB-W3;">...就这么多啦!
          回顶部再看看吧!
        </div>
        <div v-show="nullLoaded" style="text-align: center">没有数据</div>
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
        pages: null,
        allLoaded: false,
        pageList: [],
        nullLoaded: false,
        loading: false,
        repositoryTypeId: this.$route.query.repositoryTypeId,
        title: this.$route.query.title
      };
    },
    created() {
    },
    filters: {
      delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, '');
      }
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
        this.$http.get('/repositories?repositoryTypeId=' + this.repositoryTypeId + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
              this.nullLoaded = true;
              this.loading = true;
              return false;
            }
            this.pageList = this.pageList.concat(res.data.list);
            for (let i in this.pageList.size()) {
              this.pageList[i].imgUrl = this.getImgURL(this.pageList[i].fileId, 'LOGO');
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

  .container {
    width: 720px;
    height: 100vh;
  }

  .body-main {
    width: 720px;
    height: 1203px;
    background: rgba(255, 255, 255, 1);

  }

  .repList-left {
    width: 646px;
    background: rgba(255, 255, 255, 1);
    margin: auto;
  }

  .rep-title {
    display: block;
    width: 656px;
    font-size: 26px;
    font-family: HiraginoSansGB-W3;
    color: rgba(0, 0, 0, 1);
    margin-top: 22px;
    display: flex; /*左对齐*/
    flex-direction: row; /**/
    justify-content: space-between;
    align-items: center;
  }

  .rep-content {
    display: block;
    width: 646px;
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    margin-top: 11px;
    margin-bottom: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
  }

</style>
