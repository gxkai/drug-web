<template>
  <div class="container">
    <new-header title="商家介绍" ref="header">
      <div @click="$router.go(-1)" slot="left">
        <i class="iconfont ic-arrow-right"></i>
      </div>
    </new-header>
    <div class="body" ref="body">
      <div class="shop-header">
        <img :src="getImgURL(shopInfo.logo, 'SMALL_LOGO')"/>
        <span class="shop-name">{{shopInfo.name}}</span>
        <div class="shop-collect"
             @click="collect"
              v-if="activeColor">
          已收藏
        </div>
        <div class="shop-not-collect"
             @click="collect"
             v-else>
          未收藏
        </div>
      </div>

      <ul class="shop-score">
        <li>
          <span>{{shopInfo.describeScore||0}}分</span>
          <span>客户服务</span>
        </li>
        <li class="shop-score-boundary "></li>
        <li>
          <span>{{shopInfo.deliveryScore||0}}分</span>
          <span>发货速度</span>
        </li>
        <li class="shop-score-boundary "></li>
        <li>
          <span>{{shopInfo.serviceScore||0}}分</span>
          <span>物流速度</span>
        </li>
        <li class="shop-score-boundary "></li>
        <li>
          <span>{{shopInfo.packageScore||0}}分</span>
          <span>商品包装</span>
        </li>
      </ul>

      <div class="shop-nav mt-l-10" spellcheck="false" cellspacing="0">
        <div class="is-flex flex-wrap">
          <router-link class="type-list" tag="td" v-for="(item,index) in drugTypes" :key="index"
                       :to="{path:'/shops/drugs',query:{typeId:item.id,id:shopId}}">{{item.type}}
          </router-link>
        </div>

      </div>

      <div class="shop-recommend">—— 商家推荐 ——</div>

      <div class="shop-goods text-center m-auto position-relative">
        <router-link class="shop-goods-list"
                     v-for="(recommend,index) in recommendList"
                     :key="index"
                     :to="{path :'/shopDrugSpecs',query:{shopDrugSpecId:recommend.id}}">
          <div class="rx_mark" v-if="!recommend.otc">处</div>
          <img :src="getImgURL(recommend.fileId, 'LARGE_LOGO')"/>
          <span class="d-inline-block elps text-center">{{recommend.name}}</span>
          <span class="text-red d-inline-block elps text-center">&yen; {{toFixedTwo(recommend.price)}}</span>
        </router-link>
      </div>
    </div>
    <div class="shop-footer" spellcheck="false" cellspacing="0" ref="footer">
      <router-link :to="{ path: '/shops/info', query: { id: shopId }}">商家介绍</router-link>
      <router-link :to="{ path: '/shops/drugs', query: { id: shopId }}">全部商品</router-link>
      <router-link :to="{ path: '/chats/view', query: { shopId: shopId }}">在线咨询</router-link>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    name: 'shop',
    data() {
      return {
        recommendList: [],
        shopInfo: [],
        shopId: this.$route.query.shopId,
        activeColor: false,
        collectz: '',
        drugTypes: []
      };
    },
    methods: {
      collect() {
        this.activeColor = !this.activeColor;
        let data = {
          'shopId': this.shopId,
          'isCollect': this.activeColor
        };
        this.$http.post('/collects/shop', data).then(res => {
          if (this.activeColor) {
            Toast({
              message: '收藏成功',
              position: 'middle',
              duration: 1000
            });
            this.collectz = '已收藏';
          } else {
            Toast({
              message: '取消收藏成功',
              position: 'middle',
              duration: 1000
            });
            this.collectz = '未收藏';
          }
        }).catch(error => {
          this.exception(error);
        });
      }
    },
    created: function () {
      this.$http.get('/shops/' + this.shopId + '/drugs/recommend').then(res => {
        this.recommendList = res.data;
        console.log(res.data);
      }).catch(error => {
        this.exception(error);
      });
      this.$http.get('/shops/' + this.shopId).then(res => {
        this.shopInfo = res.data;
      }).catch(error => {
        this.exception(error);
      });
      this.$http.get('/collects/shop/one?' + '&shopId=' + this.shopId)
        .then(res => {
          if (res.data) {
            this.activeColor = true;
          } else {
            this.activeColor = false;
          }
        }).catch(error => {
          this.exception(error);
        });
      // 药品大类
      this.$http.get('/drugTypes')
        .then((res) => {
          this.drugTypes = res.data;
        }).catch(error => {
          this.exception(error);
        });
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight - this.$refs.footer.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    }
  };
</script>
<style scoped>
  .is-flex {
    display: flex !important;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .type-list {
    display: block;
    width: 240px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 26px;
  }

  .container {
    width: 720px;
    height: 100vh;
  }

  .shop-header {
    margin-top: 2px;
    width: 720px;
    height: 167px;
    background: rgba(19, 193, 254, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .shop-header img {
    width: 100px;
    border-radius: 50%;
    border: 1px solid #FFFEFE;
    background: rgb(255, 254, 254);
    display: block;
    margin-left: 59px;
  }

  .shop-name {
    font-size: 36px;
    color: rgba(255, 254, 254, 1);
  }

  .shop-collect {
    background: #ef4f4f;
    margin-right: 35px;
    font-size: 22px;
    color: rgba(255, 254, 254, 1);
    border: 1PX solid #cccccc;
    padding: 5px 10px;
  }

  .shop-not-collect {
    background: rgba(191, 191, 191, 1);
    margin-right: 35px;
    font-size: 22px;
    color: rgba(255, 254, 254, 1);
    border: 1PX solid #cccccc;
    padding: 5px 10px;
  }
  .shop-score {
    width: 650px;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-top: 14px;
  }

  .shop-score li {
    display: inline-block;
  }

  .shop-score span {
    display: block;
    width: 100px;
    font-size: 24px;
    color: rgba(153, 153, 153, 1);
    text-align: center;
  }

  .shop-score-boundary {
    width: 1PX;
    height: 45px;
    background-color: #999999;
  }

  .shop-recommend {
    width: 720px;
    background: rgba(255, 255, 255, 1);
    font-size: 26px;
    color: rgba(51, 51, 51, 1);
    display: flex;
    justify-content: center;
    padding: 30px 0;
  }

  .shop-goods-list {
    width: 360px;
    height: 409px;
    background: rgba(255, 255, 255, 1);
    float: left;
    border: 1PX solid #f5f5f5;
  }

  .shop-goods img {
    width: 224px;
    height: 224px;
    margin: 72px 50px 26px 50px;
  }

  .shop-goods span {
    width: 218px;
    display: block;
    text-align: center;
    font-size: 25px;
    color: black;
  }

  .shop-footer {
    width: 720px;
    height: 89px;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .shop-footer a {
    width: 230px;
    height: 90px;
    display: inline-block;
    line-height: 90px;
    text-align: center;
    color: rgba(102, 102, 102, 1);
    font-size: 30px;
  }

</style>
