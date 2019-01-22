<template>
  <new-layout class="drugTypes"
              centerColor="white"
  >
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <van-tabs v-model="active"
                swipeable
                color="#F60000"
      >
        <van-tab :title="item.type"
                 v-for="(item,index) in list"
                 :key="index"
                 class="drugTypes--drug"
        >
          <div
            v-for="item in item.drugType"
            :key="item.id"
            class="drugTypes--drug--item"
            @click="$router.push({path:'/drugs',query:{typeId:item.id}})"
          >
            <img v-lazy="getImgURL(item.fileId,'MIDDLE_LOGO')"/>
            <div>{{item.type}}</div>
          </div>
        </van-tab>
      </van-tabs>
    </template>
    <template slot="bottom">
      <van-tabbar
        :value="2"
        :fixed="Boolean(false)"
      >
        <van-tabbar-item icon="icon"
                         to="/home">首页
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
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  /deep/ .van-tabs {
    &__wrap {
      height: 100px !important;
    }
    &--line {
      padding-top: 100px;
    }
    .van-tab {
      color: black!important;
      &--active {
        color: $themeColor !important;
      }
      span {
        line-height: 100px !important;
        font-size: 25px !important;
      }
    }
  }
  .drugTypes {
    &--drug {
      display: flex;
      flex-flow: row wrap;
      &--item {
        background-color: white;
        padding: 20px;
        flex: 0 0 25%;
        display: flex;
        flex-flow: column;
        align-items: center;
        img {
          width: 100px;
          height: 100px;
        }
        div {
          margin-top: 10px;
          font-size: 25px;
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'drugTypes',
    data() {
      return {
        list: []
      };
    },
    computed: {
      active: {
        get() {
          return this.$store.state.drugTypeActive;
        },
        set(newValue) {
          this.$store.state.drugTypeActive = newValue;
        }
      }
    },
    components: {},
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.$toast.loading({duration: 0, forbidClick: true});;
        this.list = await this.$http.get('/drugTypes');
        this.$toast.clear();
      }
    }
  };
</script>
