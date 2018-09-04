<template>
  <div class="rx_shop_item">
    <div class="rx_shop_item-left">
        <img :src="getImgURL(item.fileId, 'LARGE_LOGO')">
    </div>
    <div class="rx_shop_item-right">
        <div>
          {{item.name}}
        </div>
        <div>
          <new-star :score="item.score"></new-star>
        </div>
        <div>
          电话：{{item.phone}}
        </div>
        <div>
          地址：{{item.address}}
        </div>
        <div>
          ￥{{item.amount}}
        </div>
        <div>
          <span>可购买</span>
          <span v-for="(drug,key) in item.drugs" :key="key">
            {{drug}}
            <i v-if="key<item.drugs.length-1">、</i>
          </span>
        </div>
    </div>
    <div class="rx_shop_item-cart_icon">
        <i class="iconfont ic-gouwuche1"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rxShopItem',
    props: ['item'],
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/less" lang="less">
  @import "../assets/less/index";
  .rx_shop_item {
    width: 720px;
    display: flex;
    padding: 20px 0;
    position: relative;
    &-left {
      padding: 0 20px;
      img {
        width: 245px;
        height: 245px;
      }
    }
    &-right {
      div{
        width: 450px;
        font-size:25px;
        .ellipsis-one();
        &:nth-child(1) {
          font-size: 28px;
        }
        &:nth-child(5) {
          color: red;
        }
        &:nth-child(6) {
          &>span:nth-child(1) {
            color: #1AB6FD;
          }
        }
      }
    }
    &-cart_icon {
      position: absolute;
      right: 0;
      bottom: 0;
      i {
        font-size: 50px;
        color: red;
      }
    }
  }
</style>
