<template>
  <div class="main">
    <!--<mt-header title="评价成功">-->
      <!--<router-link to="/" slot="left">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
      <!--<router-link to="/accounts" slot="right">-->
        <!--<mt-button>完成</mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->

    <!--<div class="f_drug_appraise_header">-->
      <!--<span>每天都有用户通过看评价来做购物决策~</span>-->
      <!--<router-link to="/drugAppraises">查看我的评价</router-link>-->
    <!--</div>-->

    <!--<div class="f_drug_appraise_lists">-->
      <!--<div class="f_drug_appraise_list" v-for="toAppraise in toAppraises">-->
        <!--<div class="f_drug_appraise_list_img">-->
          <!--<img v-lazy='toAppraise.drugImg'>-->
        <!--</div>-->
        <!--<span>{{toAppraise.name}}</span>-->
        <!--<div class="f_drug_appraise_list_btn">-->
          <!--<router-link :to="{path: '/drugAppraises/create', query: {id: toAppraise.orderId}}">去评价</router-link>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  export default {
    name: 'myAppraise',
    data() {
      return {
        list: [],
        account: this.$store.getters.account
      };
    },
    created() {
      this.$http.get('/drugAppraises/toAppraise')
        .then(res => {
          this.list = res.data;
          this.list.forEach(e => {
            e.logo = this.getImgURL(e.fileId,'LARGE_LOGO');
          });
        });
    }
  };
</script>

<style scoped>
  /*.mint-header {*/
    /*background: white;*/
    /*color: black;*/
  /*}*/

  /*.mint-button--primary {*/
    /*background: #1AB6FD;*/
    /*color: #e2e2e2;*/
  /*}*/

  /*a {*/
    /*background: none;*/
    /*border: 1px #fefeff solid;*/
    /*border-radius: 10px;*/
    /*color: #fefeff;*/
    /*box-sizing: border-box;*/
    /*padding: 0.3rem 1rem;*/
    /*margin: 1rem;*/
  /*}*/

  /*.f_drug_appraise_header {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*background: #1AB6FD;*/
    /*color: #fefeff;*/
    /*padding: 1rem;*/
    /*box-sizing: border-box;*/
  /*}*/

  /*.f_drug_appraise_list_btn a {*/
    /*width: 50px;*/
    /*background: none;*/
    /*outline: none;*/
    /*border: 1px #2cbbc0 solid;*/
    /*color: #2cbbc0;*/
    /*border-radius: 5px;*/
  /*}*/

  /*.f_drug_appraise_lists_title img {*/
    /*width: 100%;*/
  /*}*/

  /*.f_drug_appraise_list {*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*padding: 0.5rem;*/
    /*border-bottom: 1px #fcfcfc solid;*/
  /*}*/

  /*.f_drug_appraise_list > span {*/
    /*padding: 1rem;*/
    /*box-sizing: border-box;*/
  /*}*/

  /*.f_drug_appraise_list_img img {*/
    /*width: 100px;*/
    /*height: 100px;*/
  /*}*/
</style>
