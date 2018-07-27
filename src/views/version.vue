<template>
  <div class="f_body">
    <new-header title="当前版本">
      <i class="iconfont ic-arrow-right " slot="left" @click="$router.go(-1)"></i>
    </new-header>

    <div class="version_title">E慧药</div>
    <div class="version_v">版本:<span>{{version}}</span></div>
    <div class="version-fixed">
      <span>2017-2018 E慧药版权所有</span>
      <span>昆山网进科技股份有限公司</span>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        version: '0.0'
      };
    },
    created: function () {
      this.getVersion();
    },
    methods: {
      getVersion() {
        this.$http.get('/version')
          .then((res) => {
            this.version = res.data;
          });
      }
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

  .f_body {
    width: 720px;
    height: 100vh;
  }

  .version_title {
    font-size: 72px;
    color: rgba(19, 193, 254, 1);
    line-height: 88px;
    margin-top: 268px;
    display: block;
    width: 720px;
    text-align: center;

  }

  .version_v {
    display: block;
    margin-top: 24px;
    width: 720px;
    text-align: center;
    font-size: 26px;
    color: rgba(153, 153, 153, 1);
    line-height: 88px;
  }

  .version-fixed {
    position: fixed;
    bottom: 20px;
    left: 0;
  }

  .version-fixed span {
    display: block;
    width: 720px;
    text-align: center;
  }


</style>
