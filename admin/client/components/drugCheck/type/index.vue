<template>
  <div class="type--content">
    <div>
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="data"
        :options="options"
        selection-row
        @selection-change="handleSelectionChange"
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
  export default class TypeDrugs extends Vue {
    columns = [
      {
        title: '序号',
        key: 'index',
        width: 50,
        align: 'center'
      },
      {
        title: '类型名称',
        key: 'type'
      }
    ]
    data = []
    loading = false;
    options = {
      border: true
    }

    handleSelectionChange (selection) {
      // console.log(selection)
      this.$emit('listenToChildEvent', selection)
    }

    beforeMount () {
      this.initData()
    }

    async initData () {
      await axios.get(`/api/supervise/drugTypes/father`).then(res => {
        this.data = res.data
        this.data.forEach((item, index) => {
          item.index = index + 1
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  .type--content{
    padding: 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;
    }
  }
  /deep/.drug-table{
    .el-table{
      th{
        background-color: #F4F4F4 !important;
        color: #555 !important;

        .cell{
         &:first-child{
           text-align: center;
         }
        }
      }
      td{
        .cell{
          &:first-child {
            text-align: center;
          }
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
