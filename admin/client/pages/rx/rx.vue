<template>
  <div class="rx">
    <h2>处方管理</h2>
    <div class="list">
      <d2-crud
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @custom-emit-1="handleCustomEvent"
       />
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
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
          type: 'primary',
          size: 'small'
        }
      ]
    };
    mounted () {
    }
    handleCustomEvent ({index, row}) {
      this.$message.success(index.toString())
      console.log(index)
      console.log(row)
    }
  }
</script>
