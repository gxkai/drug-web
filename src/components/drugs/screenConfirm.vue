<template>
  <div class="creeningConditions">
    <mt-header :title="headTitle">
      <router-link to="#" slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </router-link>
      <mt-button slot="right" @click="submit()">确定</mt-button>
    </mt-header>
    <mt-checklist align="right" title="" v-model="value" :options="options" style="flex:1!important;-webkit-box-flex: 1!important;"></mt-checklist>
  </div>
</template>


<script>
let URL_PATH = process.env.URL_PATH;
export default {
  name: 'orderDetails',
  data() {
    return {
      value: [],
      showValue: [],
      options: [],
      headTitle: '',
      showDrugTitle: this.$route.query.showDrugTitle,
      pageFrom: this.$route.query.pageFrom,
      drugTypeId: this.$route.query.typeId,
      keyword: this.$route.query.keyword,
      filterType: this.$route.query.filterType,
      filterData: this.$route.query.filterData
    };
  },
  components: {},
  created: function () {
    this.initData();
  },

  methods: {
    getRequestUrl() {
      if (this.pageFrom === 'drugType') {
        return this.getDrugTypeUrl();
      } else {
        return this.getKeywordUrl();
      }
    },
    getDrugTypeUrl() {
      let requestUrl;
      switch (Number(this.filterType)) {
        case 1:
          requestUrl = URL_PATH + '/drugs/name?drugTypeId=' + this.drugTypeId;
          break;
        case 2:
          requestUrl = URL_PATH + '/origins?drugTypeId=' + this.drugTypeId;
          break;
        case 3:
          requestUrl = URL_PATH + '/specs?drugTypeId=' + this.drugTypeId;
          break;
        case 4:
          requestUrl = URL_PATH + '/forms?drugTypeId=' + this.drugTypeId;
          break;
      }
      return requestUrl;
    },
    getKeywordUrl() {
      let requestUrl;
      switch (Number(this.filterType)) {
        case 1:
          requestUrl = URL_PATH + '/drugs/name/keyword?keyword=' + this.keyword;
          break;
        case 2:
          requestUrl = URL_PATH + '/origins/keyword?keyword=' + this.keyword;
          break;
        case 3:
          requestUrl = URL_PATH + '/specs/keyword?keyword=' + this.keyword;
          break;
        case 4:
          requestUrl = URL_PATH + '/forms/keyword?keyword=' + this.keyword;
          break;
      }
      return requestUrl;
    },

    initData() {
      this.filterData = JSON.parse(this.filterData);
      this.$http.get(this.getRequestUrl())
        .then((res) => {
          res.data.forEach((e) => {
            let val = {};
            val.label = e.name;
            val.value = e.id;
            this.options.push(val);
          });
          this.initChecked();
        });
    },

    initChecked() {
      if (!this.filterData) {
        this.filterData = {};
      }
      switch (Number(this.filterType)) {
        case 1:
          this.headTitle = '商品名/品牌';
          this.value = this.filterData.name === undefined ? [] : this.filterData.name.split(',');
          break;
        case 2:
          this.headTitle = '厂家';
          this.value = this.filterData.origin === undefined ? [] : this.filterData.origin.split(',');
          break;
        case 3:
          this.headTitle = '规格';
          this.value = this.filterData.spec === undefined ? [] : this.filterData.spec.split(',');
          break;
        case 4:
          this.headTitle = '剂型';
          this.value = this.filterData.form === undefined ? [] : this.filterData.form.split(',');
          break;
      }
    },
    submit() {
      this.options.forEach((e) => {
        let index = this.value.indexOf(e.value);
        if (index >= 0) {
          this.showValue.push(e.label);
        }
      });
      switch (Number(this.filterType)) {
        case 1:
          this.filterData.name = this.value.join(',');
          this.filterData.showName = this.showValue.join(',');
          break;
        case 2:
          this.filterData.origin = this.value.join(',');
          this.filterData.showOrigin = this.showValue.join(',');
          break;
        case 3:
          this.filterData.spec = this.value.join(',');
          this.filterData.showSpec = this.showValue.join(',');
          break;
        case 4:
          this.filterData.form = this.value.join(',');
          this.filterData.showForm = this.showValue.join(',');
          break;
      }
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
    }
  }
};
</script>
<style scoped>
  .mint-header {
    background: #1AB6FD;
    color: white
  }
  .mint-cell-title{flex:1!important;-webkit-box-flex: 1!important;}
  .mint-checkbox-label{float:right;}

</style>

