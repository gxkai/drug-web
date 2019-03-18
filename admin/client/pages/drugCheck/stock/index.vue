<template>
  <div class="stock--content">
    <bread-crumb :path="$route.path"/>
    <div class="stock--content__search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="stockAdd">新增</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh">重置ES</el-button>
      <el-input v-model="commonNameValue" size="small" placeholder="通用名称" style="width: 200px;"></el-input>
      <el-input v-model="filmNameValue" size="small" placeholder="厂商名称" style="width: 200px;"></el-input>
      <el-cascader :options="drugsOptions" size="small" change-on-select></el-cascader>
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
      @custom-edit="handleCustomEvent"
      @row-remove="handleRowRemove"
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
  export default class Stock extends Vue {
    commonNameValue = ''
    filmNameValue = ''
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
        key: 'filmName'
      },
      {
        title: '药品类型',
        key: 'drugType'
      }
    ];
    data= [
      {
        drugName: '养血安神片(糖衣)',
        commonName: '养血安神片(糖衣)',
        drugSpec: '0.25g*100',
        filmName: '亚宝药业集团股份有限公司',
        drugType: '其他'
      },
      {
        drugName: '川贝枇杷糖浆',
        commonName: '川贝枇杷糖浆',
        drugSpec: '180ml*1',
        filmName: '江西盛翔制药有限公司',
        drugType: '感冒'
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
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      },
      custom: [
        {
          text: '编辑',
          type: 'text',
          emit: 'custom-edit'
        }
      ]
    }
    drugsOptions = [
      {
        value: 'childDrugs',
        label: '儿科用药',
        children: [
          {
            value: 'childBug',
            label: '小儿驱虫'
          },
          {
            value: 'childEat',
            label: '小儿消化不良'
          }
        ]
      },
      {
        value: 'bellyDrugs',
        label: '肠胃用药',
        children: [
          {
            value: 'bellyBug',
            label: '肠胃驱虫'
          },
          {
            value: 'bellyEat',
            label: '消化不良'
          }
        ]
      },
      {
        value: 'bellyDrugsq',
        label: '肠胃用药q',
        children: [
          {
            value: 'bellyBugq',
            label: '肠胃驱虫q'
          },
          {
            value: 'bellyEatq',
            label: '消化不良q'
          }
        ]
      },
      {
        value: 'bellyDrugsw',
        label: '肠胃用药w',
        children: [
          {
            value: 'bellyBugw',
            label: '肠胃驱虫w'
          },
          {
            value: 'bellyEatw',
            label: '消化不良w'
          }
        ]
      }
    ]
    mounted () {
    }
    handleCustomEvent ({index, row}) {
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
      this.$router.push('/drugCheck/stock/edit')
    }
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }
    stockAdd () {
      this.$router.push('/drugCheck/stock/create')
    }
    clear () {
      this.commonNameValue = ''
      this.filmNameValue = ''
      this.drugsOptions = []
    }
  }
</script>

<style scoped lang="scss">
  .stock--content{
    padding: 0 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
      .el-input{
        margin: 0 10px;
      }
      .el-cascader{
        margin-right: 10px;
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
