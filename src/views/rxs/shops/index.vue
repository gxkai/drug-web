<template>
  <div id="Pharmacylist">
     <div class="J_Pharmacylist_header">
     <router-link to="/rxs/view" ><i class="icon iconfont icon-fanhui" style="color:white!important;"></i></router-link>
      <div class="J_Pharmacylist_header_search">
        <div><i class="icon iconfont ic-sousuo" style="margin-left:0rem!important;color:white!important;"></i></div>
        <span class="d_search_title">
          <input type="text" placeholder="达康药业" class="custom"></span>
      </div>
      <div><i style="position:relative" class="icon iconfont icon-xiaoxi">
        <router-link to="/messageTypes" class="J_Pharmacylist_header_hong"></router-link>
      </i></div>
    </div>

    <div class="J_Pharmacylist_nav">
      <div @click="orderById()" :class="{'blueactive1':index1==comprehensive1}">综合
          <i class="icon iconfont ic-arrLeft-fill samespan" :class="{'blueactive1':index1==comprehensive1}" style="display:none;"></i>
     </div>
      <div @click="orderByDistance()" :class="{'blueactive1':index2==comprehensive2}">距离最近</div>
      <div @click="orderByScore()" :class="{'blueactive1':index3==comprehensive3}">好评优先</div>
   <!--    <div @click="orderByPrice()" style="display: flex; flex-direction: row;align-items: center" :class="{'blueactive1':index4==comprehensive4}">价格
     <div class="d_drugs_index">
       <i class="icon iconfont ic-arrLeft-fill1" :class="val==1?'samespan':'blueactive'" style="display:block;"></i>
       <i class="icon iconfont ic-arrLeft-fill" :class="val==1?'blueactive':'samespan'"></i>
     </div>
   </div>
    -->
      <li @click="orderByPrice()" :class="{'blueactive1':index4==comprehensive4}" style="display:flex;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价格
              <div class="d_drugs_index" style="margin-top:1.5rem;">
               <i class="icon iconfont ic-arrLeft-fill1" :class="val==1?'samespan':'blueactive'" style="display:block;margin-bottom:0.2rem;"></i>
               <i class="icon iconfont ic-arrLeft-fill" :class="val==1?'blueactive':'samespan'"></i>
              </div>
     </li>

    </div>
    <ul>
       <li style="width:98%;height:14.35rem;box-shadow:rgba(0, 0, 0, 0.32) 0.1rem 0.1rem 0.1rem;border:1px solid #13C1FE;margin-left: 1%;" class="">
         <router-link to="/orders/create2">
          <div class="left d-inline-block fl width-44 mt1 ml1" style="height:12.15rem;">
            <img src="http://172.16.11.19:8081/api/files/3/image?resolution=LARGE_LOGO" class="width-100 height-100"/>
          </div>
         <div class="right d-inline-block fr width-52">
            <ul>
               <li class="mt2 height-15 mb-10 elips"><i class="icon iconfont icon-yiyuanguanli text-1AB6FD"></i>&nbsp;昆山市中医院</li>
               <li class="height-15 mb-10 elips"><i class="icon iconfont icon-ai-tel text-1AB6FD"></i>&nbsp;电话：0512-56498211</li>
               <li class="height-15 mb-10 elips"><i class="icon iconfont icon-address text-1AB6FD"></i>&nbsp;地址：昆山市朝阳路189号</li>
               <li class="height-15 mb-10 elips text-red"><i class="icon iconfont ic-qianbao text-1AB6FD"></i>&nbsp;¥58.00</li>
            </ul>
         </div>
         </router-link>
       </li>
      <li style="width:98%;height:14.35rem;margin-left: 1%;" class="position-relative"  v-for="rxShop in rxShops">
        <router-link :to="{path:'/rxs/shops/drugs',query:{id:id,shopId:rxShop.id,shopName:rxShop.name}}">
        <div class="left d-inline-block fl width-44 mt1 ml1" style="height:12.15rem;">
          <img :src="rxShop.imgUrl" class="width-100 height-100 mt1"/>
        </div>
        <div class="right d-inline-block fr width-52">
          <ul>
            <li class="mt2 height-15 mb-10 elips"><i class="icon iconfont icon-yiyuanguanli text-1AB6FD"></i>&nbsp;{{rxShop.name}}</li>
            <li class="height-15 mb-10 elips"> <star-rating show-text :rating="rxShop.score" read-only="true" active-color="red" star-size="18" :show-rating="false"></star-rating></li>
            <li class="height-15 mb-10 elips"><i class="icon iconfont icon-ai-tel text-1AB6FD"></i>&nbsp;电话：{{rxShop.tel}}</li>
            <li class="height-15 mb-10 elips"><i class="icon iconfont icon-address text-1AB6FD"></i>&nbsp;地址：{{rxShop.area+rxShop.address}}</li>
            <li class="height-15 mb-10 elips text-red"><i class="icon iconfont ic-qianbao text-1AB6FD"></i>&nbsp;¥{{rxShop.amount}}</li>
          </ul>
          <i class="icon iconfont ic-gouwuche1 text-red position-absolute bg-white" style="top:62%;left:86%;"></i>
        </div>
        </router-link>
      </li>
      <li v-for="rxShop in rxShops" style="display:none;">
       <router-link :to="{path:'/rxs/shops/drugs',query:{id:id,shopId:rxShop.id,shopName:rxShop.name}}">
        <div class="J_Pharmacylist_li_img" style="width:40%;float:left;"><img :src="rxShop.imgUrl" alt=""></div>
        <div class="J_Pharmacylist_li_zi" style="width:50%;float:right;margin-right:5%;">
          <div></div>
          <div style="font-size:1.2rem;" class="d_elips">{{rxShop.name}}</div>
          <div>
            <star-rating show-text :rating="rxShop.score" read-only="true" active-color="red" star-size="18" :show-rating="false"></star-rating>
          </div>
          <div style="color:#999999"><span>电话: </span> <span> {{rxShop.tel}}</span></div>
          <div style="color:#999999"><span class="d_fl">地址: </span> <span class="d_elips d_fl"> {{rxShop.area+rxShop.address}}</span>
          </div>
          <div style="color:red"><span>价格</span><span>￥{{rxShop.amount}}</span></div>
            <router-link :to="{path:'/rxs/shops/drugs',query:{id:id,shopId:rxShop.id,shopName:rxShop.name}}"
                       class="J_Pharmacylist_li_icon">
            <i class="icon iconfont ic-gouwuche1" style="color:red;"></i>
          </router-link>
        </div>
         </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        rxShops: [],
        lng: 120.9809,
        lat: 31.3872,
        val: -1,
        comprehensive1: -1,
        index1: 1,
        index2: 2,
        index3: 3,
        index4: 4,
        comprehensive2: -2,
        comprehensive3: -3,
        comprehensive4: -4
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.getRxShops();
    },
    methods: {
      getRxShops() {
        this.$http.get('/rxs/' + this.id + '/shops?lng=' + this.lng + '&lat=' + this.lat, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then(res => {
            this.rxShops = res.data;
            // getImages(this.rxShops, this, 'LARGE_LOGO');
          });
      },
      orderById() {
        this.rxShops = this.orderListsById(this.rxShops);
        this.comprehensive1 = 1;
        this.comprehensive2 = 7;
        this.comprehensive3 = 7;
        this.comprehensive4 = 7;
      },
      orderByDistance() {
        this.rxShops = this.orderListsByDistance(this.rxShops);
        this.comprehensive2 = 2;
        this.comprehensive1 = 7;
        this.comprehensive3 = 7;
        this.comprehensive4 = 7;
      },
      orderByScore() {
        this.rxShops = this.orderListsByScore(this.rxShops);
        this.comprehensive3 = 3;
        this.comprehensive1 = 7;
        this.comprehensive2 = 7;
        this.comprehensive4 = 7;
      },
      orderByPrice() {
        this.comprehensive4 = 4;
        this.comprehensive1 = 7;
        this.comprehensive2 = 7;
        this.comprehensive3 = 7;
        this.val = -(this.val);
        if (this.val === -1) {
          this.rxShops = this.orderListsByPriceASC(this.rxShops);
        } else {
          this.rxShops = this.orderListsByPriceDESC(this.rxShops);
        }
      },
      orderListsByPriceASC(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].amount > list[j + 1].amount) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsByPriceDESC(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].amount < list[j + 1].amount) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsById(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].id > list[j + 1].id) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsByDistance(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].distance > list[j + 1].distance) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      },
      orderListsByScore(list) {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (list[j].score > list[j + 1].score) {
              let temp = list[j + 1];
              list[j + 1] = list[j];
              list[j] = temp;
            }
          }
        }
        return list;
      }
    }
  };
</script>

<style scoped >
  .J_Pharmacylist_header {
    display: flex;
    justify-content: space-between;
    padding: 0 2%;
    padding-right: 5%;
    height: 5rem;
    line-height: 5rem;
    font-size: 1.4rem;
    background-color: #1AB6FD;
  }

  .J_Pharmacylist_header .icon {
    font-size: 2rem;
    color: #ffffff;
  }

  .J_Pharmacylist_header_hong {
    width: 0.6rem;
    height: 0.6rem;
    background-color: red;
    border-radius: 0.6rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  .J_Pharmacylist_header_search {
    background-color: #12b1f9;
    width: 70%;
    opacity: 0.8;
    height: 3rem;
    margin-top: 1rem;
    border-radius: 3rem;
    position: relative;
  }

  .J_Pharmacylist_header_search div {
    position: absolute;
    left: 5%;
    width: 10%;
    height: 3rem;
    top: 0;
  }

  .J_Pharmacylist_header_search div img {
    position: absolute;
    top: 0.5rem;
    transform: scale(0.8, 0.8)
  }

  .J_Pharmacylist_header_search span {
    position: absolute;
    left: 20%;
    height: 3rem;
    line-height: 3rem;;
  }

  /*.J_Pharmacylist_nav {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*height: 4rem;*/
    /*line-height: 4rem;*/
    /*padding: 0 5%;*/
 /*}*/

  /*.J_Pharmacylist_li {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*padding: 0.5rem 3%;*/
    /*position: relative;*/
    /*margin: 0rem 0;*/
  /*}*/

  /*.J_Pharmacylist_li_img {*/
    /*width: 40%;*/
  /*}*/

  /*.J_Pharmacylist_li_img img {*/
    /*width:10rem;*/
    /*height: 8rem;*/
    /*margin-top: 2.54rem;*/
  /*}*/

  /*.J_Pharmacylist_li_zi {*/
    /*width: 55%;*/
  /*}*/

  /*.J_Pharmacylist_li_zi div {*/
    /*height: 2rem;*/
    /*line-height: 2rem;*/
  /*}*/

  /*.J_Pharmacylist_li_zi .J_Pharmacylist_li_icon {*/
    /*position: absolute;*/
    /*top: 10rem;*/
    /*right: 5%;*/
    /*height: 3.2rem;*/
    /*text-align: center;*/
    /*color: #ffffff;*/
    /*width: 3rem;*/
    /*background-color: red;*/
    /*!*background: url('/static/img/rxs/redCar.png');*!*/
    /*background-size: cover;*/
  /*}*/

  /*.J_Pharmacylist_li_icon .icon {*/
    /*font-size: 1.8rem;*/
  /*}*/

  /*.samespan {*/
    /*width: 10px;*/

    /*color: #d6cfcf!important;*/
    /*display: inline-block;*/
    /*font-size: 10rem;*/
  /*}*/

  /*.blueactive {*/
    /*color: #1AB6FD;*/
    /*width: 10px;*/
    /*display: inline-block;*/
    /*font-size: 1rem;*/

  /*}*/

  /*.d_drugs_index {*/
    /*flex: 1;*/
    /*margin-top: -2px;*/
    /*line-height: 0.5rem;*/
    /*margin-top: 0.2rem;*/
  /*}*/

  /*.d_elips {*/
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*width: 66%;*/
  /*}*/
  /*.elips{*/
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
  /*}*/

  /*.d_fl {*/
    /*float: left;*/
  /*}*/

  /*.ic-gouwuche1 {*/
    /*color: red;*/
    /*font-size: 3rem !important;*/
  /*}*/
  /*.star-main{margin:0px!important;}*/
  /*.blueactive1{color: #1AB6FD;}*/
  /*.J_Pharmacylist_header {*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*padding: 0 2%;*/
    /*padding-right: 5%;*/
    /*height: 5rem;*/
    /*line-height: 5rem;*/
    /*font-size: 1.4rem;*/
    /*background-color: #1AB6FD;*/
    /*color: #ffffff;*/
  /*}*/


  /*.J_Pharmacylist_header_hong {*/
    /*width: 0.6rem;*/
    /*height: 0.6rem;*/
    /*background-color: red;*/
    /*border-radius: 0.6rem;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
  /*}*/

  /*.J_Pharmacylist_header_search {*/
    /*background-color: #12b1f9;*/
    /*width: 76%;*/
    /*opacity: 0.8;*/
    /*height: 3rem;*/
    /*margin-top: 1rem;*/
    /*border-radius: 3rem;*/
    /*position: relative;*/
  /*}*/

  /*.J_Pharmacylist_header_search div {*/
    /*position: absolute;*/
    /*left: 1rem;*/
    /*width: 10%;*/
    /*height: 3rem;*/
    /*top: -0.8rem;*/
  /*}*/
/*.icon-sousuo{color: white;}*/
/*.d_search_title{line-height: 2.5rem!important;position: absolute;left: 3.2rem;top: 0rem;}*/
/*.d_search_title input{width: 100%;background:none;}*/
/*input::-webkit-input-placeholder{color:white;font-size: 1.4rem;color: #fff;}*/
/*input.custom {caret-color: white;color: white;font-size: 1.4rem;}*/
/*.icon-fanhui{color:white!important;}*/

</style>
