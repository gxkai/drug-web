<template>
  <div class="screen">
    <mt-header title="筛选">
      <router-link to="#" slot="left" style="color:white!important;">
        <mt-button icon="back" @click="$router.go(-1)" style="color:white!important;"></mt-button>
      </router-link>
      <mt-button slot="right" @click="reset">重置</mt-button>
    </mt-header>


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
  import headGreen from '@/components/headGreen';

  export default {
    name: 'screen',
    data() {
      return {
        head: '筛选',
        showDrugTitle: this.$route.query.showDrugTitle,
        pageFrom: this.$route.query.pageFrom,
        drugTypeId: this.$route.query.typeId,
        keyword: this.$route.query.keyword,
        filterData: this.$route.query.filterData

      };
    },
    components: {
      'headGreen': headGreen
    },
    created: function () {
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

  .mint-cell-value {
    width: 50%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
/*.mintui-back:beforei{color: white!important;}*/
/*.router-link-active i{color: white!important;}*/
/*.mint-header{color: white!important;}*/
</style>
