<template>
  <div class="feedback">
    <h2>用户反馈</h2>

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
  export default class Feedback extends Vue {
    columns= [
      {
        title: '序号',
        key: 'num'
      },
      {
        title: '用户名',
        key: 'name'
      },
      {
        title: '提交时间',
        key: 'submitTime'
      },
      {
        title: '内容',
        key: 'content'
      },
      {
        title: '状态',
        key: 'status'
      },
      {
        title: '处理人',
        key: 'processer'
      },
      {
        title: '回复内容',
        key: 'replyContent'
      }
    ];
    data= [
      {
        num: '1',
        name: '1',
        submitTime: '1',
        content: '1',
        status: '1',
        processer: '2',
        replyContent: '2'
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
          text: '查看',
          type: 'primary',
          size: 'small'
        },
        {
          text: '图片',
          type: 'warning',
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
