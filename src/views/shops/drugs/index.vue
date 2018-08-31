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
                       :to="{path: '/shopDrugSpecs', query: {shopDrugSpecId: drug.id}}">
            <div class="wrap">
              <div class="wrap-left">
                <img :src="getImgURL(drug.fileId,'LARGE_LOGO')">
              </div>
              <div class="wrap-right">
                <div class="elps">{{drug.name}}</div>
                <div class="elps">国药准字{{drug.sfda}}</div>
                <div class="elps">¥{{drug.price}}</div>
              </div>
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
        typeId: this.$route.query.typeId || '',
        pages: null,
        process: false,
        loading: false
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
<style scoped type="text/less" lang="less">
  .container {
    background: #f5f5f5;
    width: 720px;
  }


  .border-bottom-grey {
    border-bottom: 1px #f5f5f5 solid;
  }

  .wrap {
    display: flex;
    width: 100%;
    background-color: white;
    margin-bottom: 10px;
    &-left {
      width: 200px;
      padding: 20px;
      img {
        width: 100%;
      }
    }
    &-right {
      width: 400px;
      padding: 20px;
      align-self: center;
      &>div{
        padding: 5px;
        &:nth-child(1) {
          color: black;
          font-size: 28px;
        }
        &:nth-child(2) {
          color: #cccccc;
          font-size: 25px;
        }
        &:nth-child(3) {
          color: red;
          font-size: 24px;
        }
      }
    }
  }
</style>
