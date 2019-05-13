<template>
  <div class="edit-wrap">
    <div class="drug-stock-create">
      <bread-crumb :path="$route.path"/>
      <div class="drug-stock-form">
        <el-form ref="form" :model="detailForm" label-width="200px">
          <el-form-item label="药品封面图：" class="el-form-item-upload">
            <el-upload
              :disabled="isCorrect"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-success="coverUploadSuccess">
              <img v-if="coverURL" :src="coverURL" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="药品名称：">
            <el-input v-model="detailForm.name" :disabled="isCorrect" placeholder="请输入药品名称"></el-input>
          </el-form-item>
          <el-form-item label="通用名称：">
            <el-input v-model="detailForm.commonName" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="批准文号：">
            <el-input v-model="detailForm.sfda" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="厂商名称：">
            <el-input v-model="detailForm.originName" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="药品大类：">
            <el-input v-model="parentTypeNameString" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="药品小类：">
            <el-input v-model="childTypeNameString" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="otc 非处方药：">
            <el-radio-group v-model="detailForm.otc" disabled>
              <el-radio :label="false">否</el-radio>
              <el-radio :label="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="规格：">
            <el-input v-model="detailForm.spec" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="剂型：">
            <el-input v-model="detailForm.form" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="是否医保：">
            <el-radio-group v-model="detailForm.medicaid" disabled>
              <el-radio :label="false">否</el-radio>
              <el-radio :label="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="药品编码：">
            <el-input v-model="drugCode" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-input v-model="detailForm.brand" disabled placeholder="暂无"></el-input>
          </el-form-item>
          <el-form-item label="功能主治：" class="indication">
            <el-input
              :disabled="isCorrect"
              type="textarea"
              :rows="3"
              placeholder="暂无"
              v-model="detailForm.introduce">
            </el-input>
          </el-form-item>
          <el-form-item label="注意事项：" class="indication2">
            <el-input
              :disabled="isCorrect"
              type="textarea"
              :rows="3"
              placeholder="暂无"
              v-model="detailForm.attention">
            </el-input>
          </el-form-item>
          <el-form-item label="图片(最多上传四张)">
            <el-upload
              action=""
              :disabled="isCorrect"
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
          <el-button @click="backToList">返回</el-button>
          <el-button type="primary" v-show="isCorrect" @click="correctDrugInfo">修正</el-button>
          <el-button type="primary" v-show="!isCorrect" @click="submitEdit">提交</el-button>
        </div>
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
  export default class DrugDetailCorrect extends Vue {
    isCorrect = true
    detailForm = {}
    drugCode = ''

    // 封面图
    coverFileId = ''
    coverURL = ''
    coverURLJudeg = ''
    coverObj = ''

    // 展示图
    dialogVisible = false
    dialogImageUrl = ''
    detailImg = []
    detailFileId = ''

    // 下拉弹框
    selectedInfo = ''
    typeInfo = [] // 存储大类信息
    parentType = [] // 暂存大类信息
    childInfo = [] // 存储小类信息
    childData = [] // 暂存已选信息
    drugID = ''
    parentTypeNameString = ''
    parentTypeIdString = ''
    childTypeNameString = ''
    childTypeIdString = ''

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

    // 封面图片上传
    coverUploadSuccess (res, file) {
      this.coverURL = URL.createObjectURL(file.raw)
      this.coverObj = file.raw // 上传图片提交该对象
    }

    // 展示图片上传
    childUploadSuccess (res, file, fileList) {
      this.detailImg = fileList
    }

    // 删除展示图
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }

    // 查看图片放大
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }

    // 修正
    correctDrugInfo () {
      this.isCorrect = false
    }

    // 提交
    async submitEdit () {
      // 封面图片上传
      if (this.coverURLJudeg !== this.coverURL) {
        let coverParams = new FormData()
        coverParams.append('file', this.coverObj)
        coverParams.append('fileType', 'LOGO')
        let {data: coverFileId} = await axios.post('/api/shop/files', coverParams)
        console.log(coverFileId)
        this.coverFileId = coverFileId // 图片上传成功后更新fileId
      }

      // 展示图上传
      if (this.detailImg.length > 0) {
        const middle = this.detailImg
        const len = middle.length
        let fileId = ''
        for (let i = 0; i < len; i++) {
          if (middle[i].raw === undefined) { // 当前图片未重新选择，直接存储原有fileId即可
            fileId += `${middle[i].fileId},`
          } else {
            let detailParams = new FormData()
            detailParams.append('file', middle[i].raw)
            detailParams.append('fileType', 'LOGO')
            let {data: detailFileId} = await axios.post('/api/shop/files', detailParams)
            fileId += `${detailFileId},` // 图片上传成功后更新fileId
          }
        }
        console.log(fileId)
        this.detailFileId = fileId.substring(0, fileId.length - 1)
      }

      // 修正字段
      let params = {
        fileId: this.coverFileId, // 封面图
        imgs: this.detailFileId, // 展示图
        drugId: this.drugID,
        name: this.detailForm.name, // 药品名
        introduce: this.detailForm.introduce,
        attention: this.detailForm.attention
      }

      await axios.post(`/api/shop/drugApplies`, params)
      this.$message({
        message: '修正成功',
        type: 'success'
      })
      this.isCorrect = false
      setTimeout(() => {
        this.$router.push('/drugManage/drug')
      }, 1000)
    }

    // 返回
    backToList () {
      this.$router.push('/drugManage/drug')
    }

    // 获取药品信息
    async getDrugDetail () {
      let {data: detail} = await axios.get(`/api/shop/drugs/${this.drugID}`)
      console.log(detail)
      this.detailForm = detail
      this.coverFileId = detail.fileId
      this.detailFileId = detail.imgs
      this.parentType = detail.drugDrugTypeParentList
      detail.code.forEach(item => {
        this.drugCode += `${item},`
      })
      this.drugCode = this.drugCode.substring(0, this.drugCode.length - 1)

      // 拼接药品小类
      let childTypeList = detail.drugDrugTypeList
      let cName = ''
      let cId = ''
      childTypeList.forEach(item => {
        cName += `${item.type},`
        cId += `${item.id},`
      })

      this.childTypeNameString = cName.substring(0, cName.length - 1)
      this.childTypeIdString = cId.substring(0, cId.length - 1)

      // 拼接药品大类
      let pName = ''
      let pId = ''
      this.parentType.forEach(item => {
        pName += `${item.type},`
        pId += `${item.id},`
      })

      this.parentTypeNameString = pName.substring(0, pName.length - 1)
      this.parentTypeIdString = pId.substring(0, pId.length - 1)

      let params = {
        resolution: 'LARGE_LOGO'
      }

      // 获取封面图片
      if (this.detailForm.fileId) {
        let {data: cover} = await axios.get(`/api/shop/files/${this.detailForm.fileId}`, {params})
        this.coverURL = cover.replace('redirect:', '')
        this.coverURLJudeg = this.coverURL
      }

      // 获取展示图
      if (this.detailForm.imgs) {
        let childImgs = this.detailForm.imgs.split(',')
        for (let i = 0, len = childImgs.length; i < len; i++) {
          let {data: detailImg} = await axios.get(`/api/shop/files/${childImgs[i]}`, {params})
          let url = detailImg.replace('redirect:', '')
          if (url.substring(url.lastIndexOf('/') + 1, url.length) !== 'null') {
            this.detailImg.push({
              url: url,
              fileId: childImgs[i]
            })
          }
        }
      }
    }

    beforeMount () {
      this.drugID = this.$route.query.id
      this.getDrugDetail()
    }
  }
</script>

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

<style scoped lang="scss">
  .edit-wrap{
    padding: 0 10px;
    margin-bottom: 30px;

    .drug-stock-create{
      padding: 10px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .drug-stock-form{
        padding: 20px 100px 0 0;
        .el-form{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 170px repeat(6, 55px);
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
