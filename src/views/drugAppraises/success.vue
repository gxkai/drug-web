<template>
  <new-main>
    <new-header title="评价成功" bgColor = "" color="rgba(51,51,51,1)" rightColor="rgba(19,193,254,1)" leftColor = "rgba(51,51,51,1)">
      <div slot="left">
      <i class="iconfont ic-arrow-right"  @click="$router.go(-1)"></i>
      </div>
      <span slot="right"  @click="$router.push('/drugAppraises')" class="text-l-25">完成</span>
    </new-header>
    <div class="body1">
        <span>每天都有用户通过看评价来做购物决策~</span>
        <div><span @click="$router.push('/drugAppraises')">查看我的评价</span></div>
    </div>
    <new-edit-line name="接着评下去吧" v-if="list.length>0"></new-edit-line>
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
  .body1>span {
    line-height: 100px;
    font-size: 25px;
  }
  .body1 div span{
    padding: 10px 20px;
    border: 1PX solid rgba(255,255,255,1);
    border-radius:20px;
    color: rgba(255,255,255,1);
    background-color: rgba(19,193,254,1);
  }

  .body2 {
    margin-top: 30px;
    height: calc(100vh - 367px);
    overflow: auto;
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
    overflow: auto;
  }
</style>
