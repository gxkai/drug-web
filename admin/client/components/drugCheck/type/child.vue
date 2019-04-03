<template>
  <div class="common--content">
    <el-tabs v-model="tabActiveName" type="card" v-if="parentTypeInfo">
      <el-tab-pane :label="item.type" :name="item.id" v-for="(item, index) in parentTypeInfo" :key="index">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="childTypeList[index] || []"
          :options="options"
          selection-row
          @selection-change="handleSelectionChange"
          class="drug-table"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import axios from 'axios'

  @Component({
    props: {
      parentData: {}
    },
    computed: {
      parentTypeInfo () {
        this.childTypeList = []
        this.tabActiveName = this.parentData[0].id
        this.fetchData(this.parentData)
        return this.parentData
      }
    }
  })
  export default class TypeChild extends Vue {
    columns = [
      {
        title: '序号',
        key: 'index',
        width: 50
      },
      {
        title: '类型名称',
        key: 'type'
      }
    ]
    options = {
      border: true
    }
    childTypeList = []
    selectedChildType = []

    handleSelectionChange (selection) {
      // console.log(selection)
      // this.selectedChildType.push(selection)
      // this.$emit('listenToChildEvent', this.selectedChildType)
    }

    async fetchData (parentTypeInfo) {
      for (let i = 0, len = parentTypeInfo.length; i < len; i++) {
        let {data: childData} = await axios.get(`/api/supervise/drugType/${parentTypeInfo[i].id}/children`)
        // console.log(`对应子类如下：`)
        // console.log(childData)
        childData.forEach((item, index) => {
          item.index = index + 1
        })
        this.childTypeList.push(childData)
      }
    }
    beforeMount () {
    }
  }
</script>

<style lang="scss" scoped>
  .common--content{
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
