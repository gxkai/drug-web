<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="pharm-search">
      <el-input v-model="shopNameValue" size="small" placeholder="请输入药房名称" style="width: 150px;"></el-input>
      <el-select size="small" v-model="shopState" placeholder="当前状态">
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
      :data="shopList"
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
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class DrugShop extends Vue {
    shopNameValue = ''
    shopState = ''
    columns = [
      {
        title: '序号',
        key: 'shopIndex',
        width: 60
      },
      {
        title: '药店名字',
        key: 'name'
      },
      {
        title: '法人',
        key: 'legal'
      },
      {
        title: '电话号码',
        key: 'phone'
      },
      {
        title: '订单数量',
        key: 'orderNumber'
      },
      {
        title: '自取数量',
        key: 'getNumber'
      },
      {
        title: '配送数量',
        key: 'sendNumber'
      },
      {
        title: '最后一次登录时间',
        key: 'lastLogin',
        width: 240
      },
      {
        title: '状态',
        key: 'state'
      }
    ]
    shopList = []
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
      width: 250,
      custom: [
        {
          text: '查看详情',
          type: 'text',
          emit: 'emit-detail'
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
          text: '在业',
          type: 'text',
          emit: 'emit-run',
          show (index, row) {
            if (row.curState === '停业') {
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
        value: '正常',
        label: '正常'
      },
      {
        value: '休息',
        label: '休息'
      },
      {
        value: '违规',
        label: '违规'
      },
      {
        value: '待审核',
        label: '待审核'
      },
      {
        value: '不通过',
        label: '不通过'
      }
    ]

    handleCustomEvent ({index, row}) {
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
      this.$router.push('/system/shop')
    }

    handleStop ({index, row}) {
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '停业') {
          row.curState = '停业'
        }
      }
    }

    handleRun ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '在业') {
          row.curState = '在业'
        }
      }
    }

    clear () {
      this.shopNameValue = ''
      this.shopState = ''
    }

    async getShopInfo (state) {
      let params = {
        pageNum: 1,
        pageSize: 15,
        state
      }
      let {data: shopRes} = await axios.get(`/api/supervise/shops`, {params})
      console.log(shopRes)
      this.shopList = shopRes.list
      this.pagination.total = shopRes.total
    }

    mounted () {
      this.getShopInfo()
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
