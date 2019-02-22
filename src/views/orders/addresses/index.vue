<template>
  <new-layout>
    <template slot="top">
      <van-nav-bar
        :title="$route.meta.name"
        left-arrow
        right-text="管理"
        @click-left="$router.go(-1)"
        @click-right="$router.push('/addresses')"
      />
    </template>
    <template slot="center">
      <div class="wrap">
        <new-white-space/>
        <new-no-data v-if="list.length === 0" name="没有地址数据，点击管理维护地址吧"/>
        <div class="innerRange">
          <new-wing-blank v-for="(address, index) in innerRanges" :key="index" class="item" row="3em" @click.native="onAddress(address)">
            <div class="item__text">{{address.address}}</div>
            <div class="item__text">{{address.room}}</div>
            <div class="item__text item__text--grey">{{address.consignee}} {{address.phone}}</div>
          </new-wing-blank>
        </div>
        <new-white-space/>
        <div class="overRange">
          <new-wing-blank v-if="overRanges.length > 0" class="title" row="1em">
            以下地址超出配送范围
          </new-wing-blank>
          <new-wing-blank v-for="(address, index) in overRanges" :key="index" class="item item--opacity" row="3em" @click.native="tip()">
            <div class="item__text">{{address.address}}</div>
            <div class="item__text">{{address.room}}</div>
            <div class="item__text">{{address.consignee}} {{address.phone}}</div>
          </new-wing-blank>
        </div>
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .wrap {
    .title {
      font-size: 25px;
      font-weight: 500;
    }
    .overRange, .innerRange {
      background-color: white;
    }
    .item {
      border-bottom: #f5f5f5 solid 3PX;
      &--opacity {
        opacity: .5;
      }
      &__text {
        font-size: 25px;
        line-height: 45px;
        &--grey {
          color: gray;
        }
      }
    }
  }
</style>
<script>
  import { getAccount } from '@/storage';

  export default {
    name: 'addresses',
    data() {
      return {
        list: [],
        account: getAccount(),
        shopId: this.$route.params.shopId,
        address: this.$route.params.address,
        innerRanges: [],
        overRanges: []
      };
    },
    created() {
    },
    computed: {},
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initData();
      });
    },
    beforeRouteLeave(to, from, next) {
      to.params.address = this.address;
      next();
    },
    methods: {
      async initData() {
        this.list = await this.$http.get(`/addresses/order?shopId=${this.shopId}`);
        this.innerRanges = this.list.filter(e => !e.overRange);
        console.log(this.innerRanges);
        this.overRanges = this.list.filter(e => e.overRange);
        console.log(this.overRanges);
      },
      onAddress(address) {
        this.address = address;
        this.$router.go(-1);
      },
      tip() {
        this.$dialog.confirm({
          title: '超出配送范围',
          message: '改地址与商家距离过远，需回首页重新选择商家',
          confirmButtonText: '重选商家'
        }).then(() => {
          // on confirm
          this.$router.replace('/home');
        }).catch(() => {
          // on cancel
        });
      }
    }
  };
</script>
