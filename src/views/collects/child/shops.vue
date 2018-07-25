<template>
  <div class="f_body">
    <div style="height: 100vh;overflow: scroll;">
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <router-link class="f_collect_shops_list" v-for="(items,index) in pageList"
            :to="{path:'/shops/view',query:{id:items.id}}"
            :key="index">
          <div class="f_collect_shops_lists">
              <div class="f_collect_shops_list_img">
                <img v-lazy="items.imgUrl"/>
              </div>
              <div class="f_collect_shops_list_info">
                <div>{{items.name}}</div>
                <div class="elps">{{items.area}}{{items.address}}</div>
              </div>
          </div>
        </router-link>

        <div v-show="allLoaded" style="text-align: center">就这么多啦,回顶部再看看吧</div>
        <div v-show="nullLoaded" style="text-align: center">没有数据</div>
      </ul>
    </div>
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

  .f_collect_goods_lists {
    width: 100%;
  }

  .f_collect_goods_list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .f_collect_goods_list_img {
    width: 30%;
  }

  .f_collect_goods_list_img img {
    width: 100%;
  }

  .f_collect_goods_list_info {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1%;
    border-bottom: 1px #fafafa solid;
    padding-bottom: 0.5rem;
  }

  .f_collect_goods_list_info :first-child {
    color: #525252;
  }

  .f_collect_goods_list_info :nth-child(2) {
    font-size: 1rem;
    color: #c9c9c9;
  }

  .f_collect_goods_list_info :last-child {
    color: red;
  }

  .f_body {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
  .f_collect_shops_lists {
    width: 100%;
    background: white;
    width: 100%;
    align-items: center;
    padding: 1rem 3%;
    position: relative;
    margin: 1rem 0;
  }

  .f_collect_shops_list_img {
    width: 35%;
    height: 7rem;
    position: absolute;
    left: 5%;
    top: 0.5rem;
  }

  .f_collect_shops_list_img > img {
    width: 100%;
    height: 7rem;
  }

  .f_collect_shops_list_info {
    margin-left: 45%;
    color: #111111;
  }
  .f_collect_shops_list_info div{
    height: 3rem;
    line-height: 3rem;
    font-size: 1.1rem;
  }

  .elps {
    width: 91%;
    color: #999999
  }

  .f_collect_shops_list {
    margin-bottom: 1.4rem;
  }
</style>
