<template>
  <div class="system-wrap">
    <div class="system">
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
          @row-remove="handleRowRemove"
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

  export default class System extends Vue {
    nameValue = '';

    columns= [
      {
        title: '消息类型',
        key: 'msgType'
      },
      {
        title: '标题',
        key: 'title'
      },
      {
        title: '创建时间',
        key: 'createTime'
      }
    ];

    data = [
      {
        msgType: '商家系统消息',
        title: '订单号：2019030411255...',
        createTime: '2019-03-11 16:00:09'
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
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      }
    };

    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }

    mounted () {
    }
  }
</script>

<style lang="scss">
  .system-wrap{
    padding: 20px;

    .system{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .filter{
        padding: 15px 20px;
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
