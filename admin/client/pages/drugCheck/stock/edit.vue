<template>
  <div class="stock-create">
    <bread-crumb :path="$route.path"/>
    <div class="stock-form">
      <el-form ref="form" :model="detailForm" label-width="200px">
        <el-form-item label="药品封面图" class="el-form-item-upload">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <!--<img v-if="detailForm.imageUrl" :src="detailForm.imageUrl" class="avatar">-->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="detailForm.name" placeholder="请输入药品名称"></el-input>
        </el-form-item>
        <el-form-item label="通用名称">
          <el-input v-model="detailForm.commonName" placeholder="请输入药品名称"></el-input>
        </el-form-item>
        <el-form-item label="批准文号">
          <el-input v-model="detailForm.sfda" placeholder="请输入批准文号"></el-input>
        </el-form-item>
        <el-form-item label="厂商名称">
          <el-select v-model="detailForm.originName" filterable placeholder="请选择">
            <el-option
              v-for="item in firmOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="otc 非处方药">
          <el-select v-model="detailForm.otc" placeholder="请选择">
            <el-option
              v-for="(item, index) in otcOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品大类">
          <el-select v-model="detailForm.drugTypeName" filterable placeholder="请选择">
            <el-option
              v-for="item in drugTypeParent"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品小类">
          <el-select v-model="detailForm.drugTypeChildName" filterable placeholder="请选择">
            <el-option
              v-for="item in drugTypeChild"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格">
          <el-select v-model="detailForm.spec" filterable placeholder="请选择">
            <el-option
              v-for="item in specOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="剂型">
          <el-select v-model="detailForm.form" filterable placeholder="请选择">
            <el-option
              v-for="item in formOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否医保">
          <el-select v-model="detailForm.medicaid" placeholder="请选择">
            <el-option
              v-for="(item, index) in insuranceOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小剂量">
          <el-input v-model="detailForm.minDose" placeholder="请输入最小剂量"></el-input>
        </el-form-item>
        <el-form-item label="药品编码">
          <el-input v-model="detailForm.code" placeholder="请输入药品编码"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="detailForm.brand" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="适应性/功能主治">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8}"
            placeholder="适应性/功能主治"
            v-model="detailForm.introduce">
          </el-input>
        </el-form-item>
        <el-form-item label="图片(最多上传四张)">
          <el-upload
            action=""
            list-type="picture-card"
            :limit="4"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="detailForm.dialogVisible">
            <img width="100%" :src="detailForm.dialogImageUrl">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div class="check-form-btn">
        <el-button @click="submitFail">返回</el-button>
        <el-button type="primary" @click="submitSuccess">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class StockEdit extends Vue {
    detailForm = {}

    commonOptions = [
      {
        value: '泰罗',
        label: '泰罗'
      },
      {
        value: '苦瓜片',
        label: '苦瓜片'
      },
      {
        value: '胶囊',
        label: '胶囊'
      }]

    firmOptions = [
      {
        value: '国药集团xx',
        label: '国药集团xx'
      },
      {
        value: '四川xx制药',
        label: '四川xx制药'
      },
      {
        value: '江西xx制药有效你公司',
        label: '江西xx制药有效你公司'
      }
    ]

    // 是否是处方药
    otcOptions = [
      {
        value: true,
        label: '是'
      },
      {
        value: false,
        label: '否'
      }
    ]

    // 药品大类
    drugTypeParent = []

    // 获取药品大类
    async getParentType () {
      let {data: parent} = await axios.get(`/api/supervise/drugTypes/father`)
      console.log(parent)
      this.drugTypeParent = parent
    }
    // 药品小类
    drugTypeChild = []

    specOptions = [
      {
        value: '规格1',
        label: '规格1'
      },
      {
        value: '规格2',
        label: '规格2'
      }
    ]

    formOptions = [
      {
        value: '剂型1',
        label: '剂型1'
      },
      {
        value: '剂型2',
        label: '剂型2'
      }
    ]

    insuranceOptions = [
      {
        value: true,
        label: '是'
      },
      {
        value: false,
        label: '否'
      }
    ]

    handleAvatarSuccess (res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
    }

    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    }

    handleRemove (file, fileList) {
      console.log(file, fileList)
    }

    handlePictureCardPreview (file) {
      this.form.dialogImageUrl = file.url
      this.form.dialogVisible = true
    }

    submitSuccess () {
      this.$router.push('/drugCheck/stock')
    }

    submitFail () {
      this.$router.push('/drugCheck/stock')
    }

    async getDrugDetail (id) {
      let {data: detail} = await axios.get(`/api/supervise/drugs/${id}`)
      console.log(detail)
      this.detailForm = detail
    }

    beforeMount () {
      let id = this.$route.query.id
      this.getDrugDetail(id)
      this.getParentType()
    }
  }
</script>


<style scoped lang="scss">
  .stock-create{
    padding: 10px;
    .stock-form{
      padding:0 100px 0 0;
      .el-form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 170px repeat(7, 50px) 200px 200px;
        .el-form-item{
          .el-select{
            width: 100%;
          }
          &:nth-child(1){
            grid-column: 1 / 3;
          }
          &:nth-child(1){
            grid-column: 1 / 3;
          }
          &:nth-child(15){
            grid-column: 1 / 3;
          }
          &:nth-child(16){
            grid-column: 1 / 3;
          }
        }
      }
    }
  }
  .avatar-uploader{
    margin-right: 30px;
    position: relative;
    .uploade-text{
      position: absolute;
      width: 100%;
      text-align: center;
      left: 0;
      bottom: 10px;
      color: #666;
    }
  }
  .check-form-btn{
    display: flex;
    justify-content: center;
    padding: 50px;
  }
  /*
  element reset
   */
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 224px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  /deep/.avatar {
    width: 224px;
    height: 148px;
    display: block;
  }
</style>
