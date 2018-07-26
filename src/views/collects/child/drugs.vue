<template>
  <div class="drug-container">
    <router-link v-for="(item,index) in pageList"
                 :to="{path:'/shopDrugSpecs?id=1',query:{id:item.shopDrugSpecId}}"
                 :key="index">
      <article class="media">
        <div class="media-left">
          <figure class="image is-208x149">
            <img v-lazy="item.imgUrl" class="is-208x149" alt="Image">
          </figure>
        </div>
        <div class="media-content border-bottom-EEEEEE">
          <div class="content is-flex drug-right">
            <span>
              <strong>[{{item.name}}]{{item.spec}}</strong>
            </span>
            <span class="elps">
              商家：{{item.shopName}}
            </span>
            <span class="text-red">
              &yen; {{item.price}}
            </span>
          </div>
        </div>
      </article>
    </router-link>
    <div v-show="allLoaded">就这么多啦,回顶部再看看吧</div>
    <div v-show="nullLoaded">没有数据</div>
  </div>

</template>


<script>
  export default {
    name: 'collectDrugs',
    data() {
      return {
        pageNum: 0,
        pageSize: 15,
        pages: null,
        allLoaded: false,
        pageList: [],
        nullLoaded: false,
        loading: false,
        accountId: this.$store.getters.account.id
      };
    },
    components: {},
    created() {
      this.loadMore();
    },
    methods: {
      loadMore() {
        if (this.pages === null || this.pageNum < this.pages) {
          this.pageNum++;
          this.loadData();
        } else {
          this.loading = true;
          this.allLoaded = true;
          this.loadData();
        }
      },
      loadData() {
        this.$http.get('/collects/drug?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize, {
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
            this.pageList = this.pageList.concat(res.data.list);
            // getImages(this.pageList, this);
          });
      }
    }
  };
</script>

<style scoped>
  .mint-header {
    background: white;
    color: black
  }

  .drug-container{
    width: 720px;
    height: 100vh;
  }
  .drug-right{
    height: 149px;
    flex-direction: column;
    justify-content: space-around;
  }
  .is-208x149{
    width:208px;
    height:149px;
  }
  .media{
    padding: 5px;
    box-sizing: border-box;
  }

</style>
