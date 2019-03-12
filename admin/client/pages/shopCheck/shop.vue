<template>
  <div class="shop-main-content">
      <d2-crud
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @custom-emit-1="handleCustomEvent"
        @custom-emit-2="handleCustomEvent2"
       />
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class Shop extends Vue {
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
        key: 'curState'
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
          type: 'text',
          emit: 'custom-emit-1'
        },
        {
          text: '更多',
          type: 'text',
          emit: 'custom-emit-2'
        }
      ]
    };
    mounted () {
    }
    handleCustomEvent ({index, row}) {
      this.$router.push('/shopCheck/check')
      // this.$message.success(index.toString())
      // console.log(index)
      // console.log(row)
    }
    handleCustomEvent2 () {
      this.$router.push('/shopCheck/check')
    }
  }
</script>


<style lang="scss">
  .shop-main-content{
    padding:10px;
    .el-table{
      th{
        background-color: #F4F4F4;
        color: #555;
      }
    }
    .cell{
      .el-button+.el-button{
        margin-left: 5px;
        &::before{
          content: '|';
          padding-right: 5px;
          color: #eee;
        }
      }
    }
  }
</style>
