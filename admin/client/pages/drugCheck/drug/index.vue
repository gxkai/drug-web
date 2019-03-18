<template>
  <div class="drug--content">
    <bread-crumb :path="$route.path"/>
    <div class="drug--content__search">
      <el-select size="small" v-model="shopName" filterable placeholder="药房名称">
        <el-option
          v-for="item in shopOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="drugNameValue" size="small" placeholder="药品名称" style="width: 160px;"></el-input>
      <el-input v-model="filmNameValue" size="small" placeholder="厂商简称" style="width: 160px;"></el-input>
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
    <div>
      <d2-crud
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @emit-detail="handleDetailEvent"
        class="drug-table"
       />
    </div>
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
  export default class Drug extends Vue {
    shopName = ''
    drugNameValue = ''
    filmNameValue = ''
    drugState = ''
    columns= [
      {
        title: '药店名称',
        key: 'shopName'
      },
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
        title: '价格',
        key: 'drugPrice'
      },
      {
        title: '库存',
        key: 'drugStock'
      },
      {
        title: '药品状态',
        key: 'drugState'
      }
    ]
    data= [
      {
        shopName: '同德堂',
        drugName: '复方氨酚葡锌片',
        commonName: '复方氨酚葡锌片',
        drugSpec: 'co*24',
        firmName: '江苏圣朗药业有限公司',
        drugPrice: '28',
        drugStock: '10',
        drugState: '上架'
      },
      {
        shopName: '百家惠',
        drugName: '川贝枇杷糖浆',
        commonName: '川贝枇杷糖浆',
        drugSpec: '180ml*1',
        firmName: '江西盛翔制药有限公司',
        drugPrice: '15.3',
        drugStock: '10',
        drugState: '上架'
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
          text: '查看详情',
          type: 'text',
          size: 'small',
          emit: 'emit-detail'
        }
      ]
    }
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
    stateOptions = [
      {
        value: '上架',
        label: '上架'
      },
      {
        value: '下架',
        label: '下架'
      }
    ]
    mounted () {
    }
    handleDetailEvent ({index, row}) {
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
      this.$router.push('/drugCheck/drug/detail')
    }
    clear () {
      this.shopName = ''
      this.drugNameValue = ''
      this.filmNameValue = ''
      this.drugState = ''
    }
  }
</script>

<style scoped lang="scss">
  .drug--content{
    padding: 0 10px;
    &__search{
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
  }
  /deep/.drug-table{
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
</style>
