<template>
  <div>
     <base-layout>
        <template slot="header">
          <!--<div id="header">-->
            <!--<span>扫一扫确认收货</span>-->
            <!--<span  @click="$router.push('/')">退出</span>-->
          <!--</div>-->
          <van-nav-bar
            :title="$route.name"
            @click-right="$router.push('/')"
            right-text="退出"
          />
        </template>

      <div class="shop-main__header">
        <img v-lazy="getImgURL(user.fileId, 'LARGE_LOGO')" class="shop-main__header__image">
        <p class="shop-main__header__name">{{user.name}}</p>
      </div>
      <div class="shop-main__scan">
        <van-icon name="saoyisao" size="10em" @click="$router.push('/scan')"></van-icon>
      </div>
      <!--<template slot="footer">-->
      <!--<van-button size="large" type="primary">查看所有订单</van-button>-->
      <!--</template>-->
      </base-layout>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
      user: {},
      show: true
    };
  },
  created() {
    this.initData();
  },
  mounted() {
  },
  methods: {
    async initData() {
      this.user = await this.$shop.get('/api/shop/users');
      console.log(this.user);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
  .shop-main {
    &__scan {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    &__header {
      height: 200px;
      display: flex;
      align-items: center;
      background-color: #F60000;
      padding: 0 20px;
      &__image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      &__name {
        font-size: 30px;
        color: white;
        margin-left: 20px;
      }
    }
  }

  #header{
    width: 100%;
    height: 110px;
    line-height: 100px;
    background: $themeColor;
    box-shadow: 0px 5px 4px #968282;
    text-align: center;
    span:first-child{
      padding-left: 15px;
      font-size: 12px;
      color: #ffffff;
    }
    span:nth-child(2){
      display: inline-block;
      float: right;
      padding-right: 15px;
      font-size: 12px;
      color: #ffffff;
    }
  }

</style>
