<template>
  <div class="bg-f8">
    <div class="bg-blue index-header" ref="header">
      <div>
        <i class="iconfont ic-weizhi"></i>
      </div>
      <div @click="onAddress()">
        <span>{{chooseAddress}}</span>
      </div>
      <div @click="onAddress()">
        <i class="iconfont ic-arrowdown"></i>
      </div>
      <div>
        <div>
          <input class="iconfont" :placeholder="searchIcon" type="text" v-model="keyword"
                 @keyup.enter="onFocus()">
        </div>
      </div>
      <div @click="$router.push('/messageTypes')">
        <i class="iconfont ic-lingdang"></i>
      </div>
    </div>
    <div ref="body">
      <!-- 轮播 -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(advertList,index) in advertLists" :key="index" class="mt-0">
          <img v-lazy="getImgURL(advertList.fileId, 'MIDDLE_PIC')" @click="see(advertList)"/>
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
                <router-link class="f_knowledgeList" v-for="(repositoryType,index) in repositoryTypeListForHome" :key="index"
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
          <span class="new-line"></span>
          <span class="text-13C1FE fz28">让利惠民</span>
          <span class="new-liner"></span>
        </div>
        <div class="width-percent-100 bg-white">
          <div class="bg-white width-percent-96 m-auto time-down now-oclock">
            <!--  <i class="icon iconfont ic-shijian1 text-FF9800"></i>-->
            <img src="../assets/image/oclock.png" class="oclock"/>
            <DownTime @time-end="message = '倒计时结束'" :endTime='endTime' class="d-inline-block"></DownTime>
          </div>
        </div>
        <ul class="flex-wrap position-relative bg-white">
          <router-link v-for="(discountList,index) in discountList"
                       :to="{path:'/shopDrugSpecs',query:{shopDrugSpecId:discountList.id}}"
                       :key="index">
            <div class="drug-box flex-row-center border-right-gray border-bottom-gray">
              <img class="is-120x120 mr-20" v-lazy="getImgURL(discountList.fileId, 'MIDDLE_LOGO')">
              <div class="is-flex flex-column">
                <span class="elps width-144 d-inline-block text-l-25">{{discountList.name}}</span>
                <span class="text-red text-center text-l-25">¥ {{discountList.price}} /盒</span>
              </div>
            </div>
          </router-link>
        </ul>
      </div>

      <!-- 医保定点药房 -->
      <div class="shop-show">
        <div class="separate-content all-center">
          <span class="new-line"></span><span class="text-13C1FE fz28">医保定点药房</span> <span class="new-liner"></span>
        </div>
        <div class="shop-content">
          <carousel-3d :count="discountList.length" width="250" height="160" display="3">
            <slide v-for="(slide, i) in showList" :index="i" :key="i">
              <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <img :data-index="index"
                     :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
                     v-lazy="getImgURL(slide.fileId, 'MIDDLE_LOGO')">
              </template>
            </slide>
          </carousel-3d>
        </div>
      </div>

      <!-- 好货推荐 -->
      <div class="recommend">
        <div class="separate-content all-center">
          <span class="new-line"></span>
          <span class="text-13C1FE text-l-28">
          <i class="iconfont ic-aixin text-red"></i>
          好货推荐
        </span>
          <span class="new-liner"></span>
        </div>
        <div class="bg-white of-hidden">
          <ul class="flex-wrap">
            <router-link
              class="drug-box flex-column-center position-relative border-left-gray border-right-gray border-top-gray border-bottom-gray"
              v-for="(recommendList,index) in recommendList" :key="index"
              :to="{path:'/shopDrugSpecs',query:{shopDrugSpecId:recommendList.id}}">
              <span class="toc-tip position-absolute all-center" v-if="recommendList.otc === true">非</span>
              <span class="toc-tip position-absolute all-center" v-else>处</span>
              <img class="is-260x193" v-lazy="getImgURL(recommendList.fileId, 'MIDDLE_LOGO')">
              <span class="elps width-180 fz22">{{recommendList.name}}{{recommendList.spec}}</span>
              <span class="text-red fz24">¥ {{recommendList.price}} /盒</span>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <new-footer :urlRouter="$route.path" ref="footer"></new-footer>
  </div>
</template>
<script>
  import {BmMarker, BmLabel} from 'vue-baidu-map';
  import DownTime from '../components/timeDown';
  import {MessageBox} from 'mint-ui';
  import {Carousel3d, Slide} from 'vue-carousel-3d';

  export default {
    name: 'home',
    data() {
      return {
        searchIcon: '\ue64c 通用名、主要商品名、症状',
        keyword: '',
        activeIndex: 0,
        leftIndex: '',
        rightIndex: '',
        index: '',
        endTime: '2018-12-29 12:06:00',
        hour: '',
        minutes: '',
        seconds: '',
        news: [],
        discountList: [],
        showList: [],
        recommendList: [],
        advertLists: [],
        longitude: '',
        latitude: '',
        lat: '31.39',
        lng: '120.95',
        zoom: 3,
        chooseAddress: '请选择地址',
        popupVisible: false,
        isCurrent: 1,
        repositoryTypeList: [],
        repositoryTypeListForHome: [],
        swiperOption: {
          autoplay: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
          reverseDirection: true,
          waitForTransition: true
        }
      };
    },
    components: {
      BmMarker,
      BmLabel,
      DownTime,
      Carousel3d,
      Slide
    },
    computed: {
      top() {
        return -(this.activeIndex) * 25 + 'px';
      }
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight - this.$refs.footer.$el.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
      setInterval(_ => {
        if (this.activeIndex < 3) {
          this.activeIndex++;
        } else {
          this.activeIndex = 1;
        }
      }, 1000);
    },
    methods: {
      onAddress() {
        this.$router.push({path: '/addresses/repositioning',
          query: {lat: this.lat, lng: this.lng}});
      },
      onFocus() {
        if (!this.keyword) {
          MessageBox('提示', '请输入关键字');
          return;
        }
        this.$router.push({
          path: '/drugs',
          query: {showDrugTitle: this.keyword, pageFrom: 'keyword', keyword: this.keyword}
        });
      },
      see(e) {
        window.location.href = e.url;
      },
      getRepositoryTypeList() {
        this.$http.get('/repositoryTypes')
          .then((res) => {
            this.repositoryTypeList = res.data;
          }).catch(error => {
            this.exception(error);
          });
      },
      getRepositoryTypeListForHome() {
        this.$http.get('/repositories/home')
          .then((res) => {
            this.repositoryTypeListForHome = res.data;
          }).catch(error => {
            this.exception(error);
          });
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
        let obj = {
          'lat': this.lat,
          'lng': this.lng
        };
        this.$store.commit('SET_POSITION', obj);
      },
      startAddress() {
        this.$http.get(this.$outside + '/baidu/maps.json?lat=' + this.lat + '&lng=' + this.lng).then(res => {
          console.log(res.data);
          this.chooseAddress = res.data.formatted_address;
        }).catch(error => {
          this.exception(error);
        });
      },
      nearby() {
        this.$router.push({path: '/addresses/repositioning', query: {lat: this.lat, lng: this.lng, poi: true}});
      }
    },
    created: function () {
      this.getRepositoryTypeList();
      this.getRepositoryTypeListForHome();
      if (!this.$storage.session.has('login')) {
        this.getLocation();
      } else {
        this.lat = this.$store.getters.position.lat;
        this.lng = this.$store.getters.position.lng;
      }
      this.startAddress();
      this.$store.dispatch('VERIFY');
      // 让利惠民
      this.$http.get('/drugs/discount').then(res => {
        this.discountList = res.data;
      }).catch(error => {
        this.exception(error);
      });

      // 医保定点
      this.$http.get('/shops/show').then(res => {
        this.showList = res.data;
      }).catch(error => {
        this.exception(error);
      });
      // 广告
      this.$http.get('/adverts').then(res => {
        this.advertLists = res.data;
      }).catch(error => {
        this.exception(error);
      });
      // 好货推荐
      this.$http.get('/drugs/recommend').then(res => {
        this.recommendList = res.data;
      }).catch(error => {
        this.exception(error);
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
    background: rgba(26, 182, 253, 1);
    display: flex;
    align-items: center;
  }

  .index-header > div:nth-child(1) .iconfont {
    font-size: 40px;
    color: #FFFFFF;
  }
  .index-header > div:nth-child(2) {
    width: 130px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 22px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    font-size: 30px;
  }


  .index-header > div:nth-child(3) .iconfont {
    font-size: 40px;
    color: #FFFFFF;
  }

  .index-header > div:nth-child(4) {
    display: flex;
    width: 450px;
    height: 50px;
    background-color: white;
    align-items: center;
  }

  .index-header > div:nth-child(4) > div:nth-child(1) input {
    width: 400px;
    height: 50px;
    border-width: 0;
    outline: none;
    font-size: 20px;
    font-family: HiraginoSansGB-W3;
  }

  .index-header > div:nth-child(5) .iconfont {
    font-size: 40px;
    color: #FFFFFF;
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

  .dluboimgh {
    width: 720px;
    height: 300px;
  }

  .swiper-div-cover {
    width: 275px;
    height: 238px;
    background: white;
    opacity: 0;
  }

  .fz18 {
    font-size: 18px;
  }

  .fz17 {
    font-size: 17px;
  }

  .fz16 {
    font-size: 16px;
  }

  .fz22 {
    font-size: 22px;
  }

  .fz24 {
    font-size: 24px;
  }

  .mt-0 {
    margin-top: 0px !important;
  }

  .swiper-slide img {
    width: 100%;
    height: 100%;
  }

  .ic-ditu, .ic-lingdang {
    width: auto;
    height: auto;
    font-size: 36px;
  }

  .ic-arrLeft-fill {
    width: auto;
    height: auto;
    font-size: 24px;
    margin-right: 37px;
  }

  .ic-ditu {
    margin-left: 15px;
  }

  .ic-shijian2:before {
    content: "\e6c2";
  }

  .mr-7 {
    margin-top: 7px !important;
    display: inline-block !important;
  }

  .d_Downtime:first-child {
    margin-left: 5px;
  }

  .ic-shijian1 {
    margin-top: 5px;
    font-size: 30px;
  }

  .oclock {
    width: 26px;
    height: 26px;
  }

  .now-oclock {
    padding-top: 13px !important;
  }

  .fz28 {
    font-size: 28px;
  }

  .recommend {
    margin-top: 15px;
  }

  .ml4 {
    margin-left: 4px;
  }

  .recommend .ic-aixin {
    font-size: 30px;
    vertical-align: center;
  }
</style>
