<template>
  <div class="hospital-container">
    <mt-header title="昆山市中医院">
      <router-link to="#" slot="left">
        <mt-button @click="$router.go(-1)" icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="hospital-content">
      <img src="../../assets/image/hospital.jpg" />

      <div class="hospital-title text-center">
        <span class="d-inline-block width6 bg-eaeaea mr1 align-super h03 bg-f8 height-1"></span>
        <span class="text-13C1FE">医院介绍</span>
        <span class="d-inline-block width6 bg-eaeaea h03 mr1 align-super ml1 height-1"></span>
      </div>

      <div class="hospital-info">
      <span>
        昆山市中医医院1985年独立建院，历经33年的发展，现已成为昆山地区集医疗、教学、科研、康复、预防保健为一体的现代化综合性三级乙等中医医院。在香港艾力彼2016中国医院竞争力县级医院100强中位列41位，中国中医医院排行榜位列80位。
      医院注册床位982张，在编职工1141名，其中专业技术人员1125名，高级职称287名，硕、博士226名，省级以上各类学会专业委员会委员205名，享受国务院特殊津贴者1名。医院设一级临床科室19个，医技科室13个。
      </span>
      </div>
      <!-- TODO 没有图标 -->
      <div class="hospital-list flex-stream-sb margin-top-15">
        <i class="iconfont icon-dianhua text-13C1FE"></i>
        <span>电话：0512- 57928305</span>
      </div>
      <div class="hospital-list flex-stream-sb margin-top-15">
        <i class="iconfont icon-dizhi01 text-13C1FE"></i>
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
  }

</style>
