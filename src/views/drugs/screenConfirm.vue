<!-- FIXME 字体大小 -->
<template>
  <div class="creeningConditions">
    <new-header>
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont ic-arrow-right"></i>
      </div>
      <div @click="submit()" slot="right">
        <span>确定</span>
      </div>
    </new-header>
    <mt-checklist align="right" title="" v-model="value" :options="options" style="flex:1!important;-webkit-box-flex: 1!important;"></mt-checklist>
  </div>
</template>


<script>
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
            requestUrl = '/drugs/name?drugTypeId=' + this.drugTypeId;
            break;
          case 2:
            requestUrl = '/origins?drugTypeId=' + this.drugTypeId;
            break;
          case 3:
            requestUrl = '/specs?drugTypeId=' + this.drugTypeId;
            break;
          case 4:
            requestUrl = '/forms?drugTypeId=' + this.drugTypeId;
            break;
        }
        return requestUrl;
      },
      getKeywordUrl() {
        let requestUrl;
        switch (Number(this.filterType)) {
          case 1:
            requestUrl = '/drugs/name/keyword?keyword=' + this.keyword;
            break;
          case 2:
            requestUrl = '/origins/keyword?keyword=' + this.keyword;
            break;
          case 3:
            requestUrl = '/specs/keyword?keyword=' + this.keyword;
            break;
          case 4:
            requestUrl = '/forms/keyword?keyword=' + this.keyword;
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
          }).catch(error => {
            this.exception(error);
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

