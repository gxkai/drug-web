<template>
  <div class="f_body">
    <div class="f_body" style="overflow: scroll">
      <div style="color:white;position:fixed;top:0px;width:100%;z-index:999999;">

        <mt-header :title="showDrugTitle" style="background:#1AB6FD;">
          <router-link to="/drugTypes" slot="left" style="color:white">
            <mt-button icon="back" style="color:white"></mt-button>
          </router-link>
          <mt-button slot="right">
            <router-link :to="{path:'/components/search'}">
              <img src="static/img/search2.png" class="width-65 mt1"/></router-link>
          </mt-button>
        </mt-header>

        <div class="header1">
          <ul class="disFix">

            <li @click="reOrderBy('SYNTHESIZE_LESS')" style="display:flex;" :class="{'blueactive1': index1==default1}">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;默认
              <div class="d_drugs_index" style="display:none;">
                <i class="icon iconfont ic-arrLeft-fill1 blueActiver" style="display:block;"></i>
                <i class="icon iconfont ic-arrLeft-fill blueActiver"></i>
              </div>
            </li>


            <li @click="reOrderByPrice()" :class="{'blueactive1':index2==default2}" style="display:flex;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价格
              <div class="d_drugs_index">
                <i class="icon iconfont ic-arrLeft-fill1" :class="val==1?'samespan':'blueActiver'"
                   style="display:block;"></i>
                <i class="icon iconfont ic-arrLeft-fill" :class="val==1?'blueActiver':'samespan'"></i>
              </div>
            </li>
            <li @click="reOrderBySales()" :class="{'blueactive1':index3==default3}" style="display:flex;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销量
              <div class="d_drugs_index">
                <i class="icon iconfont ic-arrLeft-fill1" :class="salesVolume==1?'samespan':'blueActiver'"
                   style="display:block;"></i>
                <i class="icon iconfont ic-arrLeft-fill" :class="salesVolume==1?'blueActiver':'samespan'"></i>
              </div>
            </li>
            <li @click="conditionFilter()" :class="{'blueactive1':index4==default4}" style="display:flex;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;筛选条件
              <div>
                <i class="icon iconfont ic-arrLeft-fill" :class="screen==1?'blueActiver':'samespan'"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="clear:both;height:8rem;"></div>
      <div  style="height: 100vh" >
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <router-link class="f_shop_all_drugs_list" v-for="(item,index) in pageList"
                       :key="index"
                       :to="{path:'/drugs/shops',query:{id:item.id,specId:item.drugSpecId}}">
            <div class="f_shop_all_drugs_list_left">
              <img v-lazy = "item.imgUrl" alt=""/>
            </div>
            <div class="f_shop_all_drugs_list_right">
              <span class="d_shop_all_list">{{item.name}}</span>
              <span class="d_shop_all_color">{{item.sfda}}</span>
              <div class="f_shop_all_drugs_list_right_tips">
                <span>&yen; {{item.price}}</span>
                <span>{{item.shopCount}}个商家在售</span>
              </div>
            </div>
          </router-link>
          <div v-show="allLoaded" style="text-align: center">就这么多啦,回顶部再看看吧</div>
          <div v-show="nullLoaded" style="text-align: center">没有数据</div>
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
        pageNum: 0,
        pageSize: 15,
        totalPage: 0,
        pageList: [],
        allLoaded: false,
        bottomPullText: '上拉加载更多',
        showDrugTitle: this.$route.query.showDrugTitle,
        pageFrom: this.$route.query.pageFrom,
        drugTypeId: this.$route.query.typeId,
        keyword: this.$route.query.keyword,
        filterData: this.$route.query.filterData,
        drugSort: 'SYNTHESIZE_LESS',
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
        default4: -4,
        pages: null,
        nullLoaded: false
      };
    },
    components: {
    },

    created: function () {
    },
    methods: {
      loadMore() {
        this.loading = false;
        if (this.pages === null || this.pageNum < this.pages) {
          this.pageNum++;
          this.initData();
        } else {
          this.loading = true;
          this.allLoaded = true;
        }
      },
      showPics() {
        this.pageList.forEach((e) => {
          if (e.imgUrl === undefined) {
            e.imgUrl = '/files/' + e.fileId + '/image?resolution=LARGE_LOGO';
          }
        });
      },

      initData() {
        this.$http.get(this.getRequestUrl())
          .then(res => {
            if (this.pages === 0) {
              this.nullLoaded = true;
              this.loading = true;
            }
            this.pageList = this.pageList.concat(res.data.list);
            this.totalPage = res.data.lastPage;
            this.pages = res.data.pages;
            this.showPics();
          });
      },
      reOrderBy(orderBy) {
        this.default1 = 1;
        this.default2 = 7;
        this.default3 = 7;
        this.default4 = 7;
        this.pageNum = 1;
        this.drugSort = orderBy;
        this.allLoaded = false;
        this.pageNum = 0;
        this.pageList = [];
        this.initData();
      },
      reOrderByPrice() {
        this.val = -(this.val);
        if (this.val === -1) {
          this.reOrderBy('PRICE_LESS');
        } else {
          this.reOrderBy('PRICE_MORE');
        }
        ;
        this.default2 = 2;
        this.default1 = 7;
        this.default3 = 7;
        this.default4 = 7;
      },
      reOrderBySales() {
        this.salesVolume = -this.salesVolume;
        if (this.salesVolume === -1) {
          this.reOrderBy('SALE_LESS');
        } else {
          this.reOrderBy('SALE_MORE');
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
          this.reOrderBy('QUOTATION_LESS');
        } else {
          this.reOrderBy('QUOTATION_MORE');
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
        // 页面来源
        if (this.pageFrom === 'drugType') {
          urlArr.push('/drugs?drugTypeId=' + this.drugTypeId);
        } else {
          urlArr.push('/drugs/search?keyword=' + this.keyword);
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
<style lang="scss">
  /*@import 'static/scss/common.scss';*/

  .header {
    background: #1AB6FD;
    width: 100%;
  }

  .header1 {
    background: white;
  }

  .disFix li {
    color: #333333;
  }

  .mint-header {
    background: #1AB6FD !important;
    color: white;
    height: 4rem;
  }

  .samespan {
    width: 10px;
    margin-bottom: 0.2rem;
    color: #d6cfcf !important;
    display: inline-block;
    font-size: 1.6rem;
  }

  .blueActiver {
    color: #1AB6FD !important;
    width: 10px;

    display: inline-block;
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
  }

  .disFix {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .disFix li {
    flex: 1;
    float: right;
    height: 4rem;
    line-height: 4rem;
  }

  .disFix li:last-child {
    flex: 1.5;
  }

  .shopimg {
    height: 8rem;
  }

  .ii {
    color: #1AB6FD !important;
    font-style: normal;
  }

  .f_shop_all_drugs_lists {
    padding-bottom: 1rem;
  }

  .f_shop_all_drugs_list {
    background: white;
    box-sizing: border-box;
    padding: 0 0.5rem 0.5rem 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    border-bottom: 1px #F5F5F5 solid;
  }

  .f_shop_all_drugs_list_left {
    width: 30%;
  }

  .f_shop_all_drugs_list_left > img {
    width: 8rem;
    height: 8rem;
  }

  .f_shop_all_drugs_list_right {
    width: 68%;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .f_shop_all_drugs_list_right > span {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .f_shop_all_drugs_list_right :nth-child(3) {
    color: #afafaf;
    margin-top: 0.5rem;
  }

  .f_shop_all_drugs_list_right_tips {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  .f_shop_all_drugs_list_right_tips :first-child {
    color: red;
  }

  .d_drugs_index {
    flex: 1;
    margin-top: -2px;
    line-height: 0.5rem;
    margin-top: 1.5rem !important;
  }

  .mint-button-icon i {
    color: white !important;
  }

  .d_shop_all_list {
    margin-top: -2.2rem !important;
    height: 3rem;
    font-size: 1.1rem !important;
    line-height: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .mint-loadmore-content {
    margin-top: 1rem;
  }

  .d_shop_all_color {
    color: #999999;
  }

  .blueactive1 {
    color: #1AB6FD !important;
  }
</style>
