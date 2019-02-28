<template>
  <div>
    <new-layout class="drugs">
      <template slot="top">
        <div class="drugs-header">
          <van-icon name="arrow-left" class="drugs-header__left" size="2.5em" color="white" @click="$router.go(-1)"></van-icon>
          <form action="" onsubmit="return false;">
            <input v-model.trim="keyword" class="iconfont drugs-header__input" :placeholder="searchIcon" @keypress="search" type="search">
          </form>
          <van-icon name="sousuo" class="drugs-header__right" size="3em" color="white" @click="onRefresh()"></van-icon>
        </div>
        <div class="drugs-filter">
          <div class="drugs-filter-item" @click="OrderById()" :class="{ red:activeRed == 1}">
            <div class="drugs-filter-item-text">
              默认
            </div>
            <div class="drugs-filter-item-arrow">
              <div class="drugs-filter-item-arrow-up"
                   :style="{borderBottomColor:drugSort === 'SYNTHESIZE_DESC'? '#F60000': 'gray'} ">
              </div>
              <div class="drugs-filter-item-arrow-down"
                   :style="{borderTopColor:drugSort === 'SYNTHESIZE_DESC'? '#F60000': 'gray'} ">
              </div>
            </div>
          </div>
          <div class="drugs-filter-item" @click="OrderByPrice()" :class="{red:activeRed == 2}">
            <div class="drugs-filter-item-text">
              价格
            </div>
            <div class="drugs-filter-item-arrow">
              <div class="drugs-filter-item-arrow-up"
                   :style="{borderBottomColor:drugSort === 'PRICE_ASC'? '#F60000': 'gray'} ">
              </div>
              <div class="drugs-filter-item-arrow-down"
                   :style="{borderTopColor:drugSort === 'PRICE_DESC'? '#F60000': 'gray'} ">
              </div>
            </div>
          </div>
          <div class="drugs-filter-item" @click="OrderBySales()" :class="{ red:activeRed == 3}">
            <div class="drugs-filter-item-text">
              销量
            </div>
            <div class="drugs-filter-item-arrow">
              <div class="drugs-filter-item-arrow-up"
                   :style="{borderBottomColor:drugSort === 'SALE_ASC'? '#F60000': 'gray'} ">
              </div>
              <div class="drugs-filter-item-arrow-down"
                   :style="{borderTopColor:drugSort === 'SALE_DESC'? '#F60000': 'gray'} ">
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
      </template>
      <template slot="center">
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
      </template>
    </new-layout>
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
                    @click="onConfirm"
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
        >确定</span>
      </van-cell>
      <van-checkbox-group v-model="namesResult">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in names"
            clickable
            :key="index"
            :title="item.name"
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
        >确定</span>
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
        >确定</span>
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
        >确定</span>
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
  export default {
    name: 'goodsList',
    data() {
      return {
        activeRed: 1,
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
        drugTypeId: this.$route.params.typeId || '',
        keyword: this.$route.params.keyword || '',
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
    },
    methods: {
      search(e) {
        if (e.keyCode === 13) {
          this.onRefresh();
        }
      },
      onReset() {
        this.namesResult = [];
        this.originsResult = [];
        this.specsResult = [];
        this.formsResult = [];
      },
      onRefresh() {
        if (this.keyword === '' && this.drugTypeId === '') {
          this.$toast('请输入关键字');
          return;
        }
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      async onLoad() {
        this.pageNum++;
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyword: this.keyword,
          drugTypeId: this.drugTypeId,
          sort: this.drugSort,
          commonName: this.commonName,
          originId: this.originId,
          specId: this.specId,
          formId: this.formId
        };
        const data = await this.$http.get('/drugs', params);

        this.isLoading = false;
        this.loading = false;
        this.list = this.list.concat(data.list);
        if (data.list.length === 0) {
          this.finished = true;
        }
      },
      OrderById() {
        this.activeRed = 1;
        this.drugSort = 'SYNTHESIZE_DESC';
        this.onRefresh();
      },
      OrderByPrice() {
        this.activeRed = 2;
        if (this.drugSort === 'PRICE_DESC') {
          this.drugSort = 'PRICE_ASC';
        } else {
          this.drugSort = 'PRICE_DESC';
        }
        this.onRefresh();
      },
      OrderBySales() {
        this.activeRed = 3;
        if (this.drugSort === 'SALE_DESC') {
          this.drugSort = 'SALE_ASC';
        } else {
          this.drugSort = 'SALE_DESC';
        }
        this.onRefresh();
      },
      async filterByName() {
        const params = {
          drugTypeId: this.drugTypeId,
          originId: this.originId,
          specId: this.specId,
          formId: this.formId,
          keyword: this.keyword
        };
        this.names = await this.$http.get('/drugs/name', params);
        this.namesResult = [];
      },
      async filterByOrigin() {
        const params = {
          drugTypeId: this.drugTypeId,
          commonName: this.commonName,
          specId: this.specId,
          formId: this.formId,
          keyword: this.keyword
        };
        this.origins = await this.$http.get('/origins', params);
        this.originsResult = [];
      },
      async filterBySpec() {
        const params = {
          drugTypeId: this.drugTypeId,
          commonName: this.commonName,
          originId: this.originId,
          formId: this.formId,
          keyword: this.keyword
        };
        this.specs = await this.$http.get('/specs', params);
        this.specsResult = [];
      },
      async filterByForm() {
        const params = {
          drugTypeId: this.drugTypeId,
          commonName: this.commonName,
          originId: this.originId,
          specId: this.specId,
          keyword: this.keyword
        };
        this.forms = await this.$http.get('/forms', params);
        this.formsResult = [];
      },
      onConfirm() {
        this.onRefresh();
        this.show = false;
      }
    }
  };
</script>
<style scope type="text/scss" lang="scss">
  .red{
    color: $themeColor;
  }
  .van-icon-success:before {
    content: ""!important;
  }
  .drugs {
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
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      background-color: $themeColor;
      padding: 0 20px;
      &__left {

      }
      &__input {
        width: 500px;
        height: 45px;
        outline: none;
        border-width: 0;
        font-size: 30px!important;
        color: black;
        border-radius: 10PX;
        padding: 0 20px;
        &::placeholder {
          text-align: center;
          font-size: 30px;
        }
      }
      &__right {

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
