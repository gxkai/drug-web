<template>
  <div class="stock-create">
    <bread-crumb :path="$route.path"/>
    <div class="stock-form">
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="药品封面图" class="el-form-item-upload">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="form.drugName" placeholder="请输入药品名称"></el-input>
        </el-form-item>
        <el-form-item label="通用名称">
          <el-select v-model="form.commonName" filterable placeholder="请选择">
            <el-option
              v-for="item in commonOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批准文号">
          <el-input v-model="form.drugApproval" placeholder="请输入批准文号"></el-input>
        </el-form-item>
        <el-form-item label="厂商名称">
          <el-select v-model="form.firmName" filterable placeholder="请选择">
            <el-option
              v-for="item in firmOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="otc 非处方药">
          <el-select v-model="form.otcValue" placeholder="请选择">
            <el-option
              v-for="item in otcOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品大类">
          <el-select v-model="form.drugClass" filterable placeholder="请选择">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品小类">
          <el-select v-model="form.drugClass2" filterable placeholder="请选择">
            <el-option
              v-for="item in classOptions2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格">
          <el-select v-model="form.drugSpec" filterable placeholder="请选择">
            <el-option
              v-for="item in specOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="剂型">
          <el-select v-model="form.drugForm" filterable placeholder="请选择">
            <el-option
              v-for="item in formOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否医保">
          <el-select v-model="form.insuranceValue" placeholder="请选择">
            <el-option
              v-for="item in insuranceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最小剂量">
          <el-input v-model="form.minDose" placeholder="请输入最小剂量"></el-input>
        </el-form-item>
        <el-form-item label="药品编码">
          <el-input v-model="form.drugCode" placeholder="请输入药品编码"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="form.drugBrand" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="适应性/功能主治">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8}"
            placeholder="适应性/功能主治"
            v-model="form.drugIntroduce">
          </el-input>
        </el-form-item>
        <el-form-item label="图片(最多上传四张)">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="4"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="form.dialogVisible">
            <img width="100%" :src="form.dialogImageUrl" alt="">
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

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class StockCreate extends Vue {
    form = {
      imageUrl: '',
      drugName: '',
      commonName: '',
      drugApproval: '',
      firmName: '',
      otcValue: '',
      drugClass: '',
      drugClass2: '',
      drugSpec: '',
      drugForm: '',
      insuranceValue: '',
      minDose: '',
      drugCode: '',
      drugBrand: '',
      drugIntroduce: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
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
    otcOptions = [
      {
        value: '是',
        label: '是'
      },
      {
        value: '否',
        label: '否'
      }
    ]
    classOptions = [
      {
        value: '家庭常用',
        label: '家庭常用'
      },
      {
        value: '儿童用药',
        label: '儿童用药'
      }
    ]
    classOptions2 = [
      {
        value: '子类1',
        label: '子类1'
      },
      {
        value: '子类2',
        label: '子类2'
      }
    ]
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
        value: '是',
        label: '是'
      },
      {
        value: '否',
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
