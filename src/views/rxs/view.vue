<!-- FIXME 字体大小 -->
<template>
  <div id="rxs-container">
    <new-header title="电子处方">
      <i class="icon-font ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>

    <div class="">
      <span class="rxs-title border-bottom-black">处方笺</span>
      <!-- TODO -->
      <div class="p-lr-20">
        <div class="is-flex mt-20 flex-sb ">
          <div class="border-bottom-grey">NO：{{rxList.number}}</div>
          <div class="border-bottom-grey">处方日期：{{timeConvert(rxList.rxDate)}}</div>
        </div>
        <div class="is-flex mt-20 flex-sb">
          <div class="border-bottom-grey">姓名：{{account.username}}</div>
          <div class="border-bottom-grey">性别：{{getGender(account.gender)}}</div>
          <div class="border-bottom-grey">年龄：{{account.age}}</div>
        </div>
        <div class="is-flex mt-20 flex-sb">
          <div class="border-bottom-grey">医院：{{rxList.hospital}}</div>
          <div class="border-bottom-grey">科室：{{rxList.office}}</div>
        </div>
        <div class="mt-20">
          <div class="border-bottom-grey">临床（初步）诊断：{{rxList.illness}}</div>
        </div>
      </div>

      <div class="info-box ">
      <p class="text-red"><b>RP：</b></p>
      <div class="all-border padding-10">
        <ul>
          <li v-for="(item,index) in rxList.list" :key="index">
            <p>{{item.name}} {{item.spec}} {{item.quantity}}件 </p>
            <p class="text-999999"> 用法：{{item.usage}} {{item.frequency}} {{item.dosage}}</p>
          </li>
        </ul>
      </div>
      </div>
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
      this.getData();
    },
    methods: {
      getData() {
        // TODO 测试链接
        this.$http.get('/rxs/1').then(
          res => {
            this.rxList = res.data;
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .p-lr-20{
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .border-bottom-grey{
    border-bottom: 1px #f5f5f5 solid;
  }
  .flex-sa{
    justify-content: space-around;
  }
  .flex-sb{
    justify-content: space-between;
  }
  .mt-20{
    margin-top: 20px !important;
  }
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
