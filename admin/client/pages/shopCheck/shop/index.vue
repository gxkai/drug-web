<template>
  <div class="p10">
      <bread-crumb :path="$route.path"/>
      <div class="shop-search">
        <el-select size="small" v-model="shopName" filterable placeholder="药房名称">
          <el-option
            v-for="item in shopOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Shop extends Vue {
    shopName = ''
    legalName = ''
    drugState = ''
    columns= [
      {
        title: '药房名称',
        key: 'shopName',
        width: 240
      },
      {
        title: '法人姓名',
        key: 'legalName'
      },
      {
        title: '身份证号',
        key: 'idNumber'
      },
      {
        title: '经营地址',
        key: 'shopAddress'
      },
      {
        title: '手机号码',
        key: 'phoneNumber'
      },
      {
        title: '当前状态',
        key: 'curState'
      }
    ]
    data= [
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '正常'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '停业'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '待审核'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '不通过'
      }
    ]
    shopOptions = [
      {
        value: '同德堂',
        label: '同德堂'
      },
      {
        value: '百家惠',
        label: '百家惠'
      }
    ]
    legalOptions = [
      {
        value: '黄哲林',
        label: '黄哲林'
      },
      {
        value: '老王',
        label: '老王'
      }
    ]
    stateOptions = [
      {
        value: '正常',
        label: '正常'
      },
      {
        value: '停业',
        label: '停业'
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
    loading = false;
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
            if (row.curState === '待审核') {
              return true
            }
          }
        },
        {
          text: '查看',
          type: 'text',
          emit: 'emit-detail',
          show (index, row) {
            if (row.curState === '正常' || row.curState === '不通过' || row.curState === '待审核' || row.curState === '停业') {
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
          text: '停业',
          type: 'text',
          emit: 'emit-stop',
          show (index, row) {
            if (row.curState === '正常') {
              return true
            }
          }
        }
      ]
    }
    handleCheckEvent () {
      this.$router.push('/shopCheck/shop/edit')
    }
    handleStopEvent ({index, row}) {
      let stop = this.rowHandle.custom
      for (let i = 0; i < stop.length; i++) {
        if (stop[i].text === '开业') {
          row.curState = '停业'
        }
      }
    }
    handleRunEvent ({index, row}) {
      let run = this.rowHandle.custom
      for (let i = 0; i < run.length; i++) {
        if (run[i].text === '停业') {
          row.curState = '正常'
        }
      }
    }
    handleDetailEvent () {
      this.$router.push('/shopCheck/shop/detail')
    }
    clear () {
      this.shopName = ''
      this.legalName = ''
      this.drugState = ''
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
