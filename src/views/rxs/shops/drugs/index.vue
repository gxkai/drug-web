<template>
  <div class="rxs-content position-relative">
    <new-header title="处方药品列表">
      <div slot="left">
        <i @click="$router.go(-1)" class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>
    <div class="shadow" v-show="show">
      <div class="box">
        <div class="header">
          <div class="left">
            <div>
              <i class="iconfont ic-changshangbaojia text-13C1FE"></i>
            </div>
            <div>
              选择厂商
            </div>
          </div>
          <div class="right">
            <i class="iconfont ic-guanbi2 text-13C1FE" @click="takeUp"></i>
          </div>
        </div>
        <div class="content">
          <div class="header">
            <div class="left">
              <div>
                <i class="iconfont ic-changfang text-13C1FE"></i>
              </div>
              <div>
                厂商名称
              </div>
            </div>
            <div class="right">
              <div>
                <i class="iconfont ic-jiage text-13C1FE"></i>
              </div>
              <div>
                价格
              </div>
            </div>
          </div>
          <div class="list">
            <div class="item"
                 v-for="(origin,index) in origins"
                 :key="index"
                 @click="choose(index)">
              <div class="width-percent-100">
                <span class="left">{{origin.originName}}</span><span class="text-red right">¥{{origin.price}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ul>
      <li v-for="(drug,index) in drugs" :key="index" class="m-10 text-l-20 drug-item">
        <div class="rx-shop-drugs-box is-flex flex-row flex-item pl-20 position-relative">
          <span class="toc-tip position-absolute all-center" v-if="carts[index].otc === true">非</span>
          <span class="toc-tip position-absolute all-center bg-2BB292" v-else>处</span>
          <img class="is-200x200" :src="getImgURL(carts[index].fileId, 'LARGE_LOGO')">
          <div class="box-right is-flex flex-column flex-sa ml-40">
            <div class="position-relative">
              <i class="iconfont ic-changfang text-13C1FE"></i>
              <span class="text-box">厂商&#58;</span>
              <span class="text-info">{{carts[index].originName}}</span>
              <i @click="lookMore(index)" :class="{'iconfont ic-youjiantou':isActive}"></i>
              <i @click="lookMore(index)" :class="{'iconfont ic-xiajiantou':!isActive}"></i>
            </div>
            <div>
              <i class="iconfont ic-yao text-13C1FE"></i>
              <span class="text-box">名称&#58;</span>
              <span class="text-l-25">{{carts[index].name}}</span>
            </div>
            <div>
        <span>
           <i class="iconfont ic-yaopinshuju text-13C1FE"></i>
           <span class="text-box">规格&#58;</span>
           <span class="text-l-25">{{carts[index].spec}}</span>
        </span>
            </div>
            <div>
              <i class="iconfont ic-qian text-13C1FE"></i>
              <span class="text-box">最低价&#58;</span>
              <span class="text-red text-l-25">&yen;{{toFixedTwo(carts[index].price)}}</span>
              <span class="text-l-30 text-a6a6a6 ml-l-90">&times;{{carts[index].quantity}}</span>
            </div>
          </div>
        </div>

      </li>
    </ul>

    <div class="rx-total ml-20 text-l-25">
      <i class="iconfont ic-qian text-13C1FE"></i>共计{{quantity}}件商品&nbsp;&nbsp;合计<span
      class="text-red rx-total-money">&yen;{{toFixedTwo(amount)}}</span>
    </div>

    <new-rx-shop-cart :carts="carts" @createCart="createCart" @onBuy="onBuy"></new-rx-shop-cart>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        rxId: this.$route.query.rxId,
        shopId: this.$route.query.shopId,
        shopName: this.$route.query.shopName,
        drugs: [],
        show: false,
        origins: [],
        index: 0,
        carts: [],
        account: this.$store.getters.account,
        isActive: true,
        amount: 0,
        quantity: 0
      };
    },
    created() {
      this.getDrugs();
    },
    methods: {
      getDrugs() {
        this.$http.get('/rxs/' + this.rxId + '/shops/' + this.shopId + '/drugs')
          .then(res => {
            console.log(res.data);
            this.drugs = res.data;
            this.initCart();
          }).catch(error => {
            this.exception(error);
          });
      },
      lookMore(index) {
        this.origins = this.drugs[index].drugs;
        this.index = index;
        this.show = true;
        this.isActive = !this.isActive;
      },
      takeUp() {
        this.show = !this.show;
        this.isActive = !this.isActive;
      },
      initCart() {
        this.drugs.forEach(drug => {
          this.carts.push({
            accountId: this.account.id,
            shopId: this.shopId,
            rxId: this.rxId,
            drugSpecId: drug.drugs[0].drugSpecId,
            shopDrugSpecId: drug.drugs[0].shopDrugSpecId,
            name: drug.name,
            spec: drug.spec,
            price: drug.drugs[0].price,
            quantity: drug.quantity,
            fileId: drug.drugs[0].fileId,
            otc: drug.otc,
            originName: drug.drugs[0].originName,
            rxItemId: drug.rxItemId
          });
        });
        this.carts.forEach(e => {
          this.amount += e.price * e.quantity;
          this.quantity += e.quantity;
        });
      },
      choose(index) {
        let cart = this.carts[this.index];
        cart.drugSpecId = this.origins[index].drugSpecId;
        cart.shopDrugSpecId = this.origins[index].shopDrugSpecId;
        cart.price = this.origins[index].price;
        cart.fileId = this.origins[index].fileId;
        cart.originName = this.origins[index].originName;
        this.amount = 0;
        this.carts.forEach(e => {
          this.amount += e.price;
        });
        this.show = !this.show;
        this.isActive = !this.isActive;
      },
      createCart() {
        this.$http.post('/carts', this.carts)
          .then(res => {
            Toast({
              message: '加入购物车成功',
              position: 'middle',
              duration: 2000
            });
          })
          .catch(err => {
            this.exception(err);
          });
      },
      onBuy() {
        let json = {
          'rxId': this.rxId,
          'shopId': this.shopId,
          'shopName': this.shopName,
          'orderShopDrugSpecInfoDTOList': this.carts
        };
        this.$http.post('orders/shop/get', json)
          .then(res => {
            this.$router.push('/orders/create/fromShop?orderShopDrugSpecDTO=' + JSON.stringify(json));
          })
          .catch(err => {
            this.exception(err);
          });
      }
    }
  };
</script>

<style scope type="text/less" lang="less">
  @import "../../../../assets/less/index";

  .shadow {
    background-color: rgba(16, 14, 14, 0.44) !important;
  }
  .text-a6a6a6 {
    color: #a6a6a6;
  }

  .shadow {
    .box {
      width: 600px;
      height: 700px;
      background-color: white;
      margin: 200px auto 0;
      overflow: auto;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          padding-left: 20px;
          & > div {
            &:nth-child(1) {
              i {
                font-size: 40px;
              }
            }
            &:nth-child(2) {
              font-size: 30px;
              margin-left: 10px;
            }
          }
        }
        .right {
          i {
            font-size: 40px;
          }
        }
      }
      .content {
        padding: 10px;
        .header {
          display: flex;
          align-items: center;
          .left {
            display: flex;
            align-items: center;
            & > div {
              &:nth-child(1) {
                .iconfont {
                  font-size: 40px;
                }
              }
              &:nth-child(2) {
                font-size: 28px;
                margin-left: 20px;
              }
            }
          }
          .right {
            .left();
          }
        }
        .list {
          margin-top: 10px;
          .item {
            display: flex;

            padding: 20px 10px;
            width: 100%;
            border: none !important;
            .left {
              float: left;
              display: inline-block;
              text-align: left;
              width: 87%;
              font-size: 30px;
            }
            .right {
              float: right;
              display: inline-block;
              text-align: right;
              width: 10%;
              font-size: 30px;
            }
            & > div {
              font-size: 28px;
            }
          }
        }
      }
    }
  }
</style>

<style scoped>
  .rxs-content {
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }

  .is-flex {
    display: flex !important;
  }

  .m-10 {
    margin-top: 10px !important;
    box-sizing: border-box;
  }

  .hr-box .line {
    display: inline-block;
    width: 260px;
    border-top: 1px solid #13c1fe;
  }

  .hr-box .txt {
    width: 112px;
    height: 26px;
    font-size: 28px;
    color: rgba(0, 0, 0, 1);
    line-height: 61px;
    vertical-align: middle;
  }

  .ml-20 {
    margin-left: 20px !important;
  }

  .rx-total {
    margin-top: 26px;
  }

  .rx-total-money {
    font-size: 26px;
  }

  footer {
    position: fixed;
    bottom: 0;
  }

  /* 组件 */
  .rx-shop-drugs-box {

    height: 216px;
    background: rgba(255, 255, 255, 1);
  }

  .is-200x200 {
    width: 200px;
    height: 200px;
  }

  .pl-20 {
    padding-left: 20px !important;
    box-sizing: border-box;
  }

  .ml-40 {
    margin-left: 40px !important;
  }

  .is-flex {
    display: flex !important;
  }

  .flex-row {
    flex-direction: row;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-sa {
    justify-content: space-around;
  }

  .flex-sb {
    justify-content: space-between;
  }

  .flex-item {
    align-items: center;
  }

  .box-right {
    height: 150px;
  }

  /*处方标识*/
  .toc-tip {
    left: 5px;
    top: 5px;
    padding: 0px 20px;
    background: #bfbfbf;
    color: #ffffff;
    border-radius: 50px / 25px;
  }

  .all-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .bg-2BB292 {
    background: #2BB292;
    color: white;
  }

  .text-box {
    width: 90px !important;
    display: inline-block;
    font-size: 25px;
  }

  .text-info {
    width: 180px !important;
    display: inline-block;
    font-size: 25px;
  }

  .drug-item .iconfont, .rx-total .iconfont {
    font-size: 30px;
  }

  .text-red {
    color: red;
    font-size: 30px;
  }

  .width-percent-100 {
    width: 100%;
  }

</style>
