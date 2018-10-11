<template>
  <div class="drugs">
    <div id="header">
      <div class="drugs-header">
        <new-header>
          <div slot="left" @click="$router.go('-1')">
            <i class="iconfont ic-arrow-right"></i>
          </div>
          <div slot="center">
            <input v-model="keyword" class="iconfont" :placeholder="searchIcon" @keyup.enter="onRefresh()">
          </div>
          <div slot="right" @click="onRefresh()">
            <i class="iconfont ic-sousuo"></i>
          </div>
        </new-header>
      </div>
      <div class="drugs-filter">
        <div class="drugs-filter-item" @click="OrderById()">
          <div class="drugs-filter-item-text">
            默认
          </div>
          <div class="drugs-filter-item-arrow">
            <div class="drugs-filter-item-arrow-up"
                 :style="{borderBottomColor:drugSort === 'SYNTHESIZE_DESC'? '#13C1FE': 'gray'} ">
            </div>
            <div class="drugs-filter-item-arrow-down"
                 :style="{borderTopColor:drugSort === 'SYNTHESIZE_DESC'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="drugs-filter-item" @click="OrderByPrice()">
          <div class="drugs-filter-item-text">
            价格
          </div>
          <div class="drugs-filter-item-arrow">
            <div class="drugs-filter-item-arrow-up"
                 :style="{borderBottomColor:drugSort === 'PRICE_ASC'? '#13C1FE': 'gray'} ">
            </div>
            <div class="drugs-filter-item-arrow-down"
                 :style="{borderTopColor:drugSort === 'PRICE_DESC'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="drugs-filter-item" @click="OrderBySales()">
          <div class="drugs-filter-item-text">
            销量
          </div>
          <div class="drugs-filter-item-arrow">
            <div class="drugs-filter-item-arrow-up"
                 :style="{borderBottomColor:drugSort === 'SALE_ASC'? '#13C1FE': 'gray'} ">
            </div>
            <div class="drugs-filter-item-arrow-down"
                 :style="{borderTopColor:drugSort === 'SALE_DESC'? '#13C1FE': 'gray'} ">
            </div>
          </div>
        </div>
        <div class="drugs-filter-item" @click="show = true">
          <div class="drugs-filter-item-text">
            筛选
          </div>
          <div class="drugs-filter-item-arrow">
            <div class="drugs-filter-item-arrow-up">
            </div>
            <div class="drugs-filter-item-arrow-down" style="margin-top: .1rem">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :style="contentStyle">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          class="drugs-container"
        >
          <new-drug-item class="border-bottom-grey" :item="item"
                         v-for="(item,index) in list" :key="index"></new-drug-item>
          <new-no-data v-if="finished"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup v-model="show" position="right"
               class="drugs--popup"
    >
      <van-cell-group>
        <van-cell>
          <span slot="title" class="drugs--popup--filter">筛选</span>
        </van-cell>
        <van-cell title="商品名称" is-link
                  :value="namesFilter"
                  @click="showName = true; filterByName()"
        />
        <van-cell title="厂家" is-link
                  :value="originsFilter"
                  @click="showOrigin = true; filterByOrigin()"
        />
        <van-cell title="规格" is-link
                  :value="specsFilter"
                  @click="showSpec = true; filterBySpec()"
        />
        <van-cell title="剂型" is-link
                  :value="formsFilter"
                  @click="showForm = true; filterByForm()"
        />
      </van-cell-group>
      <van-row type="flex" justify="space-around"
               class="drugs--popup--bottom"
      >
        <van-button type="default"
                    @click="onReset"
        >重置
        </van-button>
        <van-button type="primary"
                    @click="onRefresh"
        >确认
        </van-button>
      </van-row>
    </van-popup>
    <van-popup
      v-model="showName" position="right"
      class="drugs--popup"
    >
      <van-cell
      >
        <span slot="title"
              class="drugs--popup--filter"
              @click="showName = false"
        >返回</span>
      </van-cell>
      <van-checkbox-group v-model="namesResult">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in names"
            clickable
            :key="index"
            :title="`${item.name}`"
            @click="$refs.names[index].toggle()"
          >
            <van-checkbox :name="item" ref="names"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <van-popup
      v-model="showOrigin" position="right"
      class="drugs--popup"
    >
      <van-cell
      >
        <span slot="title"
              class="drugs--popup--filter"
              @click="showOrigin = false"
        >返回</span>
      </van-cell>
      <van-checkbox-group v-model="originsResult">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in origins"
            clickable
            :key="index"
            :title="`${item.name}`"
            @click="$refs.origins[index].toggle()"
          >
            <van-checkbox :name="item" ref="origins"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <van-popup
      v-model="showSpec" position="right"
      class="drugs--popup"
    >
      <van-cell
      >
        <span slot="title"
              class="drugs--popup--filter"
              @click="showSpec = false"
        >返回</span>
      </van-cell>
      <van-checkbox-group v-model="specsResult">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in specs"
            clickable
            :key="index"
            :title="`${item.name}`"
            @click="$refs.specs[index].toggle()"
          >
            <van-checkbox :name="item" ref="specs"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <van-popup
      v-model="showForm" position="right"
      class="drugs--popup"
    >
      <van-cell
      >
        <span slot="title"
              class="drugs--popup--filter"
              @click="showForm = false"
        >返回</span>
      </van-cell>
      <van-checkbox-group v-model="formsResult">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in forms"
            clickable
            :key="index"
            :title="`${item.name}`"
            @click="$refs.forms[index].toggle()"
          >
            <van-checkbox :name="item" ref="forms"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
  </div>
</template>

<script>
  const qs = require('qs');
  export default {
    name: 'goodsList',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        contentStyle: {
          height: 0,
          overflow: 'auto'
        },
        show: false,
        showName: false,
        names: [],
        namesResult: [],
        showOrigin: false,
        origins: [],
        originsResult: [],
        showSpec: false,
        specs: [],
        specsResult: [],
        showForm: false,
        forms: [],
        formsResult: [],
        drugTypeId: this.$route.query.typeId || '',
        keyword: this.$route.query.keyword || '',
        drugSort: 'SYNTHESIZE_DESC',
        searchIcon: '\ue64c 药品名'
      };
    },
    components: {},
    computed: {
      namesFilter() {
        return this.namesResult.map(e => e.name).join(',');
      },
      originsFilter() {
        return this.originsResult.map(e => e.name).join(',');
      },
      specsFilter() {
        return this.specsResult.map(e => e.name).join(',');
      },
      formsFilter() {
        return this.formsResult.map(e => e.name).join(',');
      },
      commonName() {
        return this.namesResult.map(e => e.name);
      },
      originId() {
        return this.originsResult.map(e => e.id);
      },
      specId() {
        return this.specsResult.map(e => e.id);
      },
      formId() {
        return this.formsResult.map(e => e.id);
      }
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
    },
    methods: {
      onReset() {
        this.namesResult = [];
        this.originsResult = [];
        this.specsResult = [];
        this.formsResult = [];
      },
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      onLoad() {
        this.pageNum++;
        console.log(this.commonName, this.originId, this.specId, this.formId);
        this.$http.get('/drugs', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyword: this.keyword,
            drugTypeId: this.drugTypeId,
            sort: this.drugSort,
            commonName: this.commonName,
            originId: this.originId,
            specId: this.specId,
            formId: this.formId
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          }
        })
          .then(res => {
            this.isLoading = false;
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            if (res.data.list.length === 0) {
              this.finished = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      },
      OrderById() {
        this.drugSort = 'SYNTHESIZE_DESC';
        this.onRefresh();
      },
      OrderByPrice() {
        if (this.drugSort === 'PRICE_DESC') {
          this.drugSort = 'PRICE_ASC';
        } else {
          this.drugSort = 'PRICE_DESC';
        }
        this.onRefresh();
      },
      OrderBySales() {
        if (this.drugSort === 'SALE_DESC') {
          this.drugSort = 'SALE_ASC';
        } else {
          this.drugSort = 'SALE_DESC';
        }
        this.onRefresh();
      },
      filterByName() {
        this.$http.get('/drugs/name', {
          params: {
            drugTypeId: this.drugTypeId,
            originId: this.originId,
            specId: this.specId,
            formId: this.formId
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          }
        })
          .then(res => {
            this.namesResult = [];
            this.names = res.data;
          }).catch(error => {
            this.exception(error);
          });
      },
      filterByOrigin() {
        this.$http.get('/origins', {
          params: {
            drugTypeId: this.drugTypeId,
            commonName: this.commonName,
            specId: this.specId,
            formId: this.formId
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          }
        })
          .then(res => {
            this.originsResult = [];
            this.origins = res.data;
          }).catch(error => {
            this.exception(error);
          });
      },
      filterBySpec() {
        this.$http.get('/specs', {
          params: {
            drugTypeId: this.drugTypeId,
            commonName: this.commonName,
            originId: this.originId,
            formId: this.formId
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          }
        })
          .then(res => {
            this.specsResult = [];
            this.specs = res.data;
          }).catch(error => {
            this.exception(error);
          });
      },
      filterByForm() {
        this.$http.get('/forms', {
          params: {
            drugTypeId: this.drugTypeId,
            commonName: this.commonName,
            originId: this.originId,
            specId: this.specId
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          }
        })
          .then(res => {
            this.formsResult = [];
            this.forms = res.data;
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>
<style scope type="text/less" lang="less">
  .drugs {
    width: 720px;
    &--popup {
      height: 200vh;
      width: 50vw;
      &--bottom {
        position: absolute;
        bottom: 100px;
        width: 100%;
      }
      &--filter {
        color: #000000 !important;
        font-weight: bold !important;
        font-size: 25px;
      }
    }
    &-container {
      position: relative;
    }
    &-header {
      header {
        & > div {
          &:nth-child(2) {
            input {
              width: 500px;
              height: 55px;
              outline: none;
              border-width: 0;
              font-size: 30px;
              color: black;
              border-radius: 10PX;
              padding: 0 20px;
              &::placeholder {
                text-align: center;
              }
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
            width: 0;
            height: 0;
          }
          &-down {
            border: 7px solid white;
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
