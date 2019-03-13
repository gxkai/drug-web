<template>
  <div class="advert">
    <h2>广告位管理</h2>

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
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class Advert extends Vue {
    columns= [
      {
        title: '序号',
        key: 'num'
      },
      {
        title: '模块',
        key: 'module'
      },
      {
        title: '排序',
        key: 'sort'
      },
      {
        title: '链接地址',
        key: 'url'
      },
      {
        title: '图片',
        key: 'image'
      }
    ];
    data= [
      {
        num: '1',
        module: '1',
        sort: '1',
        url: '1',
        image: '1'
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
          type: 'success',
          size: 'small',
          class: 'view'
        },
        {
          text: '更多',
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
