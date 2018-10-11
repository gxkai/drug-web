<template>
  <div class="orders">
    <div id="header"
         class="orders__header">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="show = true"
        v-show="!show"
      >
        <van-icon name="search" slot="right"/>
      </van-nav-bar>
      <div
        v-show="show"
        class="orders__header__search"
      >
        <span
        class="orders__header__search--left"
        @click="onCancel"
        >取消</span>
        <input
        class="orders__header__search-input"
        placeholder="输入药品名称"
        v-model='keyword'
        @keyup.enter = "onRefresh"
        >
        <span
        class="orders__header__search--right"
        @click="onRefresh"
        >搜索</span>
      </div>
      <new-order-tab :state.sync="state"></new-order-tab>
    </div>
    <div :style="contentStyle">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <new-order-item
            :order.sync="order"
            v-for="(order, key) in list"
            :key="key"></new-order-item>
          <new-no-data v-show="finished === true"></new-no-data>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderIndex',
    data() {
      return {
        loading: false,
        finished: false,
        isLoading: false,
        pageNum: 0,
        pageSize: 15,
        list: [],
        contentStyle: {
          height: 0,
          overflow: 'auto'
        },
        show: false,
        keyword: '',
        state: this.$route.query.state || ''
      };
    },
    watch: {
      state() {
        this.onRefresh();
      }
    },
    computed: {
      title() {
        switch (this.state) {
          case 'TO_PAY':
            return '待付款';
          case 'TO_APPRAISE':
            return '待评价';
          case 'TO_DELIVERY':
            return '待发货';
          case 'TO_RECEIVED':
            return '待收货';
          default:
            return '全部订单';
        }
      }
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
    },
    methods: {
      onCancel() {
        this.keyword = '';
        this.show = false;
        this.onRefresh();
      },
      onRefresh() {
        this.finished = false;
        this.list = [];
        this.pageNum = 0;
        this.onLoad();
      },
      onLoad() {
        this.pageNum++;
        this.$http.get('/orders/', {
          params: {
            'pageNum': this.pageNum,
            'pageSize': this.pageSize,
            'orderState': this.state,
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

<style scoped type="text/less" lang="less">
  .orders {
    background-color: #f5f5f5;
    &__header {
      &__search {
        height: 130px;
        background-color: #13C1FE;
        display: flex;
        align-items: center;justify-content: space-between;
        padding: 0 20px;
        span {
          font-size: 30px!important;
          color: white!important;
          font-weight: 200!important;
        }
        &-input {
          height: 60px;
          width: 400px;
          padding: 0 20px;
          -webkit-appearance: none;
          border: none;
          outline: none;
          color: black;
          font-size: 25px;
          &::placeholder {
            text-align: center;
          }
        }
      }
    }
  }
</style>
