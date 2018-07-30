<template>
  <div id="rxs-container">
    <new-header title="电子处方">
      <i class="iconfont ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>

    <div class="">
      <span class="rxs-title border-bottom-black">处方笺</span>
      <table class="table ">
        <tr>
          <td colspan="2" class="">NO:{{rxList.number}}</td>
          <td></td>
          <td colspan="2" class="">处方日期:{{timeConvert(rxList.rxDate)}}</td>
        </tr>
        <tr>
          <td colspan="2">姓名:{{account.username}}</td>
          <td colspan="2">性别:{{getGender(account.gender)}}</td>
          <td colspan="1" class="">年龄:{{account.age}}</td>
        </tr>
      </table>
      <table class="table ">
        <tr>
          <td colspan="3">门诊（住院）病历号：5666138546873</td>
          <td colspan="2">科别(床号):门诊部（本部）</td>
        </tr>
        <tr>
          <td colspan="3">地址(单位)：{{rxList.office}}</td>
          <td colspan="2">电话：123465785</td>
        </tr>
        <tr>
          <td colspan="5">临床（初步）诊断：{{rxList.illness}}</td>
        </tr>
      </table>

      <div class="info-box">
      <p class="text-red"><b>RP :</b></p>
      <div class="all-border padding-10">

        <ul>
          <li>
            <p >1、0.9%氯化钠注射液 0.9% 100ml*1 1袋</p>
            <p class="text-999999">用法：每次100ml 1日1次 1天 静滴9(成人）</p>
          </li>
          <li v-for="(item,index) in rxList.list" :key="index">
            <p>{{item.name}}</p>
            <p class="text-999999">{{item.usage}}</p>
          </li>
        </ul>

      </div>
      </div>
      <div class="rxs-end">医生:<span class="">孙久光</span></div>
    </div>
    <div class="">
      <router-link class="btn-fixed bg-blue" v-if="rxList.state === 'TO_CHECK'" :to="{path:'/rxs/shops',query:{id:id}}">购药</router-link>
      <button class="btn-fixed bg-grey" v-else>购药</button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        state: '',
        rxList: [],
        account: []
      };
    },
    created() {
      this.id = this.$route.query.id;
      this.account = this.$store.getters.account;
      console.log(this.account);
      this.getData();
    },
    methods: {
      getData() {
        this.$http.get('/rxs/5').then(
          res => {
            console.log(res.data);
            this.rxList = res.data;
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .rxs-container{
    width: 720px;
    height: 100vh;
  }

  .btn-fixed{
    width:720px;
    height:77px;
    line-height: 77px;
    text-align: center;

    border-radius:5px;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
    color: white;
    font-size: 30px;
    letter-spacing: 5px;
  }
  .bg-blue{
    background:rgba(19,193,254,1);
  }
  .bg-grey{
    background: #dddddd;
  }

  .all-border{
    border: 1px #f5f5f5 solid;
  }
  table{
    width: 720px;
    margin-bottom: 0 !important;
  }
  .rxs-title{
    display: block;
    text-align: center;
    line-height: 75px;
    height: 75px;
    width: 720px;
    font-size: 35px;
  }
  .rxs-end{
    display: block;
    text-align: right;
    line-height: 75px;
    height: 75px;
    width: 600px ;
    margin: 0 auto;
  }
  .info-box{
    width: 680px;
    margin: 0 auto;
  }
  .padding-10{
    padding: 10px 10px 100px 10px;
    box-sizing: border-box;
  }
  .border-bottom-black{
    border-bottom: 1px black solid;
  }
</style>
