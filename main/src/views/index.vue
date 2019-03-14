﻿<template>
  <div>
    <new-layout>
      <template slot="center">
        <div class="wrapper1">
          <new-wing-blank class="header">
            <div class="item item1" @click="$router.push('/addresses/choose')">
              <span class="van-ellipsis">{{ currentAddress.name }}</span>
              <van-icon name="arrowdown" color="white" size="3em"></van-icon>
            </div>
            <div class="item item2">
              <input
                type="text"
                class="van-icon"
                :placeholder="searchIcon"
                @click="$router.push('/search')"
              />
            </div>
          </new-wing-blank>
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(banner, index) in banners" :key="index">
              <img v-lazy="banner" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <new-white-space />
        <new-wing-blank class="wrapper2">
          <div
            class="item"
            v-for="(item, index) in jumps"
            :key="index"
            @click="$router.push(item.url)"
          >
            <img v-lazy="item.image" />
            <span>{{ item.name }}</span>
          </div>
        </new-wing-blank>
        <new-white-space />
        <new-wing-blank class="wrapper3">
          <div class="item1">
            <span>
              健康咨询
            </span>
          </div>
          <div class="item5">
            <span></span>
          </div>
          <div class="item2">
            <van-icon name="laba" color="#F63016" size="5em" />
          </div>
          <div class="item3">
            <transition name="slide" mode="out-in">
              <span
                class="van-ellipsis"
                :key="text.id"
                @click="
                  $router.push({
                    name: '/repositories/view',
                    params: { id: text.val.id, title: text.val.title }
                  })
                "
              >
                {{ text.val.title }}
              </span>
            </transition>
          </div>
          <div class="item4">
            <span>更多></span>
          </div>
        </new-wing-blank>
        <new-white-space />
        <div>
          <new-wing-blank class="wrapper4 van-hairline--bottom">
            <div class="item1">
              <new-line width="5px" height="3em" color="red" />
            </div>
            <div class="item2">
              <span>
                限时抢购
              </span>
            </div>
            <div class="item3">
              <van-icon name="shizhong" color="#F63016" size="3em"></van-icon>
              <new-time-down></new-time-down>
            </div>
            <div class="item4">
              <span>
                抢购爆款不停歇>
              </span>
            </div>
          </new-wing-blank>
          <new-wing-blank class="wrapper5">
            <van-swipe :show-indicators="false" :width="200">
              <van-swipe-item
                v-for="(discount, index) in discounts"
                :key="index"
                @click="linkToShopDrugSpec(discount.shopDrugId)"
                class="item"
              >
                <img v-lazy="getImgURL(discount.fileId, 'LARGE_LOGO')" />
                <span class="price1 price">
                  {{ `￥:${discount.price}` }}
                </span>
                <span class="price2 price">
                  {{ `原价${discount.price}` }}
                </span>
              </van-swipe-item>
            </van-swipe>
          </new-wing-blank>
          <new-white-space />
          <new-white-space />
          <new-left-title text="家庭常用"/>
          <new-wing-blank class="wrapper9">
            <div
              class="item"
              v-for="(item, index) in list1"
              :key="index"
              @click="$router.push(item.url)"
            >
              <span class="text text1">{{ item.name }}</span>
              <span class="text text2">{{ item.introduce }}</span>
              <img v-lazy="item.image" />
            </div>
          </new-wing-blank>
          <new-white-space />
          <new-left-title text="风湿关节" textColor="#56d0fb"/>
          <div class="wrapper11">
            <div
              class="item"
              :class="`item${index + 1}`"
              v-for="(item, index) in list2"
              :key="index"
              @click="$router.push(item.url)"
            >
              <div class="left">
                <span class="text text1">{{ item.name }}</span>
                <span class="text text2">{{ item.introduce }}</span>
              </div>
              <div class="right">
                <img v-lazy="item.image" />
              </div>
            </div>
          </div>
        </div>
        <new-white-space />
        <new-left-title text="腹泻呕吐" textColor="#56d0fb"/>
        <div class="wrapper13">
          <div
            class="item"
            :class="`item${index + 1}`"
            v-for="(item, index) in list3"
            :key="index"
            @click="$router.push(item.url)"
          >
            <div class="left">
              <span class="text text1">{{ item.name }}</span>
              <span class="text text2">{{ item.introduce }}</span>
            </div>
            <div class="right">
              <img v-lazy="item.image" />
            </div>
          </div>
        </div>
        <new-white-space />
        <new-central-title icon="aixin" color="red" text="好货推荐"/>
        <div class="wrapper15">
          <div
            class="item"
            v-for="(recommend, index) in recommends"
            :key="index"
            @click="linkToShopDrugSpec(recommend.shopDrugId)"
          >
            <new-rx-image
              :url="getImgURL(recommend.fileId, 'LARGE_LOGO')"
              :rx="!recommend.otc"
            />
            <span class="text text1">
              {{ recommend.name }}
            </span>
            <span class="text text2">
              {{ `${recommend.price}/${recommend.spec}` }}
            </span>
          </div>
        </div>
        <new-white-space />
      </template>
      <template slot="bottom">
        <van-tabbar :value="0" :fixed="Boolean(false)">
          <van-tabbar-item icon="icon" to="/home">首页</van-tabbar-item>
          <van-tabbar-item icon="chufang" to="/rxs">处方单</van-tabbar-item>
          <van-tabbar-item icon="fenlei" to="/drugTypes">分类</van-tabbar-item>
          <van-tabbar-item icon="gouwuche2" to="/carts"
          >购物车
          </van-tabbar-item>
          <van-tabbar-item icon="wo" to="/accounts">我</van-tabbar-item>
        </van-tabbar>
      </template>
    </new-layout>
    <new-consult/>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  /deep/.van-icon-shizhong {
    padding-bottom: 10px;
  }
  .wrapper15 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2px 2px;
    .item {
      background-color: white;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 30px;
      }
      .text2 {
        color: $themeColor;
      }
    }
  }
  .wrapper13 {
    width: 720px;
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    grid-template-rows: 200px 200px;
    grid-gap: 3PX 3Px;
    .item {
      background-color: white;
    }
    .item1 {
      grid-column: 1/2;
      grid-row: 1/3;
      display: grid;
      grid-template-rows: 1fr 1fr;
    }
    .item1, .item2, .item3 {
      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .text {
          font-size: 30px;
        }
        .text2 {
          color: #56d0fb;
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 150px;
          height: 150px;
        }
      }
    }
    .item2 {
      grid-column: 2/3;
      grid-row: 1/2;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .item3 {
      grid-column: 2/3;
      grid-row: 2/3;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  .wrapper11 {
    width: 720px;
    display: grid;
    grid-template-columns: 2fr 1.5fr;
    grid-template-rows: 200px 200px;
    grid-gap: 3PX 3Px;
    .item {
      background-color: white;
    }
    .item1 {
      grid-column: 1/2;
      grid-row: 1/2;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .item1, .item2, .item3 {
      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .text {
          font-size: 30px;
        }
        .text2 {
          color: #56d0fb;
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 150px;
          height: 150px;
        }
      }
    }
    .item2 {
      grid-column: 1/2;
      grid-row: 2/3;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .item3 {
      grid-column: 2/3;
      grid-row: 1/3;
      display: grid;
      grid-template-rows: 1fr 1fr;
    }
  }
  .wrapper9 {
    background-color: white;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px 10px;
    .item {
      background-color: antiquewhite;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      border-radius: 1em;
      img {
        height: 100px;
        width: 150px;
      }
      .text {
        font-size: 30px;
      }
      .text2 {
        color: $themeColor;
        margin-bottom: 10px;
      }
    }
  }
  .wrapper7 {
    background-color: white;
    .item {
      width: 350px!important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 300px;
        height: 150px;
      }
    }
  }
  .wrapper5 {
    background-color: white;
    .item {
      width: 180px!important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
      }
      .price {
        font-size: 30px;
      }
      .price1 {
        color: $themeColor;
      }
      .price2 {
        text-decoration: line-through;
      }
    }
  }
  .wrapper4 {
    background-color: white;
    display: grid;
    grid-template-columns: 10px auto 1fr 240px;
    grid-template-rows: 40px;
    grid-column-gap: 20px;
    .item1 {
      display: flex;
      align-items: center;
    }
    .item2 {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
      }
    }
    .item3 {
      display: flex;
      align-items: center;
    }
    .item4 {
      display: flex;
      align-items: center;
      span {
        color: $themeColor;
        font-size: 30px;
      }
    }
  }
  .wrapper3 {
    background-color: white;
    display: grid;
    grid-template-columns: 150px auto auto 1fr 80px;
    grid-template-rows: 40px;
    grid-column-gap: 20px;
    .item1 {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: $themeColor;
        font-size: 30px;
        font-style: italic;
        font-weight: 600;
      }
    }
    .item2 {
      .van-icon-laba {
        line-height: 20px;
      }
    }
    .item3 {
      display: flex;
      align-items: center;
      overflow: hidden;
      span {
        font-size: 25px;
      }
    }
    .item4 {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        color: #999999;
      }
    }
    .item5 {
      display: flex;
      align-items: center;
      span {
        width: 2px;
        background-color: black;
        height: 35px;
      }
    }
  }
  .wrapper2 {
    display: grid;
    background-color: white;
    grid-template-columns: repeat(4, 1fr);
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 150px;
        height: 150px;
      }
      span {
        font-size: 30px;
      }
    }
  }
  .wrapper1 {
    position: relative;
    img {
      width: 720px;
      height: 200px;
    }
  }
  .header {
    position: absolute;
    top: 0;
    z-index: 2;
    display: grid;
    width: 720px;
    grid-template-columns: 200px auto;
    opacity: 0.8;
    .item1 {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 30px;
        color: white;
      }
    }
    .item2 {
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        width: 450px;
        height: 50px;
        border: none;
        -webkit-appearance: none;
        border-radius: 8em;
        &::placeholder {
          text-align: center;
          font-size: 30px;
          color: #999999;
          font-weight: 100;
        }
      }
    }
  }
</style>

<script>
  import BMap from 'BMap';
  import { getCurrentAddress, setCurrentAddress } from '@/storage';

  export default {
    name: 'home',
    data() {
      return {
        jumps: [
          {
            image: require('../assets/image/home/home_cf.png'),
            name: '我的处方',
            url: '/rxs'
          },
          {
            image: require('../assets/image/home/home_yb.png'),
            name: '我的医保',
            url: '/account/info'
          },
          {
            image: require('../assets/image/home/home_knew.png'),
            name: '知识库',
            url: '/repositoryTypes'
          },
          {
            image: require('../assets/image/home/home_drug.png'),
            name: '药房',
            url: '/shops'
          }
        ],
        list1: [
          {
            image: require('../assets/image/home/catch.jpg'),
            name: '感冒',
            introduce: '清热解毒',
            url: { name: '/drugs', params: { typeId: 'cMLo_cCMRyKrd46oISOJRQ' } }
          },
          {
            image: require('../assets/image/home/allergy.jpg'),
            name: '抗过敏',
            introduce: '皮炎湿疹',
            url: { name: '/drugs', params: { typeId: 'Nc10FphRTviCxz7vGiVr6A' } }
          },
          {
            image: require('../assets/image/home/cough.jpg'),
            name: '止咳化痰',
            introduce: '肺热咳嗽',
            url: { name: '/drugs', params: { typeId: '74exCUknTDe0qnag36LRCQ' } }
          }
        ],
        list2: [
          {
            image: require('../assets/image/home/arthritis.jpg'),
            name: '关节炎',
            introduce: '跌打损伤',
            url: { name: '/drugs', params: { typeId: 'S2BIwR09QN6MNstlWcTrvQ' } }
          },
          {
            image: require('../assets/image/home/shoulder.jpg'),
            name: '肩周炎',
            introduce: '骨质疏松',
            url: { name: '/drugs', params: { typeId: 'C1Rlu40JRlS7VuxopGxA-A' } }
          },
          {
            image: require('../assets/image/home/hyperplasia.jpg'),
            name: '腰肌劳损',
            introduce: '骨质增生',
            url: { name: '/drugs', parmas: { typeId: 'xsE5-eyYTfC3RXEoLjCxgg' } }
          }
        ],
        list3: [
          {
            image: require('../assets/image/home/detoxification.jpg'),
            name: '胃炎',
            introduce: '清热解毒',
            url: { name: '/drugs', params: { typeId: 'apqD-f6ESl25k5bJG7qIeQ' } }
          },
          {
            image: require('../assets/image/home/detoxify.jpg'),
            name: '消化不良',
            introduce: '胃肠解痉',
            url: { name: '/drugs', params: { typeId: 'lks1M2u5SVa216t6x35E3w' } }
          },
          {
            image: require('../assets/image/home/coughs.jpg'),
            name: '腹泻',
            introduce: '肺热咳嗽',
            url: {
              name: '/drugs',
              params: { typeId: '6NOZUuyVTT6dzMaogWGXOg\n' }
            }
          }
        ],
        banners: [
          require('@/assets/image/home/home_banner.png'),
          require('@/assets/image/home/home_banner_02.png')
        ],
        searchIcon: '\ue64c 药品名',
        discounts: [],
        recommends: [],
        adverts: [],
        repositories: [],
        number: 0,
        repositoryTypes: [],
        isLoading: false,
        timer: '',
        currentAddress: { name: '定位中...' }
      };
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
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getCurrentAddress();
      });
    },
    created() {
      this.initData();
    },
    mounted() {},
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      getCurrentAddress() {
        let currentAddress = getCurrentAddress();
        if (currentAddress === undefined) {
          if (this.isMobile()) {
            new BMap.Geolocation().getCurrentPosition(async r => {
              console.log(r.point);
              const params = {
                lat: r.point.lat,
                lng: r.point.lng
              };
              const data = await this.$api.getPois(params);
              const position = {
                name: data.pois[0].name,
                lat: data.pois[0].location.lat,
                lng: data.pois[0].location.lng
              };
              setCurrentAddress(position);
              this.currentAddress = position;
            });
          } else {
            const position = {
              name: '测试地址',
              lat: 31,
              lng: 120
            };
            setCurrentAddress(position);
            this.currentAddress = position;
          }
        } else {
          this.currentAddress = currentAddress;
        }
      },
      async initData() {
        this.$loading();
        // 限时抢购
        this.discounts = await this.$http.get('/drugs/discount');
        // 好货推荐
        this.recommends = await this.$http.get('/drugs/recommend');
        // 知识库
        this.repositories = await this.$http.get('/repositories/home');
        if (!this._.isEmpty(this.repositories)) {
          this.startMove();
        }
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
