<template>
  <!--TODO swiper 滚动 -->
  <!--TODO 倒计时 -->
  <div class="bg-f8">
    <div class="bg-blue index-header">
      <div class="flex-stream-sb padding-lr-10">
        <i class="iconfont ic-ditu text-white is-16x22"></i>
        <span @click="nearby" class="text-white">{{chooseaddress}}</span>
        <i class="iconfont ic-arrLeft-fill text-white fz12 line-height-20 height2"></i>
        <div class="search-box position-relative all-center no-border">
          <img  src="../assets/image/search.png" class=" is-24x24"/>
          <input type="text" v-model="shopName" placeholder="通用名、商品名、症状"
                 @blur="$router.push('/components/search')"
                 @keyup.enter="$router.push('/components/search')"
                 @click="$router.push('/components/search')"
                 class="no-border"/>
        </div>
        <i class="iconfont ic-lingdang text-white "></i>
      </div>
    </div>

    <!-- 轮播 -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(advertList,index) in advertLists" :key="index">
        <img :src="imgpath+'/api/files/'+advertList.fileId+'/image?resolution=MIDDLE_PIC#/'" class="dluboimgh"
             @click="see(advertList)"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="bg-white">
      <!-- 导航 -->
      <div class="nav-bar flex-stream-sa">
        <router-link class="is-120x120 flex-column-center" to="/rxs">
          <img class="is-90x90" src="../assets/image/home/homefirst.png"/>
          <div>我的处方</div>
        </router-link>
        <router-link class="is-120x120 flex-column-center" to="/repositoryTypes">
          <img class="is-90x90" src="../assets/image/home/hometwo.png"/>
          <div>知识库</div>
        </router-link>
        <router-link class="is-120x120 flex-column-center" to="/shops">
          <img class="is-90x90" src="../assets/image/home/homethree.png"/>
          <div>药房</div>
        </router-link>
        <router-link class="is-120x120 flex-column-center" to="/">
          <img class="is-90x90" src="../assets/image/home/homefor.png"/>
          <div>移动医疗</div>
        </router-link>
      </div>
      <!-- 滚动 -->
      <div class="scroll-bar border-top-gray all-center">
        <span class="text-red">这边是个滚动....</span>
      </div>

      <!--<div class="mt0 border-top-238 bg-white pt-6 pd-5">-->
        <!--<div class="ml1 d-inline-block">-->
          <!--<img src="static/img/health.png" class="width3 height3 align-bottom mb-2"/>-->
        <!--</div>-->
        <!--<div class="d-inline-block width-83">-->
          <!--<div class="scroll-wrap">-->
            <!--<ul class="scroll-content" :style="{ top }">-->
              <!--<router-link class="f_knowledgeList" v-for="(repositoryType,index) in repositoryTypeList" :key="index"-->
                           <!--:to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}">-->
                <!--<li style="line-height:20px;height:20px;" v-for="(repositoryType,index) in repositoryTypeList"-->
                    <!--:key="index"-->
                    <!--:to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}" v-if="index!=2">-->
                  <!--<span class="elps width-81 d-inline-block"> <span class="hot d-inline-block text-center mr1">热门</span>{{ repositoryType.name }}</span>-->
                <!--</li>-->
              <!--</router-link>-->

            <!--</ul>-->
          <!--</div>-->
          <!--<div class="scroll-wrap">-->
            <!--<ul class="scroll-content" :style="{ top }">-->
              <!--<router-link class="f_knowledgeList" v-for="(repositoryType,index) in repositoryTypeList" :key="index"-->
                           <!--:to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}">-->
                <!--<li style="line-height:20px;height:20px;" v-for="(repositoryType,index) in repositoryTypeList"-->
                    <!--:key="index"-->
                    <!--:to="{path:'/repositories',query:{repositoryTypeId:repositoryType.id,title:repositoryType.name}}" v-if="index===2">-->
                  <!--<span class="elps width-81 d-inline-block">-->
                     <!--<span class="hot d-inline-block text-center mr1">必读</span>{{ repositoryType.name }}</span>-->
                <!--</li>-->
              <!--</router-link>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <!--让利惠民-->
    <div class="discount">
    <div class="separate-content all-center">
      <span class="text-13C1FE">让利惠民</span>
    </div>

    <ul class="flex-wrap position-relative bg-white">
      <router-link v-for="(discountList,index) in discountLists"
                   :to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"
                   :key="index">
        <div class="drug-box-01 flex-row-center border-right-gray border-bottom-gray" v-if="index === 0 ">
          <img  class="is-120x120 mr-20" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{discountList.name}}</span>
            <span class="text-red">¥ {{discountList.price}} /盒</span>
          </div>
        </div>

        <div class="drug-box-01 flex-row-center border-right-gray border-bottom-gray" v-if="index === 1 ">
          <img  class="is-120x120 mr-20" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{discountList.name}}</span>
            <span class="text-red">¥ {{discountList.price}} /盒</span>
          </div>
        </div>
        <div class="drug-box-2 flex-column-center border-right-gray" v-if="index === 2">
          <img  class="is-145x145" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{discountList.name}}</span>
            <span class="text-red">¥ {{discountList.price}} /盒</span>
          </div>
        </div>
        <div class="drug-box-34 flex-row-center border-bottom-gray" style="float: right" v-if="index === 3 " >
          <img  class="is-135x85 mr-20" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{discountList.name}}</span>
            <span class="text-red">¥ {{discountList.price}} /盒</span>
          </div>
        </div>
        <div class="drug-box-34 flex-row-center position-absolute position-rb" style="float: right" v-if="index === 4 " >
          <img class="is-135x85 mr-20"  src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{discountList.name}}</span>
            <span class="text-red">¥ {{discountList.price}} /盒</span>
          </div>
        </div>
      </router-link>
    </ul>
    </div>

    <!-- 医保定点药房 -->
    <div class="shop-show">
    <div class="separate-content all-center">
      <span class="text-13C1FE">医保定点药房</span>
    </div>

    <div class="shop-content">
    <!--<carousel-3d style="height:200px!important;">-->
      <!--<slide :index="0" style="width:20rem;margin-left:3.5rem;height:13rem;">-->
        <!--<img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"-->
             <!--:src="imgpath+'/api/files/P7bSWiL_TZSKr04rFvxQzA/image?resolution=MIDDLE_LOGO#/'" style="height:13rem;"/>-->
      <!--</slide>-->
      <!--<slide :index="1" style="width:20rem;margin-left:3.5rem;height:13rem;">-->
        <!--<img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"-->
             <!--:src="imgpath+'/api/files/2/image?resolution=MIDDLE_LOGO#/'" style="height:13rem;"/>-->
      <!--</slide>-->
      <!--<slide :index="2" style="width:20rem;margin-left:3.5rem;height:13rem;">-->
        <!--<img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"-->
             <!--:src="imgpath+'/api/files/3/image?resolution=MIDDLE_LOGO#/'" style="height:13rem;"/>-->
      <!--</slide>-->
    <!--</carousel-3d>-->
    </div>
    </div>

    <!-- 好货推荐 -->
    <div class="recommend">
    <div class="separate-content all-center">
      <i class="iconfont ic-aixin text-red"></i>
      <span class="text-13C1FE">好货推荐</span>
    </div>
    <div class="bg-white of-hidden">
      <ul class="flex-wrap">
        <li class="drug-box flex-column-center position-relative border-left-gray border-right-gray border-top-gray border-bottom-gray" v-for="(recommendList,index) in recommendLists">
          <span class="toc-tip position-absolute all-center" v-if="recommendLists.isOtc === true">非处</span>
          <span class="toc-tip position-absolute all-center" v-else>处</span>
          <img class="is-260x193" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <span class="elps">{{recommendList.name}}{{recommendList.spec}}</span>
          <span class="text-red">¥ {{recommendList.price}} /盒</span>
        </li>
        <li class="drug-box flex-column-center position-relative border-left-gray border-right-gray border-top-gray border-bottom-gray" v-if="recommendLists.length !== 0">
        </li>
      </ul>
    </div>
    </div>

    <!-- 撑屏容器 -->
    <div class="add-container is-720x100">
    </div>
    <new-footer></new-footer>
  </div>
</template>
<script>
  // import DownTime from '../components/timeDown';
  // import allBottom from '../components/allBottom';
  import BaiduMap from 'vue-baidu-map/components/Map/Map.vue';
  import {BmMarker, BmLabel} from 'vue-baidu-map';
  import {Toast} from 'mint-ui';
  import axios from 'axios';
  // import {Carousel3d, Slide} from 'vue-carousel-3d';

  export default {
    name: 'home',
    data() {
      return {
        leftIndex: '',
        rightIndex: '',
        index: '',
        activeIndex: 0,
        imgpath: 'http://172.16.0.107:8081',
        endTime: '2018-12-19 12:06:00',
        hour: '',
        minutes: '',
        seconds: '',
        news: [],
        discountLists: [],
        showLists: [],
        recommendLists: [],
        advertLists: [],
        mapheight: 300,
        longitude: '',
        latitude: '',
        lat: '31.39',
        lng: '120.95',
        zoom: 3,
        shopName: '',
        mapview: false,
        chooseaddress: '请选择地址',
        popupVisible: false,
        isCurrent: 1,
        repositoryTypeList: [],
        swiperOption: {
          autoplay: 3500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true
        },
        swiperSlides: [1, 2, 3, 4, 5]
      };
    },
    components: {
      // DownTime,
      // allBottom,
      BaiduMap,
      BmMarker,
      BmLabel
      // Carousel3d,
      // Slide
    },
    computed: {
      top() {
        return -this.activeIndex * 20 + 'px';
      }
    },
    mounted() {
      setInterval(() => {
        let swiperSlides = this.swiperSlides;
        if (swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1);
      }, 3000);
    },
    methods: {
      see(e) {
        window.location.href = e.url;
      },
      getList() {
        this.$http.get('/repositoryTypes')
          .then((res) => {
            this.repositoryTypeList = res.data;
          });
      },
      hidemap() {
        this.popupVisible = false;
        this.mapview = false;
      },
      map() {
        this.getLocation();
        this.mapview = true;
        this.popupVisible = true;
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
      startaddress() {
        this.getLocation();
        this.$http.get('/baidu/maps?lat=' + this.lat + '&lng=' + this.lng).then(res => {
          this.chooseaddress = res.data.formatted_address;
        });
      },
      nearby() {
        this.$router.push({path: '/repositioning', query: {lat: this.lat, lng: this.lng, poi: true}});
      }
    },
    created: function () {
      this.getList();
      if (sessionStorage.IsThisTheFirstTime === 'yes') {
        if (localStorage.account !== undefined) {
          sessionStorage.clear();
          this.$http.get('/accounts/verify', {
            headers: {
              'Authorization': JSON.parse(localStorage.account).token
            }
          }).then(ress => {
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
        };
      };
      if (address) {
        this.lat = lat;
        this.lng = lng;
        this.chooseaddress = address;
      } else {
        this.startaddress();
      }
      ;
      // 让利惠民
      this.$http.get('/drugs/discount').then(res => {
        this.discountLists = res.data;
        // getImages(this.discountLists, this, 'LARGE_LOGO');
      });

      // 医保定点
      this.$http.get('/shops/show').then(res => {
        this.showLists = res.data;
        // getImages(this.showLists, this, 'LARGE_LOGO');
      });
      // 广告
      this.$http.get('/adverts').then(res => {
        this.advertLists = res.data;
        // getImages(this.advertLists, this, 'MIDDLE_PIC');
      });
      // 好货推荐
      this.$http.get('/drugs/recommend').then(res => {
        this.recommendLists = res.data;
        // getImages(this.recommendLists, this, 'LARGE_LOGO');
      });
    }
  };
</script>
<style lang="scss">
  .border-left-gray{
    border-left:1px rgba(238,238,238,1) solid !important;
  }
  .border-right-gray{
    border-right: 1px rgba(238,238,238,1) solid !important;
  }
  .border-top-gray{
    border-top: 1px rgba(238,238,238,1) solid !important;
  }
  .border-bottom-gray{
    border-bottom: 1px rgba(238,238,238,1) solid !important;
  }
  .separate-content{
    width: 720px;
    height: 80px;
  }
  .all-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .flex-stream-sa{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-column-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .flex-row-center{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .flex-column{
    flex-direction: column;
  }

  .flex-wrap{
    display: flex;
    flex-wrap: wrap;
  }
  .drug-box{
    width: 360px;
    height: 330px;
  }

  .drug-box-01{
    width: 360px;
    height: 223px;
  }
  .drug-box-2{
    width: 360px;
    height: 345px;
  }
  .drug-box-34{
    width: 360px;
    height: 170px;
  }

  .is-260x193{
    width: 260px;
    height: 193px;
  }
  .position-rb{
    bottom: 0;
    right: 0;
  }
  /*搜索框*/
  .index-header{
    width: 720px;
    height: 75px;
    background: #1ab6fd;
    line-height: 75px;
  }
  .search-box{
    width:470px;
    height:36px;
    background: white;
  }
  .no-border{
    border: 0;
    outline: 0;
  }
  /*小图标*/
  .is-24x24{
    width: 24px;
    height: 24px;
  }
  .is-16x16{
    font-size: 16px;
  }
  .is-16x22{
    font-size: 16px;
  }

  /*swiper*/
  .swiper-slide{
    width: 720px !important;
    height: 300px !important;
  }
  /*导航*/
  .nav-bar{
    width: 720px;
    height: 160px;
    background: white;
  }
  .is-90x90{
    width: 90px;
    height: 90px;
  }
  /*滚动*/
  .scroll-bar{
    width: 720px;
    height: 100px;
    background: white;
  }
  /*  让利惠民 图片样式 */
  .is-120x120{
    width: 120px;
    height: 120px;
  }
  .is-135x85{
    width: 135px;
    height: 85px;
  }
  .is-145x145{
    width: 145px;
    height: 145px;
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
  .shop-content{
    width:720px;
    height:330px;
    background:rgba(238,238,238,1);
  }

  /* 撑屏容器 */
  .is-720x100{
    width: 720px;
    height: 100px;
  }

  .mr-20{
    margin-right: 20px !important;
  }
  .padding-lr-10{
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>
