<template>
  <div class="collect-body">
    <new-header title="我的收藏">
      <router-link tag="i" to="/accounts" class="iconfont ic-arrow-right" slot="left"></router-link>
    </new-header>

    <ul class="flex-stream-sb">
      <li @click="shop(1)" class="padding-tb-10">
        <span :class="{'collects_active':qwere===1}">商品</span>
      </li>
      <li @click="shop(2)" class="padding-tb-10">
        <span :class="{'collects_active':qwere===2}">商家</span>
      </li>
    </ul>

    <keep-alive>
      <component :is="showComponent" @changeComponent="shop"></component>
    </keep-alive>
  </div>
</template>


<script>
  import collectDrug from './child/shops';
  import collectShop from './child/drugs';

  export default {
    name: 'collects',
    data() {
      return {
        compountIsshow: 1,
        qwere: 1
      };
    },
    methods: {
      shop(index) {
        this.compountIsshow = index;
        this.qwere = index;
      }
    },
    components: {
      'collectDrug': collectDrug,
      'collectShop': collectShop
    },
    computed: {
      showComponent: function () {
        switch (this.compountIsshow) {
          case 1:
            return collectShop;
          case 2:
            return collectDrug;
        }
      }
    },
    created() {
    }
  };
</script>
<style scoped>

  .collects_active {
    border-bottom: 5px #1AB6FD solid !important;
    color: #1AB6FD;
  }

  .flex-stream-sb {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 720px;
    height: 86px;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 20px;
  }

  .flex-stream-sb li {
    display: block;
    width: 360px;
    text-align: center;
    font-size: 30px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .padding-tb-10 {
    padding: 20px 0;
    box-sizing: border-box;
  }

</style>
