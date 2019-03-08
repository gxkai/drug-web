<template>
  <div class="close_list">
    <div>
      <div class="close_list-shop"
      @click="linkToShopView(cartShop.id)">
        <div>
          <i class="iconfont ic-yaodian"></i>
        </div>
        <div class="close_list-shop_name" v-text="cartShop.shopName"></div>
      </div>
      <div v-for="cartRx in cartShop.rxs">
        <div class="close_list-drugs">
          <div class="close_list-drugs-item"
               v-for="cartDrug in cartRx.drugs"
                @click="linkToShopDrugSpec(cartDrug.id)">
            <div class="close_list-drugs-item-left">
              <new-rx-image :url="getImgURL(cartDrug.fileId,'LARGE_LOGO')" :rx="!cartDrug.otc"/>
            </div>
            <div class="close_list-drugs-item-right">
              <div>
                <div class="close_list-drugs-item-right_name">
                  {{cartDrug.name}}
                </div>
                <div class="close_list-drugs-item-right_spec">
                  规格：{{cartDrug.spec}}
                </div>
              </div>
              <div>
                <div class="close_list-drugs-item-right_price">
                  &yen;{{cartDrug.price}}
                </div>
                <div class="close_list-drugs-item-right_quantity">
                  x{{cartDrug.quantity}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped type="text/scss" lang="scss">
  .close_list {
    &-shop {
      padding: 20px;
      display: flex;
      align-items: center;
      background-color: white;
      &_name {
        font-size: 30px;
      }
      .iconfont {
        font-size: 50px;
      }
    }
    &-rx {
      padding: 20px;
      display: flex;
      align-items: center;
      background-color: white;
      justify-content: space-between;
      &-left {
        display: flex;
        align-items: center;
        &_name {
          font-size: 30px;
          color: $themeColor;
        }
        .iconfont {
          font-size: 50px;
        }
      }
      &-right {
        font-size: 30px;
        color: $themeColor;
      }
    }
    &-drugs {
      &-item {
        display: flex;
        &-left {
          padding: 20px;
          position: relative;
          img {
            width: 200px;
            height: 200px;
          }
        }
        &-right {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 430px;
          &>div {
            &:nth-child(1) {
              &>div {
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                line-clamp: 2;
              }
            }
            &:nth-child(2) {
              display: flex;
              justify-content: space-between;
            }
          }
          &_name {
            font-size: 30px;
          }
          &_spec {
            font-size: 25px;
            color: #999999;
          }
          &_price {
            font-size: 30px;
            color: $themeColor;
          }
          &_quantity {
            font-size: 30px;
            color: #999999;
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'closeList',
    props: {
      cartShop: {
      }
    }
  };
</script>
