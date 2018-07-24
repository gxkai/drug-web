<template>
  <div class="f_body">
  <!--<div style="background:white!important;">-->
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
      <span class="f_footer_1">2017-2018 E慧药版权所有</span>
      <span class="f_footer_2">昆山网进科技股份有限公司</span>
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
  .mint-header{background: white;color: #333333;}
.f_body{
  width:720px;
  height:1334px;
}
  .f_about_footer {
    display: block;
    height:23px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:88px;
  }
  .f_footer_1{
    display: block;
    width:292px;
    height:23px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:88px;
    margin-top: 1203px;
    margin-bottom: 108px;
    margin-left: 214px;
    margin-right: 214px;
  }
  .f_footer_2{
    width:292px;
    height:23px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:88px;
    margin-top: 1237px;
    margin-bottom: 74px;
    margin-left: 214px;
    margin-right: 214px;
  }
  .about_word{
    width:620px;
    height:95px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    line-height:36px;

    /*padding:1rem 8% 8rem 8%;*/
    /*background-color: #1AB6FD;*/
    /*color: #ffffff;*/
    /*line-height: 2rem;*/
    /*border-radius:0 0 50vw 50vw;*/

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
