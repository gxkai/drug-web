<template>
  <new-layout class="order-addr">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        right-text="管理"
        @click-left="$router.go(-1)"
        @click-right="$router.push('/addresses')"
      />
    </template>
    <template slot="center">
      <div class="order-addr__item"
           v-for="(address,index) in list"
           :key="index"
           @click.stop="onAddress(address)"
      >
        <div class="order-addr__item__first">
          <div class="order-addr__item__first__left">
            <new-radio v-if="address.defaulted" disabled></new-radio>
            <span class="order-addr__item__first__left__consignee">{{address.consignee}}</span>
          </div>
          <div class="order-addr__item__first__right">
            {{address.phone}}
          </div>
        </div>
        <div class="order-addr__item__second">
        <span class="order-addr__item__second__text order-addr__item__second__text--blue">
          [默认地址]
        </span>
          <span class="order-addr__item__second__text">
          {{`${address.address}  ${address.room}`}}
        </span>
        </div>
      </div>
      <div v-if="list.length === 0" class="order-addr__no-data">没有符合条件的收货地址</div>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  .order-addr {
    &__no-data {
      text-align: center;
      margin-top: 20px;
      font-size:25px;
      font-family:HiraginoSansGB-W3;
      color:rgba(51,51,51,1);
    }
    &__item {
      padding: 20px;
      background-color: white;
      margin-top: 20px;
      &__first {
        display: flex;
        justify-content: space-between;
        &__left {
          display: flex;
          &__consignee {
            font-size: 25px;
            margin-left: 10px;
          }
        }
        &__right {
          font-size: 25px;
        }
      }
      &__second {
        margin-top: 10px;
        padding-left: 20px;
        &__text {
          font-size:22px;
          font-family:HiraginoSansGB-W3;
          color:rgba(51,51,51,1);
          &--blue {
            color:rgba(19,193,254,1);
          }
        }
      }
    }
  }
</style>
<script>
  import { setReceivedAddress } from '../../../assets/js/auth';

  export default {
    name: 'addresses',
    data() {
      return {
        list: [],
        account: this.$store.getters.account,
        shopId: this.$route.query.shopId
      };
    },
    created() {
      this.initData();
    },
    computed: {
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next();
    },
    methods: {
      async initData() {
        this.list = await this.$http.get(`/addresses/order?shopId=${this.shopId}`);
      },
      onAddress(address) {
        setReceivedAddress(address);
        this.$router.go(-1);
      }
    }
  };
</script>
