<!-- FIXME 字体大小 -->
<template>
  <div class="rxs-content position-relative">
    <new-header :title="shopName">
      <router-link to="/messageTypes" slot="left">
        <i class=" iconfont ic-xiaoxi"></i>
      </router-link>
    </new-header>

    <div class="hr-box">
      <span class="line mr-30"></span>
      <span class="txt">药店列表</span>
      <span class="line ml-30"></span>
    </div>

    <div class="bg-white chose-box p-lr-20 is-flex flex-sb">
      <span>
        <i class="iconfont ic-changshangbaojia text-13C1FE"></i>
        选择厂商
      </span>
      <span>
         <i class="iconfont" style="color:#1AB6FD!important;" @click="lookMore(index)" :class="{'ic-xiajiantou':isActive}"></i>
         <i class="iconfont" style="color:#1AB6FD!important;" @click="lookMore(index)" :class="{'ic-youjiantou':!isActive}"></i>
      </span>
    </div>

    <!-- 遮罩 -->
    <div v-show="show" class="shadow-box">
      <div class="shadow-content position-relative">
        <i class="iconfont ic-guanbi2 position-absolute position-tr" @click="takeUp"></i>
        <div class="is-flex flex-sb p-10">
          <span><i class="iconfont ic-changshangbaojia text-13C1FE"></i> 选择厂商</span>
        </div>
        <div>
            <div class="is-flex flex-sb p-10-20">
              <div class="text-13C1FE">
                <i class="iconfont ic-changfang"></i>
                <span>厂商名称</span>
              </div>
              <div class="text-13C1FE">
                <i class="iconfont ic-jiage"></i>
                <span>价格</span>
              </div>
            </div>
            <div v-for="(origin,index) in origins" @click="choose(index)" class="is-flex flex-sb p-10-20">
              <span>{{origin.originName}}</span>
              <span class="text-red">¥ {{origin.price}}</span>
            </div>
          </div>
      </div>
    </div>

    <ul>
      <li v-for="(cart,index) in carts" :key="index" class="m-10">
        <new-rx-shop-drugs :isOtc="cart.isOtc" :name="cart.name" :spec="cart.spec" :fileId="cart.fileId"
                           :price="cart.price"></new-rx-shop-drugs>
      </li>
    </ul>
    <div class="rx-total ml-20">
      <i class="iconfont ic-qian text-13C1FE"></i>共计三件商品&nbsp;&nbsp;合计<span class="text-red rx-total-money">¥127.2</span>
    </div>

    <footer>
      <div class="d-inline-block fl bg-13C1FE text-white rx-joincar">加入购物车</div>
      <div class="d-inline-block fl bg-red text-white rx-immediately">立即购买</div>
    </footer>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        id: '',
        shopId: '',
        shopName: '',
        drugs: [],
        show: false,
        origins: [],
        index: 0,
        carts: [],
        account: {},
        isActive: true
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.shopId = this.$route.query.shopId;
      this.shopName = this.$route.query.shopName;
      if (this.$store.getters.account) {
        this.account = this.$store.getters.account;
      }
      this.getDrugs();
    },
    methods: {
      popup() {
        this.show = false;
      },
      getDrugs() {
        this.$http.get('/rxs/' + this.id + '/shops/' + this.shopId + '/drugs')
          .then(res => {
            this.drugs = res.data;
            this.initCart();
          });
      },
      lookMore(index) {
        this.origins = this.drugs[index].drugs;
        this.index = index;
        this.show = true;
        this.popupVisible = true;
        this.isActive = !this.isActive;
      },
      takeUp() {
        this.show = false;
        this.popupVisible = false;
      },
      initCart() {
        this.drugs.forEach(drug => {
          this.carts.push({
            accountId: this.account.id,
            shopId: this.shopId,
            rxId: this.id,
            drugSpecId: drug.drugs[0].drugSpecId,
            shopDrugSpecId: drug.drugs[0].shopDrugSpecId,
            name: drug.name,
            spec: drug.spec,
            brand: drug.drugs[0].brand,
            price: drug.drugs[0].price,
            quantity: drug.quantity,
            fileId: drug.drugs[0].fileId
          });
        });
      },
      choose(index) {
        let cart = this.carts[this.index];
        cart.drugSpecId = this.origins[index].drugSpecId;
        cart.shopDrugSpecId = this.origins[index].shopDrugSpecId;
        cart.brand = this.origins[index].brand;
        cart.price = this.origins[index].price;
        cart.fileId = this.origins[index].fileId;
        this.show = false;
      },
      createCart() {
        this.carts.forEach(cart =>
          this.$http.post('/carts', cart)
        );
        Toast({
          message: '加入购物车成功',
          position: 'middle',
          duration: 2000
        });
      }
    }
  };
</script>

<style scoped>
  .rxs-content{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }
  .shadow-box{
    width: 720px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#000;
    opacity:0.8;
    z-index: 19950502;
  }
  .shadow-content{
    background: white;
    width: 680px;
    margin: 185px auto;
    color: black;
  }
  .is-flex{
    display: flex !important;
  }
  .flex-sb{
    justify-content: space-between;
  }
  .position-tr{
    top:0;
    right:0;
  }
  .p-10-20{
    padding:10px 20px;
    box-sizing: border-box;
  }
  .p-10{
    padding:10px;
    box-sizing: border-box;
  }
  .m-10{
    margin-top: 10px !important;
    box-sizing: border-box;
  }
  .chose-box{
    width: 720px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
  }
  .p-lr-20{
    padding: 0 20px;
  }

  .hr-box{
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .hr-box .line {
    display: inline-block;
    width: 260px;
    border-top: 1px solid #13c1fe ;
  }
  .hr-box .txt {
    width:112px;
    height:26px;
    font-size:28px;
    color:rgba(0,0,0,1);
    line-height:61px;
    vertical-align: middle;
  }
  .ml-20{
    margin-left: 20px !important;
  }
  .ml-30{
    margin-left: 30px !important;
  }
  .mr-30{
    margin-right: 30px !important;
  }

  .rx-total{
    margin-top: 26px;
  }
  .rx-total-money{font-size: 26px;}
  footer{
    position: fixed;
    bottom: 0;
  }
  .rx-joincar{
    width:393px;
    height:100px;
    background:rgba(19,193,254,1);
    line-height: 100px;
    font-size:30px;
    text-align: center;
  }
  .rx-immediately{
    width:327px;
    height:100px;
    background:rgba(240,43,43,1);
    line-height: 100px;
    font-size:30px;
    text-align: center;
  }
</style>
