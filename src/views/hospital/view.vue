<template>
  <div class="hospital-container">
    <mt-header title="昆山市中医院">
      <router-link to="#" slot="left">
        <mt-button @click="$router.go(-1)" icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="hospital-content">
      <img src="../../assets/image/hospital.jpg" class="introduce-img"/>
       <div class="hospital-title text-center">
        <span class="border-line-grey"></span>
        <span class="text-13C1FE hosipital-introduce">医院介绍</span>
        <span class="border-line-grey-right"></span>
      </div>
     <div class="hospital-info">
      <span>
        昆山市中医医院1985年独立建院，历经33年的发展，现已成为昆山地区集医疗、教学、科研、康复、预防保健为一体的现代化综合性三级乙等中医医院。在香港艾力彼2016中国医院竞争力县级医院100强中位列41位，中国中医医院排行榜位列80位。
      医院注册床位982张，在编职工1141名，其中专业技术人员1125名，高级职称287名，硕、博士226名，省级以上各类学会专业委员会委员205名，享受国务院特殊津贴者1名。医院设一级临床科室19个，医技科室13个。
      </span>
      </div>
      <!-- TODO 没有图标 -->
      <div class="hospital-list flex-stream-sb margin-top-15">
        <i class="iconfont ic-dianhua text-13C1FE ic"></i>

        <span>电话：0512- 57928305</span>
      </div>
      <div class="hospital-list flex-stream-sb margin-top-15">
        <i class="iconfont ic-dizhi01 text-13C1FE ic"></i>
        <span>地址：昆山市朝阳路189号</span>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'about',
    data() {
      return {
      };
    }
  };
</script>
<style scoped lang="scss">
  .hospital-container{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }
  .hospital-content{
    margin: 16px;
  }
  .hospital-info{
    background: white;
    padding: 34px 2px;
  }
  .flex-stream-sb{
    display: flex;
    align-items: center;
  }
  .margin-top-15{
    margin-top: 15px;
  }
  .hospital-list{
    height:65px;
    background:rgba(255,255,255,1);
  }
  .hospital-title{
    line-height: 76px;
    height: 76px;
    display: unset;
  }
  .border-line-grey{
    width:166px;
    height:1px;
    background:rgba(220,220,220,1);
    margin-left: 110px;
    display: inline-block;
    margin-right: 23px;
  }
  .border-line-grey-right{
    width:166px;
    height:1px;
    background:rgba(220,220,220,1);
    margin-left: 21px;
    display: inline-block;
  }
  .hosipital-introduce{
    width:93px;
    height:25px;
    font-size:24px;
    color:rgba(19,193,254,1);
    line-height:30px;
  }
  .ic{
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 55px;
    font-size: 0.7rem;
    margin-right: 14px;
  }
  .introduce-img{width:689px;
    height:400px;}
</style>
