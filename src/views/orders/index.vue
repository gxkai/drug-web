<template>
  <new-layout class="orders">
    <div slot="top"
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
    <div slot="center">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <new-order-item
            :order.sync="order"
            v-for="(order, key) in list"
            :key="key"
            @onQrcode = "onQrcode"
            @onReceive = "onReceive"
          ></new-order-item>
          <new-no-data v-show="finished === true"></new-no-data>
        </van-list>
      </van-pull-refresh>
      <van-popup
        v-model="popupVisible"
        position="top">
        <img v-lazy="popupUrl" class="orders-qr_code">
      </van-popup>
    </div>
  </new-layout>
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
        show: false,
        popupUrl: '',
        popupVisible: false,
        keyword: '',
        state: this.$route.query.state || '',
        columns: []
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
    },
    methods: {
      onQrcode(order) {
        this.popupUrl = this.getQrCodeURL(order.id);
        this.popupVisible = true;
      },
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
    &-qr_code {
      width: 500px;
      height: 500px;
      margin: 0 110px;
    }
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
