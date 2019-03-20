<template>
  <div class="detail-wrap">
    <div class="detail">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>处方单详情</h3>
        <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
      </div>

      <div class="detail-con">
        <div class="form-info">
          <el-form ref="formInfo" :model="formInfo" label-width="150px">
            <el-form-item label="No：">
              <el-input v-model="formInfo.idNumber" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="处方日期：">
              <el-date-picker
                v-model="formInfo.rxDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="formInfo.name" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-input v-model="formInfo.sex" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="年龄：">
              <el-input v-model="formInfo.age" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="单位地址：">
              <el-input v-model="formInfo.address" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input v-model="formInfo.telNumber" readonly placeholder="请输入"></el-input>
            </el-form-item><br>
            <el-form-item label="医院：">
              <el-input v-model="formInfo.hospital" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="科室：">
              <el-input v-model="formInfo.department" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="诊断：">
              <el-input v-model="formInfo.diagnosis" readonly placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="rp-wrap">
          <h2>Rp</h2>
          <d2-crud
            :columns="columns"
            :data="rpData"
            :options="options"/>
        </div>

        <div class="track-info">
          <h2>处方单跟踪信息</h2>
          <el-form ref="trackForm" :model="trackInfo" label-width="120px">
            <el-form-item label="订单编号：">
              <el-input v-model="trackInfo.orderNumber" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="支付方式：">
              <el-input v-model="trackInfo.payMethod" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="药店：">
              <el-input v-model="trackInfo.pharmacyName" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="订单状态：">
              <el-input v-model="trackInfo.orderStatus" readonly placeholder="请输入"></el-input>
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
      idNumber: '',
      rxDate: '',
      name: '',
      sex: '',
      age: '',
      address: '',
      telNumber: '',
      hospital: '',
      department: '',
      diagnosis: ''
    };

    trackInfo = {
      orderNumber: '',
      payMethod: '',
      pharmacyName: '',
      orderStatus: ''
    };

    columns= [
      {
        title: '组号',
        key: 'groupNumber'
      },
      {
        title: '药品名（规格）',
        key: 'drugNameSpec'
      },
      {
        title: '用量',
        key: 'dosage'
      },
      {
        title: '用量单位',
        key: 'dosageUnit'
      },
      {
        title: '频次',
        key: 'frequency'
      },
      {
        title: '天数',
        key: 'daysNumber'
      }
    ];

    rpData = [
      {
        groupNumber: '1',
        drugNameSpec: '感冒灵颗粒（15g*16袋）',
        dosage: '15g/次',
        dosageUnit: 'g',
        frequency: '3',
        daysNumber: '1'
      }
    ];

    options = {
      border: true
    };

    mounted () {
    }
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

        .track-info{
          padding: 20px 300px 30px 70px;

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

        .rp-wrap{
          padding: 0 70px;
        }
      }
    }
  }
</style>
