<template>
  <div class="drugInfo-wrap">
    <div class="drugInfo-list">
      <bread-crumb :path="$route.path"/>
      <div class="drugInfo-search">
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
        <el-button type="primary" size="small" @click="searchDrugInfo">搜索</el-button>
        <el-button size="small" @click="clear">清空</el-button>
      </div>
      <d2-crud
        :columns="columns"
        :data="drugInfoList"
        :loading="loading"
        :pagination="pagination"
        @pagination-current-change="paginationCurrentChange"
        :options="options"
        :rowHandle="rowHandle"
        @emit-detail="handleDetailEvent"
        @emit-check="handleCheckEvent"
        class="drug-table"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class DrugInfo extends Vue {
    drugNameValue = ''
    firmNameValue = ''
    drugState = ''
    columns = [
      {
        title: '药品名称',
        key: 'name'
      },
      {
        title: '通用名称',
        key: 'commonName'
      },
      {
        title: '规格',
        key: 'spec'
      },
      {
        title: '厂商简称',
        key: 'originName'
      },
      {
        title: '批准文号',
        key: 'sfda'
      },
      {
        title: '当前状态',
        key: 'curState'
      }
    ]
    drugInfoList = []
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 15,
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
        value: '待审核',
        label: '待审核'
      },
      {
        value: '审核通过',
        label: '审核通过'
      },
      {
        value: '审核不通过',
        label: '审核不通过'
      }
    ]

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getDrugInfo()
    }

    handleDetailEvent ({index, row}) {
      this.$router.push({
        path: '/drugCheck/drugInfo/detail',
        query: {
          id: row.id
        }
      })
    }

    handleCheckEvent () {
      this.$router.push('/drugCheck/drugInfo/check')
    }

    clear () {
      this.drugNameValue = ''
      this.firmNameValue = ''
      this.drugState = ''
    }

    // 搜索
    searchDrugInfo () {
      this.getDrugInfo(this.firmNameValue.trim(), this.drugNameValue.trim())
    }

    async getDrugInfo (originName, name) {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        originName,
        name
      }
      let {data: drugInfo} = await axios.get(`/api/supervise/drugs`, {params})
      console.log(drugInfo)
      this.drugInfoList = drugInfo.list
      this.pagination.total = drugInfo.total
    }

    mounted () {
      this.getDrugInfo()
    }
  }
</script>

<style scoped lang="scss">
  .drugInfo{
    &-wrap{
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-list{
      min-height: 850px;
      padding: 10px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;
    }

    &-search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 15px;

      .el-input{
        margin: 0 5px;
      }
      .el-select{
        width: 150px;
        margin-left: 5px;
        margin-right: 10px;
      }
    }
  }

  /deep/.drug-table{
    margin-top: 15px;
    .d2-crud-body{
      padding: 0 10px !important;
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
