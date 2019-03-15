<template>
  <div class="word-wrap">
    <div class="word">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h2>搜索词管理</h2>
      </div>

      <div class="list">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @view-emit="view"
          @firstPush-emit="firstPush"
        />
      </div>

      <el-dialog
        title="查看"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal = 'isClickModal'>
        <div class="main">
          <el-form :model="viewData" label-width="100px">
            <el-form-item label="序号">
              <el-input v-model="viewData.num" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="搜索词">
              <el-input v-model="viewData.searchNum" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="搜索次数">
              <el-input v-model="viewData.searchWord" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="viewData.type" readonly placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
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
  export default class Word extends Vue {
    columns= [
      {
        title: '序号',
        key: 'num'
      },
      {
        title: '搜索词',
        key: 'searchWord'
      },
      {
        title: '搜索次数',
        key: 'searchNum'
      },
      {
        title: '类型',
        key: 'type'
      }
    ];
    data= [
      {
        num: '1',
        searchWord: '感冒',
        searchNum: '1',
        type: '后台推荐'
      },
      {
        num: '2',
        searchWord: '念慈菴',
        searchNum: '2',
        type: '用户搜索'
      }
    ];
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: this.data.length
    };
    options= {
      border: true
    };
    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'view-emit'
        },
        {
          text: '首推药品',
          type: 'text',
          emit: 'firstPush-emit'
        }
      ]
    };

    firstPush ({index, row}) {
      this.$router.push('/drugCheck/drug')
    }

    viewData = {};
    dialogVisible = false

    view ({index, row}) {
      this.viewData.num = row.num
      this.viewData.searchNum = row.searchNum
      this.viewData.searchWord = row.searchWord
      this.viewData.type = row.type
      this.dialogVisible = true
    }

    mounted () {
    }
  }
</script>

<style lang="scss">
  .word-wrap{
    padding: 20px;

    .word{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title{
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
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

      .cell{
        button:nth-child(2):before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -4px;
          top: -1px;
        }
      }
    }
  }
</style>
