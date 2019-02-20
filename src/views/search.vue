<template>
  <new-layout centerColor="white">
    <template slot="top">
      <new-wing-blank class="header">
        <div class="search">
          <van-icon name="search" class="search__icon" color="grey" size="2em"/>
          <form action="" onsubmit="return false;">
            <input class="search__input"
                   type="search"
                   @keypress="onSearch"
                   v-model="keyword"
            >
          </form>
        </div>
        <div class="cancel"
             @click="onCancel"
        >
          取消
        </div>
      </new-wing-blank>
    </template>
    <template slot="center">
      <div class="wrap">
        <new-wing-blank class="history" row="1em" column=".5em">
          <div class="title">
            历史搜索
          </div>
          <van-icon name="delete" size="1em" color="grey" @click.native="onDelete"/>
        </new-wing-blank>
        <new-wing-blank class="content" column=".5em">
          <div class="item" v-for="(name, index) in hisWords" :key="index" @click="onKeyword(name)">
            {{name}}
          </div>
        </new-wing-blank>
        <new-wing-blank class="title" row="1em" column=".5em">
          热门搜索
        </new-wing-blank>
        <new-wing-blank class="content" column=".5em">
          <div class="item" v-for="(name, index) in hotWords" :key="index" @click="onKeyword(name)">
            {{name}}
          </div>
        </new-wing-blank>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .header {
    display: flex;
    align-items: center;
    .search {
      width: 550px;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      border-radius: 20px;
      &__input {
        background-color: #f5f5f5;
        border: none;
        -webkit-appearance: none;
        width: 400px;
        height: 50px;
        font-size: 30px;
      }
      &__icon {
        margin: 0 20px;
      }
    }
    .cancel {
      flex-grow: 1;
      text-align: center;
      color: deepskyblue;
      font-weight: 200;
      font-size: 30px;
    }
  }

  .wrap {
    width: 720px;
    .title {
      font-size: 30px;
    }
    .history {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
    }
    .content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .item {
        padding: 10px 30px;
        background-color: #f5f5f5;
        font-size: 25px;
        border-radius: 5px;
        margin-left: 15px;
        margin-top: 15px;
        white-space: nowrap;
        color: #999999;
        font-weight: 100;
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
        keyword: ''
      };
    },
    created() {
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initData();
      });
    },
    methods: {
      async initData() {
        this.hotWords = await this.$http.get('/drugs/keywords');
        this.hisWords = getDrugSearchHisWords() || [];
      },
      onSearch(e) {
        if (e.keyCode !== 13) {
          return;
        }
        if (this.keyword === '') {
          this.$toast('请输入关键字');
          return;
        }
        let arr = getDrugSearchHisWords();
        if (arr) {
          arr.unshift(this.keyword);
          setDrugSearchHisWords(arr);
        } else {
          let arr = [this.keyword];
          setDrugSearchHisWords(arr);
        }
        this.$router.push('/drugs?keyword=' + this.keyword);
      },
      onCancel() {
        this.$router.go(-1);
      },
      onKeyword(name) {
        this.$router.push(`/drugs?keyword=${name}`);
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
