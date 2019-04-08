<template>
  <div class="p10">
      <bread-crumb :path="$route.path"/>
      <div class="shop-search">
        <el-select size="small" v-model="shopNameValue" filterable placeholder="药房名称" style="width:auto;" @change="getShopID">
          <el-option
            v-for="item in shopOptions"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-select size="small" v-model="legalName" filterable placeholder="法人姓名">
          <el-option
            v-for="item in legalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select size="small" v-model="drugState" placeholder="选择状态">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button size="small" @click="clear">清空</el-button>
      </div>
      <d2-crud
        :columns="columns"
        :data="shopData"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @emit-check="handleCheckEvent"
        @emit-detail="handleDetailEvent"
        @emit-run="handleRunEvent"
        @emit-stop="handleStopEvent"
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
  export default class Shop extends Vue {
    shopNameValue = ''
    shopId = ''
    legalName = ''
    drugState = ''
    columns = [
      {
        title: '药房名称',
        key: 'shopName'
      },
      {
        title: '法人姓名',
        key: 'legal'
      },
      {
        title: '身份证号',
        key: 'identityNumber'
      },
      {
        title: '经营地址',
        key: 'address'
      },
      {
        title: '手机号码',
        key: 'phone'
      },
      {
        title: '当前状态',
        key: 'state'
      }
    ]
    shopData = []
    shopOptions = []
    arr = []
    legalOptions = []
    stateOptions = [
      {
        value: 'NORMAL',
        label: '正常'
      },
      {
        value: 'REST',
        label: '停业'
      },
      {
        value: 'TO_CHECK',
        label: '待审核'
      },
      {
        value: 'NO_PASS',
        label: '不通过'
      },
      {
        value: 'VIOLATION',
        label: '违规'
      }
    ]
    loading = false
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
    options = {
      border: true
    }
    rowHandle = {
      custom: [
        {
          text: '审核',
          type: 'text',
          emit: 'emit-check',
          show (index, row) {
            if (row.state === '待审核') {
              return true
            }
          }
        },
        {
          text: '查看',
          type: 'text',
          emit: 'emit-detail',
          show (index, row) {
            if (row.state === '正常' || row.state === '不通过' || row.state === '待审核' || row.state === '停业' || row.state === '违规') {
              return true
            }
          }
        },
        {
          text: '开业',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.state === '停业') {
              return true
            }
          }
        },
        {
          text: '停业',
          type: 'text',
          emit: 'emit-stop',
          show (index, row) {
            if (row.state === '正常') {
              return true
            }
          }
        }
      ]
    }
    beforeMount () {
      this.getShopData()
      this.getShopNames()
    }
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.getShopData()
      this.search()
    }
    async getShopData () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let data = await axios.get(`/api/supervise/shops`, {params: params})
      this.shopData = data.data.list
      this.pagination.total = data.data.total
      this.shopData.forEach((item) => {
        // 获取法人姓名
        this.arr.push({
          value: item.legal,
          label: item.legal
        })
        // 法人姓名去重
        function uniqObjInArray (objarray) {
          let len = objarray.length
          let tempJson = {}
          let res = []
          for (let i = 0; i < len; i++) {
            tempJson[JSON.stringify(objarray[i])] = true
          }
          // console.log(tempJson)
          let keyItems = Object.keys(tempJson)
          for (let j = 0; j < keyItems.length; j++) {
            res.push(JSON.parse(keyItems[j]))
          }
          return res
        }
        this.legalOptions = uniqObjInArray(this.arr)
        // 状态
        if (item.state === 'NORMAL') {
          item.state = '正常'
        }
        if (item.state === 'REST') {
          item.state = '停业'
        }
        if (item.state === 'TO_CHECK') {
          item.state = '待审核'
        }
        if (item.state === 'NO_PASS') {
          item.state = '不通过'
        }
        if (item.state === 'VIOLATION') {
          item.state = '违规'
        }
      })
    }
    getShopID () {
      this.shopOptions.forEach(item => {
        if (this.shopNameValue === item.name) {
          this.shopId = item.id
        }
      })
    }
    // 获取所有药店名称选项
    async getShopNames () {
      let {data: option} = await axios.post(`/api/supervise/shops/filter`)
      this.shopOptions = option
    }
    handleCheckEvent () {
      this.$router.push('/shopCheck/shop/edit')
    }
    async handleStopEvent ({index, row}) {
      await axios.post(`/api/supervise/shops/${row.id}/?state=REST`)
      this.getShopData()
    }
    async handleRunEvent ({index, row}) {
      await axios.post(`/api/supervise/shops/${row.id}/?state=NORMAL`)
      this.getShopData()
    }
    handleDetailEvent ({index, row}) {
      this.$router.push({
        path: '/shopCheck/shop/detail',
        query: {
          id: row.id
        }
      })
    }
    clear () {
      this.shopNameValue = ''
      this.legalName = ''
      this.drugState = ''
      this.getShopData()
    }
    async search () {
      let params = {
        legal: this.legalName,
        shopId: this.shopId,
        state: this.drugState,
        pageNum: this.pagination.currentPage,
        pageSize: 15
      }
      let data = await axios.get(`/api/supervise/shops`, {params: params})
      console.log(data.data.list)
      this.shopData = data.data.list
      this.pagination.total = data.data.total
      this.shopData.forEach((item) => {
        if (item.state === 'NORMAL') {
          item.state = '正常'
        }
        if (item.state === 'REST') {
          item.state = '停业'
        }
        if (item.state === 'TO_CHECK') {
          item.state = '待审核'
        }
        if (item.state === 'NO_PASS') {
          item.state = '不通过'
        }
        if (item.state === 'VIOLATION') {
          item.state = '违规'
        }
      })
    }
  }
</script>


<style lang="scss" scoped>
.p10{
  padding:5px 10px;
}
.shop-search{
  display: flex;
  justify-content: Flex-start;
  align-items: center;
  .el-input{
    margin-right: 10px;
    width: 160px;
  }
  .el-select{
    margin-right: 10px;
    width: 160px;
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
