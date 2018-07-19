<template>
  <div style="background:white!important;">
    <mt-header :title="aboutTitle">
      <router-link to="#" slot="left">
        <mt-button @click="$router.go(-1)" icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="about_word">
      E慧药致力于提供专业药品服务的第三方互联网交易服务平台，已经获得国家
      食品药品监督管理局颁发的互联网交易服务资格证书。
    </div>
    <div class="about_img">
      <img src="../assets/image/qrcode.jpg"/>
    </div>

    <div class="f_about_footer">
      <div>2017-2018 E慧药版权所有</div>
      <div>昆山网进科技股份有限公司</div>
    </div>
  </div>
</template>
<script>
import headWhite from '@/components/headWhite'
export default {
  name: 'about',
  data () {
    return {
      aboutTitle: '关于我们'
    }
  },
  components: {
    headWhite
  }
}
</script>
<style scoped>
  .mint-header{background: white;color: #333333;}

  .f_about_footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    padding-bottom: 1rem;
    color: #b2b2b2;
    font-size: 1rem;
  }
  .about_word{
    padding:1rem 8% 8rem 8%;
    background-color: #1AB6FD;
    color: #ffffff;
    line-height: 2rem;
    border-radius:0 0 50vw 50vw;

  }
  .about_img{
    position: absolute;
    top: 10rem;
    left: 30%;
    width: 40%;
    max-width: 500px;
    margin-top: 5rem;
  }
  .about_img img{
    width:100%;
  }
</style>
