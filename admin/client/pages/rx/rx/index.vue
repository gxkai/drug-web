<template>
  <div class="rx-wrap">
    <div class="rx">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>处方管理</h3>
      </div>

      <div class="list">
        <d2-crud
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @viewDetail-emit="viewDetail"
        />
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
    columns= [
      {
        title: '处方医院',
        key: 'preHospital'
      },
      {
        title: '病患姓名',
        key: 'patientName'
      },
      {
        title: '症状',
        key: 'symptom'
      },
      {
        title: '处方医生',
        key: 'preDoctor'
      },
      {
        title: '处方科室',
        key: 'preDept'
      },
      {
        title: '更新时间',
        key: 'updateTime'
      },
      {
        title: '当前状态',
        key: 'currentState'
      }
    ];
    data = [
      {
        preHospital: '1',
        patientName: '1',
        symptom: '1',
        preDoctor: '1',
        preDept: '1',
        updateTime: '2019-03-12 13:15:45',
        currentState: '未使用'
      }
    ];
    loading = false;
    pagination = {
      currentPage: 1,
      pageSize: 1,
      total: 0
    };
    options = {
      border: true
    };
    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'viewDetail-emit'
        }
      ]
    };

    mounted () {
    }

    viewDetail () {
      this.$router.push('/rx/rx/detail')
    }
  }
</script>

<style lang="scss">
  .rx-wrap{
    padding: 20px;

    .rx{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title{
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
      }

      .list {
        padding: 0 30px;

        .el-table{
          th{
            background-color: #F4F4F4;
            color: #555;
          }
          &__body {
            td{
              padding: 6px 0;
            }
          }
        }
      }
    }
  }
</style>
