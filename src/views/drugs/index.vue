<template>
  <div class="f_body">
    <div class="f_body" style="overflow: scroll">
      <div>
        <new-header :title="showDrugTitle">
          <div slot="left" @click="$router.go(-1)">
            <i class="iconfont ic-arrow-right"></i>
          </div>
          <router-link :to="{path:'/components/search'}">
            <img src="static/img/search2.png"/></router-link>
        </new-header>
        <ul class="is-flex flex-row flex-sa p-tb-20 all-border border-bottom-grey">
          <li @click="reOrderBy('SYNTHESIZE_DESC')" class="is-flex flex-row" :class="{'blueactive1': index1==default1}">
            默认
            <div class="is-flex position-relative">
              <i class="iconfont ic-arrLeft-fill1 position-absolute position-top"></i>
              <i class="iconfont ic-arrLeft-fill position-absolute position-bottom"></i>
            </div>
          </li>

          <li @click="reOrderByPrice()" class="is-flex flex-row" :class="{'blueactive1':index2==default2}">价格
            <div class="is-flex position-relative">
              <i class="iconfont ic-arrLeft-fill1 position-absolute position-top"
                 :class="val==1?'unActive':'blueActive'"></i>
              <i class="iconfont ic-arrLeft-fill position-absolute position-bottom"
                 :class="val==1?'blueActive':'unActive'"></i>
            </div>
          </li>
          <li @click="reOrderBySales()" class="is-flex flex-row" :class="{'blueactive1':index3==default3}">
            <span>销量</span>
            <div class="is-flex position-relative">
              <i class="iconfont ic-arrLeft-fill1 position-absolute position-top"
                 :class="salesVolume==1?'unActive':'blueActive'"></i>
              <i class="iconfont ic-arrLeft-fill position-absolute position-bottom"
                 :class="salesVolume==1?'blueActive':'unActive'"></i>
            </div>
          </li>
          <li @click="conditionFilter()" class="is-flex flex-row" :class="{'blueactive1':index4==default4}">筛选条件
            <div class="is-flex position-relative">
              <i class="iconfont ic-arrLeft-fill position-absolute position-bottom"
                 :class="screen==1?'blueActive':'unActive'"></i>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <router-link v-for="(item,index) in list" :key="index"
                       :to="{path:'/drugs/shops',query:{id:item.id,drugId:item.drugId}}">
            <new-drug-shops class="border-bottom-grey" :item="item"></new-drug-shops>
          </router-link>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'goodsList',
    data() {
      return {
        list: [],
        pageNum: 0,
        pageSize: 5,
        pages: null,
        loading: false,
        process: false,
        showDrugTitle: this.$route.query.showDrugTitle,
        pageFrom: this.$route.query.pageFrom,
        drugTypeId: this.$route.query.typeId,
        keyword: this.$route.query.keyword,
        filterData: this.$route.query.filterData,
        drugSort: 'SYNTHESIZE_DESC',
        val: -1,
        salesVolume: -1,
        screen: -1,
        four: -4,
        shopCount: -1,
        index1: 1,
        index2: 2,
        index3: 3,
        index4: 3,
        default1: -1,
        default2: -2,
        default3: -3,
        default4: -4
      };
    },
    components: {},
    created() {
    },
    methods: {
      loadMore() {
        this.pageNum++;
        if (!this.pages || this.pageNum < this.pages) {
          this.loadData();
        } else {
          this.loading = true;
        }
      },
      loadData() {
        this.process = true;
        this.$http.get(this.getRequestUrl())
          .then(res => {
            this.list = this.list.concat(res.data.list);
            if (!this.pages) {
              this.pages = res.data.pages;
            }
            this.process = false;
          }).catch(error => {
            this.process = false;
            this.exception(error);
          });
      },
      reOrderBy(orderBy) {
        this.default1 = 1;
        this.default2 = 7;
        this.default3 = 7;
        this.default4 = 7;
        this.pageNum = 1;
        this.drugSort = orderBy;
        this.pageNum = 0;
        this.list = [];
        this.loadData();
      },
      reOrderByPrice() {
        this.val = -(this.val);
        if (this.val === -1) {
          this.reOrderBy('PRICE_DESC');
        } else {
          this.reOrderBy('PRICE_ASC');
        }
        this.default2 = 2;
        this.default1 = 7;
        this.default3 = 7;
        this.default4 = 7;
      },
      reOrderBySales() {
        this.salesVolume = -this.salesVolume;
        if (this.salesVolume === -1) {
          this.reOrderBy('SALE_DESC');
        } else {
          this.reOrderBy('SALE_ASC');
        }
        ;
        this.default3 = 3;
        this.default1 = 7;
        this.default2 = 7;
        this.default4 = 7;
      },
      reOrderByShopCount() {
        this.four = 4;
        this.shopCount = -this.shopCount;
        if (this.shopCount === -1) {
          this.reOrderBy('SHOP_COUNT_DESC');
        } else {
          this.reOrderBy('SHOP_COUNT_ASC');
        }
      },
      conditionFilter() {
        this.$router.push({
          path: '/drugs/screen',
          query: {
            showDrugTitle: this.showDrugTitle,
            pageFrom: this.pageFrom,
            typeId: this.drugTypeId,
            keyword: this.keyword,
            filterData: JSON.stringify(this.filterData)
          }
        });
        this.default4 = 4;
        this.default1 = 7;
        this.default2 = 7;
        this.default3 = 7;
      },

      getRequestUrl() {
        let urlArr = [];
        if (this.pageFrom === 'drugType') {
          urlArr.push('/drugs?drugTypeId=' + this.drugTypeId);
        } else {
          urlArr.push('/drugs?keyword=' + this.keyword);
        }
        if (this.filterData !== undefined) {
          if (typeof this.filterData === 'string') {
            this.filterData = JSON.parse(this.filterData);
          }
          if (this.filterData.name !== undefined) {
            urlArr.push('&name=' + this.filterData.name);
          }
          if (this.filterData.origin !== undefined) {
            urlArr.push('&origin=' + this.filterData.origin);
          }
          if (this.filterData.spec !== undefined) {
            urlArr.push('&spec=' + this.filterData.spec);
          }
          if (this.filterData.form !== undefined) {
            urlArr.push('&form=' + this.filterData.form);
          }
        }
        urlArr.push('&drugSort=' + this.drugSort + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize);
        return urlArr.join('');
      }
    }
  };
</script>
<style>
  .is-flex {
    display: flex !important;
  }

  .flex-row {
    flex-direction: row;
  }

  .flex-sa {
    justify-content: space-around;
  }

  .p-tb-20 {
    padding: 20px 0;
    box-sizing: border-box;
  }

  .position-top {
    top: -6px;
  }

  .position-bottom {
    bottom: -8px;
  }

  .border-bottom-grey {
    border-bottom: 1px #f3f3f3 solid;
  }

  .unActive {
    color: #d6cfcf !important;
  }

  .blueActive {
    color: #1AB6FD;
  }

</style>
