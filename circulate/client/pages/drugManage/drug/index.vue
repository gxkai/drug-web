<template>
  <div class="drug-wrap">
    <div class="drug-list">
      <bread-crumb :path="$route.path"/>
      <div class="drug-search">
        <div class="left">
          <el-input v-model="drugName" size="small" placeholder="请输入药品名称" style="width: 200px;"></el-input>
          <el-button class="select-btn value-btn" size="small" v-if="originNameValue" @click="originDialogVisible = true">{{ originNameValue }}</el-button>
          <el-button class="select-btn" size="small" v-else @click="originDialogVisible = true">厂商名称</el-button>
          <el-select size="small" v-model="drugState" placeholder="药品状态">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" @click="search">搜索</el-button>
          <el-button size="small" @click="clear">清空</el-button>
        </div>
      </div>
      <!--<div class="title">-->
        <!--<h3>药品列表</h3>-->
      <!--</div>-->
      <d2-crud
        ref="d2Crud"
        :columns="columns"
        :data="drugList"
        :loading="loading"
        :pagination="pagination"
        :options="options"
        :rowHandle="rowHandle"
        @dialog-cancel="handleDialogCancel"
        @pagination-current-change="paginationCurrentChange"
        @emit-view="viewDetail"
        @emit-obtained="obtainedDrug"
        @emit-storage="storageDrug"
        @emit-adjust="adjustPrice"
        class="drug-table"
      />
    </div>

    <!--查看-->
    <el-dialog
      title="查看"
      :visible.sync="viewDialogVisible"
      width="30%">
      <div class="main">
        <el-form :model="viewData" label-width="100px">
          <el-form-item label="药品名称">
            <el-input v-model="viewData.drugName" readonly placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="通用名称">
            <el-input v-model="viewData.commonName" readonly placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="规格">
            <el-input v-model="viewData.specName" readonly placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="厂商简介">
            <el-input v-model="viewData.originName" readonly placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="当前库存">
            <el-input v-model="viewData.stock" readonly placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-input v-model="viewData.drugState" readonly placeholder="暂无"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!--入库-->
    <el-dialog
      title="入库"
      :visible.sync="storageDialogVisible"
      width="30%">
      <div class="main">
        <el-form label-width="50px">
          <el-form-item label="库存">
            <el-input-number size="small" v-model="storageNum" placeholder="请输入库存数量"
                             controls-position="right" :min="0" :max="100000"
                             style="width: 300px;"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="storageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>

    <!--选择厂商-->
    <el-dialog
      title="厂商"
      :close-on-click-modal='isCloseOnClickModal'
      :visible.sync="originDialogVisible"
      width="50%">
      <drug-origin v-on:listenToChildEvent="getSelectedInfo"></drug-origin>
      <span slot="footer" class="dialog-footer">
        <el-button @click="originDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectOrigin">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import Origin from '@/components/drugCheck/Origin'
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb,
      'drug-origin': Origin
    }
  })
  export default class SalesRank extends Vue {
    // 药品列表查询
    drugName = ''
    originNameValue = ''
    isCloseOnClickModal = false
    originDialogVisible = false
    drugState = ''
    // 药品状态
    stateOptions = [
      {
        value: true,
        label: '上架'
      },
      {
        value: false,
        label: '下架'
      }
    ]
    //
    rowData = {}
    drugList = [] // 排行榜列表
    viewData = []
    viewDialogVisible = false
    storageNum = '' // 库存量
    storageDialogVisible = false

    columns = [
      {
        title: '药品名称',
        key: 'drugName'
      },
      {
        title: '通用名称',
        key: 'commonName'
      },
      {
        title: '规格',
        key: 'specName'
      },
      {
        title: '厂商简称',
        key: 'originName'
      },
      {
        title: '当前库存',
        key: 'stock'
      },
      {
        title: '当前状态',
        key: 'drugState'
      }
    ]
    loading = false;
    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options = {
      border: true
    }
    rowHandle = {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'emit-view'
        },
        {
          text: '下架',
          type: 'text',
          emit: 'emit-obtained',
          show (index, row) {
            if (row.drugState === '上架') {
              return true
            }
          }
        },
        {
          text: '入库',
          type: 'text',
          emit: 'emit-storage',
          show (index, row) {
            if (row.drugState === '下架') {
              return true
            }
          }
        },
        {
          text: '调价',
          type: 'text',
          emit: 'emit-adjust'
        }
      ]
    }

    // 获取已选信息
    getSelectedInfo (data) {
      this.selectedInfo = data
    }
    // 选择厂商
    confirmSelectOrigin () {
      if (!this.selectedInfo) {
        this.originDialogVisible = false
        return
      }
      this.childData = this.selectedInfo
      this.originNameValue = this.childData.fullName
      this.originDialogVisible = false
    }

    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.fetchData()
    }

    adjustPrice ({row}) {
      console.log(row)
      this.$router.push({
        path: '/drugManage/drugAdjustment',
        query: {
          id: row.shopDrugId
        }
      })
    }

    // 查看
    viewDetail ({row}) {
      // this.viewDialogVisible = true
      // this.viewData = row
      console.log(row)

      this.$router.push({
        path: '/drugManage/drug/detail',
        query: {
          id: row.drugId
        }
      })
    }

    // 下架
    obtainedDrug ({index, row}) {
      this.saveDrugState(row)
      let obtained = this.rowHandle.custom
      obtained.forEach(item => {
        if (item.text === '下架') {
          row.drugState = '下架'
          row.grounding = false
        }
      })
      this.$message({
        message: '下架成功',
        type: 'success'
      })
    }

    // 入库
    async postToStock () {
      this.saveDrugState(this.rowData)
      let storage = this.rowHandle.custom
      storage.forEach(item => {
        if (item.text === '入库') {
          this.rowData.drugState = '上架'
          this.rowData.grounding = true
        }
      })
      this.$message({
        message: '入库成功',
        type: 'success'
      })
    }

    storageDrug ({row}) {
      this.rowData = row
      if (row.stock <= row.stockWarn) {
        this.$confirm('当前药品库存不足，请添加库存', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.storageDialogVisible = true
        }).catch(() => {})
        return
      }

      this.postToStock(row.stock)
    }

    // 提交
    submit () {
      this.postToStock(this.rowData.stock + this.storageNum)
      this.storageDialogVisible = false
    }

    // 批量上下
    async saveDrugState (drug) {
      // 上下架验证
      let verifyParams = new FormData()
      verifyParams.append('ids', drug.shopDrugId)
      await axios.post(`/api/shop/shopDrugs/grounding/verify`, verifyParams)

      // 上下架
      let actionParams = new FormData()
      actionParams.append('ids', drug.shopDrugId)
      actionParams.append('shopType', 'SIMPLE')
      actionParams.append('state', drug.grounding)

      await axios.post(`/api/shop/shopDrugs/grounding`, actionParams)
      return true
    }

    async fetchData () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        drugName: this.drugName,
        originName: this.originNameValue,
        drugState: this.drugState
      }

      let {data: drug} = await axios.get(`/api/shop/shopDrugs`, {params})
      console.log(drug)
      this.drugList = drug.list
      this.pagination.total = drug.total

      this.drugList.forEach(item => {
        if (item.grounding) {
          item.drugState = '上架'
        } else {
          item.drugState = '下架'
        }
      })
    }

    search () {
      this.fetchData()
    }
    clear () {
      this.drugName = ''
      this.fetchData()
    }

    beforeMount () {
      this.fetchData()
    }
  }
</script>

<style lang="scss" scoped>
  .drug{
    &-wrap{
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-list{
      min-height: 850px;
      background: #FFF;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .title{
        padding: 0 15px;
        border-bottom: 1px solid #E9E9E9;
      }
    }

    &-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 15px;

      .select-btn{
        width: 200px;
        padding: 8px 15px 9px;
        margin-right: 10px;
        color: #c0c4cc;
        text-align: left;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-select{
        margin-right: 10px;
      }

      .value-btn{
        color: #606266;
      }

      .right{
        padding-right: 10px;
      }

      .el-input {
        margin: 0 10px;
      }
    }
  }
  /deep/.drug-table{
    padding: 0 10px;
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
</style>
