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
        @custom-emit-1="handleCustomEvent"
        @custom-emit-2="handleCustomEvent2"
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
      this.$router.push('/shopCheck/shop/edit')
    }
    handleCustomEvent2 () {
      this.$router.push('/shopCheck/shop/edit')
    }
  }
</script>


<style lang="scss" scoped>
.p10{
  padding:5px 10px;
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
