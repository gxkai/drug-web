<template>
  <div>
    <header>
      <van-icon name="arrow-left" class="drugs-header__left" size="2.5em" color="#666666"
                @click="$router.go(-1)"></van-icon>
      <input type="text" placeholder="   输入关键词搜索" v-model="drugName">
      <span class="searchBtn" @click="$router.push('/drugs?keyword='+drugName)">搜索</span>
    </header>
    <div class="searchDiv">
     <span class="hot">热门</span>
    <span class="fz24" v-for="item in drugInfo"  @click="$router.push('/drugs?keyword='+item)">{{item}}</span>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  header {
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
  }

</style>


<script>
  export default {
    data() {
      return {
        drugInfo: [],
        drugName: ''
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        const data = await this.$http.get('/drugs/keywords');
        this.drugInfo = data;
      }
    }
  };
</script>
