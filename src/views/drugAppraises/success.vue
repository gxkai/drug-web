<template>
  <new-layout
    class="appraise-success"
  >
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="$router.push('/')"
        right-text="继续下单"
      />
      <div
        class="appraise-success--first"
      >
        <div>
          每天都有用户通过看评价来做购物决策~
        </div>
        <div
          @click="$router.push('/drugAppraises')"
        >
          查看我的评价
        </div>
      </div>
    </template>
    <template slot="center">
      <div
        class="appraise-success--second"
      >
        <div class="appraise-success--second--cut">
          <div class="appraise-success--second--cut__left"></div>
          <div class="appraise-success--second--cut__center">接着评下去吧</div>
          <div class="appraise-success--second--cut__right"></div>
        </div>
        <div class="appraise-success--second--list">
          <div class="appraise-success--second--list--item"
               v-for="item in list" :key="item.orderId"
          >
            <div class="appraise-success--second--list--item__left">
              <img
                class="appraise-success--second--list--item__left--image"
                v-lazy="getImgURL(item.fileId, 'LARGE_LOGO')"
              >
            </div>
            <div class="appraise-success--second--list--item__center"
                 v-text="item.name"
            >
            </div>
            <div class="appraise-success--second--list--item__right"
                 @click="$router.push({path:'/drugAppraises/create',query:{orderId:item.orderId}})"
            >
              去评价
            </div>
          </div>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .appraise-success {
    &--first {
      height: 162px;
      background-color: #13C1FE;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      align-items: center;
      div {
        font-size: 26px;
        font-family: HiraginoSansGB-W3;
        font-weight: 100;
        color: rgba(254, 255, 255, 1);
        &:nth-child(2) {
          width: 199px;
          height: 47px;
          border: 2PX solid rgba(255, 255, 255, 1);
          border-radius: 20px;
          text-align: center;
        }
      }
    }
    &--second {
      &--cut {
        height: 100px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        div:nth-child(2) {
          width: 300px;
          font-size: 25px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(153, 153, 153, 1);
          text-align: center;
        }
        div:not(:nth-child(2)) {
          width: 238px;
          height: 1PX;
          background: rgba(191, 191, 191, 1);
        }
      }
      &--list {
        &--item {
          margin-top: 20px;
          height: 160px;
          background-color: white;
          display: flex;
          align-items: center;
          padding: 20px;
          &__left {
            &--image {
              width: 126px;
              height: 126px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(238, 238, 238, 1);
              box-shadow: 0px 1px 1px 0px rgba(102, 102, 102, 0.3);
            }
          }
          &__center {
            padding-left: 20px;
            font-size: 22px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: rgba(51, 51, 51, 1);
            flex: 1;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &__right {
            width: 127px;
            height: 39px;
            background: rgba(19, 193, 254, 1);
            border-radius: 20px;
            font-size: 24px;
            font-family: HiraginoSansGB-W3;
            font-weight: normal;
            color: rgba(255, 255, 255, 1);
            text-align: center;
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'myAppraise',
    data() {
      return {
        list: []
      };
    },
    computed: {
      account() {
        return this.$store.getters.account;
      }
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/drugAppraises/toAppraise');
      }
    }
  };
</script>
