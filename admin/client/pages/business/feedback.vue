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
        @custom-emit-1="handleCustomEvent"/>
    </div>

    <!-- 回复模态框 -->
    <el-dialog
      title="回复"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="feedCon">
        <textarea rows="10" cols="10" placeholder="请输入回复内容"></textarea>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .feedCon{
    textarea{
      width: 90%;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class Feedback extends Vue {
    columns= [
      {
        title: '序号',
        key: 'num',
        width: '120'
      },
      {
        title: '用户名',
        key: 'name',
        width: '120'
      },
      {
        title: '提交时间',
        key: 'submitTime',
        width: '200'
      },
      {
        title: '内容',
        key: 'content',
        width: '320'
      },
      {
        title: '状态',
        key: 'status',
        width: '120'
      },
      {
        title: '处理人',
        key: 'processer',
        width: '120'
      },
      {
        title: '回复内容',
        key: 'replyContent',
        width: '320'
      }
    ];

    data = [
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

    loading = false;

    pagination = {
      currentPage: 1,
      pageSize: 5,
      total: 0
    };

    options = {
      border: true
    };

    rowHandle = {
      custom: [
        {
          text: '查看',
          type: 'primary',
          size: 'small'
        },
        {
          text: '回复',
          type: 'primary',
          size: 'small',
          emit: 'custom-emit-1'
        },
        {
          text: '图片',
          type: 'primary',
          size: 'small'
        }
      ]
    }

    // 模态框参数
    dialogVisible = false; // 模态框开启状态

    handleCustomEvent ({index, row}) {
      this.dialogVisible = true
    }
  }
</script>
