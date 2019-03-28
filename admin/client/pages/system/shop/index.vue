<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="pharm-search">
      <el-select v-model="shopNameValue" size="small" placeholder="药店名称" style="width: 250px;" @change="getShopID">
        <el-option
          v-for="item in shopNameOptions"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select size="small" v-model="shopState" placeholder="当前状态" @change="getStatusID">
        <el-option
          v-for="item in stateOptions"
          :key="item.id"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click="searchShopInfo">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="shopList"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"
      :options="options"
      :rowHandle="rowHandle"
      @emit-detail="handleDetail"
      @emit-stop="handleDisable"
      @emit-run="handleEnable"
      @emit-reset="setPassword"
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
  export default class DrugShop extends Vue {
    shopNameOptions = []
    shopNameValue = ''
    shopId = ''
    shopState = ''
    shopStateId = ''
    columns = [
      {
        title: '序号',
        key: 'shopIndex',
        width: 60
      },
      {
        title: '药店名字',
        key: 'shopName',
        width: 250
      },
      {
        title: '法人',
        key: 'legal'
      },
      {
        title: '电话号码',
        key: 'phone',
        width: 150
      },
      {
        title: '订单数量',
        key: 'orderCount'
      },
      {
        title: '自取数量',
        key: 'selfCount'
      },
      {
        title: '配送数量',
        key: 'deliveryCount'
      },
      {
        title: '状态',
        key: 'state',
        width: 100
      }
    ]
    shopList = []
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options = {
      border: true
    }
    rowHandle = {
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
            if (row.state === '正常' || row.state === '休息') {
              return true
            }
          }
        },
        {
          text: '启用',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.state === '违规') {
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

    // 当前状态
    stateOptions = [
      {
        id: 'NORMAL',
        value: '正常',
        label: '正常'
      },
      {
        id: 'REST',
        value: '休息',
        label: '休息'
      },
      {
        id: 'VIOLATION',
        value: '违规',
        label: '违规'
      },
      {
        id: 'TO_CHECK',
        value: '待审核',
        label: '待审核'
      },
      {
        id: 'NO_PASS',
        value: '未通过',
        label: '未通过'
      }
    ]

    getShopID () {
      this.shopNameOptions.forEach(item => {
        if (this.shopNameValue === item.name) {
          this.shopId = item.id
        }
      })
    }

    getStatusID () {
      this.stateOptions.forEach(item => {
        if (this.shopState === item.value) {
          this.shopStateId = item.id
        }
      })
    }

    // 获取所有药店名称选项
    async getShopNames () {
      let {data: option} = await axios.post(`/api/supervise/shops/filter`)
      this.shopNameOptions = option
    }

    handleDetail ({index, row}) {
      this.$router.push({
        path: '/shopCheck/shop/detail',
        query: {
          id: row.id
        }
      })
    }

    // 停用
    async handleDisable ({index, row}) {
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '停用') {
          row.state = '违规'
          row.curState = 'VIOLATION'

          let params = new FormData()
          params.append('state', row.curState)
          await axios.post(`/api/supervise/shops/${row.id}`, params)
          this.$message({
            message: '已停用',
            type: 'success'
          })
        }
      }
    }

    // 启用
    async handleEnable ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '启用') {
          row.state = '正常'
          row.curState = 'NORMAL'

          let params = new FormData()
          params.append('state', row.curState)
          await axios.post(`/api/supervise/shops/${row.id}`, params)
          this.$message({
            message: '已启用',
            type: 'success'
          })
        }
      }
    }

    // 重置密码
    setPassword () {

    }

    clear () {
      this.shopId = ''
      this.shopNameValue = ''
      this.shopState = ''
      this.shopStateId = ''
    }

    convertStatus (status) {
      switch (status) {
        case 'NORMAL':
          return '正常'
        case 'REST':
          return '休息'
        case 'VIOLATION':
          return '违规'
        case 'TO_CHECK':
          return '待审核'
        case 'NO_PASS':
          return '未通过'
      }
    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getShopInfo(this.shopId, this.shopStateId)
    }

    // 搜索
    searchShopInfo () {
      this.getShopInfo(this.shopId, this.shopStateId)
    }

    async getShopInfo (shopId, state) {
      let params = {
        pageNum: 1,
        pageSize: 15,
        shopId,
        state
      }
      let {data: shopRes} = await axios.get(`/api/supervise/shops`, {params})
      console.log(shopRes)
      this.shopList = shopRes.list
      this.pagination.total = shopRes.total

      this.shopList.forEach((item, index) => {
        item.shopIndex = index + 1
        item.state = this.convertStatus(item.state)
      })
    }

    mounted () {
      this.getShopInfo()
      this.getShopNames()
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
