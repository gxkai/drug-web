<template>
  <div class="p10">
      <bread-crumb :path="$route.path"/>
      <div class="hospital-search">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addRow">新增</el-button>
        <el-input v-model="hospitalNameValue" size="small" placeholder="请输入医院名称" style="width: 200px;"></el-input>
        <el-button type="primary" size="small" @click="searchHospital">搜索</el-button>
        <el-button size="small" @click="clear">清空</el-button>
      </div>
      <d2-crud
        :columns="columns"
        :data="hospitalData"
        :loading="loading"
        :pagination="pagination"
        @pagination-current-change="paginationCurrentChange"
        :options="options"
        :rowHandle="rowHandle"
        @emit-detail="handleDetailEvent"
        @emit-stop="handleStopEvent"
        @emit-run="handleRunEvent"
        @emit-edit="handleEditEvent"
        class="drug-table"
      />
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
  export default class Hospital extends Vue {
    hospitalNameValue = ''
    columns= [
      {
        title: '医院编码',
        key: 'code',
        width: 240
      },
      {
        title: '医院趣医编码',
        key: 'qyCode'
      },
      {
        title: '医院名称',
        key: 'introduction'
      },
      {
        title: '经度',
        key: 'lng'
      },
      {
        title: '纬度',
        key: 'lat'
      },
      {
        title: '当前状态',
        key: 'curState'
      }
    ];
    hospitalData = [];
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    };
    options= {
      border: true
    };
    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'emit-detail',
          show (index, row) {
            if (row.curState === '在业' || row.curState === '停业') {
              return true
            }
          }
        },
        {
          text: '停业',
          type: 'text',
          emit: 'emit-stop',
          show (index, row) {
            if (row.curState === '在业') {
              return true
            }
          }
        },
        {
          text: '开业',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.curState === '停业') {
              return true
            }
          }
        },
        {
          text: '编辑',
          type: 'text',
          emit: 'emit-edit',
          show (index, row) {
            if (row.curState === '在业' || row.curState === '停业') {
              return true
            }
          }
        }
      ]
    };

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getHospitals()
    }

    handleDetailEvent ({row}) {
      this.$router.push({
        path: '/shopCheck/hospital/detail',
        query: {
          id: row.id
        }
      })
    }

    // 编辑
    handleEditEvent ({row}) {
      this.$router.push({
        path: '/shopCheck/hospital/edit',
        query: {
          id: row.id
        }
      })
    }

    // 新增
    addRow () {
      this.$router.push('/shopCheck/hospital/create')
    }

    handleStopEvent ({index, row}) {
      console.log(index)
      console.log(row)
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '开业') {
          row.curState = '停业'
          row.deleted = true
          this.saveStatus(row)
        }
      }
    }
    handleRunEvent ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '停业') {
          row.curState = '在业'
          row.deleted = false
          this.saveStatus(row)
        }
      }
    }

    // 存储当前状态
    async saveStatus (row) {
      let params = {
        deleted: row.deleted
      }
      let putRes = await axios.put(`/api/supervise/hospitals/${row.id}`, params)
      console.log(putRes)
    }

    clear () {
      this.hospitalNameValue = ''
    }

    searchHospital () {
      this.getHospitals(this.hospitalNameValue)
    }

    async getHospitals (hName) {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        name: hName.trim()
      }
      let {data: hRes} = await axios.get(`/api/supervise/hospitals`, {params})
      console.log(hRes)

      this.hospitalData = hRes.list
      this.pagination.total = hRes.total

      this.hospitalData.forEach(item => {
        if (!item.deleted) {
          item.curState = '在业'
        } else {
          item.curState = '停业'
        }
      })
    }

    mounted () {
      this.getHospitals()
    }
  }
</script>

<style lang="scss" scoped>
  .p10{
    padding:5px 10px;
  }
  .hospital-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    .el-input{
      margin: 0 10px;
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
