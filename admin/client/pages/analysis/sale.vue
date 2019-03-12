<template>
  <div class="sale-wrap">
    <div class="search">
      <el-select v-model="value8" filterable placeholder="请选择">
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary">搜索</el-button>
      <el-button>清空</el-button>
    </div>

    <div class="sales">
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import PieDemo from '@/components/examples/charts/PieDemo'

  @Component({
    components: {
      PieDemo
    }
  })
  export default class Sale extends Vue {
    list = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }];

    value8 = '';

    chartData = {
      columns: ['日期', '访问用户'],
      rows: [
        { '日期': '1/1', '访问用户': 1393 },
        { '日期': '1/2', '访问用户': 3530 },
        { '日期': '1/3', '访问用户': 2923 },
        { '日期': '1/4', '访问用户': 1723 },
        { '日期': '1/5', '访问用户': 3792 },
        { '日期': '1/6', '访问用户': 4593 }
      ]
    };

    mounted () {
    }
  }
</script>
