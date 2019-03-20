<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="pharm-search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
      <el-input v-model="pharmNameValue" size="small" placeholder="请输入药师名称" style="width: 200px;"></el-input>
      <el-select size="small" v-model="pharmState" placeholder="当前状态">
        <el-option
          v-for="item in stateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :options="options"
      :rowHandle="rowHandle"
      @emit-detail="handleDetail"
      @emit-run="handleRun"
      @emit-stop="handleStop"
      class="drug-table"
    />
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
  export default class Pharmacist extends Vue {
    pharmNameValue = ''
    pharmState = ''
    columns= [
      {
        title: '序号',
        key: 'pharmacistId',
        width: 60
      },
      {
        title: '用户名',
        key: 'userName'
      },
      {
        title: '药师名',
        key: 'pharmacistName'
      },
      {
        title: '角色',
        key: 'role'
      },
      {
        title: '状态',
        key: 'curState'
      },
      {
        title: '最后一次登录时间',
        key: 'lastLogin'
      },
      {
        title: '咨询次数',
        key: 'consultTimes'
      },
      {
        title: '评分',
        key: 'score'
      }
    ]
    data= [
      {
        pharmacistId: '1',
        userName: '哈哈',
        pharmacistName: '呵呵',
        role: '管理员',
        curState: '启用',
        lastLogin: '2018-12-30 12:00:00',
        consultTimes: '20',
        score: '3'
      },
      {
        pharmacistId: '2',
        userName: '哈哈',
        pharmacistName: '呵呵',
        role: '管理员',
        curState: '停用',
        lastLogin: '2018-12-30 12:00:00',
        consultTimes: '20',
        score: '3'
      }
    ]
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
    options= {
      border: true
    }
    rowHandle= {
      width: 300,
      custom: [
        {
          text: '查看聊天',
          type: 'text',
          emit: 'emit-detail'
        },
        {
          text: '启用',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.curState === '停用') {
              return true
            }
          }
        },
        {
          text: '停用',
          type: 'text',
          emit: 'emit-stop',
          show (index, row) {
            if (row.curState === '启用') {
              return true
            }
          }
        },
        {
          text: '重置密码',
          type: 'text',
          emit: 'emit-reset'
        }
      ]
    }
    stateOptions = [
      {
        value: '启用',
        label: '启用'
      },
      {
        value: '停用',
        label: '停用'
      }
    ]
    mounted () {
    }
    handleDetail ({index, row}) {
      this.$router.push('/system/pharmacist/chat')
    }
    clear () {
      this.pharmNameValue = ''
      this.pharmState = ''
    }
    handleStop ({index, row}) {
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '停用') {
          row.curState = '停用'
        }
      }
    }
    handleRun ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '启用') {
          row.curState = '启用'
        }
      }
    }
    addRow () {
      this.$router.push('/system/pharmacist/create')
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .pharm-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    .el-input{
      margin: 0 10px;
    }
    .el-select{
      width: 150px;
      margin-left: 5px;
      margin-right: 10px;
    }
  }
  /deep/.drug-table{
    margin-top: 10px;
    .d2-crud-body{
      padding: 0 !important;
      .el-table{
        th{
          background-color: #F4F4F4 !important;
          color: #555 !important;
        }
        td{
          .cell{
            /deep/.el-button+.el-button{
              margin-left: 5px;
              &::before{
                content: '|';
                padding-right: 5px;
                color: #eee;
              }
            }
          }
        }
      }
    }
  }
</style>
