<template>
  <div class="common--content">
    <div class="common--content__search">
      <el-input v-model="shopNameValue" size="small" placeholder="请输入药房名称" style="width: 200px;"></el-input>
      <el-button type="primary" size="small" @click="search">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <div>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="shopNameData"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @current-change="handleCurrentChange"
        @emit-select="handleCurrentChange"
        @pagination-current-change="paginationCurrentChange"
        class="drug-table"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import axios from 'axios'
  @Component
  export default class ShopName extends Vue {
    shopNameValue = ''
    columns = [
      {
        title: '序号',
        key: 'index',
        width: 50,
        align: 'center'
      },
      {
        title: '药房名称',
        key: 'shopName'
      }
    ]
    shopNameData = []
    loading = false
    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options = {
      border: true,
      highlightCurrentRow: true
    }
    rowHandle = {
      width: 50,
      align: 'center',
      columnHeader: '选择',
      custom: [
        {
          icon: 'el-icon-check',
          emit: 'emit-select'
        }
      ]
    }

    handleCurrentChange (currentRow) {
      this.$emit('listenToChildEvent', currentRow)
    }

    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    }

    async fetchData () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: 15,
        shopName: this.shopNameValue.trim()
      }
      let data = await axios.get(`/api/supervise/shops`, {params})
      this.shopNameData = data.data.list
      this.pagination.total = data.data.total
      this.shopNameData.forEach((item, index) => {
        item.index = (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1
      })

      console.log(111)
    }

    clear () {
      this.shopNameValue = ''
      this.fetchData()
    }

    search () {
      // if (this.shopNameValue.trim() === '') {
      //   this.$message({
      //     message: '请输入药房名称',
      //     type: 'warning'
      //   })
      //   return false
      // }
      this.fetchData()
    }

    beforeMount () {
      this.fetchData()
    }
  }
</script>

<style lang="scss" scoped>
  .common--content{
    max-height: 500px;
    overflow-y: scroll;
    padding: 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
      .el-input{
        margin: 0 10px;
      }
    }
  }
  /deep/.drug-table{
    .el-table{
      .el-button{
        width: 15px;
        height: 15px;
        line-height: initial;
        padding: 0;
        color: #FFF;
        font-size: 12px;
        border-radius: 2px;

        &:hover, &:focus{
          border-color: #409EFF;
          background-color: #FFF;
        }
      }

      .current-row .el-button{
        background: #409EFF;
        border-color: #409EFF;
      }

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
