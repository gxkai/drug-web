<template>
  <div class="adjust-wrap">
    <div class="adjust-form">
      <bread-crumb :path="$route.path"/>

      <el-form ref="form" :model="drugInfoForm" label-width="150px">
        <el-form-item label="药品名称：">
          <el-input v-model="drugInfoForm.drugName" readonly placeholder="暂无"></el-input>
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
          <el-input v-model="drugInfoForm.typeParent" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="药品小类：">
          <el-input v-model="drugInfoForm.type" readonly placeholder="暂无"></el-input>
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
          <el-radio-group v-model="drugInfoForm.medicaided" disabled>
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能主治：" class="indication">
          <el-input
            type="textarea"
            readonly
            :rows="3"
            placeholder="暂无"
            v-model="drugInfoForm.introduce">
          </el-input>
        </el-form-item>
        <el-form-item label="条形码：">
          <el-input v-model="drugInfoForm.barCode" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="当前销量：">
          <el-input v-model="drugInfoForm.sales" readonly placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="进价：">
          <el-input v-model="drugInfoForm.startPrice" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="销售价：">
          <el-input v-model="drugInfoForm.price" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="当前库存：">
          <el-input v-model="drugInfoForm.stock" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预警库存：">
          <el-input v-model="drugInfoForm.stockWarn" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐：">
          <el-radio-group v-model="drugInfoForm.recommend" disabled>
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div class="submit">
        <el-button @click="$router.push('/drugManage/drug')">返回</el-button>
        <el-button type="primary" @click="submitAdd">提交</el-button>
    </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import Drug from '@/components/drugCheck/drugRadio/index'
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb,
      Drug
    }
  })
  export default class DrugDetail extends Vue {
    drugInfoForm = {}
    childData = ''
    isCloseOnClickModal = false
    drugDialog = false
    parentTypeName = ''
    childTypeName = ''
    shopDrugId = ''

    // 获取药品信息
    async getDrugInfo () {
      let {data: detail} = await axios.get(`/api/shop/ShopDrugAdminDTO/${this.shopDrugId}`)
      console.log(detail)
      this.drugInfoForm = detail

      if (!this.drugInfoForm.startPrice) {
        this.drugInfoForm.startPrice = this.drugInfoForm.price
      }
      // if (this.drugInfoForm.name === undefined) {
      //   this.$message({
      //     message: '请选择药品',
      //     type: 'warning'
      //   })
      //   return
      // }
      //
      // if (this.drugInfoForm.drugDrugTypeParentList !== null) {
      //   let parent = this.drugInfoForm.drugDrugTypeParentList
      //   parent.forEach(item => {
      //     this.parentTypeName += `${item.type},`
      //   })
      //   this.parentTypeName = this.parentTypeName.substring(0, this.parentTypeName.length - 1)
      // }
      //
      // if (this.drugInfoForm.drugDrugTypeList !== null) {
      //   let child = this.drugInfoForm.drugDrugTypeList
      //   child.forEach(item => {
      //     this.childTypeName += `${item.type},`
      //   })
      //   this.childTypeName = this.childTypeName.substring(0, this.childTypeName.length - 1)
      // }
      //
      // if (this.drugInfoForm.medicaid !== null) {
      //   if (this.drugInfoForm.medicaid) {
      //     this.drugInfoForm.medicaid = '否'
      //   } else {
      //     this.drugInfoForm.medicaid = '是'
      //   }
      // }
    }

    async submitAdd () {
      let params = {
        price: +this.drugInfoForm.price,
        recommend: this.drugInfoForm.recommend,
        shopDrugId: this.shopDrugId,
        startPrice: +this.drugInfoForm.startPrice,
        stock: +this.drugInfoForm.stock,
        stockWarn: this.drugInfoForm.stockWarn,
        grounding: true,
        shopId: 'G4-R9nbxQU-hcrUWtcS-6Q',
        drugId: this.drugInfoForm.id
        // drugId: '-0fapknEToW71QI_r4nvJw'
      }

      await axios.put(`/api/shop/shopDrugs`, params)
      this.$message({
        message: '调价成功',
        type: 'success'
      })
    }

    beforeMount () {
      this.shopDrugId = this.$route.query.id
      this.getDrugInfo()
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
        margin-right: 100px;

        .indication{
          grid-row: 6 / 8;
          grid-column: 1 / 3;

          textarea{
            resize: none;
          }
        }

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
