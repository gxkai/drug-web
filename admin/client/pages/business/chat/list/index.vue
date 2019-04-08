<template>
  <div class="list-wrap">
    <div class="list">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>聊天列表</h3>
        <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
      </div>
      <div class="main">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @view-emit="viewDetail"
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
  export default class List extends Vue {
    columns= [
      {
        title: '序号',
        key: 'serialNumber'
      },
      {
        title: '用户名',
        key: 'username'
      },
      {
        title: '最后一次发送时间',
        key: 'lastSendTime'
      },
      {
        title: '发送内容',
        key: 'sendCon'
      },
      {
        title: '最后一次回复时间',
        key: 'lastReplyTime'
      },
      {
        title: '回复内容',
        key: 'replyCon'
      }
    ];

    data = [
      {
        serialNumber: '1',
        username: '王明',
        lastSendTime: '2019-03-13 21:10:45',
        sendCon: '你好',
        lastReplyTime: '2019-03-14 21:10:45',
        replyCon: '在'
      },
      {
        serialNumber: '1',
        username: '张三',
        lastSendTime: '2019-03-13 21:10:45',
        sendCon: '你好',
        lastReplyTime: '2019-03-14 21:10:45',
        replyCon: '在'
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
          text: '查看聊天',
          type: 'text',
          size: 'small',
          emit: 'view-emit'
        }
      ]
    };

    mounted () {

    }

    // 查看聊天
    viewDetail ({index, row}) {
      this.$router.push('/business/chat/list/detail')
    }
  }
</script>

<style lang="scss">
  .list-wrap{
    padding: 10px;

    .breadcrumb-wrap{
      padding-left: 15px;
    }

    .list{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
      }

      .main {
        padding: 0 15px;

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
