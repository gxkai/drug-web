<template>
  <div class="shop-container ">
    <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <router-link v-for="(items,index) in pageList"
                 :to="{path:'/shops/view',query:{id:items.id}}"
                 :key="index">
      <article class="media">
        <div class="media-left">
          <figure>
            <img class="is-208x149" v-lazy="items.imgUrl" alt="Image">
          </figure>
        </div>
        <div class="media-content border-bottom-EEEEEE">
          <div class="content is-flex shop-right">
            <p>
              <strong>{{items.name}}</strong>
            </p>
            <p class="elps">
              {{items.area}} {{items.address}}
            </p>
          </div>
        </div>
      </article>
    </router-link>
    <div v-show="allLoaded">就这么多啦,回顶部再看看吧</div>
    <div v-show="nullLoaded">没有数据</div>
    </ul>
    </div>
</template>

<script>
  // import {getImages} from '@/util/images';
  export default {
    name: 'collectShop',
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
        this.$http.get('/collects/shop?' + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize, {
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
            this.pageList.forEach(e => { e.imgUrl = this.$http.get(this.getImgURL(e.fileId, 'LOGO')); });
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

  .shop-container{
    width: 720px;
    height: 100vh;
    overflow: scroll;
  }
  .shop-right{
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
