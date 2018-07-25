<template>
  <div class="f_body">
    <mt-header title="我的收藏">
      <router-link to="/accounts" slot="left">
        <mt-button  icon="back"></mt-button>
      </router-link>
    </mt-header>

    <ul class="flex-stream-sb">
      <li @click="shop(1)" class="padding-tb-10">
        <span :class="{'collects_active':qwere===1}">商品</span>
      </li>
      <li @click="shop(2)" class="padding-tb-10">
        <span :class="{'collects_active':qwere===2}">药店</span>
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
  .mint-header {
    background: #1AB6FD !important;
    color: white;
  }

  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-stream-sb li{
    display: block;
    width: 360px;
    text-align: center;
  }
  .padding-tb-10{
    padding: 20px 0;
    box-sizing: border-box;
  }

  .collects_active {
    color: #1AB6FD;
    border-bottom: 3px solid #1AB6FD;
  }

  /*.f_collect_goods_list_info :first-child {*/
    /*color: #525252;*/
  /*}*/

  /*.f_collect_goods_list_info :nth-child(2) {*/
    /*font-size: 1rem;*/
    /*color: #c9c9c9;*/
  /*}*/

  /*.f_collect_goods_list_info :last-child {*/
    /*color: red;*/
  /*}*/

  /*.f_body {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: #f5f5f5;*/
  /*}*/

  /*.f_collect_shops_list_img > img {*/
    /*width: 100%;*/
  /*}*/

  /*.f_collect_shops_list_info :first-child {*/
    /*margin-top: 5%;*/
  /*}*/

  /*.f_collect_shops_list_info :last-child {*/
    /*font-size: 1rem;*/
    /*color: #c0c0c0;*/
  /*}*/

  /*.f_collect_shops_list_info > span {*/
    /*display: block;*/
  /*}*/

  /*.d_collects_ul {*/
    /*display: flex;*/
    /*margin-top: 3px;*/
    /*font-size: 1.4rem;*/
    /*height:3rem;*/
    /*line-height: 3rem;*/
    /*background: #fff;*/
  /*}*/

  /*.d_collects_ul li {*/
    /*float: left;*/
    /*text-align: center;*/
    /*flex: 1*/
  /*}*/

  /*.d_collects_ul li span {*/
    /*padding-bottom: 0.5rem;*/
  /*}*/

  /*.f_collect_shops_list {*/
    /*margin-bottom: 2rem;*/
  /*}*/

</style>
