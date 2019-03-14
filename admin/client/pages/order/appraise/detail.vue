<template>
  <div class="detail-wrap">
    <div class="detail">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>评价详情</h3>
        <el-button type="primary" size="small" @click="$router.push('/order/appraise')">返回</el-button>
      </div>

      <div class="detail-con">
        <div class="form-info">
          <el-form ref="formInfo" :model="formInfo" label-width="150px">
            <el-form-item label="药品名称：">
              <el-input v-model="formInfo.drugName" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="药品规格：">
              <el-input v-model="formInfo.drugSpecifications" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="买家名称：">
              <el-input v-model="formInfo.buyerName" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="评价等级：">
              <el-input v-model="formInfo.appraiseLevel" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="评价内容：">
              <el-input v-model="formInfo.appraiseCon" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="药房名称：">
              <el-input v-model="formInfo.pharmacyName" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="评价时间：">
              <el-input v-model="formInfo.appraiseTime" readonly placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
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
  export default class Rx extends Vue {
    formInfo = {
      drugName: '小儿氨酚黄那敏颗粒',
      drugSpecifications: '0.125g(以对乙酰氨基酚计)*10',
      buyerName: '顾旭凯',
      appraiseLevel: '5',
      appraiseCon: '111',
      pharmacyName: '百佳惠',
      appraiseTime: '2019-03-11 16:00:09'
    };
  }
</script>

<style lang="scss">
  .detail-wrap{
    padding: 20px;

    .el-table{
      th{
        background: #F4F4F4;
      }
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

        h3{
          color: #666;
          font-size: 18px;
        }
      }

      &-con {
        padding: 0 30px;

        .form-info{
          padding: 20px 300px 0 0;

          .el-form{
            display: grid;

            .el-form-item {
              &:nth-child(2n-1){
                grid-column: 1 / 3;
              }
              &:nth-child(2n){
                grid-column: 3 / 5;
              }
            }
          }
        }
      }
    }
  }
</style>
