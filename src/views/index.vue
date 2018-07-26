<template>
  <div id="home" class="bg-f8">
    <!--<header class="height6 bg-blue">-->
      <!--<div class="line-height-12 height2 pt2" style="position:relative;">-->
        <!--<i class="icon iconfont ic-ditu width1  height1  text-white" style="font-size:1.4rem;"></i>-->
        <!--<span class="elps text-white width-17 d-inline-block" @click="nearby">{{chooseaddress}}-->
          <!--</span>-->
        <!--<i class="icon iconfont ic-arrLeft-fill text-white fz12 line-height-20 height2"></i>-->
        <!--<input type="text" v-model="shopName" placeholder="通用名、商品名、症状" @blur="$router.push('/components/search')"-->
               <!--@keyup.enter="$router.push('/components/search')" @click="$router.push('/components/search')"-->
               <!--class="width-64 bg-white line-height-20 height2 text-center"/>-->
        <!--<img src="static/img/search.png" style="position:absolute;left:10rem;width:15px;top:2.5rem;"/>-->
        <!--<i class="icon iconfont ic-lingdang text-white"></i>-->
      <!--</div>-->
    <!--</header>-->

    <!--<mt-swipe :auto="4000">-->
      <!--<mt-swipe-item v-for="(advertList,index) in advertLists" :key="index">-->
        <!--<img :src="imgpath+'/api/files/'+advertList.fileId+'/image?resolution=MIDDLE_PIC#/'" class="dluboimgh"-->
             <!--@click="see(advertList)"/>-->
      <!--</mt-swipe-item>-->
    <!--</mt-swipe>-->

    <swiper :options="swiperOption">
      <swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="bg-white">
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




    <!--<div class="height4 fz-14 text-center text-13C1FE mt1 bg-f8" style="line-height:3rem;">-->
      <!--<span class="d-inline-block width6 bg-eaeaea mr1 align-super h03"></span>让利惠民<span-->
      <!--class="d-inline-block width6 bg-eaeaea h03 mr1 align-super ml1"></span>-->
    <!--</div>-->
    <!--<div class="height27 bg-white">-->
      <!--<div class="m-auto width-98">-->
        <!--<div class="pt-10 border-right-f1f1f1 width-49">-->
          <!--<i class="icon iconfont ic-shijian2 text-FF9800 mr-5 font-weight-bold "></i>-->
          <!--&lt;!&ndash;<DownTime @time-end="message = '倒计时结束'" :endTime='endTime' style="display:inline-block;"></DownTime>&ndash;&gt;-->
        <!--</div>-->
        <!--&lt;!&ndash;中间&ndash;&gt;-->
        <!--<div class="of-hidden">-->
          <!--<div class="border-right-f1f1f1 width-49 d-inline-block height9 pt2 border-bottom-f1f1f1 fl pb1">-->
            <!--<router-link v-for="(discountList,index) in discountLists"-->
                         <!--:to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"-->
                         <!--:key="index" v-if="index===0">-->

              <!--<div class="d-inline-block fl">-->
                <!--<img :src="imgpath+'/api/files/'+discountList.fileId+'/image?resolution=MIDDLE_LOGO#/'"-->
                     <!--class="width3 height6 ml1" v-if="index===0">-->
              <!--</div>-->
              <!--<div class="d-inline-block fl width7 fl ml1">-->
                <!--<p class="width7 elps mt2" v-if="index===0">{{discountList.name}}</p>-->
                <!--<p><span class="text-F02B2B text-F02B2B" v-if="index===0">¥{{discountList.price}}</span> <span-->
                  <!--class="text-999999 fz-6 text-decoration-line-through" v-if="index===0">¥176.3</span></p>-->
              <!--</div>-->
            <!--</router-link>-->
          <!--</div>-->
          <!--<div class="width-49 d-inline-block height9 pt2 border-bottom-f1f1f1 pb1">-->
            <!--<router-link v-for="(discountList,index) in discountLists"-->
                         <!--:to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"-->
                         <!--:key="index" v-if="index === 1">-->

              <!--<div class="d-inline-block fl ml1">-->
                <!--<img :src="imgpath+'/api/files/'+discountList.fileId+'/image?resolution=MIDDLE_LOGO#/'"-->
                     <!--class="width3 height6" v-if="index === 1">-->
              <!--</div>-->
              <!--<div class="d-inline-block fl width7 fl ml1">-->
                <!--<p class="width7 elps mt2" v-if="index === 1">{{discountList.name}}</p>-->
                <!--<p><span class="text-F02B2B text-F02B2B" v-if="index === 1">¥{{discountList.price}}</span> <span-->
                  <!--class="text-999999 fz-6 text-decoration-line-through">¥176.3</span></p>-->
              <!--</div>-->
            <!--</router-link>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash;中间&ndash;&gt;-->

        <!--&lt;!&ndash;第三部分开始&ndash;&gt;-->

        <!--<div class="height15">-->
           <!--<div class="width-49 d-inline-block fl text-center m-auto border-right-f1f1f1 height15">-->
             <!--<router-link v-for="(discountList,index) in discountLists"-->
                         <!--:to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"-->
                         <!--:key="index" v-if="index===2">-->
              <!--<div class="width7 height7  m-auto pt2">-->
                <!--<img :src="imgpath+'/api/files/'+discountList.fileId+'/image?resolution=MIDDLE_LOGO#/'"-->
                     <!--class="width7 height7" v-if="index===2">-->
              <!--</div>-->
              <!--<p class="elps mt3" v-if="index===2">{{discountList.name}}</p>-->
              <!--<p><span class="text-F02B2B text-F02B2B" v-if="index===2">¥{{discountList.price}}</span>-->
                <!--<span class="text-999999 fz-6 text-decoration-line-through">¥176.3</span>-->
              <!--</p>-->
             <!--</router-link>-->
           <!--</div>-->
          <!--<div class="width-49 d-inline-block fl">-->
            <!--<ul class="mt2">-->
                <!--<li class="border-bottom-f1f1f1 height5">-->
                  <!--<router-link v-for="(discountList,index) in discountLists"-->
                             <!--:to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"-->
                             <!--:key="index" v-if="index===3">-->
                  <!--<img :src="imgpath+'/api/files/'+discountList.fileId+'/image?resolution=MIDDLE_LOGO#/'"-->
                       <!--class="width5 height4 ml1 d-inline-block fl mr1" v-if="index===3">-->
                  <!--<p class="height-1"></p>-->
                  <!--<p class="text-F02B2B text-F02B2B mt1" v-if="index===3">¥{{discountList.price}}</p>-->
                  <!--<p class="width5 elps" v-if="index===3">{{discountList.name}}</p>-->
               <!--</router-link>-->

              <!--</li>-->
              <!--<li class="mt2">-->
                <!--<router-link v-for="(discountList,index) in discountLists"-->
                             <!--:to="{path:'/shopDrugSpecs',query:{id:discountList.id}}"-->
                             <!--:key="index" v-if="index===4">-->

                  <!--<img :src="imgpath+'/api/files/'+discountList.fileId+'/image?resolution=MIDDLE_LOGO#/'"-->
                       <!--class="width5 height4 ml1 d-inline-block fl mr1" v-if="index===4">-->
                  <!--<p class="text-F02B2B text-F02B2B mt1" v-if="index===4">¥{{discountList.price}}</p>-->
                  <!--<p class="width5 elps" v-if="index===4">{{discountList.name}}</p>-->
                <!--</router-link>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;第三部分结束&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->

    <!--让利惠民-->
    <div class="separate-content all-center">
      <span class="text-13C1FE">让利惠民</span>
    </div>

    <ul class="flex-wrap position-relative bg-white">
      <li v-for="(recommendList,index) in recommendLists" >
        <div class="drug-box-01 flex-row-center border-right-gray border-bottom-gray" v-if="index === 0 ">
          <img  class="is-120x120" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{recommendList.name}}{{recommendList.spec}}</span>
            <span class="text-red">¥ {{recommendList.price}} /盒</span>
          </div>
        </div>
        <div class="drug-box-01 flex-row-center border-right-gray border-bottom-gray" v-if="index === 1 ">
          <img  class="is-120x120" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{recommendList.name}}{{recommendList.spec}}</span>
            <span class="text-red">¥ {{recommendList.price}} /盒</span>
          </div>
        </div>
        <div class="drug-box-2 flex-column-center border-right-gray" v-if="index === 2">
          <img  class="is-120x120" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{recommendList.name}}{{recommendList.spec}}</span>
            <span class="text-red">¥ {{recommendList.price}} /盒</span>
          </div>
        </div>
        <div class="drug-box-34 flex-row-center border-bottom-gray" style="float: right" v-if="index === 3 " >
          <img  class="is-120x120" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{recommendList.name}}{{recommendList.spec}}</span>
            <span class="text-red">¥ {{recommendList.price}} /盒</span>
          </div>
        </div>
        <div class="drug-box-34 flex-row-center position-absolute position-rb" style="float: right" v-if="index === 4 " >
          <img  class="is-120x120" src="http://ovhq5iw4e.bkt.clouddn.com/work-3.jpg">
          <div class="is-flex flex-column">
            <span class="elps">{{recommendList.name}}{{recommendList.spec}}</span>
            <span class="text-red">¥ {{recommendList.price}} /盒</span>
          </div>
        </div>
      </li>
    </ul>

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
        <li class="drug-box flex-column-center position-relative border-left-gray border-right-gray border-top-gray border-bottom-gray">
        </li>
      </ul>
    </div>
    </div>
    <all-bottom></all-bottom>
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
      // setInterval(_ => {
      //   if (this.activeIndex < this.repositoryTypeList.length - 1) {
      //     this.activeIndex += 1;
      //   } else {
      //     this.activeIndex = 0;
      //   }
      // }, 3000);
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
                  this.$store.commit('setToken', ress.data);
                  this.$store.commit('setAccount', res.data);
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

  /*.hot {*/
    /*width: 3rem;*/
    /*height: 1.2rem;*/
    /*font-size: 0.8rem;*/
    /*color: #FF9800;*/
    /*border: 1px solid #FF9800;*/
    /*line-height: 1.2rem;*/
  /*}*/

  /*.h03 {*/
    /*height: 0.1rem;*/
  /*}*/

  /*.carousel-3d-slide {*/
    /*border-color: white !important;*/
  /*}*/

  /*.mint-swipe-indicator.is-active {*/
    /*background: #1AB6FD !important;*/
    /*opacity: 1 !important;*/
  /*}*/

  /*.scroll-wrap {*/
    /*height: 20px;*/
    /*overflow: hidden;*/
  /*}*/

  /*.scroll-content {*/
    /*position: relative;*/
    /*transition: top 0.5s;*/
  /*}*/

  /*.carousel-3d-container {*/
    /*margin-bottom: 0px !important;*/
  /*}*/
</style>
