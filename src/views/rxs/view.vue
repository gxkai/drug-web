<template>
  <div id="elecRecipe">
    <div class="J_elecRecipe_header">
      <router-link class="J_elecRecipe_header_back" to="/rxs">
        <i class="icon iconfont icon-fanhui"></i>
      </router-link>
      <div>电子处方</div>
    </div>
    <div class="width-98 m-auto">
      <p class="d_prescription_title">处方笺</p>
      <table>
        <tr>
          <td class="td_borderbottom">NO:256301123651</td>
          处方日期:
          <td class="td_borderbottom">2018年6月8日</td>
        </tr>
      </table>
      <table>
        <tr>
          <td class="td_borderbottom">姓名:罗充</td>
          <td class="td_borderbottom">性别:男</td>
          <td class="td_borderbottom">年龄:19</td>
        </tr>
      </table>
      <table>
        <tr class="td_borderbottom">
          科别(床号):门诊部（本部）
        </tr>
        <tr>
          临床(初步)诊断:感冒发热
        </tr>
      </table>
      <p class="pr">RP:</p>
      <div style="width: 100%;height: 23.4rem;border:1px solid #7D7D7D;">
        <div style="margin-top: 1.85rem;margin-left: 1.45rem;">
          <p style="color: #000000;font-size:1.2rem;">1、0.9%氯化钠注射液 0.9% 100ml*1 1袋</p>
          <p style="margin-top: 0.65rem;color: #666666;font-size:1rem;">用法：每次100ml 1日1次 1天 静滴9(成人）</p>
        </div>
      </div>

      <div style="margin-top: 1.4rem;" class="width-100 text-right height3">医生:<span
        class="d-inline-block border-bottom-EEEEEE">孙久光</span></div>
    </div>

    <div class="height4 width-100 bg-blue d-block text-center line-height-40">
      <router-link class="J_elecRecipe_gobuy text-white fz-18" :to="{path:'/rxs/shops',query:{id:id}}">购药</router-link>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: ''
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.getData();
    },
    methods: {
      getData() {
        this.$http.get('/rxs/5').then(
          res => {
            console.log(res.data);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .J_elecRecipe_header {
    padding: 0 2%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.4rem;
    position: relative;
    text-align: center;
    background-color: #1AB6FD;
    color: #ffffff;
  }

  .J_elecRecipe_header .icon {
    font-size: 2rem;
    color: #ffffff;
  }

  .J_elecRecipe_header_back {
    display: block;
    position: absolute;
  }

  .J_elecRecipe_recipe {
    width: 90%;
    margin: 0 auto;
  }

  .J_elecRecipe_recipe img {
    width: 100%;
  }

  .d_prescription_title {
    height: 4.75rem;
    line-height: 4.75rem;
    font-size: 1.5rem;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  table {
    width: 100%;
  }

  table tr {
    font-size: 1rem;
    text-align: left;
    height: 3.55rem;
    line-height: 3.55rem;
  }

  .td_borderbottom {
    border-bottom: 1px solid #ccc;
  }

  .pr {
    margin-top: 1.6rem;
    color: #FF0000;
    font-size: 1.5rem;
  }
</style>
