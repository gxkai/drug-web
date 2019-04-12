<template>
  <div class="adjust-wrap">
    <div class="adjust-form">
      <bread-crumb :path="$route.path"/>
      <div class="adjust-search">
        <h3>在售药品调价</h3>
        <div class="action">
          <!--选择药品-->
          <el-button class="select-btn value-btn" v-if="drugValue.name" size="small" @click="drugDialog = true">{{ drugValue.name }}</el-button>
          <el-button class="select-btn" v-else size="small" @click="drugDialog = true">请选择药品</el-button>
          <el-button type="primary" size="small" @click="getDrugInfo">确定</el-button>
        </div>
      </div>
      <el-form ref="form" :model="drugInfoForm" label-width="150px">
        <el-form-item label="药品名称：">
          <el-input v-model="drugInfoForm.name" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="通用名称：">
          <el-input v-model="drugInfoForm.commonName" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="厂商简称：">
          <el-input v-model="drugInfoForm.originName" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="批准文号：">
          <el-input v-model="drugInfoForm.sfda" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="药品大类：">
          <el-input v-model="parentTypeName" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="药品小类：">
          <el-input v-model="childTypeName" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="药品类型：">
          <el-radio-group v-model="drugInfoForm.otc" disabled>
            <el-radio :label="false">处方药</el-radio>
            <el-radio :label="true">OTC</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格：">
          <el-input v-model="drugInfoForm.spec" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="剂型：">
          <el-input v-model="drugInfoForm.form" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="是否医保：">
          <el-radio-group v-model="drugInfoForm.medicaid" disabled>
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能主治：" class="indication">
          <el-input v-model="drugInfoForm.attention" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="条形码：">
          <el-input v-model="drugInfoForm.barCode" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="进价：">
          <el-input v-model="drugInfoForm.barCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="销售价：">
          <el-input v-model="drugInfoForm.barCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="当前库存：">
          <el-input v-model="drugInfoForm.stock" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预警库存：">
          <el-input v-model="drugInfoForm.stockWarn" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐：">
          <el-radio-group v-model="drugInfoForm.introduce" disabled>
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前销量：">
          <el-input v-model="drugInfoForm.stockWarn" readonly placeholder="暂无"></el-input>
        </el-form-item>
      </el-form>

      <div class="submit">
        <el-button type="primary" @click="submitAdd">提交</el-button>
      </div>
    </div>

    <!--选择药品-->
    <el-dialog
      title="药房名称"
      :close-on-click-modal='isCloseOnClickModal'
      :visible.sync="drugDialog"
      width="50%">
      <Drug v-on:listenToChildEvent="getSelectedInfo"></Drug>
      <span slot="footer" class="dialog-footer">
          <el-button @click="drugDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmSelect">确 定</el-button>
        </span>
    </el-dialog>
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
  export default class DrugDetail extends Vue {
    drugValue = {}
    drugInfoForm = {}
    selectedInfo = ''
    childData = ''
    isCloseOnClickModal = false
    drugDialog = false
    parentTypeName = ''
    childTypeName = ''

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

    // 获取药品信息
    async getDrugInfo () {
      this.parentTypeName = ''
      this.childTypeName = ''
      this.drugInfoForm = this.drugValue
      console.log(this.drugInfoForm)
      if (this.drugInfoForm.name === undefined) {
        this.$message({
          message: '请选择药品',
          type: 'warning'
        })
        return
      }

      if (this.drugInfoForm.drugDrugTypeParentList !== null) {
        let parent = this.drugInfoForm.drugDrugTypeParentList
        parent.forEach(item => {
          this.parentTypeName += `${item.type},`
        })
        this.parentTypeName = this.parentTypeName.substring(0, this.parentTypeName.length - 1)
      }

      if (this.drugInfoForm.drugDrugTypeList !== null) {
        let child = this.drugInfoForm.drugDrugTypeList
        child.forEach(item => {
          this.childTypeName += `${item.type},`
        })
        this.childTypeName = this.childTypeName.substring(0, this.childTypeName.length - 1)
      }

      if (this.drugInfoForm.medicaid !== null) {
        if (this.drugInfoForm.medicaid) {
          this.drugInfoForm.medicaid = '否'
        } else {
          this.drugInfoForm.medicaid = '是'
        }
      }
    }

    submitAdd () {

    }

    beforeMount () {
    }
  }
</script>

<style scoped lang="scss">
  /deep/.adjust{
    &-wrap{
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-form{
      min-height: 850px;
      padding: 10px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .el-form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(8, 60px) 50px;
        margin-right: 100px;

        .el-form-item{
          .select-btn{
            width: 100%;
            color: #606266;
            text-align: left;
            padding-left: 15px;
            border-color: #DCDFE6;
            background-color: #FFF;

            &:hover{
              border-color: #C0C4CC;
            }
          }

          .el-select{
            width: 100%;
          }
        }
      }
    }

    &-search{
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
        margin-right: 10px;
        color: #c0c4cc;
        text-align: left;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .value-btn{
        color: #606266;
      }
    }
  }

  .submit{
    text-align: center;
    margin-top: 60px;
  }
</style>

<style lang="scss">
  .child-type{
    height: 40px;
    span {
      width: 40%;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: absolute;
      top: 13px;
    }
  }
</style>
