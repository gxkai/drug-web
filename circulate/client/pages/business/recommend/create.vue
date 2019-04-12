<template>
  <div class="recommend">
    <div class="recommend-wrap">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>新增推荐</h3>
        <div class="action">
          <el-button class="select-btn value-btn" v-if="drugValue.drugName" size="small" @click="drugDialog = true" @change="getDrugInfo">{{ drugValue.drugName }}</el-button>
          <el-button class="select-btn" v-else size="small" @click="drugDialog = true">请选择药品</el-button>
          <el-button type="primary" size="small" @click="getDrugInfo">确定</el-button>
        </div>
      </div>

      <!--选择药品弹窗-->
      <el-dialog
        title="请选择药品"
        :close-on-click-modal='isCloseOnClickModal'
        :visible.sync="drugDialog"
        width="50%">
        <Drug v-on:listenToChildEvent="getSelectedInfo"></Drug>
        <span slot="footer" class="dialog-footer">
          <el-button @click="drugDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmSelect">确 定</el-button>
        </span>
      </el-dialog>

      <d2-crud
        :columns="columns"
        :data="drugData"
        :loading="loading"
        :options="options"
        class="drug-table"
      />

      <el-form ref="form" :model="recommendForm" label-width="100px" class="recommend-form">
        <el-form-item label="活动时间：">
          <el-date-picker
            size="small"
            v-model="recommendForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动价格：">
          <el-input v-model="recommendForm.price" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="活动数量：">
          <el-input v-model="recommendForm.number" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="recommendSubmit">提交</el-button>
          <el-button @click="this.$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>


    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import Drug from '@/components/drugCheck/drugRadio/index'
  // import axios from 'axios'
  @Component({
    components: {
      BreadCrumb,
      Drug
    }
  })
  export default class RecommendCreate extends Vue {
    drugName = ''
    drugValue = '' // 药品信息
    selectedInfo = '' // 子组件传过来的数据
    childData = [] // 暂存已选的数据

    isCloseOnClickModal = false
    drugDialog = false

    // table列表
    columns = [
      {
        title: '药品名称',
        key: 'drugName'
      },
      {
        title: '药品规格',
        key: 'specName'
      },
      {
        title: '生产厂商',
        key: 'originName'
      },
      {
        title: '销量',
        key: 'sales'
      },
      {
        title: '销售价',
        key: 'price'
      }
    ]
    drugData = [] // push药品信息
    loading = false
    options = {
      border: true
    }

    recommendForm = {
      time: '',
      price: '',
      number: ''
    }

    getSelectedInfo (data) {
      this.selectedInfo = data
    }

    confirmSelect () {
      if (!this.selectedInfo) {
        this.shopNameDialog = false
        return
      }
      this.childData = this.selectedInfo
      this.drugValue = this.childData
      this.drugDialog = false
    }

    getDrugInfo () {
      console.log(this.drugValue)
      if (this.drugValue) {
        this.drugData.push(this.drugValue)
      }
    }
    recommendSubmit () {
      // this.$router.push('/business/recommend')
    }
  }
</script>

<style lang="scss" scoped>
  .recommend {
    padding: 0 10px;
    margin-bottom: 30px;
    &-wrap {
      min-height: 850px;
      background: #FFF;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #E9E9E9;
      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #E9E9E9;
        .select-btn{
          width: 200px;
          height: 32px;
          line-height: inherit;
          color: #c0c4cc;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .value-btn{
          color: #606266;
        }
      }
      .recommend-form{
        margin-top: 15px;
      }
    }
  }
  /deep/.drug-table {
    padding: 0 10px;
    .el-table {
      th {
        background-color: #F4F4F4 !important;
        color: #555 !important;
      }
    }
  }

</style>
