<template>
  <div class="cointer-full">
    <new-header title="兑换记录">
      <div slot="left">
        <i class="iconfont ic-arrow-right" @click.stop="$router.go(-1)"></i>
      </div>
    </new-header>

    <div class="exchange-record bg-white width-percent-100">
      <div class="left d-inline-block">
        <img
          src="https://img-blog.csdn.net/20180808141829654?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyOTYzODQx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>
      </div>
      <div class="right d-inline-block">
        <p class="elps fz30 receive-title">多力葵花籽油</p>
        <p class="text-red fz20 gold">620金币</p>
        <p class="fz22 date">2018-8-23</p>
      </div>
    </div>





    <div class="exchange-record bg-white width-percent-100">
      <div class="left d-inline-block">
        <img
          src="https://img-blog.csdn.net/20180808141829654?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyOTYzODQx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>
      </div>
      <div class="right d-inline-block">
        <p class="elps fz30 receive-title">多力葵花籽油</p>
        <p class="text-red fz20 gold">620金币</p>
        <p class="fz22 date">2018-8-23</p>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    name: 'newPayList',
    methods: {}
  };
</script>

<style scoped>
  .cointer-full {
    width: 720px;
    background: #f5f5f5;
  }
.exchange-record .left {
    width: 165px;
    height: 165px;
    border: 1px solid #f5f5f5;
    margin-left: 56px;
    margin-top: 15px;
  }
  .exchange-record .right{
    margin-left: 37px;
  }
  .exchange-record .left img {
    width: 163px;
    height: 163px;
  }

  .fz22 {
    font-size: 22px;
  }

  .fz20 {
    font-size: 20px;
  }

  .fz30 {
    font-size: 30px;
  }
  .receive-title{
    margin-top: 31px;
  }
  .gold{
    margin-top: 18px;
  }
  .date{
    margin-top: 20px;
  }
  .exchange-record{
    margin-bottom: 13px;
  }

</style>
