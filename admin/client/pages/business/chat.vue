<template>
  <div class="chat">
    <div class="filter">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="用户名称"
            v-model="nameValue"
            clearable>
          </el-input>

          <el-button size="medium" type="primary">搜索</el-button>
          <el-button size="medium">清空</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="list">
      <d2-crud
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @custom-emit-1="handleCustomEvent"
       />
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class Chat extends Vue {
    nameValue = '';

    columns= [
      {
        title: '编号',
        key: 'number'
      },
      {
        title: '用户名称',
        key: 'username'
      },
      {
        title: '药师名称',
        key: 'pharmacistName'
      }
    ];

    data = [
      {
        number: '1',
        username: '张三',
        pharmacistName: '李四'
      }
    ];

    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
    options= {
      border: true
    };
    rowHandle= {
      custom: [
        {
          text: '查看详情',
          type: 'primary',
          size: 'small'
        }
      ]
    };
    mounted () {
    }
    handleCustomEvent ({index, row}) {
      this.$message.success(index.toString())
      console.log(index)
      console.log(row)
    }
  }
</script>

<style lang="scss" scoped>
  .filter{
    margin: 20px auto;

    .el-input{
      width: 50%;
      margin-right: 30px;
    }
  }
</style>
