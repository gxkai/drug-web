<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="check-form">
      <el-form ref="form" :model="detailList" label-width="150px">
        <el-form-item label="药品名称：">
          <el-input v-model="detailList.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="通用名称：">
          <el-input v-model="detailList.commonName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="厂商简称：">
          <el-input v-model="detailList.originName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="批准文号：">
          <el-input v-model="detailList.sfda" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="药品大类：">
          <el-select v-model="detailList.drugTypeName" @change="changeParentType" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in parentType"
              :key="index"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品小类：">
          <el-select v-model="detailList.drugTypeChildName" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in childType"
              :key="index"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品类型：">
          <el-radio-group v-model="detailList.otc">
            <el-radio :label="false">处方药</el-radio>
            <el-radio :label="true">OTC</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格：">
          <el-input v-model="detailList.spec" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="剂型：">
          <el-input v-model="detailList.form" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否医保：">
          <el-radio-group v-model="detailList.medicaid">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="注意事项：">
          <el-input v-model="detailList.drugNotice" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="条形码：">
          <el-input v-model="detailList.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="功能主治：">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="detailList.introduce">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="check-image">
      <section>
        <strong>药品封面照</strong>
        <div>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="coverUploadSuccess">
            <img v-if="coverURL" :src="coverURL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </section>
      <section>
        <strong>展示图</strong>
        <div >
          <el-upload
            action=""
            :limit=limitNum
            list-type="picture-card"
            :file-list="drugImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="childUploadSuccess">
            <!--<div v-for="(item, index) in drugImg" :key="index">-->
              <!--<img :src="item.imgURL">-->
            <!--</div>-->
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <!--<span v-for="(item, index) in drugImg" :key="index">-->
            <!--<img :src="item.imgURL">-->
          <!--</span>-->
        </div>
      </section>
    </div>
    <div class="check-btn">
      <el-button @click="submitSuccess">返回</el-button>
      <el-button type="primary" @click="submitSuccess">提交</el-button>
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
  export default class DrugInfoDetail extends Vue {
    limitNum = 3
    isFirst = true
    dialogImageUrl = ''
    dialogVisible = false
    detailList = {}
    drugImg = [
      {
        url: require(`~/assets/img/hospital/img1.png`)
      },
      {
        url: require(`~/assets/img/hospital/img1.png`)
      },
      {
        url: require(`~/assets/img/hospital/img1.png`)
      }
    ]
    coverURL = require(`~/assets/img/hospital/img1.png`)
    parentType = []
    childType = []

    handleRemove (file, fileList) {
    }

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }

    // 封面图片上传
    coverUploadSuccess (res, file) {
      this.coverURL = URL.createObjectURL(file.raw)
    }

    // 展示图片上传
    childUploadSuccess (res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    }

    submitSuccess () {
      this.$router.push('/drugCheck/drugInfo')
    }

    // 获取药品大类
    async getParentType () {
      let {data: parent} = await axios.get(`/api/supervise/drugTypes/father`)
      console.log(parent)
      this.parentType = parent
    }

    // 改变药品大类
    changeParentType () {
      this.isFirst = false
      this.getChildType(this.detailList.drugTypeName)
    }

    // 获取小类
    async getChildType (id) {
      let {data: child} = await axios.get(`/api/supervise/drugType/${id}/children`)
      this.childType = child
      if (!this.isFirst) {
        this.detailList.drugTypeChildName = this.childType[0].type
        this.detailList.drugTypeChildId = this.childType[0].id
      }
    }

    async getDetail (id) {
      let {data: detail} = await axios.get(`/api/supervise/drugs/${id}`)
      console.log(detail)
      this.detailList = detail

      // 获取封面图片
      this.getImgs(this.detailList.fileId, data => {
        this.coverURL = data
      })

      // 获取展示图
      let childImgs = this.detailList.imgs.split(',')
      for (let i = 0, len = childImgs.length; i < len; i++) {
        this.getImgs(childImgs[i], data => {
          this.drugImg.push({
            url: data
          })
        })
      }

      console.log(this.drugImg)
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
      let id = this.$route.query.id
      this.getDetail(id)
      this.getParentType()
      this.getChildType(this.detailList.drugTypeId)
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
    background: #fff;
  }
  /deep/.check-form{
    margin-right: 150px;
    .el-form{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(6, 50px) 120px;
      .el-form-item{
        &:last-child{
          grid-column: 1/3;
        }
      }
      .drug-class{
        width: 100%;
        height: 40px;
        text-align: left;
        padding: 12px 15px;
      }
    }
  }
  .check-image{
    margin: 20px 50px 0;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 250px;
    section{
      img{
        max-width: 80%;
        height: auto;
      }
      strong{
        display: block;
        line-height: 3;
        font-size: 16px;
      }
      /*&:nth-child(2){*/
        /*>div{*/
          /*display: grid;*/
          /*grid-template-columns: 1fr 1fr 1fr;*/
          /*grid-template-rows: 200px;*/
        /*}*/
      /*}*/
    }
  }
  .check-btn{
    display: flex;
    justify-content: center;
    padding: 50px;
  }
</style>
