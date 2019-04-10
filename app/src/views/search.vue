<template>
  <new-layout>
    <template slot="top">
      <new-search-bar v-model.trim="keyword" @search="onSearch" :placeholder="placeholder" class="hairline-bottom"/>
    </template>
    <template slot="center">
      <div v-show="hisWords.length>0">
        <div class="title-bar">
          <div class="left">
            <van-icon name="sousuo-" color="#999999"/>
            <span>
            最近搜索
          </span>
          </div>
          <div class="right">
            <van-icon name="shanchu-" color="#999999"
                      @click.native="onDelete"
            />
          </div>
        </div>
        <div class="search-wrapper hairline-bottom">
        <span
          v-for="(name, index) in hisWords" :key="index" @click="onKeyword(name)"
        >
          {{name}}
        </span>
        </div>
      </div>
      <div v-show="hotWords.length>0">
        <div class="title-bar">
          <div class="left">
            <van-icon name="remen-" color="#999999"/>
            <span>
            热门搜索
          </span>
          </div>
        </div>
        <div class="search-wrapper">
        <span
          v-for="(name, index) in hotWords" :key="index" @click="onKeyword(name)"
        >
          {{name}}
        </span>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .search-wrapper {
    background-color: white;
    span {
      background-color: #f5f5f5;
      border-radius: 25px;
      font-size: $size-mini;
      text-align: center;
      padding: 15px 20px;
      margin-left: 20px;
      margin-top: 20px;
    }
    padding: 0 15px 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 20px 15px 0;
    background-color: white;
    .left {
      display: flex;
      align-items: center;
      span {
        color: $gray-light;
        font-size: 24px;
      }
    }
  }
</style>
<script>
  import { getDrugSearchHisWords, setDrugSearchHisWords, removeDrugSearchHisWords } from '../storage';

  export default {
    data() {
      return {
        hotWords: [],
        hisWords: [],
        keyword: '',
        placeholder: '\ue643搜索药品'
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.hotWords = await this.$http.get('/api/drugs/keywords');
        this.hisWords = getDrugSearchHisWords() || [];
      },
      onSearch() {
        let arr = getDrugSearchHisWords();
        if (arr) {
          if (arr.length === 15) {
            arr.pop();
          }
          arr.unshift(this.keyword);
          let set = new Set(arr);
          arr = Array.from(set);
          setDrugSearchHisWords(arr);
        } else {
          let arr = [this.keyword];
          setDrugSearchHisWords(arr);
        }
        this.loadPageDrugs('', this.keyword);
      },
      onCancel() {
        this.$router.go(-1);
      },
      onKeyword(name) {
        this.keyword = name;
        this.onSearch();
      },
      onDelete() {
        this.$dialog.confirm({ message: '确定删除历史？' }).then(() => {
          removeDrugSearchHisWords();
          this.hisWords.splice(0);
          this.$toast('删除成功');
        });
      }
    }
  };
</script>
