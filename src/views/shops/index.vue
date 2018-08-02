<template>
  <div class="container">
      <header :style="{background:bgColor,color:color}">

      </header>
    <div class="width-percent-100 bg-white">
      <div class="shops-nav width-percent-96 m-auto"><!--{'blueactive1':index2==comprehensive2}-->
        <div class="d-inline-block fl active samediv comprehensive">综合<i class="icon iconfont ic-sanx-up"></i></div>
        <div class="d-inline-block fl nearby samediv">距离最近</div>
        <div class="d-inline-block fl evaluate samediv">好评优先</div>
        <div class="d-inline-block fl screen samediv">筛选条件<i class="icon iconfont ic-sanx-up"></i></div>
      </div>
    </div>
    <div class="specific">
      <div class="width-percent-96 m-auto">
        <div class="shop-store d-inline-block fl">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3990342075,2367006974&fm=200&gp=0.jpg" class="shop-store-img"/>
        </div>
        <div>
          <div class="height-43"></div>
          <div class="shop-title">
            <p class="shop-title">{{title}}</p>
          </div>
          <div class="shop-star">
            <new-star size="4"></new-star>
          </div>
          <div class="shop-tel">
            {{tel}}}
          </div>
          <div class="shop-tel">
            {{address}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'shopInfo',
    data() {
      return {
        bgColor: '#13C1FE',
        color: 'white'
      };
    },
    props: {
      title: {
        default: '春天大药房'
      },
      tel: {
        default: '13020141411'
      },
      address: {
        default: '地址：昆山市长江路10号'
      }
    },
    created: function () {
      this.$http.get('/shops/' + this.$route.query.id).then(res => {
        this.resultData = res.data;
        this.getImage(this.resultData, this);
      });
    }
  }
  ;
</script>
<style scoped>
  .shop-tel {
    margin-top: 15px;
    font-size: 22px;
  }

  .height-43 {
    height: 43px;
  }

  .container {
    background: #f5f5f5;
  }

  .shop-store {
    width: 300px;
    height: 250px;
    margin: 15px 29px 16px 20px;
  }

  .shop-store-img{
    width: 300px;
    height: 250px;
  }

  .shops-nav {
    height: 79px;
    line-height: 79px;
    font-size: 26px;
    color: rgba(153, 153, 153, 1);
    border-bottom: 1px solid #E5E5E5;
  }

  .comprehensive {
    width: 68px;
  }

  .active {
    color: #454545;
  }

  .samediv {
    width: 24%;
    text-align: center;
  }

  .icon {
    width: 0;
    height: 0;
    margin-left: 4px;
    display: inline-block;
  }

  .specific {
    width: 720px;
    height: 281px;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 15px;
  }

  .shop-title {
    font-size: 30px;
    color: #454545;
  }

  .shop-star {
    margin-top: 11px;
  }
</style>
