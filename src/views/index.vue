<template>

  <new-layout>
    <template slot="center">
      <div class="home">
        <div class="home__banner">
          <div class="home__banner__top">
        <span class="home__banner__address">
           <i class="fz22" @click="$router.push('/addresses/choose')"> {{position.name}}</i>
           <van-icon name="arrowdown" color="white" size="3em" class="arrow"></van-icon>
        </span>
            <div>
          <span class="home__banner__search">

          </span>
              <span>
            <van-icon name="sousuo" color="white" size="0.7rem" class="sousuo"></van-icon> <input type="text"
                                                                                                  placeholder="输入您当前要搜索的商品"
                                                                                                  @click="$router.push('/drugs')"/>
        </span>
            </div>
          </div>
          <div class="banner_img">
            <img src="../assets/image/home/home_banner.jpg"/>
          </div>
        </div>
        <div class="home__four">
          <ul class="home__four__ul">
            <li class="home__four__ul__li" @click="$router.push('/rxs')">
              <span><img src="../assets/image/home/home_cf.png"/> </span>
              <span class="home__four__ul__li__span">我的处方</span>
            </li>
            <li class="home__four__ul__li" @click="$router.push('/accounts/insurance')">
              <span><img src="../assets/image/home/home_yb.png"/> </span>
              <span class="home__four__ul__li__span">我的医保</span>
            </li>
            <li class="home__four__ul__li" @click="$router.push('/repositoryTypes')">
              <span><img src="../assets/image/home/home_knew.png"/> </span>
              <span class="home__four__ul__li__span">知识库</span>
            </li>
            <li class="home__four__ul__li" @click="$router.push('/shops')">
              <span><img src="../assets/image/home/home_drug.png"/> </span>
              <span class="home__four__ul__li__span">药房</span>
            </li>
          </ul>
        </div>

        <div class="home__news">
          <span><img src="../assets/image/home/home_hot.png" class="home__news__img"/> </span>
          <span><van-icon name="laba" color="#F63016" size="3em"></van-icon></span>
          <span>
            <transition name="slide" mode="out-in">
             <p class="home__content__repository__right__item--title"
                :key="text.id"
                @click="$router.push({path:'/repositories/view',query:{id:text.val.id,title:text.val.title}})"
             >{{text.val.title}}</p>
           </transition>

       </span>
        </div>
        <div class="home__content__discount">
          <div class="home__content__discounttime">
            <span class="text-F6003F">限时</span><span class="text-262626">抢购</span>
            <van-icon name="shizhong" color="#F63016" size="2.3em" class="timecount"></van-icon>
            <new-time-down class="home__content__discount&#45;&#45;time&#45;&#45;down"></new-time-down>
            <span class="home__more" style="display: none;">更多</span>
          </div>
        </div>

        <div class="home__rush">
          <div class="home__rush__div">
            <ul class="home__rush__div__ul">
              <van-swipe :loop="false"
                         :width="300"
                         :show-indicators="false"
                         class="home__content__discount__content"
              >
                <van-swipe-item
                  v-for="discount in discounts"
                  :key="discount.id"
                >
                  <li class="home__rush__div__ul__li"  @click="linkToShopDrugSpec(discount.shopDrugId)">
                    <span class="home__rush__div__ul__li__img">
                        <img v-lazy="getImgURL(discount.fileId, 'LARGE_LOGO')"  class="home__rush__div__ul__li__imgs"/>
                    </span>
                    <span class="home__rush__div__ul__li__vc"> {{discount.name}}</span>
                    <span class="home__rush__div__ul__li__header">
                 <van-icon name="xinxinicon" color="red" size="1.2rem" class="home__rush_div__header__icon"/>
                 <span class="price">超值</span>
                 <span class="value">{{discount.price}}元</span>
             </span>
                  </li>
                </van-swipe-item>
              </van-swipe>

            </ul>
          </div>
        </div>
        <div class="home__kindpink bg-ffc8bf">
          <img src="../assets/image/home/home_dot.png"/>家庭常用
          <img src="../assets/image/home/home_dot.png"/>
        </div>
        <div class="home__family">
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=cMLo_cCMRyKrd46oISOJRQ')">
            <p class="home__family__div__p">感冒</p>
            <p class="home__family__div__p1">清热解毒</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/catch.jpg"/></p>
          </div>
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=Nc10FphRTviCxz7vGiVr6A')">
            <p class="home__family__div__p">抗过敏</p>
            <p class="home__family__div__p1">皮炎湿疹</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/allergy.jpg"/></p>
          </div>
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=74exCUknTDe0qnag36LRCQ')">
            <p class="home__family__div__p">止咳化痰</p>
            <p class="home__family__div__p1">肺热咳嗽</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/cough.jpg"/></p>
          </div>
        </div>
        <div class="home__kindpink bg-0090E6 text-1988CA">
          <img src="../assets/image/home/home_dot.png"/>风湿骨科
          <img src="../assets/image/home/home_dot.png"/>
        </div>
        <div class="home__family">
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=S2BIwR09QN6MNstlWcTrvQ')">
            <p class="home__family__div__p">跌打损伤</p>
            <p class="home__family__div__p1 text-1988CA">关节炎</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/arthritis.jpg"/></p>
          </div>
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=C1Rlu40JRlS7VuxopGxA-A')">
            <p class="home__family__div__p">骨质疏松</p>
            <p class="home__family__div__p1 text-1988CA">肩周炎</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/shoulder.jpg"/></p>
          </div>
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=xsE5-eyYTfC3RXEoLjCxgg')">
            <p class="home__family__div__p">腰肌劳损</p>
            <p class="home__family__div__p1 text-1988CA">骨质增生</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/hyperplasia.jpg"/></p>
          </div>
        </div>
        <div class="home__kindpink bg-BFD6FF text-1988CA">
          <img src="../assets/image/home/home_dot.png"/>肠胃用药
          <img src="../assets/image/home/home_dot.png"/>
        </div>
        <div class="home__family">
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=apqD-f6ESl25k5bJG7qIeQ')">
            <p class="home__family__div__p">胃炎</p>
            <p class="home__family__div__p1 text-1D63CE">清热解毒</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/detoxification.jpg"/></p>
          </div>
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=lks1M2u5SVa216t6x35E3w')">
            <p class="home__family__div__p">消化不良</p>
            <p class="home__family__div__p1 text-1D63CE">胃肠解痉</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/detoxify.jpg"/></p>
          </div>
          <div class="home__family__div home__family__used" @click="$router.push('drugs?typeId=6NOZUuyVTT6dzMaogWGXOg\n')">
            <p class="home__family__div__p">腹泻</p>
            <p class="home__family__div__p1 text-1D63CE">肺热咳嗽</p>
            <p class="home__family__div__p3"><img src="../assets/image/home/coughs.jpg"/></p>
          </div>
        </div>
        <div class="home__content__recommend">
          <new-header-sec>
            <div>
              <van-icon name="aixin" color="red"/>
              好货推荐
            </div>
          </new-header-sec>
        </div>
        <div class="home__recomd__goods">
          <div class="home__recomd__goods__div" v-for="recommend in recommends"
               :key="recommend.id"
               @click="linkToShopDrugSpec(recommend.shopDrugId)">
            <!--<div class="home__recomd__goods__div__rx">非处</div>-->
            <div class="home__recomd__goods__div__img">

              <img v-lazy="getImgURL(recommend.fileId, 'LARGE_LOGO')">
            </div>
            <div class="home__recomd__goods__div__title">{{recommend.name}}{{recommend.spec}}</div>
            <div class="home__recomd__goods__div__price">¥{{`${recommend.price}`}}</div>
          </div>
        </div>
      </div>
    </template>
    <div class="over-height"></div>
    <template slot="bottom">
      <van-tabbar
        :value="0"
        :fixed="Boolean(false)"
      >
        <van-tabbar-item icon="icon"
                         to="/home">首页
        </van-tabbar-item>
        <van-tabbar-item icon="chufang"
                         to="/rxs">处方单
        </van-tabbar-item>
        <van-tabbar-item icon="fenlei"
                         to="/drugTypes">分类
        </van-tabbar-item>
        <van-tabbar-item icon="gouwuche2"
                         to="/carts">购物车
        </van-tabbar-item>
        <van-tabbar-item icon="wo"
                         to="/accounts">我
        </van-tabbar-item>
      </van-tabbar>
    </template>
  </new-layout>

</template>
<style scoped type="text/less" lang="less">
  .van-tabbar-item--active{
    color: #F60032!important;
  }
  .van-tabbar{
    position: static!important;
  }
  .over-height{
    height: 500px;
    width: 720px;
  }
  .van-tabbar {
    position: fixed;
    bottom: 0px;
  }

  .van-tabbar-item__icon i {
    font-size: 16px;
  }

  .van-tabbar-item--active {
    color: #F60032;
  }

  .text-F6003F {
    color: #F6003F;
    font-size: 27px;
    margin-left: 14px;
  }

  .text-262626 {
    color: #262626;
    font-size: 27px;
  }

  .text-1988CA {
    color: #1988CA !important;
  }

  .bg-BFD6FF {
    background: #BFD6FF;
  }

  .text-1D63CE {
    color: #1D63CE !important;
  }

  i {
    font-style: normal;
  }

  .home__news__img {
    margin-left: 12px;
  }

  .arrow {
    font-size: 18px !important;
  }

  .fz22 {
    font-size: 22px;
  }

  body {
    font-family: MicrosoftYaHei !important;
  }

  input {
    border: none;
  }
  .home__banner{
    position: relative;
  }

  .home__banner__top {
    color: white;
  }

  .home__banner__address {
    height: 22px;
    margin-left: 13px;
  }
  .home__recomd__goods__div{
    background: white;
    height: 270px;
  }

  input {
    display: inline-block;
    width: 350px;
    border-radius: 10px;
    height: 50px;
    color: white;
    position: absolute;
    top: 5px;
    left: 290px;
    background: none;
    font-size: 25px;
  }

  .bg-0090E6 {
    background: #8dd4ff;
  }

  .text-0090E6 {
    color: #0090E6;
  }

  .text-ffc8bf {
    color: #ffc8bf;
  }

  .bg-ffc8bf {
    background: #ffc8bf;
  }

  .sousuo {
    position: absolute;
    top: 0px;
    left: 230px;
  }

  ::placeholder {
    color: white;
    opacity: 1;
  }

  .banner_img {
    width: 720px;
    height: 404px;
    img {

      height: 404px;
    }
  }

  #times {
    display: inline-block;

  }

  .home__rush li {

    border-right: 1px solid #f3f3f3;
    width: 200px !important;

  }

  .van-swipe-item {
    width: 200px;
  }
.home__recomd__goods{
  height: auto;
  background: white;
}
  .home {
    max-width: 720px;
    background: white;

    &__family__used {
      height: 351px;
    }
    &__recomd__goods__div {
      border-right: 1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
    }
    &__content__recommend{
      margin: auto;
    }
    &__content__discounttime {
      height: 67px;
      line-height: 67px;
      margin-top: 17px;
      border-bottom: 1px solid #f3f3f3;
      border-top: 10px solid #efebeb;
    }
    &__rush__div {
      height: 205px;
    }
    &__rush__div__ul__li {
      height: 205px;
    }
    &__rush__div__ul__li__imgs {
      width: 127px;
      height: 127px;
    }
    &__rush__div__ul__li__vc {
      margin: auto;
      width: 140px;
      text-align: center;
      top: 145px;
      position: absolute;
      left: 40px;
    }
    &__news {
      height: 68px;
      width: 720px;
      line-height: 68px;
      border-top: 1px solid #f3f3f3;

      span:first-child {
        display: inline-block;
        margin-top: 20px;
        img {
          width: 121px;
          height: 28px;
        }
      }
      span:nth-child(3) {
        font-size: 26px;
      }
    }
    &__banner {
      width: 720px;
      height: 404px;

      &__top {
        height: 50px;
        position: absolute;
        margin-top: 49px;
        width: 720px;
      }
      &__address {
        width: 200px;
        height: 21px;
        font-size: 22px;
        display: inline-block;
        float: left;
        line-height: 21px;
        position: absolute;
        top: 15px;
        font-size: 22px;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
      }
      &__search {
        width: 500px;
        height: 60px;
        background: rgba(255, 255, 255, 1);
        opacity: 0.46;
        border-radius: 10px;
        display: inline-block;
        font-size: 25px;
        position: absolute;
        left: 200px;

      }
    }
    &__content__discount--time--icon {
      float: left;
    }
    &__home__content__discount--time--icon {
      float: left;
    }
    &__content__discount--time--down {
      float: left;
    }
    &__more {
      float: right;
      font-size: 24px;
      font-weight: bold;
      color: rgba(246, 0, 63, 1);
      width: 81px;
      height: 33px;
      background: rgba(246, 0, 63, 0);
      border: 1px solid #F6003F;
      border-radius: 4px;
      text-align: center;
      line-height: 33px;
      margin-right: 22px;
      margin-top: 10px;
    }
    &__four {
      height: 172px;
      &__ul {
        &__li {
          float: left;
          font-size: 20px;
          width: 25%;
          text-align: center;
          flex-direction: column;
          span {
            font-size: 20px;
            display: block;
            img {
              width: 124px;
              height: 124px;
            }
          }
        }
      }
    }
    &__rush {

      &__div {

        &__ul {

          &__li {
            width: 200px;
            height: 230px;
            float: left;

            &__img {
              display: block;
              margin-top: 0px;
              text-align: center;
              margin-bottom: 20px;
              padding-top: 20px;
            }
            &__vc {
              display: block;
              font-size: 20px;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              margin-top: 20px;
              text-align: center;
            }
            &__header {
              height: 150px;
              position: relative;
              top: -30px;
              .van-icon-xinxinicon {
                left: 75px;
                top: -1.2rem;
              }
              .price {
                position: absolute;
                color: white;
                top: -105px;
                width: 50px;
                display: inline-block;
                z-index: 99;
                font-size:20px;
                left: 130px;
              }
              .value {
                position: absolute;
                color: white;
                width: 50px;
                display: inline-block;
                z-index: 99;
                top: -125px;
                font-size:16px;
                left: 130px;
              }
            }

          }
        }
      }

      &__buy {
        display: inline-block;
      }

      li {
        width: 187.5px;
      }
      &__drug {
        width: 187.5px;
        height: 205px;
        &__header {
          width: 63px;
          height: 59px;
          background: rgba(246, 0, 63, 1);
          color: white;
          position: absolute;
        }
      }
    }
    &__kindpink {
      clear: both;
      width: 720px;
      height: 76px;
      line-height: 76px;

      color: #FF2B00;
      text-align: center;
      font-size: 28px;
      margin-top: 18px;
      border-top: 10px solid #efebeb;
      img {
        vertical-align: sub;
        margin-right: 15px;
        line-height: 76px;
      }
    }
    &__family {
      width: 720px;
      height: 352px;
      &__div {
        border-right: 1px solid #f3f3f3;
        float: left;
        width: 240px;
        display: inline-block;
        &__p {
          font-size: 28px;
          font-weight: bold;
          color: rgba(1, 0, 0, 1);

          text-align: center;
          margin-top: 33px;
        }
        &__p1 {
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 0, 0, 1);
          text-align: center;
          margin-top: 8px;
        }
        &__p3 {
          margin-top: 30px;
          width: 230px;
          text-align: center;
          img {
            width: 181px;

          }
        }
      }
    }
    &__recomd__goods {
      &__div {
        width: 360px;
        float: left;
        text-align: center;
        &__rx {
          width: 42px;
          height: 25px;
          background: rgba(246, 0, 0, 1);
          border-radius: 50%;
          font-size: 15px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          height: (25-12)/2;
          text-align: center;
          line-height: 25px;
          margin: 16px 0px 0px 52px;
        }
        &__img {
          width: 157px;
          height: 157px;
          margin: auto;
          img {
            width: 100%;
          }
        }
        &__title {
          font-size: 22px;
          font-weight: normal;
          color: rgba(53, 53, 53, 1);
          background: white;
        }
        &__price {
          font-size: 24px;
          font-weight: normal;
          color: rgba(246, 0, 0, 1);
          line-height: 43px;
        }

      }
    }

  }


</style>


<script>
  import {Carousel3d, Slide} from 'vue-carousel-3d';
  import {getReceivedPosition} from '../storage';

  export default {
    name: 'home',
    data() {
      return {
        searchIcon: '\ue64c 药品名',
        discounts: [],
        shows: [{id: 'x'}, {id: 'y'}, {id: 'y'}],
        recommends: [],
        adverts: [],
        repositories: [],
        number: 0,
        repositoryTypes: [],
        isLoading: false,
        timer: '',

        flags: false,
        pos: {x: 0, y: 0},
        nx: '',
        ny: '',
        dx: '',
        dy: '',
        xPum: '',
        yPum: '',
        position: getReceivedPosition()
      };
    },
    components: {
      Carousel3d,
      Slide
    },
    computed: {
      text() {
        if (this.repositories.length > 0) {
          return {
            id: this.number,
            val: this.repositories[this.number]
          };
        } else {
          return {
            id: 0,
            val: ''
          };
        }
      }
    },
    created() {
      if (this.position === undefined) {
        this.$router.push('/addresses/choose');
        return;
      }
      this.initData();
    },
    mounted() {
      this.startMove();
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      // 实现移动端拖拽
      down() {
        let moveDiv = document.getElementById('moveDiv');
        this.flags = true;
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.pos.x = touch.clientX;
        this.pos.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
      },
      move() {
        let moveDiv = document.getElementById('moveDiv');
        if (this.flags) {
          var touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          this.nx = touch.clientX - this.pos.x;
          this.ny = touch.clientY - this.pos.y;
          this.xPum = this.dx + this.nx;
          this.yPum = this.dy + this.ny;
          moveDiv.style.left = this.xPum + 'px';
          moveDiv.style.top = this.yPum + 'px';
          document.addEventListener('touchmove', function () {
            event.preventDefault();
          }, false);
        }
      },
      end() {
        this.flags = false;
      },

      async initData() {
        // 让利惠民
        this.discounts = await this.$http.get('/drugs/discount');
        // 医保定点
        this.shows = await this.$http.get('/shops/show');
        // 广告
        this.adverts = await this.$http.get('/adverts');
        // 好货推荐
        this.recommends = await this.$http.get('/drugs/recommend');

        // 知识库
        this.repositories = await this.$http.get('/repositories/home');
        setInterval(this.scroll, 2000);
        // 咨询类别
        this.repositoryTypes = await this.$http.get('/repositoryTypes');
      },
      async onRefresh() {
        await this.initData();
        this.isLoading = false;
      },
      startMove() {
        this.timer = setTimeout(() => {
          if (this.number === this.repositories.length - 1) {
            this.number = 0;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, 3000);
      }
    }
  };
</script>
