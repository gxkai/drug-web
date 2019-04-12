﻿<template>
  <div>
    <new-layout>
      <template slot="center">
        <div class="header-wrapper">
          <div class="header">
            <div class="location" @click="loadPageAddressesChoose">
              <van-icon
                name="dizhi-"
                color="white"
                size=".416rem"
              />
              <span class="van-ellipsis">{{ currentAddress.name }}</span>
              <van-icon
                name="arrow"
                color="white"
                size=".416rem"
                class="arrow"
              />
            </div>
            <input
              type="text"
              class="van-icon"
              :placeholder="placeholder"
              @click="$router.push('/search')"
              readonly="readonly"
            />
            <van-icon
              name="xiaoxi-1"
              color="white"
              size=".616rem"
              :info="messageCount"
              @click="$router.push('/messageTypes')"
            ></van-icon>
          </div>
          <hooper :autoPlay="true" :playSpeed="5000" :transition="500">
            <slide v-for="(banner, index) in banners" :key="index">
              <img v-lazy="banner" />
            </slide>
          </hooper>
        </div>
        <div class="entry-wrapper van-hairline--bottom">
          <div
            class="item"
            v-for="(item, index) in jumps"
            :key="index"
            @click="$router.push(item.url)"
          >
            <div class="icon" :class="`icon${index}`">
              <van-icon name="yibaoqia-" color="white" size="0.46rem"/>
            </div>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="notice-wrapper">
          <span class="left-text">
            健康资讯
          </span>
          <new-line width="0.02rem" height="0.39rem" />
          <van-icon name="laba-" color="#F63016" size=".8rem" />
          <transition name="slide" mode="out-in" class="van-ellipsis">
            <span
              :key="text.id"
              @click="
                $router.push({
                  name: '/repositories/view',
                  params: { id: text.val.id, title: text.val.title }
                })
              "
              class="van-ellipsis slide-text"
            >
              {{ text.val.title }}
            </span>
          </transition>
          <span class="right-text"
          @click="$router.push('/repositories/home')"
          >
            更多>
          </span>
        </div>
        <new-white-space />
        <div v-if="discounts.length > 0">
          <left-title
            leftText="惠民促销"
            leftColor="#000000"
            rightText="惠民不停歇>"
          />
          <div class="swipe-wrapper van-hairline--top">
            <van-swipe :show-indicators="false" :width="200">
              <van-swipe-item
                v-for="(discount, index) in discounts"
                :key="index"
                @click="loadPageShopDrugs(discount.shopDrugId)"
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
          </div>
        </div>
        <new-white-space />
        <div>
          <left-title leftText="家庭常用" />
          <div class="horizon-wrapper">
            <div
              class="item"
              v-for="(item, index) in list1"
              :key="index"
              @click="loadPageDrugs(item.typeId)"
            >
              <img v-lazy="item.image" />
            </div>
          </div>
        </div>
        <new-white-space />
        <div>
          <left-title leftText="风湿关节" leftColor="#1cace8" />
          <div class="right-wrapper van-hairline--top">
            <div
              class="item"
              :class="`item${index + 1}`"
              v-for="(item, index) in list2"
              :key="index"
              @click="loadPageDrugs(item.typeId)"
            >
              <img v-lazy="item.image" />
            </div>
          </div>
        </div>
        <new-white-space />
        <div>
          <left-title leftText="腹泻呕吐" leftColor="#2f69d4" />
          <div class="left-wrapper">
            <div
              class="item"
              :class="`item${index + 1}`"
              v-for="(item, index) in list3"
              :key="index"
              @click="loadPageDrugs(item.typeId)"
            >
              <img v-lazy="item.image" />
            </div>
          </div>
        </div>
        <div>
          <central-title
            icon="aixin"
            color="#7d000e"
            text="好货推荐"
            v-if="recommends.length > 0"
          />
          <div class="normal-wrapper" v-if="recommends.length > 0">
            <div
              class="item"
              v-for="(recommend, index) in recommends"
              :key="index"
              @click="loadPageShopDrugs(recommend.shopDrugId)"
            >
              <new-image
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
        </div>
        <new-white-space />
      </template>
      <template slot="bottom">
        <van-tabbar :value="0" :fixed="false">
          <van-tabbar-item icon="shouye-" to="/home">首页</van-tabbar-item>
          <van-tabbar-item icon="chufang-" to="/rxs">处方单</van-tabbar-item>
          <van-tabbar-item icon="fenlei-" to="/drugTypes">分类</van-tabbar-item>
          <van-tabbar-item icon="gouwuche-" to="/carts"
            >购物车
          </van-tabbar-item>
          <van-tabbar-item icon="wo-" to="/accounts">我</van-tabbar-item>
        </van-tabbar>
      </template>
    </new-layout>
    <new-consult/>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
.normal-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .item {
    background-color: white;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text {
      font-size: $size-mini;
    }
    .text2 {
      color: $theme;
      font-size: $size-mini;
    }
  }
}
.left-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 157px);
  .item {
    background-color: white;
  }
  .item2,
  .item3 {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item2 {
    grid-area: 1/2/2/3;
  }
  .item3 {
    grid-area: 2/2/3/3;
  }
  .item1 {
    grid-area: 1/1/3/2;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.right-wrapper {
  width: 720px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 143px 143px;
  .item {
    background-color: white;
  }
  .item1,
  .item2 {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item1 {
    grid-area: 1/1/2/2;
  }
  .item2 {
    grid-area: 2/1/3/2;
  }
  .item3 {
    grid-area: 1/2/3/3;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.horizon-wrapper {
  background-color: white;
  display: grid;
  grid-template-columns: repeat(3, 207px);
  justify-content: space-evenly;
  .item {
    img {
      height: 196px;
      width: 207px;
    }
  }
}
.swipe-wrapper {
  background-color: white;
  .item {
    width: 180px !important;
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
      color: $theme;
    }
    .price2 {
      text-decoration: line-through;
    }
  }
}
.notice-wrapper {
  padding: 10px 15px;
  background-color: white;
  display: grid;
  grid-template-columns: auto auto auto 1fr auto;
  grid-column-gap: 10px;
  align-items: center;
  .left-text {
    font-family: FZZCHJW--GB1-0 !important;
    font-style: italic;
    color: $theme;
  }
  .slide-text {
    font-size: $size-mini;
  }
  .right-text {
    color: $gray;
    font-size: $size-mini;
  }
}
.entry-wrapper {
  padding: 20px 0;
  display: grid;
  background-color: white;
  grid-template-columns: repeat(4, 1fr);
  .item {
    display: grid;
    grid-row-gap: 10px;
    .icon {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-self: center;
    }
    .icon3 {
      background-image: linear-gradient(0deg,
        #70c993 0%,
        #a6d766 100%),
      linear-gradient(
          #cb8097,
          #cb8097);
      background-blend-mode: normal,
      normal;
    }
    .icon2 {
      background-image: linear-gradient(0deg,
        #f78c3d 2%,
        #fdd455 100%),
      linear-gradient(
          #cb8097,
          #cb8097);
      background-blend-mode: normal,
      normal;
    }
    .icon1 {
      background-image: linear-gradient(0deg,
        #b1fdff 0%,
        #759dff 100%),
      linear-gradient(
          #cb8097,
          #cb8097);
      background-blend-mode: normal,
      normal;
    }
    .icon0 {
      background-image: linear-gradient(0deg,
        #d7000e 2%,
        #f4a9ae 100%),
      linear-gradient(
          #cb8097,
          #cb8097);
      background-blend-mode: normal,
      normal;
    }
    span {
      font-size: $size-mini;
      justify-self: center;
    }
  }
}
.header-wrapper {
  .hooper {
    height: 280px;
  }
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .header {
    width: 100%;
    padding: 20px 15px!important;
    position: absolute;
    top: 10px;
    z-index: 100;
    display: grid;
    grid-template-columns: 200px auto auto;
    align-items: center;
    justify-content: space-evenly;
    .location {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;
      opacity: 0.2;
      border-radius: 12px;
      height: 45px;
      span {
        font-size: $size-small;
        color: white;
      }
      .arrow {
        margin-top: 10px;
      }
    }
    input {
      width: 350px;
      height: 55px;
      border: none;
      -webkit-appearance: none;
      background-color: white;
      border-radius: 30px;
      line-height: 30px;
      padding: 0 10px;
      &::placeholder {
        text-align: left;
        font-size: $size-normal;
        color: $gray-light;
      }
    }
  }
}
</style>

<script>
import BMap from 'BMap';
import { setCurrentAddress } from '@/storage';
import leftTitle from '@/components/home/leftTitle';
import centralTitle from '@/components/home/centralTitle';
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  components: {
    leftTitle,
    centralTitle,
    Hooper,
    Slide
  },
  name: 'home',
  data() {
    return {
      jumps: [
        {
          icon: 'chufang-',
          name: '我的处方',
          url: '/rxs'
        },
        {
          icon: 'yibaoqia-',
          name: '我的医保',
          url: '/account/info'
        },
        {
          icon: 'zhishiku-',
          name: '知识库',
          url: '/repositoryTypes'
        },
        {
          icon: 'yaofang-',
          name: '药房',
          url: '/shops'
        }
      ],
      list1: [
        {
          image: require('@/assets/img/home/感冒.png'),
          name: '感冒',
          introduce: '清热解毒',
          typeId: 'cMLo_cCMRyKrd46oISOJRQ'
        },
        {
          image: require('@/assets/img/home/抗过敏.png'),
          name: '抗过敏',
          introduce: '皮炎湿疹',
          typeId: 'Nc10FphRTviCxz7vGiVr6A'
        },
        {
          image: require('@/assets/img/home/止咳.png'),
          name: '止咳化痰',
          introduce: '肺热咳嗽',
          typeId: '74exCUknTDe0qnag36LRCQ'
        }
      ],
      list2: [
        {
          image: require('@/assets/img/home/关节炎.png'),
          name: '关节炎',
          introduce: '跌打损伤',
          typeId: 'S2BIwR09QN6MNstlWcTrvQ'
        },
        {
          image: require('@/assets/img/home/肩周炎.png'),
          name: '肩周炎',
          introduce: '骨质疏松',
          typeId: 'C1Rlu40JRlS7VuxopGxA-A'
        },
        {
          image: require('@/assets/img/home/腰肌劳损.png'),
          name: '腰肌劳损',
          introduce: '骨质增生',
          typeId: 'xsE5-eyYTfC3RXEoLjCxgg'
        }
      ],
      list3: [
        {
          image: require('@/assets/img/home/胃炎.png'),
          name: '胃炎',
          introduce: '清热解毒',
          typeId: 'apqD-f6ESl25k5bJG7qIeQ'
        },
        {
          image: require('@/assets/img/home/消化不良.png'),
          name: '消化不良',
          introduce: '胃肠解痉',
          typeId: 'lks1M2u5SVa216t6x35E3w'
        },
        {
          image: require('@/assets/img/home/腹泻.png'),
          name: '腹泻',
          introduce: '肺热咳嗽',
          typeId: '6NOZUuyVTT6dzMaogWGXOg\n'
        }
      ],
      banners: [
        require('@/assets/img/home/banner4.png'),
        require('@/assets/img/home/吗丁啉.png')
      ],
      placeholder: '\ue643 输入药品名称',
      discounts: [],
      recommends: [],
      adverts: [],
      repositories: [],
      number: 0,
      repositoryTypes: [],
      isLoading: false,
      timer: '',
      messageCount: 0
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
  created() {
    this.initData();
  },
  mounted() {},
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    getCurrentAddress() {
      if (this.currentAddress === undefined) {
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
      }
    },
    async initData() {
      this.getCurrentAddress();
      this.messageCount = await this.$http.get('/api/messages/count');
      // 限时抢购
      this.discounts = await this.$http.get('/api/drugs/discount');
      // 好货推荐
      this.recommends = await this.$http.get('/api/drugs/recommend');
      // 知识库
      this.repositories = await this.$http.get('/api/repositories/home');
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
