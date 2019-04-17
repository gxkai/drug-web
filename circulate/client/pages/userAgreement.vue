<template>
    <div class="agreement">
      <h3 class="title">前言</h3>
      <div class="content">
        <p>欢迎使用由苏州XXXXXX公司（以下简称XXXXXX）提供的XXXXXX产品服务（以下简称XXXXXX），本服务条款是您与XXXXXX之间的服务条款。在您注册成为XXXXXX服务的客户之前，请仔细阅读以下全部内容。未成年人则应在法定监护人陪同下阅读。如您使用XXXXXX服务，即表示您自愿接受本服务条款的全部内容。如果您不接受本服务条款，请不要安装、使用、注册或以其他方式使用XXXXXX的服务或产品。以下服务条款请您（以下简称“您”）详细阅读了解：</p>
      </div>

      <h3 class="title">服务条款的确认和接纳</h3>
      <div class="content">
        <p>本服务条款内容包括条款正文、XXXXXX服务已经发布的或将来可能发布的各类规则。所有规则为本条款不可分割的组成部分，与条款正文具有同等效力。除另行明确声明外，您使用XXXXXX服务的行为都应当受本服务条款约束</p>
      </div>

      <el-button @click="$router.go(-1)">返回</el-button>

    </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class UserAgreement extends Vue {
    layout () {
      return 'empty'
    }
  }
</script>

<style scoped lang="scss">
.agreement{
  margin: 50px;
  .title{
    font-weight: normal;
    font-size: 20px;
    position: relative;
    padding-left: 20px;
    &::before{
      content: '';
      width: 4px;
      height: 30px;
      background: #666;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -15px;
    }
  }

  .content{
    margin: 30px 0;
    p{
      font-size: 14px;
      line-height: 1.8;
      text-align: justify;
    }
  }
}
</style>
