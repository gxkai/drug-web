<template>
  <div class="container">
    <new-header title="全部商品" :style="{background:bgColor,color:color}">
      <div  @click="$router.go(-1)" slot="left" :style="{color:leftColor}">
      <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="width-percent-100">
        <router-link class="border-bottom-grey" v-for="(drug,index) in drugs"
                     :key="index"
                     :to="{path: '/shopDrugSpecs', query: {id: drug.id}}">
          <div class="drugs-box m-auto drugs-full bg-white">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3990342075,2367006974&fm=200&gp=0.jpg"
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
    <new-no-data v-if="drugs.length===0"></new-no-data>
  </div>
</template>
<script>
  export default {
    name: 'shopInfo',
    data() {
      return {
        bgColor: 'white',
        color: '#333333',
        leftColor: '#333333',
        drugs: [],
        page: 0,
        nodata: true,
        pageNum: 0,
        pageSize: 15,
        shopId: '',
        typeId: '',
        pages: null
      };
    },
    created: function () {
      this.shopId = this.$route.query.id;
      if (typeof (this.$route.query.typeId) !== 'undefined') {
        this.typeId = this.$route.query.typeId;
      }
    },
    props: {
      title: {
        default: '春天大药房'
      },
      tel: {
        default: '13020141411'
      },
      address: {
        default: '地址：昆山市长江路10号'
      }
    },
    methods: {
      loadMore() {
        this.loading = false;
        if (this.pages === null || this.pageNum < this.pages) {
          if (this.typeId) {
            this.loadData();
          } else {
            this.loadData();
          }
        } else {
          this.loading = true;
        }
      },
      loadData() {
        this.pageNum++;
        this.$http.get('/shops/' + this.shopId + '/drugs?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&typeId=' + this.typeId).then(res => {
          this.pages = res.data.pages;
          if (this.pages === 0) {
            this.loading = true;
            return false;
          }
          this.drugs = this.drugs.concat(res.data.list);
        });
      }
    }
  };
</script>
<style scoped>
  .container {
    background: #f5f5f5;
    width: 720px;
  }

  .drugs-full {
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

  .drugs-box {
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>
