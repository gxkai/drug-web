<template>
  <div class="chat-wrap">
    <div class="chat">
      <bread-crumb :path="$route.path"/>
      <div class="filter">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-input
              placeholder="用户名称"
              v-model="nameValue"
              clearable>
            </el-input>

            <el-button size="small" type="primary">搜索</el-button>
            <el-button size="small">清空</el-button>
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
          @viewDetail-emit="viewDetail"
        />
      </div>
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
          type: 'text',
          emit: 'viewDetail-emit'
        }
      ]
    };
    mounted () {
    }
    viewDetail ({index, row}) {
      this.$message.success(index.toString())
    }
  }
</script>

<style lang="scss">
  .chat-wrap{
    padding: 20px;

    .chat{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .filter{
        padding: 0 20px 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;

        .el-input{
          width: 50%;
          margin-right: 20px;
        }
      }

      .list {
        padding: 0 30px;

        .el-table{
          th{
            background-color: #F4F4F4;
            color: #555;
          }
        }
      }
    }
  }


</style>
