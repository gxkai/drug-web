<template>
  <div>
    <div v-for="cartShop in cartShops">
      <new-header bgColor="white" height="low" leftSize="small" leftColor="black">
        <div slot="left">
        <i class="iconfont ic-yaodian" ></i>
        </div>
        <span slot="left">{{cartShop.shopName}}</span>
      </new-header>
      <ul class="cartRxs">
        <li v-for="cartRx in cartShop.rxs">
          <ul class="cartDrugs">
            <new-header bgColor="white" height="low" leftSize="small" leftColor="black"
                        v-if="cartRx.rxId && cartRx.rxState == 'ENABLED'">
              <div slot="left">
              <i class="iconfont ic-chufangdanluru" ></i>
              </div>
              <span slot="left" class="chufangdan">处方单</span>
              <span slot="right" class="chakanchufan">查看处方></span>
            </new-header>
            <new-header bgColor="white" height="low" leftSize="small" leftColor="black" v-else>
              <div slot="left">
              <i class="iconfont ic-jisongchufangdan" ></i>
              </div>
              <span slot="left" class="chufangdan">非处方单</span>
            </new-header>
            <li v-for="(cartDrug,cartDrugIndex) in cartRx.drugs" :key="cartDrugIndex">
              <div class="slide-content">
                <div class="image">
                  <img v-lazy="getImgURL(cartDrug.fileId,'LARGE_LOGO')">
                </div>
                <div class="text">
                  <div class="top">
                    <div class="name">{{cartDrug.name}}</div>
                    <div class="spec">{{cartDrug.spec}}</div>
                  </div>
                  <div class="bottom">
                    <div class="price">
                      <span>¥{{cartDrug.price}}</span>
                    </div>
                    <div class="quantity">
                      <div>
                        <span>x{{cartDrug.quantity}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'closeList',
    props: {
      cartShops: {
        type: Array,
        default: []
      }
    }
  };
</script>

<style scoped>
  /*字体颜色单独设置*/
  .chufangdan {
    font-size: 28px;
    font-family: HiraginoSansGB-W3;
    color: rgba(19, 193, 254, 1);
  }

  .chakanchufan {
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
  }

  /*块样式*/
  .slide-content {
    width: 720px;
    height: 215px;
    background-color: rgba(241, 239, 240, 1);
    display: flex;
    margin-bottom: 10px;
    padding-left: 60px;
  }

  .slide-content .image {
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);
    align-self: center;
  }

  .slide-content .text {
    padding-left: 20px;
  }

  .slide-content .text .top {
    height: 105px;
    width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .slide-content .text .top .name {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .slide-content .text .top .spec {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .slide-content .text .bottom {
    height: 110px;
    width: 460px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .slide-content .text .bottom .price {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
    align-self: center;
  }

  .slide-content .text .bottom .quantity {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
  }

  .slide-content .text .bottom .quantity div:nth-child(1) {
    align-self: flex-end;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }
</style>
