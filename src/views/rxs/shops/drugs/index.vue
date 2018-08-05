<!-- FIXME 字体大小 -->
<template>
  <div class="rxs-content position-relative">
    <new-header :title="shopName || hospitalName">
      <router-link to="/messageTypes" slot="left" class="iconfont ic-arrow-right text-white">
      </router-link>
    </new-header>

    <div class="hr-box">
      <span class="line mr-30"></span>
      <span class="txt">药店列表</span>
      <span class="line ml-30"></span>
    </div>
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
      <li v-for="(drug,index) in drugs" :key="index" class="m-10">
        <div class="rx-shop-drugs-box is-flex flex-row flex-item pl-20 position-relative">
          <span class="toc-tip position-absolute all-center" v-if="carts[index].otc === true">非处</span>
          <span class="toc-tip position-absolute all-center bg-2BB292" v-else>处</span>
          <img class="is-200x200" :src="getImgURL(carts[index].fileId, 'LOGO')">
          <div class="box-right is-flex flex-column flex-sa ml-40">
            <div class="position-relative">
              <i class="iconfont ic-changfang text-13C1FE"></i>
              <span class="text-box">厂商:</span>
              <span class="text-info">{{carts[index].originName}}</span>
              <i @click="lookMore(index)" :class="{'iconfont ic-youjiantou':isActive}"></i>
              <i @click="lookMore(index)" :class="{'iconfont ic-xiajiantou':!isActive}"></i>
            </div>
            <div>
              <i class="iconfont ic-yao text-13C1FE"></i>
              <span class="text-box">名称:</span>
              <span class="">{{carts[index].name}}</span>
            </div>
            <div>
        <span>
           <i class="iconfont ic-yaopinshuju text-13C1FE"></i>
           <span class="text-box">规格:</span>
           <span class="">{{carts[index].spec}}</span>
        </span>
            </div>
            <div>
              <i class="iconfont ic-qian text-13C1FE"></i>
              <span class="text-box">最低价:</span>
              <span class="text-red">&yen; {{carts[index].price}}</span>
            </div>
          </div>
        </div>
      </li>

      <li v-for="(item,index) in hospital.list" :key="index" class="m-10">
        <div class="rx-shop-drugs-box is-flex flex-row flex-item pl-20 position-relative">
          <img class="is-200x200" :src="getImgURL('', 'SMALL_LOGO')">
          <div class="box-right is-flex flex-column flex-sa ml-40">
            <div class="position-relative">
              <i class="iconfont ic-changfang text-13C1FE"></i>
              <span class="text-box">厂商:</span>
              <span class="text-info">{{hospitalName}}</span>
            </div>
            <div>
              <i class="iconfont ic-yao text-13C1FE"></i>
              <span class="text-box">名称:</span>
              <span class="">{{item.list.name}}</span>
            </div>
            <div>
        <span>
           <i class="iconfont ic-yaopinshuju text-13C1FE"></i>
           <span class="text-box">规格:</span>
           <span class="">{{item.list.spec}}</span>
        </span>
            </div>
            <div>
              <i class="iconfont ic-qian text-13C1FE"></i>
              <span class="text-box">最低价:</span>
              <span class="text-red">&yen; {{item.list.price}}</span>
            </div>
          </div>
        </div>
      </li>


    </ul>

    <div class="rx-total ml-20">
      <i class="iconfont ic-qian text-13C1FE"></i>共计三件商品&nbsp;&nbsp;合计<span class="text-red rx-total-money">¥ {{amount}}</span>
    </div>

    <new-rxCart @createCart="createCart"></new-rxCart>
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
        isActive: true,
        amount: 0,
        hospital: {},
        hospitalId: '',
        hospitalName: ''
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.shopId = this.$route.query.shopId;
      this.hospitalId = this.$route.query.hospitalId;
      this.shopName = this.$route.query.shopName;
      this.hospitalName = this.$route.query.hospitalName;
      if (this.$store.getters.account) {
        this.account = this.$store.getters.account;
      }
      this.getDrugs();
    },
    methods: {
      getDrugs() {
        this.$http.get('/rxs/' + this.id + '/shops/' + this.shopId + '/drugs')
          .then(res => {
            this.drugs = res.data;
            this.initCart();
          });
        this.$http.get('/orders/hospital?rxId=' + this.id)
          .then(res => {
            this.hospital = res.data;
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
            rxId: this.id,
            drugSpecId: drug.drugs[0].drugSpecId,
            shopDrugSpecId: drug.drugs[0].shopDrugSpecId,
            name: drug.name,
            spec: drug.spec,
            price: drug.drugs[0].price,
            quantity: drug.quantity,
            fileId: drug.drugs[0].fileId,
            otc: drug.otc,
            originName: drug.drugs[0].originName
          });
        });
        this.carts.forEach(e => {
          this.amount += e.price;
        });
      },
      choose(index) {
        let cart = this.carts[this.index];
        cart.drugSpecId = this.origins[index].drugSpecId;
        cart.shopDrugSpecId = this.origins[index].shopDrugSpecId;
        cart.price = this.origins[index].price;
        cart.fileId = this.origins[index].fileId;

        this.amount = 0;
        this.carts.forEach(e => {
          this.amount += e.price;
        });
        this.show = !this.show;
        this.isActive = !this.isActive;
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


  /* 组件 */
  .rx-shop-drugs-box{
    width: 720px;
    height:216px;
    background:rgba(255,255,255,1);
  }
  .is-200x200{
    width: 200px;
    height: 200px;
  }
  .pl-20{
    padding-left: 20px !important;
    box-sizing: border-box;
  }
  .ml-40{
    margin-left: 40px !important;
  }
  .is-flex{
    display: flex !important;
  }

  .flex-row{
    flex-direction: row;
  }
  .flex-column{
    flex-direction: column;
  }
  .flex-sa{
    justify-content: space-around;
  }
  .flex-sb{
    justify-content: space-between;
  }
  .flex-item{
    align-items: center;
  }

  .box-right{
    height: 150px;
  }
  /*处方标识*/
  .toc-tip{
    left: 5px;
    top: 5px;
    width:50px;
    height:30px;
    background:#bfbfbf;
    color:#666666;
    border-radius:100px / 50px;
  }
  .all-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .bg-2BB292{
    background: #2BB292;
    color: white;
  }
  .text-box{
    width: 90px !important;
    display: inline-block;
  }
  .text-info{
    width: 180px !important;
    display: inline-block;
  }

</style>
