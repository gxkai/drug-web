<template>
  <!--TODO swiper 滚动 -->
  <!--TODO 倒计时 -->
  <div class="bg-f8">
    <div class="bg-blue index-header">
      <div class="flex-stream-sb padding-lr-10 mtop-30">
        <i class="iconfont ic-ditu text-white is-16x22"></i>
        <span @click="nearby" class="text-white fz22 elps d-inline-block">{{chooseAddress}}</span>
        <i class="iconfont ic-arrLeft-fill text-white fz12 line-height-20 height2"></i>
        <div class="search-box position-relative all-center no-border">
          <img src="../assets/image/search.png" class=" is-24x24"/>
          <input type="text" v-model="shopName" placeholder="通用名、商品名、症状"
                 @blur="$router.push('/components/search')"
                 @keyup.enter="$router.push('/components/search')"
                 @click="$router.push('/components/search')"
                 class="no-border fz20"/>
        </div>
        <i class="iconfont ic-lingdang text-white "></i>
      </div>
    </div>
    <div class="index-hidden-width"></div>

    <!-- 轮播 -->
    <swiper :options="swiperOption" class="mt-0">
      <swiper-slide v-for="(advertList,index) in advertLists" :key="index" class="mt-0">
        <img v-lazy="getImgURL(advertList.fileId, 'MIDDLE_PIC')" class="dluboimgh mt-0" @click="see(advertList)"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="bg-white">
      <!-- 导航 -->
      <div class="nav-bar flex-stream-sa">
        <router-link class="is-120x120 flex-column-center" to="/rxs">
          <img class="is-90x90" src="../assets/image/home/homefirst.png"/>
          <div class="fz20 text-333333">我的处方</div>
        </router-link>
        <router-link class="is-120x120 flex-column-center" to="/repositoryTypes">
          <img class="is-90x90" src="../assets/image/home/hometwo.png"/>
          <div class="fz20 text-333333">知识库</div>
        </router-link>
        <router-link class="is-120x120 flex-column-center" to="/shops">
          <img class="is-90x90" src="../assets/image/home/homethree.png"/>
          <div class="fz20 text-333333">药房</div>
        </router-link>
        <router-link class="is-120x120 flex-column-center" to="/">
          <img class="is-90x90" src="../assets/image/home/homefor.png"/>
          <div class="fz20 text-333333">移动医疗</div>
        </router-link>
      </div>
      <!-- 滚动 -->
      <div class="scroll-bar border-top-gray all-center">
        <div class="d-inline-block fl health-img">
          <img src="../assets/image/health.png" class="health-img"/>
        </div>
        <div class="d-inline-block fl">
          <div class="scroll-wrap d-block"><span class="hot">热门</span>
            <ul class="scroll-content" :style="{ top }">
              <router-link class="f_knowledgeList" v-for="(repositoryType,index) in repositoryTypeList" :key="index"
                           :to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}">
                <li v-for="item in repositoryTypeList">{{repositoryType.name }}</li>
              </router-link>
            </ul>
          </div>
          <div class="scroll-wrap d-block"><span class="hot">必读</span>
            <ul class="scroll-content" :style="{ top }">
              <router-link class="f_knowledgeList" v-for="(repositoryType,index) in repositoryTypeList1" :key="index"
                           :to="{path:'/repositories/view',query:{repositoryTypeId:repositoryType.id,title:repositoryType.title}}">
                <li v-for="item in repositoryTypeList">{{repositoryType.title }}</li>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--让利惠民-->
    <div class="discount">
      <div class="separate-content all-center">
        <span class="new-line"></span><span class="text-13C1FE">让利惠民</span><span class="new-liner"></span>
      </div>
      <div class="width-percent-100 bg-white">
        <div class="bg-white width-percent-96 m-auto time-down">
          <i class="icon iconfont ic-shijian2 text-FF9800 mr-5 font-weight-bold display-block"></i>
          <DownTime @time-end="message = '倒计时结束'" :endTime='endTime' class="d-inline-block down-time"></DownTime>
        </div>
      </div>
      <ul class="flex-wrap position-relative bg-white">
        <router-link v-for="(discountList,index) in discountLists"
                     :to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"
                     :key="index">
          <div class="drug-box-01 flex-row-center border-right-gray border-bottom-gray" v-if="index === 0 ">
            <router-link v-for="(discountList,index) in discountLists"
                         :to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"
                         :key="index" v-if="index===0">
              <img class="is-120x120 mr-20" :src="getImgURL(discountList.fileId, 'MIDDLE_LOGO')"
                   v-if="index===0">
              <div class="is-flex flex-column">
                <span class="elps width-144 d-inline-block fz16">{{discountList.name}}</span>
                <span class="text-red text-center fz18">¥ {{discountList.price}} /盒</span>
              </div>
            </router-link>
          </div>

          <div class="drug-box-01 flex-row-center border-right-gray border-bottom-gray" v-if="index === 1 ">
            <router-link v-for="(discountList,index) in discountLists"
                         :to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"
                         :key="index" v-if="index===1">
              <img class="is-120x120 mr-20" v-lazy="getImgURL(discountList.fileId, 'MIDDLE_LOGO')" v-if="index===1">
              <div class="is-flex flex-column">
                <span class="elps width-144 d-inline-block fz16">{{discountList.name}}</span>
                <span class="text-red text-center fz18">¥ {{discountList.price}} /盒</span>
              </div>
            </router-link>
          </div>
          <div class="drug-box-2 flex-column-center border-right-gray" v-if="index === 2">
            <router-link v-for="(discountList,index) in discountLists"
                         :to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"
                         :key="index" v-if="index===2">
              <img class="is-145x145" v-lazy="getImgURL(discountList.fileId, 'MIDDLE_LOGO')" v-if="index===2">
              <div class="is-flex flex-column">
                <span class="elps width-144 d-inline-block fz16">{{discountList.name}}</span>
                <span class="text-red text-center fz18">¥ {{discountList.price}} /盒</span>
              </div>
            </router-link>
          </div>
          <div class="drug-box-34 flex-row-center border-bottom-gray" style="float: right" v-if="index === 3 ">
            <router-link v-for="(discountList,index) in discountLists"
                         :to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"
                         :key="index" v-if="index===3">
              <img class="is-135x85 mr-20" v-lazy="getImgURL(discountList.fileId, 'MIDDLE_LOGO')" v-if="index===3">
              <div class="is-flex flex-column">
                <span class="elps width-144 d-inline-block fz16">{{discountList.name}}</span>
                <span class="text-red text-center fz18">¥ {{discountList.price}} /盒</span>
              </div>
            </router-link>
          </div>
          <div class="drug-box-34 flex-row-center position-absolute position-rb" style="float: right"
               v-if="index === 4 ">
            <router-link v-for="(discountList,index) in discountLists"
                         :to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"
                         :key="index" v-if="index===4">
              <img class="is-135x85 mr-20" v-lazy="getImgURL(discountList.fileId, 'MIDDLE_LOGO')" v-if="index===4">
              <div class="is-flex flex-column">
                <span class="elps width-144 d-inline-block  fz16">{{discountList.name}}</span>
                <span class="text-red fz18">¥ {{discountList.price}} /盒</span>
              </div>
            </router-link>
          </div>
        </router-link>
      </ul>
    </div>

    <!-- 医保定点药房 -->
    <div class="shop-show">
      <div class="separate-content all-center">
        <span class="new-line"></span><span class="text-13C1FE">医保定点药房</span> <span class="new-liner"></span>
      </div>
      <div class="shop-content">
        <swiper :options="swiperOptions" id="medical">
           <swiper-slide class="swiper-img" :style="{backgroundSize:cover,background: 'url('+getImgURL(item.fileId)+') no-repeat'}" v-for="(item,index) in showLists" :key="index">
             <div class="swiper-div-cover" @click="$router.push('/shops/view?id='+item.id)"></div>
          </swiper-slide>
       </swiper>
      </div>
    </div>

    <!-- 好货推荐 -->
    <div class="recommend">
      <div class="separate-content all-center">
        <span class="new-line"></span><span class="text-13C1FE"><i class="iconfont ic-aixin text-red"></i>好货推荐</span>
        <span class="new-liner"></span>
      </div>
      <div class="bg-white of-hidden">
        <ul class="flex-wrap">
          <router-link
            class="drug-box flex-column-center position-relative border-left-gray border-right-gray border-top-gray border-bottom-gray"
            v-for="(recommendList,index) in recommendLists" :key="index"
            :to="{path:'/shopDrugSpecs',query:{id:recommendList.id}}">
            <span class="toc-tip position-absolute all-center" v-if="recommendLists.isOtc === true">非处</span>
            <span class="toc-tip position-absolute all-center" v-else>处</span>
            <img class="is-260x193" v-lazy="getImgURL(recommendList.fileId, 'MIDDLE_LOGO')">
            <span class="elps width-180 fz22">{{recommendList.name}}{{recommendList.spec}}</span>
            <span class="text-red fz24">¥ {{recommendList.price}} /盒</span>
          </router-link>
          <li
            class="drug-box flex-column-center position-relative border-left-gray border-right-gray border-top-gray border-bottom-gray"
            v-if="recommendLists.length !== 0">
          </li>
        </ul>
      </div>
    </div>

    <!-- 撑屏容器 -->
    <div class="add-container is-720x100">
    </div>

    <new-footer :urlRouter="$route.path"></new-footer>
  </div>
</template>
<script>
  import {BmMarker, BmLabel} from 'vue-baidu-map';
  import DownTime from '../components/timeDown';
  import {Toast} from 'mint-ui';
  import axios from 'axios';

  export default {
    name: 'home',
    data() {
      return {
        activeIndex: 0,
        leftIndex: '',
        rightIndex: '',
        index: '',
        imgPath: 'http://172.16.0.107:8081',
        endTime: '2018-12-29 12:06:00',
        hour: '',
        minutes: '',
        seconds: '',
        news: [],
        discountLists: [],
        showLists: [],
        recommendLists: [],
        advertLists: [],
        longitude: '',
        latitude: '',
        lat: '31.39',
        lng: '120.95',
        zoom: 3,
        shopName: '',
        chooseAddress: '请选择地址',
        popupVisible: false,
        isCurrent: 1,
        repositoryTypeList: [],
        repositoryTypeList1: [],
        swiperOption: {
          autoplay: 3500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true
        },

        swiperSlides: [1, 2, 3, 4, 5],
        swiperOptions: {// swiper3
          autoplay: 3000,
          speed: 1000,
          effect: 'coverflow',
          slidesPerView: 'auto',
          loop: true
        },
        coverflowEffect: {
          rotate: 500,
          stretch: 0,
          depth: 1000,
          modifier: 1,
          slideShadows: false
        }
      };
    },
    components: {
      BmMarker,
      BmLabel,
      DownTime
    },
    computed: {
      top() {
        return -(this.activeIndex) * 25 + 'px';
      }
    },
    mounted() {
      setInterval(_ => {
        if (this.activeIndex < 3) {
          this.activeIndex++;
        } else {
          this.activeIndex = 1;
        }
      }, 1000);
    },
    methods: {
      fns(e) {
        alert(1);
      },
      see(e) {
        window.location.href = e.url;
      },
      getList() {
        this.$http.get('/repositoryTypes')
          .then((res) => {
            this.repositoryTypeList = res.data;
          });
      },
      getList1() {
        this.$http.get('/repositories/home')
          .then((res) => {
            this.repositoryTypeList1 = res.data;
          });
      },
      map() {
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
      },
      startAddress() {
        this.getLocation();
        this.$http.get('/baidu/maps?lat=' + this.lat + '&lng=' + this.lng).then(res => {
          this.chooseAddress = res.data.formatted_address;
        });
      },
      nearby() {
        this.$router.push({path: '/addresses/repositioning', query: {lat: this.lat, lng: this.lng, poi: true}});
      }
    },
    created: function () {
      this.getList();
      this.getList1();
      if (sessionStorage.IsThisTheFirstTime === 'yes') {
        if (localStorage.account !== undefined) {
          sessionStorage.clear();
          this.$http.get('/accounts/verify').then(ress => {
            if (ress.status === 200) {
              axios({
                method: 'get',
                url: '/accounts',
                headers: {'Authorization': ress.data}
              }).then(res => {
                if (res.status === 200) {
                  let person = {
                    token: ress.data,
                    account: res.data
                  };
                  localStorage.clear();
                  localStorage.setItem('account', JSON.stringify(person));
                  this.$store.commit('SET_TOKEN', ress.data);
                  this.$store.commit('SET_ACCOUNT', res.data);
                }
              });
            }
          });
        }
      }
      this.getLocation();
      let lat = this.$route.query.lat;
      let lng = this.$route.query.lng;
      let address = this.$route.query.address;
      let district = this.$route.query.district;
      if (district) {
        if (district.indexOf('昆山市') < 0) {
          Toast('不在有效区域');
        }
      }
      if (address) {
        this.lat = lat;
        this.lng = lng;
        this.chooseAddress = address;
      } else {
        this.startAddress();
      }
      // 让利惠民
      this.$http.get('/drugs/discount').then(res => {
        this.discountLists = res.data;
      });

      // 医保定点
      this.$http.get('/shops/show').then(res => {
        this.showLists = res.data;
      });
      // 广告
      this.$http.get('/adverts').then(res => {
        this.advertLists = res.data;
      });
      // 好货推荐
      this.$http.get('/drugs/recommend').then(res => {
        this.recommendLists = res.data;
      });
    }
  };
</script>
<style lang="scss">
  .mtop-30 {
    margin-top: 20px;
  }

  .discount {
    width: 720px;
  }

  .border-left-gray {
    border-left: 0.8px rgba(238, 238, 238, 1) solid !important;
  }

  .border-right-gray {
    border-right: 0.8px rgba(238, 238, 238, 1) solid !important;
  }

  .border-top-gray {
    border-top: 0.8px rgba(238, 238, 238, 1) solid !important;
  }

  .border-bottom-gray {
    border-bottom: 0.8px rgba(238, 238, 238, 1) solid !important;
  }

  .separate-content {
    width: 720px;
    height: 80px;
  }

  .all-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .flex-stream-sa {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .flex-stream-sb {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flex-row-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .drug-box {
    width: 360px;
    height: 330px;
  }

  .drug-box-01 {
    width: 360px;
    height: 223px;
  }

  .drug-box-2 {
    width: 360px;
    height: 345px;
  }

  .drug-box-34 {
    width: 360px;
    height: 170px;
  }

  .is-260x193 {
    width: 260px;
    height: 193px;
  }

  .position-rb {
    bottom: 0;
    right: 0;
  }

  /*搜索框*/
  .index-header {
    width: 720px;
    height: 114px;
    background: #1ab6fd;
    line-height: 75px;
    position: fixed;
    top: 0px;
    z-index: 99999;
  }

  .index-hidden-width {
    width: 720px;
    height: 114px;
  }

  .search-box {
    width: 470px;
    height: 36px;
    background: white;
  }

  .no-border {
    border: 0;
    outline: 0;
  }

  /*小图标*/
  .is-24x24 {
    width: 24px;
    height: 24px;
  }

  .is-16x16 {
    font-size: 16px;
  }

  .is-16x22 {
    font-size: 16px;
  }

  /*swiper*/
  .swiper-slide {
    width: 720px !important;
    height: 300px !important;
  }

  /*导航*/
  .nav-bar {
    width: 720px;
    height: 160px;
    background: white;
  }

  .is-90x90 {
    width: 90px;
    height: 90px;
  }

  /*滚动*/
  .scroll-bar {
    width: 720px;
    height: 100px;
    background: white;
  }

  /*  让利惠民 图片样式 */
  .is-120x120 {
    width: 120px;
    height: 120px;
  }

  .is-135x85 {
    width: 135px;
    height: 85px;
  }

  .is-145x145 {
    width: 145px;
    height: 145px;
  }

  /*处方标识*/
  .toc-tip {
    left: 5px;
    top: 5px;
    width: 50px;
    height: 30px;
    background: #bfbfbf;
    color: #666666;
    border-radius: 100px / 50px;
  }

  .shop-content {
    width: 720px;
    height: 330px;
    background: rgba(238, 238, 238, 1);
   }

  /* 撑屏容器 */
  .is-720x100 {
    width: 720px;
    height: 100px;
  }

  .mr-20 {
    margin-right: 20px !important;
  }

  .padding-lr-10 {
    padding: 0 10px;
    box-sizing: border-box;
  }

  .scroll-wrap {
    width: 641px;
    height: 40px;
    overflow: hidden;
  }

  .scroll-content {
    position: relative;
    transition: top 0.5s;
    width: 501px;
    margin-left: 80px;
    margin-top: -5px;
  }

  .scroll-content li {
    line-height: 50px;
    text-align: center;
    height: 50px;
  }

  .health-img {
    width: 70px;
    height: 70px;
  }

  .hot {
    width: 53px;
    height: 35px;
    line-height: 35px;
    font-size: 8px !important;
    color: #FF9800;
    border: 0.8px solid #FF9800;
    display: inline-block;
    margin-left: 9px;
    text-align: center;
  }

  .swiper-container {
    width: 100%;
  }

  .swiper-slides {
    background-position: center;
    background-size: cover;
    width: 80px;
    height: 40px;
  }

  .f_knowledgeList li {
    text-align: left;
    font-size: 22px;
    color: rgba(119, 119, 119, 1);
  }

  .swiper-img {
    width: 275px !important;
    height: 238px !important;
  }

  .fz22 {
    font-size: 22px;
  }

  .fz20 {
    font-size: 20px;
  }

  .shop-content {
    z-index: -9999;
  }

  .down-time {
    margin-top: 14px;
  }

  .icon {
    width: 0rem;
    height: 0rem;
  }

  .ic-shijian2 {
    margin-right: 19px !important;
    margin-top: 20px;
    width: 26px;
    height: 26px;
    font-size: 20px;
  }

  .time-down {
    height: 45px;
    line-height: 45px;
  }

  .new-line {
    width: 117px !important;
    height: 2.2px !important;
    display: inline-block;
    background: rgba(191, 191, 191, 1);
    margin-right: 13px;
  }

  .new-liner {
    width: 117px !important;
    height: 2.2px !important;
    display: inline-block;
    background: rgba(191, 191, 191, 1);
    margin-left: 13px;
  }

  a {
    color: #333333;
  }

  .width-144 {
    width: 144px;
  }

  .width-180 {
    width: 200px;
  }

  .scroll-content {

  }

  .ic-ditu {
    font-size: 20px;
  }

  .ic-lingdang {
    font-size: 20px;
  }
  .dluboimgh{
    width:720px;
    height:300px;
  }
  .swiper-div-cover{
    width:275px;
    height:238px;
    background: white;
    opacity: 0;
  }

  .fz18{font-size: 18px;}
  .fz17{font-size: 17px;}
  .fz16{font-size: 16px;}
  .fz22{font-size: 22px;}
  .fz24{font-size: 24px;}
  .mt-0{margin-top: 0px!important;}
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
</style>
