<template>
  <div class="recommend">
    <div class="filter">
      <el-row :gutter="20" class="filter-top">
        <el-col :span="8">
          <span>药店名称：</span>
          <el-input
            placeholder="请输入"
            v-model="pharmacyValue"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="8">
          <span>药品名称：</span>
          <el-input
            placeholder="请输入"
            v-model="drugValue"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="8">
          <span>生产厂商：</span>
          <el-select v-model="produceValue" clearable filterable placeholder="请选择">
            <el-option
              v-for="item in produceList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="filter-bottom">
        <el-col :span="8">
          <span>当前状态：</span>
          <el-select v-model="produceValue" clearable filterable placeholder="请选择">
            <el-option
              v-for="item in produceList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间：</span>
          <el-date-picker
            v-model="dateValue"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="2" class="action-col">
          <el-button type="primary" size="medium">搜索</el-button>
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
        @custom-emit-1="handleCustomEvent"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .filter{
    margin-bottom: 20px;
    text-align: center;

    .action-col{
      text-align: right;
    }

    &-top{
       margin: 20px 0;
    }

    .el-input,.el-select,.el-date-editor{
      width: 65%;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class Recommend extends Vue {
    pharmacyValue = '';
    produceValue = '';
    drugValue = '';

    produceList = [
      {
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
      }
    ];

    columns= [
      {
        title: '序号',
        key: 'num'
      },
      {
        title: '药店名称',
        key: 'pharmacyName'
      },
      {
        title: '药品规格',
        key: 'drugSpec'
      },
      {
        title: '生产厂商',
        key: 'produce'
      },
      {
        title: '销量/销售价',
        key: 'sales'
      },
      {
        title: '申请日期',
        key: 'applyDate'
      },
      {
        title: '展示开始时间',
        key: 'showStartTime'
      },
      {
        title: '展示结束时间',
        key: 'showEndTime'
      },
      {
        title: '当前状态',
        key: 'status'
      }
    ];

    data= [
      {
        num: '1',
        pharmacyName: '1',
        drugSpec: '1',
        produce: '1',
        sales: '1',
        applyDate: '1',
        showStartTime: '1',
        showEndTime: '1',
        status: '通过'
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
          size: 'small'
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
