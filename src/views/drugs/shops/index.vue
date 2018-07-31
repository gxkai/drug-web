<template>
   <div class="fruit-body">
      <div class="drug-bg-img">
        <div class="drug-type">处</div>
        <div class="drug-img"></div>
     </div>
     <div class="drug-div1 position-relative">
       <div class="drug-div2 position-absolute">
            <p class="elps drug-head-line">{{drugInfo.name}}</p>
            <p class="elpsTwo drug-head-benefit">{{drugInfo.introduce}}</p>
            <p class="drug-firm elps">{{drugInfo.sfda}}</p>
            <p class="drug-firm elps">厂商：{{drugInfo.originName}}</p>
       </div>
     </div>
     <div class="drug-offer">
          <div class="width-percent-96 m-auto merchant">
              <div class="d-inline-block fl"><span class="text-1AB6FD">{{total}}</span><span>商家报价</span></div>
              <div class="d-inline-block fr"><i class="icon iconfont ic-xiajiantou"></i> </div>
          </div>
       <div class="comprehensive">
          <div class="d-inline-block" @click="orderById()">综合<i class="ic-sanx-up icon iconfont text-1AB6FD"></i></div>
          <div class="d-inline-block" @click="orderByDistance()">距离</div>
          <div class="d-inline-block" @click="orderByPrice()">价格</div>
       </div>
    </div>
     <div class="width-percent-100 bg-white drug-shops"  v-for="(shopList,index) in shopLists" :key="index">
        <div class="ordinary width-percent-96 m-auto">
              <div class="drug-ordinary">
                <span class="d-inline-block fl drug-shop">{{shopList.name}}</span>
                <span class="text-red d-inline-block fr drug-price">¥{{shopList.price}}</span>
              </div>
               <div class="rote">
                   <span>
                      <i class="icon iconfont ic-ditu text-1AB6FD"></i>{{shopList.address}}
                   </span>
                   <span>
                      <i class="icon iconfont ic-aixin text-1AB6FD"></i>评分：{{shopList.score}}分
                   </span>
                   <span>
                      <i class="icon iconfont ic-kucun text-1AB6FD"></i>库存：{{shopList.stock}}
                   </span>
               </div>
                <div class="fr rote shopping-car">
                  <i class="icon iconfont ic-gouwuche3 text-1AB6FD"></i>
                </div>
        </div>
     </div>
   </div>
</template>


<script>
  export default {
    data() {
      return {
        shopLists: [],
        drugInfo: [],
        arrowdown: false,
        hide: false,
        tips: [],
        total: '',
        picUrls: '',
        drugId: '',
        drugShopSort: 'SYNTHESIZE',
        spec: '',
        specId: '',
        val: -1,
        lng: null,
        lat: null
      };
    },
    props: ['message'],
    methods: {
      getShopLists() {
        var url = '/drugs/' + this.drugId + '/drugSpecs/' + this.specId + '/shops?drugShopSort=' + this.drugShopSort + '&lat=' + this.lat + '&lng=' + this.lng;
        this.$http.get(url).then((res) => {
          this.total = res.data.total;
          this.shopLists = res.data.list;
        });
      },
      orderById() {
        this.drugShopSort = 'SYNTHESIZE';
        this.getShopLists();
      },
      orderByDistance() {
        this.drugShopSort = 'DISTANCE';
        this.getLocation();
      },
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          alert('浏览器不支持');
        }
      },
      showPosition(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getShopLists();
      },
      orderByPrice() {
        this.val = -(this.val);
        if (this.val === -1) {
          this.drugShopSort = 'PRICE_LESS';
        } else {
          this.drugShopSort = 'PRICE_MORE';
        }
        this.getShopLists();
      },
      dropDown() {
        this.hide = true;
        this.arrowdown = true;
      },
      arrowDown() {
        this.arrowdown = false;
        this.hide = false;
      },
      d_closed(data) {
        if (data !== '') {
          data = data || this.drugId;
          // 根据选择的值修改页面
          const url ='/drugs/' + this.drugId + '/drugSpecs/' + data + '/shops?drugShopSort=' + this.drugShopSort;
          this.$http.get(url).then((res) => {
            this.total = res.data.total;
            this.shopLists = res.data.list;
          });
          this.tips.forEach(e => {
            if (e.value === data) {
              this.drugInfo.value = e.value;
              this.picUrls = e.picUrls;
              this.spec = e.name;
            }
          });
        }
        this.hide = false;
        this.arrowdown = false;
      }
    },
    created: function () {
      this.drugId = this.$route.query.id;
      this.specId = this.$route.query.specId;
      const drugURL = this.URL_PATH + '/drugs/' + this.drugId;
      this.$http.get(drugURL).then((res) => {
        this.drugInfo = res.data;
        // 规格信息
        this.tips = res.data.drugSpecs;
        this.tips.forEach(e => {
          e.label = e.name;
          e.value = e.id;
          e.logoUrl = this.URL_PATH + '/files/' + e.logo + '/image?resolution=' + 'LARGE_LOGO';
          e.picUrls = [];
          e.pics.forEach(e1 => {
            e.picUrls.push(this.URL_PATH + '/files/' + e1 + '/image?resolution=' + 'LARGE_PIC');
          });
        });
        this.drugInfo.value = this.tips[0].value;
        this.spec = this.tips[0].name;
        this.picUrls = this.tips[0].picUrls;
      });
      this.getLocation();
    }
  };
</script>

<style scoped>
  .fruit-body{
    background: #fbf7f7;
  }
  .icon{
    width: auto;
    height: auto;
  }
.drug-bg-img{
  width:720px;
  height:413px;
  background:rgba(255,255,255,1);
}
 .drug-type{
    width:42px;
    height:25px;
    background:rgba(43,178,146,1);
    color: white;
    text-align: center;
    line-height: 25px;
    margin-top: 11px;
    margin-left: 22px;
    border-radius:42px/21px;
  }
  .drug-img{
    width: 720px;
    height:295px;
    background: #ffffff;
  }
  .drug-div1{
    width:680px;
    height:228px;
    background:rgba(255,255,255,1);
    box-shadow:1px 1px 1px rgba(0,0,0,0.05);
    margin-left: 20px;
    border:1px solid #13C1FE;
  }
  .drug-div2{
    width:660px;
    height:246px;
    background:rgba(255,255,255,1);
    margin-left: 10px;
    z-index: 9;
    border:1px solid #13C1FE;
    margin-bottom: 10px;
    top:-28px;
  }
  .drug-head-line{
    width:600px;
    height:26px;
    font-size:24px;
    color:rgba(51,51,51,1);
    line-height:26px;
    margin: 26px 0 0 30px;
  }
  .drug-head-benefit{
    width:583px;
    height:50px;
    font-size:18px;
    color:rgba(51,51,51,1);
    line-height:25px;
    margin: 27px 0 0 30px;
  }
  .drug-firm{
    width:500px;
    height:25px;
    font-size:20px;
    color:rgba(153,153,153,1);
    line-height:20px;
    margin: 22px 0px 16px 30px;
  }
  .drug-offer{
    margin-top: 10px;
    width: 720px;
    height: 117px;
    background: white;
  }
  .merchant{
    height:50px;
    line-height: 50px;
    font-size:24px;
    border-bottom: 1px solid #f5f5f5;
  }
  .comprehensive{
    font-size:24px;
    height: 67px;
    line-height: 67px;
  }
  .comprehensive div:first-child{
    margin-left: 98px;
   }
  .comprehensive div:nth-child(2){
    margin-left: 165px;
  }
  .comprehensive div:nth-child(3){
    margin-left: 179px;
  }
  .ordinary{
    margin-top: 15px;
    height:130px;
  }
  .drug-ordinary{
    margin-top: 22px;
    height: 69px;
    line-height:69px;
   }
  .drug-shop{
    margin-left: 20px;
    font-size:26px;
   }
  .drug-price{
    margin-right: 21px;
    font-size:24px;
   }
  .rote{
    font-size: 20px;
  }
  .rote i{
    font-size: 20px;
  }
  .shopping-car{
    height: 34px;
    line-height: 34px;
  }
</style>

