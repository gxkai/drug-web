<template>
  <div class="container">
    <new-header title="关于我们">
      <div slot="left" @click="$router.go(-1)">
      <i class="iconfont ic-arrow-right " ></i>
      </div>
    </new-header>
    <div class="about-img">
      <div class="about-word">
        E慧药致力于提供专业药品服务的第三方互联网交易服务平台，已经获得国家
        食品药品监督管理局颁发的互联网交易服务资格证书。
      </div>
      <img src="../assets/image/qrcode.jpg"/>
    </div>
    <div class="about-footer">
      <span>2017-2018 E慧药版权所有</span>
      <span>昆山网进科技股份有限公司</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'about',
    data() {
      return {};
    }
  };
</script>
<style scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

  .container {
    width: 720px;
    height: 100vh;
  }

  .about-img {
    height: 425px;
    background: rgba(19, 193, 254, 1);
    -webkit-border-radius: 0 0 285px 285px;
    display: block;
  }

  .about-word {
    display: block;
    margin: 0 auto;
    margin-top: 2px;
    padding: 50px;
    width: 620px;
    font-size: 28px;
    color: rgba(255, 255, 255, 1);
  }

  .about-footer {
    position: fixed;
   bottom: 0px;
    left: 0;
  }

  .about-footer span {
    display: block;
    width: 720px;
    text-align: center;
    font-size: 24px;
  }

  .about-img img {
    position: fixed;
    top: 418px;
    left: 231px;
    width: 100%;
    width: 259px;
    height: 229px;
  }
</style>
