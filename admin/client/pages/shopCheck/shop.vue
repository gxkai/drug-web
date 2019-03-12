<template>
  <div class="main-content">
    <h3 class="h3-title">药房审核</h3>
    <div>
      <d2-crud
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @filterMethod="filterMethod"
        @custom-emit-1="handleCustomEvent"
       />
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class Warning extends Vue {
    columns= [
      {
        title: '药房名称',
        key: 'shopName',
        width: 240
      },
      {
        title: '法人姓名',
        key: 'legalName'
      },
      {
        title: '身份证号',
        key: 'idNumber'
      },
      {
        title: '经营地址',
        key: 'shopAddress'
      },
      {
        title: '手机号码',
        key: 'phoneNumber'
      },
      {
        title: '当前状态',
        key: 'curState',
        filters: [
          { text: '正常', value: '正常' },
          { text: '休息中', value: '休息中' },
          { text: '违规', value: '违规' },
          { text: '待审核', value: '待审核' },
          { text: '不通过', value: '不通过' }
        ],
        filterMethod (value, row) {
          return row.curState === value
        },
        filterPlacement: 'bottom-end'
      }
    ];
    data= [
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '正常'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '休息中'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '正常'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '违规'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '待审核'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '待审核'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '不通过'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '不通过'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '正常'
      },
      {
        shopName: '百家惠',
        legalName: '傅旭凯',
        idNumber: '321281199210081112',
        shopAddress: '玉山镇朝阳西路203号',
        phoneNumber: '17766220751',
        curState: '正常'
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
          text: '审核',
          type: 'warning',
          size: 'small',
          emit: 'custom-emit-1'
        }
      ]
    };
    mounted () {
    }
    handleCustomEvent ({index, row}) {
      this.$message.success(index.toString())
      // console.log(index)
      // console.log(row)
    }
  }
</script>


<style scoped lang="scss">
  .el-table__header-wrapper {
    th{
      background: #f7f7f7;
      color: #555;
    }
  }

  .main-content{
    padding:0 10px;
  }
  .h3-title{
    margin: 0;
    padding: 25px 0 10px 0;
    border-bottom: 1px solid #eee
  }
</style>
