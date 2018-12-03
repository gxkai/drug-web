<template>
  <div>
    <new-layout
      centerColor="white"
      class="home">
      <div slot="top" class="home__header">
        <div class="home__header__first">
          <div class="home__header__first__left"
               @click="$router.push('/addresses/choose')"
          >
            <van-icon name="weizhi" color="white" size="3em"></van-icon>
            <span class="home__header__first__left--name">{{position.name}}</span>
            <van-icon name="arrowdown" color="white" size="3em"></van-icon>
          </div>
          <div class="home__header__first__right">
            <van-icon name="lingdang" color="white" size="4em" @click="$router.push('/messageTypes')"></van-icon>
          </div>
        </div>
        <div class="home__header__second">
          <input class="home__header__second__input iconfont"
                 :placeholder="searchIcon"
                 @click="$router.push('/drugs')"
          >
        </div>
      </div>
      <div slot="center"
           class="home__content"
      >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

          <van-swipe
            :auto="3000"
            class="home__content__swipe"
          >
            <van-swipe-item
              v-for="(advert,index) in adverts" :key="index"
              class="home__content__swipe__item"
            >
              <img v-lazy="getImgURL(advert.fileId, 'ADVERT')"
                   class="home__content__swipe__item--advert"
                   @click="$router.push(advert.url)"
              />
            </van-swipe-item>
          </van-swipe>

          <div
            class="home__content__entry van-hairline--bottom"
          >
            <div class="home__content__entry__item"
                 @click="$router.push('/rxs')"
            >
              <div class="home__content__entry__item--icon">
                <van-icon name="chufang-" color="#f72250" size="5em"
                          class="home__content__entry__item--icon--chufang"></van-icon>
              </div>
              <div
                class="home__content__entry__item--name"
              >我的处方
              </div>
            </div>
            <div class="home__content__entry__item"
                 @click="$router.push('/repositoryTypes')">
              <div class="home__content__entry__item--icon">
                <van-icon name="zhishiku-" color="#11c6fe" size="5em"
                          class="home__content__entry__item--icon--chufang"></van-icon>
              </div>
              <div
                class="home__content__entry__item--name"
              >知识库
              </div>
            </div>
            <div class="home__content__entry__item"
                 @click="$router.push('/shops')"
            >
              <div class="home__content__entry__item--icon">
                <van-icon name="yaofang-" color="#2bb292" size="5em"
                          class="home__content__entry__item--icon--chufang"></van-icon>
              </div>
              <div
                class="home__content__entry__item--name"
              >药房
              </div>
            </div>
            <div class="home__content__entry__item"
                 @click="$router.push('/accounts/insurance')"
            >
              <div class="home__content__entry__item--icon">
                <van-icon name="yibao-" color="#ff8400" size="5em"
                          class="home__content__entry__item--icon--chufang"></van-icon>
              </div>
              <div
                class="home__content__entry__item--name"
              >我的医保
              </div>
            </div>
          </div>

          <div class="home__content__repository">
            <div class="home__content__repository__left">
              <div
                class="home__content__repository__left-top"
              >健康
              </div>
              <div
                class="home__content__repository__left-bottom"
              >咨询
              </div>
            </div>
            <div class="home__content__repository__right">
              <transition class="home__content__repository__right__item"
                          name="slide" mode="out-in"

              >
                <p class="home__content__repository__right__item--title"
                   :key="text.id"
                   @click="$router.push({path:'/repositories/view',query:{id:text.val.id,title:text.val.title}})"
                >{{text.val.title}}</p>
              </transition>
            </div>
          </div>
          <div class="home__content__discount">
            <new-header-sec>
              <div>让利惠民</div>
            </new-header-sec>
            <div class="home__content__discount--time">
              <van-icon name="shijian2" color="#FF9800" size="3em" class="home__content__discount--time--icon"></van-icon>
              <new-time-down class="home__content__discount--time--down"></new-time-down>
            </div>
            <van-swipe :loop="false"
                       :width="100"
                       :show-indicators="false"
                       class="home__content__discount__content"
            >
              <van-swipe-item
                v-for="discount in discounts"
                :key="discount.id"
              >
                <div class="home__content__discount__content__item"
                >
                  <img
                    class="home__content__discount__content__item--logo"
                    v-lazy="getImgURL(discount.fileId, 'LARGE_LOGO')"
                    @click="linkToShopDrugSpec(discount.shopDrugId)"
                  >
                  <div
                    class="home__content__discount__content__item--name"
                  >
                    {{discount.name}}
                  </div>
                  <div
                    class="home__content__discount__content__item--spec"
                  >
                    ￥{{discount.price}}
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="home__content__show">
            <new-header-sec>
              <div>医保定点</div>
            </new-header-sec>
            <carousel-3d :count="shows.length" width="250" height="160" display="3">
              <slide v-for="(slide, i) in shows" :index="i" :key="i">
                <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                  <img :data-index="index"
                       :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
                       v-lazy="getImgURL(slide.fileId, 'LARGE_LOGO')"
                       @click="$router.push({path:'/shops/view',query:{shopId:slide.id}})">
                </template>
              </slide>
            </carousel-3d>
          </div>
          <div class="home__content__recommend">
            <new-header-sec>
              <div>
                <van-icon name="aixin" color="red"/>
                好货推荐
              </div>
            </new-header-sec>
            <van-row
            >
              <van-col
                span="12"
                class="van-hairline--bottom van-hairline--right home__content__recommend__content"
                v-for="recommend in recommends"
                :key="recommend.id"
              >
                <div class="home__content__recommend__content__item"
                     @click="linkToShopDrugSpec(recommend.shopDrugId)"
                >
                  <img
                    class="home__content__recommend__content__item--logo"
                    v-lazy="getImgURL(recommend.fileId, 'LARGE_LOGO')">
                  <div
                    class="home__content__recommend__content__item--name"
                  >{{recommend.name}}
                  </div>
                  <div
                    class="home__content__recommend__content__item--spec"
                  >{{recommend.spec}}
                  </div>
                  <div
                    class="home__content__recommend__content__item--price"
                  >{{`￥${recommend.price}`}}
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-pull-refresh>
      </div>
      <van-tabbar
        :value="0"
        :fixed="Boolean(false)"
        slot="bottom"
      >
        <van-tabbar-item icon="icon"
                         to="/">首页
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
    </new-layout>
    <img src="../assets/image/chat.png" class="home__chat"
         @mousedown="down" @touchstart="down"
         @mousemove="move" @touchmove="move"
         @mouseup="end" @touchend="end"
         id="moveDiv"
         @click="$router.push('/chats')"
    >
  </div>
</template>
<style scoped type="text/less" lang="less">
  @keyframes myMove {
    0% {
      transform: translateY(0);
    }
    10% {
      transform: translateY(-30px);
    }
    20% {
      transform: translateY(-30px);
    }
    30% {
      transform: translateY(-60px);
    }
    40% {
      transform: translateY(-60px);
    }
    50% {
      transform: translateY(-90px);
    }
    60% {
      transform: translateY(-90px);
    }
    70% {
      transform: translateY(-120px);
    }
    80% {
      transform: translateY(-120px);
    }
    90% {
      transform: translateY(-150px);
    }
    100% {
      transform: translateY(-150px);
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s linear;
  }

  .slide-leave-to {
    transform: translateY(-50px);
  }

  .slide-enter {
    transform: translateY(50px);
  }

  .home {
    &__chat {
      position: fixed;
      bottom: 100px;
      right: 0;
      z-index: 999;
    }
    &__content {
      &__recommend {
        &__content {
          &__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            padding: 20px;
            &--logo {
              width: 200px;
              height: 200px;
            }
            &--name, &--spec {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 22px;
              font-family: HiraginoSansGB-W3;
              font-weight: normal;
              color: rgba(69, 69, 69, 1);
            }
            &--price {
              font-size: 24px;
              font-family: HiraginoSansGB-W3;
              font-weight: normal;
              color: rgba(255, 0, 0, 1);
            }
          }
        }
      }
      &__discount {
        &--time {
          height: 50px;
          display: flex;
          background-color: white;
          padding: 0 20px;
          align-items: center;
          &--down {
            margin-left: 20px;
            margin-top: 10px;
          }
        }
        &__content {
          margin-top: 20px;
          &__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            width: 180px;
            &--logo {
              width: 160px;
              height: 160px;
              border:1PX solid rgba(19, 193, 254, 1);
              border-radius:7px;
            }
            &--name, &--spec {
              width: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &--name {
              font-size: 22px;
              font-family: HiraginoSansGB-W3;
              font-weight: normal;
              color: rgba(69, 69, 69, 1);
            }
            &--spec {
              font-size: 24px;
              font-family: HiraginoSansGB-W3;
              font-weight: normal;
              color: rgba(255, 0, 0, 1);
            }
          }
        }
      }
      &__repository {
        height: 100px;
        display: flex;
        padding: 20px;
        background-color: white;
        align-items: center;
        &__left {
          width: 100px;
          div {
            font-size: 28px;
            font-family: FZZZHONGJW--GB1-0;
            font-weight: bold;
            color: rgba(255, 152, 0, 1);
            text-align: center;
          }
        }
        &__right {
          width: 500px;
          height: 100%;
          overflow: hidden;
          &__item {
            animation: myMove 5s linear infinite;
            animation-fill-mode: forwards;
            display: flex;
            &--title {
              margin-top: 10px;
              font-family: HiraginoSansGB-W3;
              font-weight: normal;
              color: rgba(119, 119, 119, 1);
              font-size: 25px;
            }
          }
        }
      }
      &__swipe {
        margin-bottom: 20px;
        background-color: white;
        &__item {
          &--advert {
            width: 700px;
            height: 300px;
            margin: 10px;
            border-radius: 20px;
          }
        }
      }
      &__entry {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        background-color: white;
        &__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          &--image {
            width: 90px;
            height: 90px;
            border-radius: 50%;
          }
          &--icon {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: rgba(245, 245, 245, 1);
            box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.2);
            text-align: center;
            .van-icon {
              line-height: 80px;
            }
          }
          &--name {
            font-size: 25px;
            margin-top: 10px;
          }
        }
      }
    }
    &__header {
      background-color: #1AB6FD;
      padding: 20px;
      &__first {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__left {
          display: flex;
          align-items: center;
          &--name {
            display: inline-block;
            max-width: 400px;
            font-size: 30px;
            color: white;
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0 10px;
          }
        }
      }
      &__second {
        &__input {
          font-size: 30px;
          padding: 0 20px;
          -webkit-appearance: none;
          border: none;
          outline: none;
          width: 100%;
          height: 50px;
          margin-top: 20px;
          &::placeholder {
            text-align: center;
          }
        }
      }
    }
  }
</style>
<script>
  import { Carousel3d, Slide } from 'vue-carousel-3d';
  import { getReceivedPosition } from '../assets/js/auth';

  export default {
    name: 'home',
    data() {
      return {
        searchIcon: '\ue64c 药品名',
        discounts: [],
        shows: [{ id: 'x' }, { id: 'y' }, { id: 'y' }],
        recommends: [],
        adverts: [],
        repositories: [],
        number: 0,
        repositoryTypes: [],
        isLoading: false,
        timer: '',

        flags: false,
        pos: { x: 0, y: 0 },
        nx: '',
        ny: '',
        dx: '',
        dy: '',
        xPum: '',
        yPum: ''
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
      },
      position() {
        return getReceivedPosition();
      }
    },
    created() {
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
        await this.getData();
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
