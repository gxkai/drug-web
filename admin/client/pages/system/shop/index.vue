<template>
  <div class="shop-wrap">
    <div class="shop-list">
      <bread-crumb :path="$route.path"/>
      <div class="pharm-search">
        <el-select v-model="shopId" size="small" placeholder="药店名称" style="width: 250px;">
          <el-option
            v-for="(item, index) in shopNameOptions"
            :key="index"
            :label="item.shopName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select size="small" v-model="shopStateId" placeholder="当前状态">
          <el-option
            v-for="(item, index) in stateOptions"
            :key="index"
            :label="item.label"
            :value="item.id">
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

    // 获取所有药店名称选项
    async getShopNames () {
      let {data: option} = await axios.get(`/api/supervise/shops`)
      this.shopNameOptions = option.list
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
      this.getShopInfo()
    }

    // 搜索
    searchShopInfo () {
      this.getShopInfo()
    }

    async getShopInfo () {
      let params = {
        pageNum: 1,
        pageSize: 15,
        shopId: this.shopId,
        state: this.shopStateId
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
  .shop{
    &-wrap {
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
  }
  .pharm-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e9e9e9;
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
