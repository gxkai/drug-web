<template>
  <div class="close_shop_item">
    <div class="close_shop_item-header">
      <div class="close_shop_item-header-shop">
        <div class="close_shop_item-header-shop_left"
        @click="onShop()">
          <div>
            <i class="iconfont ic-yaodian"></i>
          </div>
          <div>
            {{shopInfo.shopName}}
          </div>
        </div>
      </div>
      <div class="close_shop_item-header-rx"
      v-if="shopInfo.rxId">
        <div class="close_shop_item-header-rx_left">
          <div>
            <i class="iconfont ic-chufangdanluru"></i>
          </div>
          <div class="text-blue">
            处方单
          </div>
        </div>
        <div class="close_shop_item-header-rx_right text-red">
          <div @click="linkToRxView(shopInfo.rxId)">查看处方</div>
          <div>
            <i class="iconfont ic-youjiantou"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="close_shop_item-content">
      <div class="close_shop_item-content-item"
      v-for="(item,key) in shopInfo.shopDrugSpecOrderInfoDTOList"
      :key="key"
      @click="linkToShopDrugSpec(item.shopDrugId)">
        <div class="close_shop_item-content-item_left">
          <img v-lazy="getImgURL(item.fileId,'LARGE_LOGO')">
        </div>
        <div class="close_shop_item-content-item_right">
          <div class="close_shop_item-content-item_right_1 text-l-30 elps">{{item.drugName}}</div>
          <div class="close_shop_item-content-item_right_2 text-l-25 text-999999">{{item.specName}}</div>
          <div class="close_shop_item-content-item_right_3">
            <div class="text-l-30 text-red">
              &yen;{{toFixedTwo(item.price)}}
            </div>
            <div class="text-l-30 text-999999">
              &times;{{item.quantity}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewCloseNormal',
    props: ['shopInfo'],
    created() {
      console.log(this.shopInfo);
    },
    methods: {
      onShop() {
        switch (this.shopInfo.type) {
          case 'HOSPITAL':
            this.$router.push({ path: '/hospital/view', query: { shopId: this.shopInfo.shopId } });
            break;
          default:
            this.$router.push({ path: '/shops/view', query: { shopId: this.shopInfo.shopId } });
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .text-red {
    color: #ef4f4f;
  }
  .text-blue {
    color: #1AB6FD;
  }
  .text-999999 {
    color: #999999;
  }
  .close_shop_item {
    &-header {
      background-color: white;
      i {
        font-size: 50px;
      }
      div {
        font-size: 30px;
      }
      &-shop, &-rx {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &_left, &_right {
          display: flex;
          align-items: center;
        }
      }
    }
    &-content {
      &-item {
        display: flex;
        padding: 20px;
        &_left {
          padding-right: 40px;
          img {
            width: 200px;
            height: 200px;
          }
        }
        &_right {
          &>div {
            width: 430px;
          }
          &_1 {
            margin-top: 10px;
          }
          &_2 {
            margin-top: 10px;
          }
          &_3 {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }

</style>
