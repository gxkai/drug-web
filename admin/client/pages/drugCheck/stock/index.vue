<template>
  <div class="stock--content">
    <bread-crumb :path="$route.path"/>
    <div class="stock--content__search">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="stockAdd">新增</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="resetEs">重置ES</el-button>
      <el-input v-model="commonNameValue" size="small" placeholder="通用名称" style="width: 200px;"></el-input>
      <el-input v-model="originNameValue" size="small" placeholder="厂商名称" style="width: 200px;"></el-input>
      <el-cascader
                   size="small"
                   expand-trigger="click"
                   :options="compostList"
                   :props="selectProps"
                   v-model="selectedTypes"
                   @change="getTypeCondition">
      </el-cascader>
      <el-button type="primary" size="small" @click="searchDrugs">搜索</el-button>
      <el-button size="small" @click="clearConditions">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="drugList"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"
      :options="options"
      :rowHandle="rowHandle"
      @custom-edit="editDrugInfo"
      @row-remove="removeDrug"
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
  export default class Stock extends Vue {
    commonNameValue = ''
    originNameValue = ''
    columns= [
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
        title: '药品类型',
        key: 'drugTypeName'
      }
    ];
    drugList = []
    drugTypesList = [] // 药品类型
    compostList = [] // 组合类
    selectedTypes = [] // 所选药品类型
    selectProps = {
      label: 'type',
      value: 'id',
      children: 'children'
    }

    loading = false;
    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options = {
      border: true
    }
    rowHandle = {
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

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getDrugs()
    }

    // 编辑
    editDrugInfo ({index, row}) {
      this.$router.push({
        path: '/drugCheck/stock/edit',
        query: {
          id: row.id
        }
      })
    }

    // 获取药品类型
    async getDrugTypes () {
      let {data: parentTypes} = await axios.get(`/api/supervise/drugTypes/father`)
      this.drugTypesList = parentTypes
      this.compostList = this.drugTypesList

      // 获取每个大类下的子类
      for (let i = 0, len = this.drugTypesList.length; i < len; i++) {
        let {data: childTypes} = await axios.get(`/api/supervise/drugType/${this.drugTypesList[i].id}/children`)
        this.compostList[i].children = childTypes
      }
    }

    // 获取药品类别条件
    getTypeCondition (data) {
      console.log(data)
      this.selectedTypes = data
    }

    // 删除
    async removeDrug ({ index, row }, done) {
      await axios.delete(`/api/supervise/drugs/${row.id}`)
      this.pagination.total -= 1
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

    async resetEs () {
      await axios.post(`/api/supervise/drugs/reset`)
      this.$message({
        message: '重置成功',
        type: 'success'
      })
    }

    clearConditions () {
      this.commonNameValue = ''
      this.originNameValue = ''
      this.selectedTypes = []
    }

    searchDrugs () {
      this.getDrugs()
    }

    async getDrugs () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        name: this.commonNameValue.trim(),
        originName: this.originNameValue.trim(),
        drugTypeParent: this.selectedTypes[0],
        drugType: this.selectedTypes[1]
      }
      let {data: drugRes} = await axios.get(`/api/supervise/drugs`, {params})
      this.drugList = drugRes.list
      this.pagination.total = drugRes.total
    }

    beforeMount () {
      this.getDrugs()
      this.getDrugTypes()
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
