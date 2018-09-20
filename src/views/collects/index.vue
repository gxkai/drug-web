<template>
  <div class="collect-body" style="background-color: #f5f5f5">
    <div>
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
        ref="header"
      />

      <ul class="flex-stream-sb">
        <li @click="shop(1)" class="padding-tb-10">
          <span :class="{'collects_active':qwere===1}" class="text-l-30">商品</span>
        </li>
        <li @click="shop(2)" class="padding-tb-10">
          <span :class="{'collects_active':qwere===2}" class="text-l-30">商家</span>
        </li>
      </ul>
    </div>

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
    components: {
      'collectDrug': collectDrug,
      'collectShop': collectShop
    },
    data() {
      return {
        compountIsshow: 1,
        qwere: 1
      };
    },
    computed: {
      showComponent() {
        switch (this.compountIsshow) {
          case 1:
            return collectShop;
          case 2:
            return collectDrug;
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      shop(index) {
        this.compountIsshow = index;
        this.qwere = index;
      }
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
    height: 100px;
    background: rgba(255, 255, 255, 1);
  }

  .flex-stream-sb li {
    display: block;
    width: 360px;
    text-align: center;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .padding-tb-10 {
    padding: 20px 0;
    box-sizing: border-box;
  }

</style>
