<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :options="options"
      :rowHandle="rowHandle"
      @emit-detail="handleDetail"
      class="drug-table"
    />
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
        key: 'chatId',
        width: 60
      },
      {
        title: '用户名',
        key: 'userName'
      },
      {
        title: '最后一次发送时间',
        key: 'lastSend'
      },
      {
        title: '发送内容',
        key: 'sendText'
      },
      {
        title: '最后一次回复时间',
        key: 'lastReply'
      },
      {
        title: '回复内容',
        key: 'replyText'
      }
    ]
    data= [
      {
        chatId: '1',
        userName: '哈哈',
        lastSend: '2018-12-30 12:00:00',
        sendText: '1q2w3e4r',
        lastReply: '2018-12-30 12:00:00',
        replyText: '123456'
      },
      {
        chatId: '1',
        userName: '哈哈',
        lastSend: '2018-12-30 12:00:00',
        sendText: '1q2w3e4r',
        lastReply: '2018-12-30 12:00:00',
        replyText: '123456'
      }
    ]
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
    options= {
      border: true
    }
    rowHandle= {
      custom: [
        {
          text: '查看聊天',
          type: 'text',
          emit: 'emit-detail'
        }
      ]
    }
    mounted () {
    }
    handleDetail ({index, row}) {
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
      this.$router.push('/system/pharmacist/chat/detail')
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  /deep/.drug-table{
    .d2-crud-body{
      padding: 0 !important;
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
  }
</style>
