<template>
  <div class="main">
    <div class="bar" ref="header">
      <div class="out">
        <div>
          <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
        </div>
        <div class="inner">
          <div>
            <i class="iconfont ic-sousuo"></i>
          </div>
          <input type="text" v-model="keyword" placeholder="通用名、商品名、症状">
        </div>
        <span @click="onSearch()">搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  export default {
    name: 'search',
    data() {
      return {
        keyword: ''
      };
    },
    created() {
    },
    watch: {
    },
    methods: {
      onSearch() {
        if (this.keyword) {
          this.loadData();
        } else {
          MessageBox('提示', '请输入药品名');
        }
      },
      loadData() {
        this.$router.push({
          path: '/drugs',
          query: {showDrugTitle: this.keyword, pageFrom: 'keyword', keyword: this.keyword}
        });
      }
    }
  };
</script>

<style scoped>
  .main {
    background: rgba(246, 246, 246, 1);
    width: 720px;
    height: 100vh;
  }

  .history-titele {
    margin: 20px;
  }

  .history-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .history-buttons button:nth-child(1) {
    background-color: rgba(19, 193, 254, 1);
  }

  .history-buttons button {
    background-color: rgba(246, 246, 246, 1);
    min-width: 100px;
    height: 50px;
    border-radius: 50px;
    outline: none;
    margin: 20px;
  }

  /**
  搜索框
   */

  .bar {
    width: 720px;
    height: 66px;
    background: rgba(210, 210, 210, 1);
    display: flex;
    justify-content: center;
  }

  .out {
    display: flex;
    align-items: center;
  }

  .out span {
    font-size: 26px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
    margin-left: 8px;
  }

  .inner {
    width: 597px;
    height: 42px;
    background: rgba(229, 229, 229, 1);
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .inner input {
    width: 560px;
    height: 42px;
    background: rgba(229, 229, 229, 1);
    border: 0;
    outline: none;
  }

  .ic-sousuo {
    color: #D2D2D2;
    font-size: 50px;
  }

  .ic-arrow-right {
    font-size: 50px;
  }

</style>

