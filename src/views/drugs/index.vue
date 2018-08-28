<template>
  <div class="drugs">
    <div class="drugs-header" ref="header">
      <new-header>
        <div slot="left" @click="$router.go('-1')">
          <i class="iconfont ic-arrow-right"></i>
        </div>
        <div slot="center">
          <input v-model="keyword" placeholder="药品名" @keyup.enter="onSearch()">
        </div>
        <div slot="right" @click="onSearch()">
          <i class="iconfont ic-sousuo"></i>
        </div>
      </new-header>
    </div>
    <div class="drugs-filter" ref="filter">
      <div class="drugs-filter-item" @click="reOrderBy('SYNTHESIZE_DESC')">
        <div class="drugs-filter-item-text">
          默认
        </div>
        <div class="drugs-filter-item-arrow">
          <div class="drugs-filter-item-arrow-up">
          </div>
          <div class="drugs-filter-item-arrow-down">
          </div>
        </div>
      </div>
      <div class="drugs-filter-item" @click="reOrderByPrice()">
        <div class="drugs-filter-item-text">
          价格
        </div>
        <div class="drugs-filter-item-arrow">
          <div class="drugs-filter-item-arrow-up">
          </div>
          <div class="drugs-filter-item-arrow-down">
          </div>
        </div>
      </div>
      <div class="drugs-filter-item" @click="reOrderBySales()">
        <div class="drugs-filter-item-text">
          销量
        </div>
        <div class="drugs-filter-item-arrow">
          <div class="drugs-filter-item-arrow-up">
          </div>
          <div class="drugs-filter-item-arrow-down">
          </div>
        </div>
      </div>
      <div class="drugs-filter-item" @click="conditionFilter()">
        <div class="drugs-filter-item-text">
          筛选
        </div>
        <div class="drugs-filter-item-arrow">
          <!--<div class="drugs-filter-item-arrow-up">-->
          <!--</div>-->
          <div class="drugs-filter-item-arrow-down" style="margin-top: .1rem">
          </div>
        </div>
      </div>
    </div>
    <div class="drugs-container" ref="body" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0">
      <new-drug-shops class="border-bottom-grey" :item="item"
                      v-for="(item,index) in list" :key="index"></new-drug-shops>
      <new-no-data :length="list.length" v-show="loading"></new-no-data>
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
        pageSize: 15,
        loading: false,
        pageFrom: this.$route.query.pageFrom,
        drugTypeId: this.$route.query.typeId,
        keyword: this.$route.query.keyword,
        filterData: this.$route.query.filterData,
        drugSort: 'SYNTHESIZE_DESC',
        valueVolume: -1,
        salesVolume: -1
      };
    },
    components: {},
    created() {
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.filter.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    },
    methods: {
      onSearch() {
        this.onRefresh();
      },
      onReset() {
        this.list = [];
        this.pageNum = 0;
        this.loading = false;
      },
      onRefresh() {
        this.onReset();
        this.loadMore();
      },
      loadMore() {
        this.loading = true;
        this.pageNum++;
        this.$http.get(this.getRequestUrl())
          .then(res => {
            if (res.data.list.length !== 0) {
              this.list = this.list.concat(res.data.list);
              this.loading = false;
            } else {
              this.loading = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      },
      reOrderBy(orderBy) {
        this.drugSort = orderBy;
        this.onRefresh();
      },
      reOrderByPrice() {
        this.valueVolume = -(this.valueVolume);
        if (this.valueVolume === -1) {
          this.reOrderBy('PRICE_DESC');
        } else {
          this.reOrderBy('PRICE_ASC');
        }
      },
      reOrderBySales() {
        this.salesVolume = -this.salesVolume;
        if (this.salesVolume === -1) {
          this.reOrderBy('SALE_DESC');
        } else {
          this.reOrderBy('SALE_ASC');
        }
        ;
      },
      conditionFilter() {
        this.$router.push({
          path: '/drugs/screen',
          query: {
            pageFrom: this.pageFrom,
            typeId: this.drugTypeId,
            keyword: this.keyword,
            filterData: JSON.stringify(this.filterData)
          }
        });
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
            urlArr.push('&commonNames=' + this.filterData.name);
          }
          if (this.filterData.origin !== undefined) {
            urlArr.push('&originIds=' + this.filterData.origin);
          }
          if (this.filterData.spec !== undefined) {
            urlArr.push('&specIds=' + this.filterData.spec);
          }
          if (this.filterData.form !== undefined) {
            urlArr.push('&formIds=' + this.filterData.form);
          }
        }
        urlArr.push('&sort=' + this.drugSort + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize);
        return urlArr.join('');
      }
    }
  };
</script>
<style scope type="text/less" lang="less">
  .drugs {
    height: 100vh;
    width: 720px;
    &-container {
      position: relative;
    }
    &-header {
      header {
        & > div {
          &:nth-child(2) {
            input {
              width: 500px;
              height: 70px;
              outline: none;
              border-width: 0;
              font-size: 20px;
              color: black;
            }
          }
          &:nth-child(3) {
            padding-right: 10px;
          }
        }
      }
    }
    &-filter {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: HiraginoSansGB-W3;
      color: rgba(69, 69, 69, 1);
      &-item {
        display: flex;
        align-items: center;
        &-text {
          font-size: 30px;
        }
        &-arrow {
          display: flex;
          flex-direction: column;
          justify-content: center;
          &-up {
            border: 7px solid white;
            border-bottom-color: #13C1FE;
            width: 0;
            height: 0;
          }
          &-down {
            border: 7px solid white;
            border-top-color: #13C1FE;
            width: 0;
            height: 0;
            margin-top: 2px;
          }
        }
      }
    }
  }

  .border-bottom-grey {
    border-bottom: 1px #f3f3f3 solid;
  }

</style>
