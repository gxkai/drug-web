<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="pharm-search">
      <el-input v-model="accountNameValue" size="small" placeholder="请输入用户名" style="width: 150px;"></el-input>
      <el-select size="small" v-model="accountState" placeholder="当前状态">
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
      :data="accountData"
      :loading="loading"
      :pagination="pagination"
      :options="options"
      :rowHandle="rowHandle"
      @emit-detail="handleCustomEvent"
      @emit-stop="handleStop"
      @emit-run="handleRun"
      class="drug-table"
    />
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  // import axios from 'axios'
  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Account extends Vue {
    accountNameValue = ''
    accountState = ''
    columns= [
      {
        title: '序号',
        key: 'accountId',
        width: 60
      },
      {
        title: '用户名',
        key: 'userName'
      },
      {
        title: '姓名',
        key: 'name'
      },
      {
        title: '账号来源',
        key: 'accountSource'
      },
      {
        title: '手机号码',
        key: 'phone'
      },
      {
        title: '处方单数',
        key: 'prescriptions'
      },
      {
        title: '下单次数',
        key: 'orderNumber'
      },
      {
        title: '咨询次数',
        key: 'consultTimes'
      },
      {
        title: '最后一次登录时间',
        key: 'lastLogin',
        width: 240
      },
      {
        title: '状态',
        key: 'curState'
      }
    ]
    accountData= [
      {
        accountId: '1',
        userName: '哈哈',
        name: '11',
        accountSource: '1',
        phone: '13300000000',
        prescriptions: '22',
        orderNumber: '33',
        consultTimes: '44',
        lastLogin: '2019-03-15 15:39:33',
        curState: '启用'
      },
      {
        accountId: '2',
        userName: '哈哈',
        name: '11',
        accountSource: '1',
        phone: '13300000000',
        prescriptions: '22',
        orderNumber: '33',
        consultTimes: '44',
        lastLogin: '2019-03-15 15:39:33',
        curState: '停用'
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
      width: 250,
      custom: [
        {
          text: '查看详情',
          type: 'text',
          emit: 'emit-detail'
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
    handleCustomEvent ({index, row}) {
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
      this.$router.push('/system/account/detail')
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
    clear () {
      this.accountNameValue = ''
      this.accountState = ''
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
      margin: 0 5px;
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
