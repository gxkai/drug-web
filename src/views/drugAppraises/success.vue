<template>
  <new-main>
    <new-header title="评价成功" bgColor = "" color="rgba(51,51,51,1)" rightColor="rgba(19,193,254,1)" leftColor = "rgba(51,51,51,1)">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
      <span slot="right" tag="span" @click="$router.replace('/drugAppraises')">完成</span>
    </new-header>
    <div class="body1">
        <span>每天都有用户通过看评价来做购物决策~</span>
        <div> <button @click="$router.replace('/drugAppraises')">查看我的评价</button></div>
    </div>
    <new-editline name="接着评下去吧" v-if="list.length>0"></new-editline>
    <ul class="body2">
      <li v-for="(item,index) in list" :key="index">
        <img :src="item.logo">
        <div contenteditable="true" class="center">{{item.name}}</div>
        <router-link  tag="button" :to="{path:'/drugAppraises/create',query:{id:item.orderId}}">去评价</router-link>>
      </li>
    </ul>
  </new-main>
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
            e.logo = this.getImgURL(e.fileId, 'LARGE_LOGO');
          });
        }).catch(error => {
          this.exception(error);
        });
    }
  };
</script>

<style scoped>
  .body1 {
    width:720px;
    height:162px;
    background:rgba(19,193,254,1);
    font-size:26px;
    font-family:HiraginoSansGB-W3;
    color:rgba(254,255,255,1);
    text-align: center;
  }
  .body1 span {
    line-height: 100px;
  }
  .body1 button {
    border-color: rgba(255,255,255,1);
    width:199px;
    height:47px;
    border-radius:20px;
    color: rgba(255,255,255,1);
    background-color: rgba(19,193,254,1);
    outline: none;
  }

  .body2 {
    margin-top: 30px;
    height: calc(100vh - 367px);
    overflow: scroll;
  }
  .body2 li {
    height: 159px;
    display: flex;
    align-items: center;
    background:rgba(255,255,255,1);
    margin-bottom: 10px;
  }
  .body2 li .center{
    height: 130px ;
    padding: 20px;
    font-size:22px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height: 50px;
  }

  .body2 li button{
    width:127px;
    height:39px;
    background:rgba(19,193,254,1);
    border-radius:20px;
    margin-right: 10px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
  }

  .body2 img {
    height:119px;
    margin-left: 20px;
  }

  .body2 .center {
    word-break: break-all;
    word-wrap: break-word;
    overflow: scroll;
  }
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
