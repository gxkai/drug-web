<template>
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(fileId,index) in shopDrug.fileIds" :key="index">
          <img v-lazy="getImgURL(fileId,'LARGE_PIC')" class="swipe-image"/>
        </van-swipe-item>
      </van-swipe>
      <new-white-space size="0.1rem"/>
      <div class="drug-wrapper hairline-bottom">
        <div class="line1">
          {{`&yen;${shopDrug.price}`}}
        </div>
        <div class="line2">
          {{`${shopDrug.name}`}}
        </div>
        <div class="line3">
          {{`${shopDrug.introduce}`}}
        </div>
      </div>
      <div class="info-wrapper">
        <info-cell title="国药准字" :desc="`${shopDrug.sfda||'暂无介绍'}`"/>
        <info-cell title="剂型/型号" :desc="`${shopDrug.form||'暂无介绍'}`"/>
        <info-cell title="生产厂商" :desc="`${shopDrug.origin.name||'暂无介绍'}`"/>
        <info-cell title="包装规格" :desc="`${shopDrug.spec||'暂无介绍'}`"/>
      </div>
      <new-white-space size="0.1rem"/>
      <div class="shop-wrapper hairline-bottom">
        <div class="left">
          <img v-lazy="getImgURL(shopDrug.shopLogo,'LARGE_LOGO')"/>
        </div>
        <div class="center">
                        <span>
                          {{shopDrug.shopName}}
                        </span>
        </div>
        <div class="right">
                        <span
                          @click="loadPageShopsView(shopDrug.shopId)"
                        >进入药店</span>
        </div>
      </div>
      <!-- <div class="shop-appraise-wrapper">
         <div class="item">
           <div class="title">
             客户服务
           </div>
           <div class="desc">
             &#45;&#45;&#45;&#45;
           </div>
         </div>
         <div class="item">
           <div class="title">
             发货速度
           </div>
           <div class="desc">
             &#45;&#45;&#45;&#45;
           </div>
         </div>
         <div class="item">
           <div class="title">
             物流速度
           </div>
           <div class="desc">
             &#45;&#45;&#45;&#45;
           </div>
         </div>
         <div class="item">
           <div class="title">
             商品包装
           </div>
           <div class="desc">
             &#45;&#45;&#45;&#45;
           </div>
         </div>
       </div>-->
      <div class="drug-appraise-wrapper">
        <header class="hairline-bottom">
          <div class="left">
                <span>
                  顾客评价({{shopDrug.drugAppraises.list.length}})
                </span>
          </div>
          <div class="right">
                <span>
                  查看全部评价>
                </span>
          </div>
        </header>
        <article>
          <appraise-cell  v-for="(item, index) in shopDrug.drugAppraises.list" :key="index" :item="item"/>
        </article>
      </div>
    </div>
</template>

<script>
  import infoCell from '@/components/shopDrugs/infoCell';
  import appraiseCell from '@/components/shopDrugs/appraiseCell';
  export default {
    components: {
      infoCell,
      appraiseCell
    },
    props: {
      shopDrug: {}
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  /deep/ .van-swipe__indicator {
    background-color: $theme!important;
  }
  .swipe-image {
    width: 100%;
    height: 400px;
  }
  .drug-wrapper {
    background-color: white;
    padding: 10px 40px;
    .line1 {
      font-size: $size-large;
      color: #e60012;
    }
    .line2 {
      margin-top: 10px;
    }
    .line3 {
      margin-top: 10px;
      font-size: $size-least;
      color: $gray;
    }
  }
  .info-wrapper {
    background-color: white;
    padding: 20px 0;
  }
  .shop-wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 20px;
    padding: 20px 40px;
    align-items: center;
    background-color: white;
    div {
      word-break: break-word;
    }
    .left {
      img {
        width: 81px;
        height: 81px;
        background-color: #eeeeee;
        box-shadow: 0px 1px 2px 0px
        rgba(0, 0, 0, 0.35);
      }
    }
    .right {
      span {
        padding: 8px 15px;
        background-color: #d7000e;
        border-radius: 15px;
        font-size: $size-mini;
        color: white;
      }
    }
  }
  .shop-appraise-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    padding: 20px 0;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .title {
        font-size: $size-least;
      }
      .desc {
        color: #f02b2b;
        font-size: $size-least;
      }
    }
  }
  .drug-appraise-wrapper {
    header {
      background-color: white;
      display: flex;
      justify-content: space-between;
      padding: 20px 41px;
      .left {
        span {
          color: $gray;
        }
      }
      div {
        span {
          font-size: $size-mini;
        }
      }
    }
  }
</style>
