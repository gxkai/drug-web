<template>
  <new-layout class="rxs">
    <div slot="top">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="rxs--header">
        <div class="rxs--header__left">
          <img v-lazy="getImgURL(account.fileId,'SMALL_LOGO')"
          class="rxs--header__left--logo"
          />
        </div>
        <div class="rxs--header__right">
          <div>
            <van-icon name="wo" color="white" size="3em"></van-icon>
            <span class="ml-l-20">{{account.name || '无'}}</span>
            <span class="ml-l-50">{{getGender()|| '未填写'}}</span>
            <span class="ml-l-40">{{account.age + '岁'|| '未填写'}}</span>
          </div>
          <div class="mt-l-20">
            <van-icon name="Id" color="white" size="3em"></van-icon>
            <span class="ml-l-20">{{account.identityNumber|| '未填写'}}</span>
          </div>
        </div>
    </div>
      <input
        type="text"
        class="iconfont rxs--search"
        :placeholder="icon"
        v-model="keyword"
        @keyup.enter="onRefresh">
    </div>
    <div slot="center" class="pt-l-30">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div
          class="rxs--item"
          v-for="item in list"
          :key="item.id"
          @click="$router.push({path:'/rxs/view',query:{rxId:item.id}})"
          >
            <img class="rxs--mark" v-lazy="item.state ==='ENABLED'? require('../../assets/image/rxs/rx-true.png') : require('../../assets/image/rxs/rx-false.png')" >
            <div>
            <van-icon name="yiyuan" color="#13C1FE" size="3em"></van-icon>
            <span>医院</span>
            <span>
              {{item.hospital||'未注明'}}
            </span>
            <span>
              {{item.number}}
            </span>
          </div>
          <div>
            <van-icon name="riqi" color="#13C1FE" size="3em"></van-icon>
            <span>日期</span>
            <span>
              {{timeConvert(item.rxDate)}}
            </span>
          </div>
          <div>
            <van-icon name="222" color="#13C1FE" size="3em"></van-icon>
            <span>症状</span>
            <span>
              {{item.illness}}
            </span>
          </div>
            <div>
              <van-icon name="shijian2" color="#13C1FE" size="3em"></van-icon>
              <span>倒计时</span>
              <new-count-down :endTime="item.rxDate" durationDay="3"></new-count-down>
            </div>
          </div>
          <new-no-data v-show="finished === true"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-tabbar
      :value="1"
      slot="bottom"
      :fixed="Boolean(false)"
    >
      <van-tabbar-item icon="icon"
                       to="/">首页
      </van-tabbar-item>
      <van-tabbar-item icon="chufang"
                       to="/rxs">处方单
      </van-tabbar-item>
      <van-tabbar-item icon="fenlei"
                       to="/drugTypes">分类
      </van-tabbar-item>
      <van-tabbar-item icon="gouwuche2"
                       to="/carts">购物车
      </van-tabbar-item>
      <van-tabbar-item icon="wo"
                       to="/accounts">我
      </van-tabbar-item>
    </van-tabbar>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-nav-bar:after {
    border-bottom: none!important;
  }
  .rxs {
    background-color: #f5f5f5;
    position: relative;
    &--mark {
      position: absolute;
      right: 0;
      top: 80px;
      width: 200px;
      height: 200px;
    }
    &--item {
      width: 680px;
      margin: 20px 20px 0;
      background-color: white;
      padding: 30px;
      position: relative;
      &>div {
        margin-top: 10px;
        &>span {
          display: inline-block;
          &:nth-child(2) {
            width: 100px;
            color: #999999;
            font-size: 25px;
          }
          &:nth-child(3) {
            width: 300px;
            font-size: 25px;
            font-weight: normal;
          }
          &:nth-child(4) {
            width: 150px;
            font-size: 25px;
            font-weight: normal;
            color: #1AB6FD;
          }
        }
      }
    }
    &--search {
      width: 680px;
      height: 50px;
      margin: 0 20px;
      background-color: white;
      position: absolute;
      top: 310px;
      z-index: 1;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.27);
      border: none;
      outline: none;
      -webkit-appearance: none;
      padding: 0 40px;
      font-size: 30px;
      &::placeholder {
        text-align: center;
      }
    }
    &--header {
      height: 200px;
      background-color: #13C1FE;
      padding: 0 80px;
      display: flex;
      align-items: center;
      &__left {
        &--logo {
          width: 110px;
          height: 110px;
          border-radius: 50%;
        }
      }
      &__right {
        margin-left: 20px;
        span {
          color: white;
          font-size: 30px;
        }
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        keyword: '',
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        icon: '\ue64c 请输入症状搜索'
      };
    },
    computed: {
      account() {
        return this.$store.getters.account || {
          fileId: ''
        };
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      onLoad() {
        this.pageNum++;
        this.$http.get('/rxs/', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize,
            'keyword': this.keyword
          }
        })
          .then(res => {
            this.isLoading = false;
            this.loading = false;
            this.list = this.list.concat(res.data.list);
            if (res.data.list.length === 0) {
              this.finished = true;
            }
          }).catch(error => {
            this.exception(error);
          });
      }
    }
  };
</script>

