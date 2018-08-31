<template>
  <div class="container">
    <new-header :title="title">
      <div slot="left">
      <router-link tag="i" to="/repositoryTypes" class="iconfont ic-arrow-right" ></router-link>
      </div>
      <div  slot="right">
        <router-link tag="i" to="/messageTypes" class="iconfont ic-xiaoxi"></router-link>
      </div>
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
                <span class="text-l-30">{{ repositoryContent.title }} </span>
                <i class="iconfont ic-youjiantou "></i>
              </div>
              <span class="rep-content elps">{{ repositoryContent.content | delHtmlTag(repositoryContent.content)}}</span>
            </div>
          </router-link>
        </div>
        <new-no-data v-if="pageList.length===0"></new-no-data>
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
        pageList: [],
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
        }
      },
      loadData() {
        this.$http.get('/repositories?repositoryTypeId=' + this.repositoryTypeId + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((res) => {
            this.pages = res.data.pages;
            if (this.pages === 0) {
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
  .container {
    width: 720px;
    height: 100vh;
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
  }

</style>
