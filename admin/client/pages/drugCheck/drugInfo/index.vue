<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="druginfo-search">
      <el-input v-model="drugNameValue" size="small" placeholder="请输入药品名称" style="width: 150px;"></el-input>
      <el-input v-model="firmNameValue" size="small" placeholder="请输入厂商简称" style="width: 150px;"></el-input>
      <el-select size="small" v-model="drugState" placeholder="药品状态">
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
      @emit-detail="handleDetailEvent"
      @emit-check="handleCheckEvent"
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
  export default class DrugInfo extends Vue {
    drugNameValue = ''
    firmNameValue = ''
    drugState = ''
    columns= [
      {
        title: '药品名称',
        key: 'drugName'
      },
      {
        title: '通用名称',
        key: 'commonName'
      },
      {
        title: '规格',
        key: 'drugSpec'
      },
      {
        title: '厂商简称',
        key: 'firmName'
      },
      {
        title: '批准文号',
        key: 'drugApproval'
      },
      {
        title: '当前状态',
        key: 'curState'
      }
    ]
    data= [
      {
        drugName: '九味羌活颗粒',
        commonName: '九味羌活颗粒',
        drugSpec: '15g*9',
        firmName: '甘肃亚兰药业有限公司',
        drugApproval: 'Z62020151',
        curState: '审核通过'
      },
      {
        drugName: '咳感康口服液(奇力)',
        commonName: '咳感康口服液(奇力)',
        drugSpec: '150ml*1',
        firmName: '四川奇力制药有限公司',
        drugApproval: 'Z62020151',
        curState: '待审核'
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
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'emit-detail'
        },
        {
          text: '审核',
          type: 'text',
          emit: 'emit-check',
          show (index, row) {
            if (row.curState === '待审核') {
              return true
            }
          }
        }
      ]
    }
    stateOptions = [
      {
        value: '审核通过',
        label: '审核通过'
      },
      {
        value: '待审核',
        label: '待审核'
      }
    ]
    mounted () {
    }
    handleDetailEvent ({index, row}) {
      this.$router.push('/drugCheck/drugInfo/detail')
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
    }
    handleCheckEvent () {
      this.$router.push('/drugCheck/drugInfo/check')
    }
    clear () {
      this.drugNameValue = ''
      this.firmNameValue = ''
      this.drugState = ''
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .druginfo-search{
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
