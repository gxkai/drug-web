<template>
  <div class="container">
    <new-header title="全部商品" ref="header">
      <div @click="$router.go(-1)" slot="left">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>
    <div ref="body">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="width-percent-100">
          <router-link class="border-bottom-grey" v-for="(drug,index) in list"
                       :key="index"
                       :to="{path: '/shoplistpecs', query: {id: drug.id}}">
            <div class="list-box m-auto list-full bg-white">
              <img v-lazy="getImgURL(drug.fileId,'LARGE_LOGO')"
                   class="fl drug-img d-inline-block"/>
              <div class="elpsTwo drug-title d-inline-block fl">
                {{drug.name}}
              </div>
              <div class="elps drug-country">国药准字{{drug.sfda}}</div>
              <div class="text-red drug-price">¥{{drug.price}}</div>
            </div>
          </router-link>
        </div>
      </ul>
      <new-no-data v-if="list.length===0"></new-no-data>
      <new-loading v-if="process"></new-loading>
      <new-all-data v-if="loading"></new-all-data>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'shopInfo',
    data() {
      return {
        list: [],
        page: 0,
        pageNum: 0,
        pageSize: 15,
        shopId: this.$route.query.id,
        typeId: this.$route.query.typeId,
        pages: null
      };
    },
    created: function () {
    },
    methods: {
      loadMore() {
        this.loading = false;
        if (this.pages === null || this.pageNum < this.pages) {
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      loadData() {
        this.pageNum++;
        this.process = true;
        this.$http.get('/shops/' + this.shopId + '/drugs?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&typeId=' + this.typeId).then(res => {
          this.list = this.list.concat(res.data.list);
          if (!this.pages) {
            this.pages = res.data.pages;
          }
          this.process = false;
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    }
  };
</script>
<style scoped>
  .container {
    background: #f5f5f5;
    width: 720px;
  }

  .list-full {
    height: 182px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }

  .drug-img {
    width: 216px;
    height: 154px;
    margin-right: 10px;
    margin-top: 8px;
  }

  .drug-title {
    width: 396px;
    height: 70px;
    font-size: 22px;
    color: rgba(0, 0, 0, 1);
    margin-top: 26px;
  }

  .bg-white {
    background: white;
  }

  .border-bottom-grey {
    border-bottom: 1px #f5f5f5 solid;
  }

  .drug-country {
    width: 231px;
    height: 28px;
    font-size: 22px;
    color: rgba(153, 153, 153, 1);
    margin-top: 13px;
  }

  .drug-price {
    font-size: 22px;
    color: rgba(255, 0, 0, 1);
    margin-top: 13px;
  }

  .list-box {
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>
