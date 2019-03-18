<template>
  <div class="chat-wrap">
    <div class="chat">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>药师管理</h3>
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
          @view-emit="viewChat"
          @enable-emit="enable"
          @disable-emit="disable"
          @reset-emit="resetPassword"
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
        title: '药师名',
        key: 'pharmacistName'
      },
      {
        title: '角色',
        key: 'role'
      },
      {
        title: '状态',
        key: 'status'
      },
      {
        title: '最后一次登陆时间',
        key: 'lastLoginTime'
      },
      {
        title: '咨询次数',
        key: 'consultingNumber'
      },
      {
        title: '评分',
        key: 'score'
      }
    ];

    data = [
      {
        serialNumber: '1',
        username: '王明',
        pharmacistName: '王凯',
        role: '药师',
        status: '启用',
        lastLoginTime: '2019-03-14 21:10:45',
        consultingNumber: '10',
        score: '5.0'
      },
      {
        serialNumber: '2',
        username: '张三',
        pharmacistName: '李四',
        role: '药师',
        status: '停用',
        lastLoginTime: '2019-03-14 21:50:45',
        consultingNumber: '5',
        score: '5.0'
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
        },
        {
          text: '启用',
          type: 'text',
          size: 'small',
          emit: 'view-emit'
        },
        {
          text: '停用',
          type: 'text',
          size: 'small',
          emit: 'reset-emit'
        },
        {
          text: '重置密码',
          type: 'text',
          size: 'small',
          emit: 'reset-emit'
        }
      ]
    };

    mounted () {

    }

    created () {

    }

    // 查看聊天
    viewChat ({index, row}) {
      this.$router.push('/business/chat/list')
    }

    enable () {

    }

    disable () {

    }

    resetPassword ({index, row}) {

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
        button:not(:first-child):before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -5px;
          top: -1px;
        }
      }
    }
  }


</style>
