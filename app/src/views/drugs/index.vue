<template>
  <div>
    <new-layout>
      <template slot="top">
        <new-search-bar
          v-model="keyword"
          :placeholder="placeholder"
          class="hairline-bottom"
          @search="search"
        />
        <new-filter-bar
          :filters="filters"
          :active.sync="active"
          @click.native="onFilterBar"
        />
      </template>
      <template slot="center">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div v-for="(item, index) in list" :key="index" @click="interfaceType==='SHOP_DRUG' ? loadPageShopDrugs(item.id) : loadPageDrugsShops(item.id)">
              <new-white-space />
              <new-drug :item="item" disabled />
            </div>
            <new-end
              v-if="finished === true"
              :name="list.length > 0 ? '我是有底线的' : '当前暂无数据'"
            />
          </van-list>
        </van-pull-refresh>
      </template>
    </new-layout>
    <van-popup v-model="show" position="right" class="popup-wrapper">
      <new-white-space />
      <info-cell
        :desc="namesFilter"
        title="商品名称"
        is-link
        @click.native="showName = true"
      />
      <info-cell
        :desc="originsFilter"
        title="厂家"
        is-link
        @click.native="showOrigin = true"
      />
      <info-cell
        :desc="specsFilter"
        title="规格"
        is-link
        @click.native="showSpec = true"
      />
      <info-cell
        :desc="formsFilter"
        title="剂型"
        is-link
        @click.native="showForm = true"
      />
      <new-white-space size="2rem" />
      <footer>
        <span @click="onReset">
          清空
        </span>
        <span @click="onConfirm">
          确认
        </span>
      </footer>
    </van-popup>
    <van-popup v-model="showName" position="right" class="popup-wrapper">
      <info-cell title="返回" @click.native="showName = false" />
      <type-pop :result.sync="namesResult" :params="params" type="name" />
    </van-popup>
    <van-popup v-model="showOrigin" position="right" class="popup-wrapper">
      <info-cell title="返回" @click.native="showOrigin = false" />
      <type-pop :result.sync="originsResult" :params="params" type="origin" />
    </van-popup>
    <van-popup v-model="showSpec" position="right" class="popup-wrapper">
      <info-cell title="返回" @click.native="showSpec = false" />
      <type-pop :result.sync="specsResult" :params="params" type="spec" />
    </van-popup>
    <van-popup v-model="showForm" position="right" class="popup-wrapper">
      <info-cell title="返回" @click.native="showForm = false" />
      <type-pop :result.sync="formsResult" :params="params" type="form" />
    </van-popup>
  </div>
</template>
<style scope type="text/scss" lang="scss">
.popup-wrapper {
  height: 100%;
  width: 90vw;
  footer {
    display: flex;
    justify-content: space-evenly;
    span {
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      &:nth-child(1) {
        background-color: #72bd63;
      }
      &:nth-child(2) {
        background-color: #ff0000;
      }
    }
  }
}
</style>
<script>
import list from '@/mixins/list';
import infoCell from '@/components/drugs/infoCell';
import typePop from '@/components/drugs/typePop';

export default {
  name: 'GoodsList',
  components: {
    infoCell,
    typePop
  },
  mixins: [list],
  data() {
    return {
      show: false,
      showName: false,
      namesResult: [],
      showOrigin: false,
      originsResult: [],
      showSpec: false,
      specsResult: [],
      showForm: false,
      formsResult: [],
      drugTypeId: this.$route.query.typeId || '',
      keyword: this.$route.query.keyword || '',
      sort: 'SYNTHESIZE_DESC',
      placeholder: '\ue643 药品名',
      filters: ['默认', '价格最低', '销量最多', '更多筛选'],
      active: 0,
      interfaceType: this.$route.query.interfaceType,
      shopId: this.$route.query.shopId
    };
  },
  computed: {
    params() {
      return {
        keyword: this.keyword,
        drugTypeId: this.drugTypeId,
        sort: this.sort,
        commonNameId: this.commonNameId,
        originId: this.originId,
        specId: this.specId,
        formId: this.formId
      };
    },
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
    commonNameId() {
      return this.namesResult.map(e => e.id);
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
  watch: {
    keyword(n) {
      if (n === '') {
        this.onRefresh();
      }
    }
  },
  created() {
    console.log(this.keyword);
  },
  mounted() {},
  methods: {
    onFilterBar() {
      switch (this.active) {
        case 1:
          this.sort = 'PRICE_ASC';
          break;
        case 2:
          this.sort = 'SALE_DESC';
          break;
        case 3:
          this.show = true;
          return;
        default:
          this.sort = 'SYNTHESIZE_DESC';
          break;
      }
      this.onRefresh();
    },
    search() {
      this.onRefresh();
    },
    onReset() {
      this.namesResult = [];
      this.originsResult = [];
      this.specsResult = [];
      this.formsResult = [];
    },
    async onLoad() {
      this.loadMore();
      console.log(this.getParams(this.params));
      let url;
      switch (this.interfaceType) {
        case 'SHOP_DRUG':
          url = `/api/shops/${this.shopId}/drugs`;
          break;
        default:
          url = `/api/drugs`;
      }
      const data = await this.$http.get(url, this.getParams(this.params));
      this.pushToList(data.list);
      console.log(this.list);
    },
    onConfirm() {
      this.onRefresh();
      this.show = false;
    }
  }
};
</script>
