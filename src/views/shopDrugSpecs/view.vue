<template>
  <div class="drugDetail">
    <div ref="header">
      <new-header title="详情" class="bg-white text-333333">
        <i class="iconfont ic-arrow-right text-333333" slot="left" @click.stop="$router.go(-1)"></i>
      </new-header>
      <div class="view-nav width-percent-96 m-auto">
        <ul>
          <li class="text-center width-percent-49 fl" @click="shop(1)" :class="{active:number==1}">基本信息</li>
          <li class="text-center width-percent-50 fl" @click="shop(0)" :class="{active:number==0}">服务保障</li>
        </ul>
      </div>
    </div>
    <div ref="body">
      <keep-alive>
        <component :is="showComponent" :shopDrugSpec="shopDrugSpec"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import drugAppraise from '../shopDrugSpecs/child/appraise';
  import drugInfo from '../shopDrugSpecs/child/info';

  export default {
    name: 'drugDetail',
    data() {
      return {
        shows: 0,
        shopDrugSpec: JSON.parse(this.$route.query.shopDrugSpec),
        number: 1,
        showComponent: drugInfo
      };
    },
    methods: {
      shop(index) {
        if (index === 0) {
          this.showComponent = drugAppraise;
          this.number = index;
        }
        if (index === 1) {
          this.showComponent = drugInfo;
          this.number = index;
        }
      }
    },
    components: {
      'drugAppraise': drugAppraise,
      'drugInfo': drugInfo
    },
    created() {
      this.shop(this.$route.query.index);
    },
    mounted() {
      this.$refs.body.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.body.style.overflow = 'auto';
    }
  };
</script>

<style scoped>
  .bg-white {
    background: white !important;
  }

  .text-333333 {
    color: #333333 !important;
  }

  .view-nav ul li:first-child {
    border-right: 1px solid #999999;
  }

  .active {
    color: #13C1FE;
  }

  .view-nav ul {
    height: 40px;
    line-height: 40px;
    font-size: 30px;
  }
</style>
