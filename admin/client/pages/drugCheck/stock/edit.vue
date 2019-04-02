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
            <img v-if="coverURL" :src="coverURL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="detailForm.name" placeholder="请输入药品名称"></el-input>
        </el-form-item>
        <el-form-item label="通用名称">
          <el-button class="select-btn" v-if="detailForm.commonName" type="middle" @click="commonDialogVisible = true">{{ detailForm.commonName }}</el-button>
          <el-button class="select-btn" v-else type="middle" @click="commonDialogVisible = true" style="color: #C0C4CC">请选择通用名称</el-button>
        </el-form-item>
        <el-form-item label="批准文号">
          <el-input v-model="detailForm.sfda" placeholder="请输入批准文号"></el-input>
        </el-form-item>
        <el-form-item label="厂商名称">
          <el-button class="select-btn" v-if="detailForm.originName" type="middle" @click="originDialogVisible = true">{{ detailForm.originName }}</el-button>
          <el-button class="select-btn" v-else type="middle" @click="originDialogVisible = true" style="color: #C0C4CC">请选择厂商</el-button>
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
          <el-select v-model="detailForm.drugTypeName" value-key="id" @change="changeParentType" filterable placeholder="请选择">
            <el-option
              v-for="item in drugTypeParent"
              :key="item.id"
              :label="item.type"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品小类">
          <el-select v-model="detailForm.drugTypeChildName" value-key="id" filterable placeholder="请选择">
            <el-option
              v-for="item in drugTypeChild"
              :key="item.id"
              :label="item.type"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格">
          <el-button class="select-btn" v-if="detailForm.spec" type="middle" @click="specDialogVisible = true">{{ detailForm.spec }}</el-button>
          <el-button class="select-btn" v-else type="middle" @click="specDialogVisible = true" style="color: #C0C4CC">请选择规格</el-button>
        </el-form-item>
        <el-form-item label="剂型">
          <el-button class="select-btn" v-if="detailForm.form" type="middle" @click="formDialogVisible = true">{{ detailForm.form }}</el-button>
          <el-button class="select-btn" v-else type="middle" @click="formDialogVisible = true" style="color: #C0C4CC">请选择剂型</el-button>
        </el-form-item>
        <el-form-item label="是否医保">
          <el-select v-model="detailForm.medicaid" placeholder="请选择">
            <el-option
              v-for="(item, index) in medicaidList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
            :file-list="detailImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="childUploadSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div class="check-form-btn">
        <el-button @click="submitFail">返回</el-button>
        <el-button type="primary" @click="submitSuccess">提交</el-button>
      </div>
    </div>

    <!--选择通用名称-->
    <el-dialog
      title="通用名称"
      :close-on-click-modal='isCloseOnClickModal'
      :visible.sync="commonDialogVisible"
      width="50%">
      <common-name v-on:listenToChildEvent="getSelectedInfo"></common-name>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commonDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectCommonName">确 定</el-button>
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

    <!--选择规格-->
    <el-dialog
      title="规格"
      :close-on-click-modal='isCloseOnClickModal'
      :visible.sync="specDialogVisible"
      width="50%">
      <drug-spec v-on:listenToChildEvent="getSelectedInfo"></drug-spec>
      <span slot="footer" class="dialog-footer">
        <el-button @click="specDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectSpec">确 定</el-button>
      </span>
    </el-dialog>

    <!--选择剂型-->
    <el-dialog
      title="剂型"
      :close-on-click-modal='isCloseOnClickModal'
      :visible.sync="formDialogVisible"
      width="50%">
      <drug-form v-on:listenToChildEvent="getSelectedInfo"></drug-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import CommonName from '@/components/drugCheck/CommonName'
  import Spec from '@/components/drugCheck/Spec'
  import Form from '@/components/drugCheck/Form'
  import Origin from '@/components/drugCheck/Origin'
  import axios from 'axios'

  @Component({
    components: {
      BreadCrumb,
      'common-name': CommonName,
      'drug-spec': Spec,
      'drug-form': Form,
      'drug-origin': Origin
    }
  })
  export default class StockEdit extends Vue {
    isCloseOnClickModal = false
    commonDialogVisible = false
    specDialogVisible = false
    formDialogVisible = false
    originDialogVisible = false
    drugID = ''
    dialogVisible = false
    dialogImageUrl = ''
    detailForm = {}
    isFirst = true
    detailImg = []
    coverURL = ''
    selectedInfo = {}

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

    // 是否医保
    medicaidList = [
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
    drugTypeParent = []
    // 获取药品大类
    async getParentType () {
      let {data: parent} = await axios.get(`/api/supervise/drugTypes/father`)
      this.drugTypeParent = parent
    }

    changeParentType (data) {
      this.isFirst = false
      this.getChildType(data.id)
    }

    // 药品小类
    drugTypeChild = []
    async getChildType (id) {
      let {data: childTypes} = await axios.get(`/api/supervise/drugType/${id}/children`)
      if (!this.isFirst && childTypes) {
        this.drugTypeChild = childTypes
        this.detailForm.drugTypeChildName = this.drugTypeChild[0].type
        this.detailForm.drugTypeId = this.drugTypeChild[0].id
      }
    }

    // 获取已选通用名信息
    getSelectedInfo (data) {
      console.log(data)
      this.selectedInfo = data
    }

    reset () {
      this.specDialogVisible = false
      this.formDialogVisible = false
      this.originDialogVisible = false
      this.commonDialogVisible = false
      this.selectedInfo = {}
    }

    // 选择通用名
    confirmSelectCommonName () {
      this.commonDialogVisible = true
      this.detailForm.commonNameId = this.selectedInfo.id
      this.detailForm.commonName = this.selectedInfo.name
      this.reset()
    }

    // 选择厂商
    confirmSelectOrigin () {
      this.originDialogVisible = true
      this.detailForm.originId = this.selectedInfo.id
      this.detailForm.originName = this.selectedInfo.name
      this.reset()
    }

    // 选择规格
    confirmSelectSpec () {
      this.specDialogVisible = false
      this.detailForm.specId = this.selectedInfo.id
      this.detailForm.spec = this.selectedInfo.name
      this.reset()
    }

    // 选择剂型
    confirmSelectForm () {
      this.formDialogVisible = false
      this.detailForm.formId = this.selectedInfo.id
      this.detailForm.form = this.selectedInfo.name
      this.reset()
    }

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

    // 图片放大
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }

    // 展示图片上传
    childUploadSuccess (res, file, fileList) {
      // console.log(res)
      // console.log(file)
      // console.log(fileList)
    }

    // 提交
    submitSuccess () {
      // let params = {
      //   name: '',
      //   commonNameId: '',
      //   // commonName: '',
      //   sfda: '',
      //   originId: '',
      //   originName: '',
      //   otc: '',
      //   drugTypeParent: '',
      //   drugTypeName: '',
      //   drugTypeId: '',
      //   drugTypeChildName: '',
      //   spec: '',
      //   formId: '',
      //   form: '',
      //   medicaid: '',
      //   code: '',
      //   brand: '',
      //   introduce: ''
      // }
      // this.$router.push('/drugCheck/stock')
    }

    submitFail () {
      this.$router.push('/drugCheck/stock')
    }

    async getDrugDetail (id) {
      let {data: detail} = await axios.get(`/api/supervise/drugs/${id}`)
      console.log(detail)
      this.detailForm = detail

      let params = {
        resolution: 'LARGE_LOGO'
      }
      // 获取封面图片
      let {data: cover} = await axios.get(`/api/supervise/files/${this.detailForm.fileId}`, {params})
      this.coverURL = cover.replace('redirect:', '')

      // 获取展示图
      let childImgs = this.detailForm.imgs.split(',')
      for (let i = 0, len = childImgs.length; i < len; i++) {
        // let {data: detailImg} = await axios.get(`/api/supervise/files/${childImgs[i]}`, {params})
        // let url = detailImg.replace('redirect:', '')
        // console.log(detailImg)
        this.detailImg.push({url: this.coverURL})
        // if (url.substring(url.lastIndexOf('/') + 1, url.length) !== 'null') {
        //
        //   this.detailImg.push({url: url})
        //   // console.log(this.detailImg)
        // }
      }
    }

    // 获取展示图片
    async getImgs (fileId, post) {
      let params = {
        resolution: 'LARGE_LOGO'
      }
      let {data: cover} = await axios.get(`/api/supervise/files/${fileId}`, {params})
      let url = cover.replace('redirect:', '')
      if (url.substring(url.lastIndexOf('/') + 1, url.length) !== 'null') {
        post(url)
      }
    }

    beforeMount () {
      this.drugID = this.$route.query.id
      this.getDrugDetail(this.drugID)
      this.getParentType()
      this.getChildType(this.detailForm.drugTypeParent)
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
        grid-template-rows: 170px repeat(6, 50px) 200px 200px;
        .el-form-item{
          .select-btn{
            width: 100%;
            color: #606266;
            text-align: left;
            border-color: #DCDFE6;
            background-color: #FFF;

            &:hover{
              border-color: #C0C4CC;
            }
          }
          .el-select{
            width: 100%;
          }
          &:nth-child(1){
            grid-column: 1 / 3;
          }
          &:nth-child(14){
            grid-column: 1 / 3;
          }
          &:nth-child(15){
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
