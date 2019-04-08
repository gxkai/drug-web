<template>
  <div class="detail-wrap">
    <div class="detail">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>聊天详情</h3>
        <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
      </div>
      <div class="main">
        <img src="../../../../assets/img/hospital/img1.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class List extends Vue {

  }
</script>

<style lang="scss">
  .detail-wrap{
    padding: 10px;

    .breadcrumb-wrap{
      padding-left: 15px;
    }

    .detail{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
      }

      .main {
        padding: 15px;

        .el-table{
          th{
            background-color: #F4F4F4;
            color: #555;
          }
        }
      }
    }
  }


</style>
