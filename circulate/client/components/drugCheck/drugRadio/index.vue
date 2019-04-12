<template>
  <div class="drug--content">
    <div class="drug--content__search">
      <el-button class="select-btn value-btn" v-if="shopValue" type="small" @click="shopNameDialog = true">{{ shopValue.shopName }}</el-button>
      <el-button class="select-btn" v-else type="small" @click="shopNameDialog = true">药店名称</el-button>

      <el-input v-model="drugNameValue" size="small" placeholder="药品名称" style="width: 160px;"></el-input>
      <el-input v-model="companyNameValue" size="small" placeholder="厂商简称" style="width: 160px;"></el-input>
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
    <div>
      <d2-crud
        :data="drugList"
        :options="options"
        :columns="columns"
        :rowHandle="rowHandle"
        :pagination="pagination"
        @pagination-current-change="paginationCurrentChange"
        @current-change="handleCurrentChange"
        @emit-select="handleCurrentChange"
        class="drug-table"
      />
    </div>

    <!--选择药品-->
    <el-dialog
      title="药品列表"
      append-to-body
      :close-on-click-modal='isCloseOnClickModal'
      :visible.sync="shopNameDialog"
      width="50%">
      <shop-name v-on:listenToChildEvent="getSelectedInfo"></shop-name>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shopNameDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmShopSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import ShopName from '@/components/shop/ShopName'
  import axios from 'axios'

  @Component({
    components: {
      ShopName
    }
  })
  export default class Drug extends Vue {
    shopValue = ''
    shopNameDialog = false
    isCloseOnClickModal = false
    selectedInfo = '' // 子组件传过来的数据
    childData = '' // 暂存已选的数据

    drugNameValue = ''
    companyNameValue = ''
    drugState = ''
    columns= [
      {
        title: '药店名称',
        key: 'shopName'
      },
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
        title: '价格',
        key: 'price'
      },
      {
        title: '库存',
        key: 'stock'
      },
      {
        title: '药品状态',
        key: 'transGrounding'
      }
    ]
    drugList = []

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

    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 15,
      total: 0
    }
    options= {
      border: true,
      highlightCurrentRow: true
    }
    rowHandle = {
      width: 50,
      align: 'center',
      columnHeader: '选择',
      custom: [
        {
          icon: 'el-icon-check',
          emit: 'emit-select'
        }
      ]
    }

    // 获取已选信息
    getSelectedInfo (data) {
      this.selectedInfo = data
    }

    // 获取药店名称
    confirmShopSelect () {
      if (!this.selectedInfo) {
        this.shopNameDialog = false
        return
      }
      this.childData = this.selectedInfo
      this.shopValue = this.childData
      this.shopNameDialog = false
    }

    paginationCurrentChange (page) {
      this.pagination.currentPage = page
      this.getAllDrugs()
    }

    handleDetailEvent ({row}) {
      this.$router.push({
        path: '/drugCheck/drug/detail',
        query: {
          id: row.id
        }
      })
    }

    clear () {
      this.shopValue = ''
      this.drugNameValue = ''
      this.companyNameValue = ''
      this.drugState = ''
    }

    search () {
      this.pagination.currentPage = 1
      this.getAllDrugs()
    }

    // 单选
    handleCurrentChange (currentRow) {
      this.$emit('listenToChildEvent', currentRow)
    }

    async getAllDrugs () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        company: this.companyNameValue.trim(),
        grounding: this.drugState,
        shop: this.shopValue.shopName,
        shopId: this.shopValue.id,
        name: this.drugNameValue.trim()
      }

      let {data: drugData} = await axios.get(`/api/shop/shopDrugs`, {params})
      console.log(drugData)
      this.drugList = drugData.list
      this.pagination.total = drugData.total

      this.drugList.forEach(item => {
        if (item.grounding) {
          item.transGrounding = '上架'
        } else {
          item.transGrounding = '下架'
        }
      })
    }

    beforeMount () {
      this.getAllDrugs()
    }
  }
</script>

<style scoped lang="scss">
  .drug--content{
    padding: 0 10px;
    &__search{
      display: flex;
      justify-content: Flex-start;
      align-items: center;

      .select-btn{
        width: 160px;
        color: #C0C4CC;
        text-align: left;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 10px;
      }
      .value-btn{
        color: #606266;
      }

      .el-input{
        margin-right: 10px;
        width: 160px;
      }
      .el-select{
        margin-right: 10px;
        width: 160px;
      }
    }
  }
  /deep/.drug-table{
    .el-table{
      .el-button{
        width: 15px;
        height: 15px;
        line-height: initial;
        padding: 0;
        color: #FFF;
        font-size: 12px;
        border-radius: 2px;

        &:hover, &:focus{
          border-color: #409EFF;
          background-color: #FFF;
        }
      }

      .current-row .el-button{
        background: #409EFF;
        border-color: #409EFF;
      }

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
