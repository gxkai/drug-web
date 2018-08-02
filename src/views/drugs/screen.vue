<!-- FIXME 字体大小 -->
<template>
  <div class="screen">

    <new-header :title="head">
      <router-link to="#" slot="left" class="iconfont ic-arrow-right text-white">
      </router-link>
      <router-link to="#" slot="right" >
        <router-link class="text-white" to="/">重置</router-link>
      </router-link>
    </new-header>

    <div class="width96 marginAuto">
      <div @click="filterSearch(1)">
        <mt-cell title="商品名/品牌" is-link :value="filterData.showName" class="elps"></mt-cell>
      </div>
      <div @click="filterSearch(2)">
        <mt-cell title="厂家" is-link :value="filterData.showOrigin" class="elps"></mt-cell>
      </div>
      <div @click="filterSearch(3)">
        <mt-cell title="规格" is-link :value="filterData.showSpec" class="elps"></mt-cell>
      </div>
      <div @click="filterSearch(4)">
        <mt-cell title="剂型" is-link :value="filterData.showForm" class="elps"></mt-cell>
      </div>
      <mt-button type="primary" size="large" class="mt5" @click="drugSearch()" style="background:#1AB6FD;margin-top:1rem;">确定</mt-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'screen',
    data() {
      return {
        head: '筛选',
        showDrugTitle: '',
        pageFrom: '',
        drugTypeId: '',
        keyword: '',
        filterData: ''
      };
    },
    components: {
    },
    created: function () {
      this.showDrugTitle = this.$route.query.showDrugTitle;
      this.pageFrom = this.$route.query.pageFrom;
      this.drugTypeId = this.$route.query.typeId;
      this.keyword = this.$route.query.keyword;
      this.filterData = this.$route.query.filterData;
      if (!this.filterData) {
        this.filterData = {};
      } else {
        this.filterData = JSON.parse(this.filterData);
      }
    },
    methods: {
      drugSearch() {
        this.$router.push({
          path: '/drugs',
          query: {
            showDrugTitle: this.showDrugTitle,
            pageFrom: this.pageFrom,
            typeId: this.drugTypeId,
            keyword: this.keyword,
            filterData: JSON.stringify(this.filterData)
          }
        });
      },
      reset() {
        this.filterData = {};
      },
      filterSearch(type) {
        this.$router.push({
          path: '/drugs/screenConfirm',
          query: {
            showDrugTitle: this.showDrugTitle,
            pageFrom: this.pageFrom,
            typeId: this.drugTypeId,
            keyword: this.keyword,
            filterType: type,
            filterData: JSON.stringify(this.filterData)
          }
        });
      }
    }
  };
</script>

<style scoped>
  header {
    background: #1AB6FD;
    color: white;
  }
  .mint-cell-value span {
    text-align: right;
  }
  .width96 {
    width: 96%;
  }
  .screen {
    margin: auto;
  }
  .screen p {
    margin-bottom: 1rem;
    width: 95%;
    margin: auto;
  }
</style>
