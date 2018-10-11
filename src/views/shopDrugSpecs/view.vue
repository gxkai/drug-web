<!--<template>-->
  <!--<div class="view">-->
    <!--<div ref="header">-->
      <!--<new-header title="详情" class="bg-white text-333333">-->
        <!--<div slot="left" >-->
          <!--<i class="iconfont ic-arrow-right text-333333" @click.stop="$router.go(-1)"></i>-->
        <!--</div>-->
        <!--<div slot="right" >-->
          <!--<i class="iconfont ic-fenxiang text-333333" @click.stop="onShare()"></i>-->
        <!--</div>-->
      <!--</new-header>-->
      <!--<div class="view-nav">-->
        <!--<div @click="shop(1)" :class="{active:number==1}" class="text-l-30">-->
          <!--基本信息-->
        <!--</div>-->
        <!--<div @click="shop(0)" :class="{active:number==0}" class="text-l-30">-->
          <!--全部评价-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="view-container" ref="body">-->
      <!--<keep-alive>-->
        <!--<component :is="showComponent" :shopDrugSpec="shopDrugSpec"></component>-->
      <!--</keep-alive>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import drugAppraise from '../shopDrugSpecs/child/appraise';-->
  <!--import drugInfo from '../shopDrugSpecs/child/info';-->
  <!--export default {-->
    <!--name: 'drugDetail',-->
    <!--data() {-->
      <!--return {-->
        <!--shows: 0,-->
        <!--shopDrugSpec: JSON.parse(this.$route.query.shopDrugSpec),-->
        <!--number: 1,-->
        <!--showComponent: 'drugInfo'-->
      <!--};-->
    <!--},-->
    <!--methods: {-->
      <!--shop(index) {-->
        <!--if (index === 0) {-->
          <!--this.showComponent = drugAppraise;-->
          <!--this.number = index;-->
        <!--}-->
        <!--if (index === 1) {-->
          <!--this.showComponent = drugInfo;-->
          <!--this.number = index;-->
        <!--}-->
      <!--},-->
      <!--onShare() {-->
        <!--this.$toast('该功能暂未上线');-->
      <!--}-->
    <!--},-->
    <!--components: {-->
      <!--drugAppraise,-->
      <!--drugInfo-->
    <!--},-->
    <!--created() {-->
      <!--this.shop(this.$route.query.index);-->
    <!--},-->
    <!--mounted() {-->
      <!--this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.clientHeight) + 'px';-->
      <!--this.$refs.body.style.overflow = 'auto';-->
    <!--}-->
  <!--};-->
<!--</script>-->

<!--<style scoped type="text/less" lang="less">-->
  <!--.bg-white {-->
    <!--background: white !important;-->
  <!--}-->

  <!--.text-333333 {-->
    <!--color: #333333 !important;-->
  <!--}-->
  <!--.view {-->
    <!--&-nav {-->
      <!--width: 720px;-->
      <!--height: 60px;-->
      <!--display: flex;-->
      <!--align-items: center;-->
      <!--font-size:24px;-->
      <!--font-family:HiraginoSansGB-W3;-->
      <!--&gt;div {-->
        <!--width: 360px;-->
        <!--text-align: center;-->
      <!--}-->
      <!--&gt;div:nth-child(1){-->
        <!--border-right: 1PX solid rgba(153,153,153,1);-->
      <!--}-->
      <!--.active {-->
        <!--color:rgba(19,193,254,1);-->
      <!--}-->
    <!--}-->
    <!--&-container {-->
      <!--/*background: #f5f5f5;*/-->
    <!--}-->
  <!--}-->

<!--</style>-->

<template>
  <div class="shop-drug-spec">
    <div id="header">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <new-drug-tab :state.sync="state"></new-drug-tab>
    </div>
    <div :style="contentStyle">
      <keep-alive>
        <component :is="component" :shopDrugSpec="shopDrugSpec" ></component>
      </keep-alive>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .shop-drug-spec {
    background-color: #f5f5f5;
  }
</style>

<script>
  import appraise from '../shopDrugSpecs/child/appraise';
  import info from '../shopDrugSpecs/child/info';
  export default {
    name: 'shop-drug-spec',
    components: {
      appraise,
      info
    },
    computed: {
      component() {
        switch (this.state) {
          case 1:
            return appraise;
          default:
            return info;
        }
      }
    },
    data() {
      return {
        shopDrugSpec: JSON.parse(this.$route.query.shopDrugSpec),
        state: this.$route.query.state || 0,
        contentStyle: {
          height: 0,
          overflow: 'auto'
        }
      };
    },
    created() {
    },
    mounted() {
      this.contentStyle.height = (document.documentElement.clientHeight - document.getElementById('header').clientHeight) + 'px';
    },
    methods: {
    }
  };
</script>

