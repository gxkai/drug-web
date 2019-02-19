<template>
  <!--<div>-->
    <!--<header>-->
      <!--<van-icon name="arrow-left" class="drugs-header__left" size="2.5em" color="#666666"-->
                <!--@click="$router.go(-1)"></van-icon>-->
      <!--<input type="text" placeholder="   输入关键词搜索" v-model.trim="keyword">-->
      <!--<span class="searchBtn" @click="onSearch">搜索</span>-->
    <!--</header>-->
    <!--<div class="searchDiv">-->
     <!--<span class="hot">热门</span>-->
    <!--<span class="fz24" v-for="item in hotWords"  @click="$router.push('/drugs?keyword='+item)">{{item}}</span>-->
    <!--</div>-->
  <!--</div>-->
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
          <div class="item"  v-for="(name, index) in hisWords" :key="index" @click="onKeyword(name)">
            {{name}}
          </div>
        </new-wing-blank>
        <new-wing-blank class="title" row="1em" column=".5em" >
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
  /*header {
    height: 127px;
    .drugs-header__left {
      margin-right: 20px;
      margin-left: 20px;
      font-size: 30px;
      vertical-align: center;
      position: absolute;
      top: 55px;
      left: 0px;
    }
    input {
      height: 80px;
      width: 556px;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(220, 220, 220, 1);
      border-radius: 33px;
      font-size: 25px;
      margin-top: 30px;
      margin-right: 5px;
      text-indent: 30px;
      margin-left: 80px;
    }
  }

  .searchBtn {
    font-size: 30px;
    font-weight: normal;
    color: $themeColor;
    line-height: 65px;
  }

  .searchDiv {
    border-top: 1px solid #C7C7C7;
  }

  .hot {
    font-size: 30px;
    float: left;
    display: inline-block;
    margin-top: 27px;
    line-height: 69px;
    margin-left: 27px;
  }

  .fz24 {
    font-size: 24px;
    background: rgba(238, 238, 238, 1);
    border-radius: 8px;
    padding: 10px 20px;
    line-height: 49px;
    margin-left: 23px;
    margin-top: 27px;
    margin-bottom: 2px;
    display: inline-block;
    float: left;
    color: #666666;
  }*/

</style>


<script>
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
        this.hisWords = this.$storage.get('hisWords') || [];
      },
      onSearch() {
        if (this.keyword === '') {
          this.$toast('请输入关键字');
          return;
        }
        if (this.$storage.get('hisWords')) {
          this.$storage.get('hisWords').concat(this.keyword);
          this.$storage.set('hisWords', this.$storage.get('hisWords'));
        } else {
          let arr = [this.keyword];
          this.$storage.set('hisWords', arr);
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
        this.$storage.remove('hisWords');
      }
    }
  };
</script>
