<template>
  <div class="f-body">
    <mt-header :title="aboutTitle">
      <router-link to="#" slot="left">
        <mt-button @click="$router.go(-1)" icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="about-img">
      <div class="about-word">
        E慧药致力于提供专业药品服务的第三方互联网交易服务平台，已经获得国家
        食品药品监督管理局颁发的互联网交易服务资格证书。
      </div>
      <img src="../assets/image/qrcode.jpg"/>
    </div>
    <div class="f-about-footer">
      <span>2017-2018 E慧药版权所有</span>
      <span>昆山网进科技股份有限公司</span>
    </div>
  </div>
</template>
<script>
  import headWhite from '@/components/headWhite';

  export default {
    name: 'about',
    data() {
      return {
        aboutTitle: '关于我们'
      };
    },
    components: {
      headWhite
    }
  };
</script>
<style scoped>
  .f-body {
    width: 720px;
    height:100vh;
  }

  .about-img {
    position: absolute;
    bottom:777px;
    width: 720px;
    height: 425px;
    background: rgba(19, 193, 254, 1);
    -webkit-border-radius: 0 0 285px 285px;
  }

  .about-word {
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    width: 620px;
    height: 95px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 255, 255, 1);
    line-height: 36px;
  }

  .f-about-footer{
    position: fixed;
    top: 1200px;
    left: 0;
  }

  .f-about-footer span{
    display: block;
    width: 720px;
    text-align: center;
  }
  .about-img img {
    position:fixed;
   top:418px;
    left:231px;
    width: 100%;
    width:259px;
    height:229px;
  }
</style>
