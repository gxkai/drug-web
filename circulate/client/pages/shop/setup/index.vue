<template>
  <div class="common-wrap">
    <div class="common-list">
      <bread-crumb :path="$route.path"/>
      <h3 class="h3-title">基本信息</h3>

      <div class="check-form">
        <el-form ref="form" :model="shopForm" label-width="150px">
          <el-form-item label="药店名称：">
            <el-input v-model="shopForm.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="店内电话：">
            <el-input v-model="shopForm.phone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="法人姓名：">
            <el-input v-model="shopForm.legal" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input v-model="shopForm.identityNumber" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="shopForm.mail" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="法人手机号：">
            <el-input v-model="shopForm.legalPhone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="税务登记号：">
            <el-input v-model="shopForm.taxCode" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="经营许可证号：">
            <el-input v-model="shopForm.certificate" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="GSP证号：">
            <el-input v-model="shopForm.gspCertificate" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="RCB Key：">
            <el-input v-model="shopForm.rcb" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="营业开始时间：">
            <el-time-select
              style="width:100%"
              v-model="shopForm.openTime"
              :picker-options="{
                start: '06:00',
                step: '00:30',
                end: '12:00'
              }"
              placeholder="营业开始时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="营业结束时间：">
            <el-time-select
              style="width:100%"
              v-model="shopForm.closeTime"
              :picker-options="{
                start: '12:00',
                step: '00:30',
                end: '22:00'
              }"
              placeholder="营业结束时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="经度：">
            <el-button class="select-btn" v-if="shopForm.lng" @click="dialogMapVisible = true"size="middle">{{ this.shopForm.lng }}</el-button>
            <el-button class="select-btn" v-else @click="dialogMapVisible = true" style="color: #C0C4CC;" size="middle">请输入</el-button>
          </el-form-item>
          <el-form-item label="纬度：">
            <el-button class="select-btn" v-if="shopForm.lat" @click="dialogMapVisible = true"size="middle">{{ this.shopForm.lat }}</el-button>
            <el-button class="select-btn" v-else @click="dialogMapVisible = true" style="color: #C0C4CC;" size="middle">请输入</el-button>
          </el-form-item>
          <el-form-item label="是否支持医保：">
            <el-input v-model="shopForm.medicaid" placeholder="请选择"></el-input>
          </el-form-item>
          <el-form-item label="是否支持统筹：">
            <el-input v-model="shopForm.gathered" placeholder="请选择"></el-input>
          </el-form-item>
          <el-form-item label="是否配送：">
            <el-input v-model="shopForm.distribution" placeholder="请选择"></el-input>
          </el-form-item>
          <el-form-item label="配送距离：">
            <el-input v-model="shopForm.distance" placeholder="3公里"></el-input>
          </el-form-item>
          <el-form-item label="商家介绍：" class="el-form-item-textarea">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              placeholder="请输入内容"
              v-model="shopForm.introduction">
            </el-input>
          </el-form-item>
        </el-form>
        <!--图片上传-->
        <div class="div-upload">
          <div class="div-upload-item1">
            <div class="img-title">药店封面照</div>
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="shopLogo" :src="shopLogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <div class="div-upload-item2">
            <div class="img-title">店内照片</div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :limit=3
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="shopInnerFileIdList" alt="">
            </el-dialog>
          </div>

          <div class="div-upload-item3">
            <div class="img-title">上传证件资料</div>
            <div style="display: flex;">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2">
                <img v-if="certificateImg" :src="certificateImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="uploade-text">经营许可证</div>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess3">
                <img v-if="licenseImg" :src="licenseImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="uploade-text">营业执照</div>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess4">
                <img v-if="gspImg" :src="gspImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="uploade-text">GSP证书</div>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess5">
                <img v-if="idnumberImg" :src="idnumberImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="uploade-text">手持身份证照片</div>
              </el-upload>

            </div>
          </div>

        </div>

        <!--获取经纬度-->
        <el-dialog title="获取经纬度" :visible.sync="dialogMapVisible">
          <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
            <bm-view class="map"></bm-view>
            <bm-control :offset="{width: '10px', height: '10px'}">
              <bm-auto-complete v-model="addKeyword" :sugStyle="{zIndex: 1}">
                <!--<search-field placeholder="请输入地名关键字"></search-field> &lt;!&ndash; 这里指代一个自定义搜索框组件 &ndash;&gt;-->
              </bm-auto-complete>
            </bm-control>
            <bm-local-search :keyword="addKeyword" :auto-viewport="true" ></bm-local-search>
          </baidu-map>
          <!--<baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">-->
            <!--<bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>-->
            <!--<bm-local-search :keyword="addKeyword" :auto-viewport="true" :zoom="zoom">-->
            <!--</bm-local-search>-->
          <!--</baidu-map>-->
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogMapVisible = false">取 消</el-button>
            <el-button type="primary" @click="getLngLat">确 定</el-button>
          </div>
        </el-dialog>

        <div class="check-form-btn">
          <el-button>返回</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </div>

      </div>
      <!--check-form end-->

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
  export default class SetUpShop extends Vue {
    shopForm = {
      name: '',
      phone: '',
      legal: '',
      identityNumber: '',
      mail: '',
      legalPhone: '',
      taxCode: '',
      gspCertificate: '',
      rcb: '',
      openTime: '',
      closeTime: '',
      certificate: '',
      lng: '',
      lat: '',
      medicaid: '',
      gathered: '',
      distribution: '',
      distance: '',
      introduction: '',
      fileId: '', // 药店LOGO图片ID
      shopInnerFileId: '', // 最多4张店内照片ID
      licenseFileId: '', // 营业执照图片ID
      certificateFileId: '', // 经营许可证图片ID
      gspFileId: '', // gsp图片ID
      identityNumberFileId: '' // 身份证图片ID
    }
    shopLogo = '' // 药店封面照
    shopLogoFile = {} // 药店LOGO存放
    handleAvatarSuccess (res, file) {
      this.shopLogo = URL.createObjectURL(file.raw)
      this.shopLogoFile = file.raw
      console.log(this.shopLogoFile)
    }

    // 店内照片
    shopInnerFileIdList = []
    dialogVisible = false
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }

    licenseImg = '' // 营业执照
    certificateImg = '' // 经营许可证
    gspImg = '' // GSP证书
    idnumberImg = '' // 手持身份证照片

    handleAvatarSuccess2 (res, file) {
      this.certificateImg = URL.createObjectURL(file.raw)
    }
    handleAvatarSuccess3 (res, file) {
      this.licenseImg = URL.createObjectURL(file.raw)
    }
    handleAvatarSuccess4 (res, file) {
      this.gspImg = URL.createObjectURL(file.raw)
    }
    handleAvatarSuccess5 (res, file) {
      this.idnumberImg = URL.createObjectURL(file.raw)
    }

    async submit () {
      // 上传logo图片
      let fileParams = new FormData()
      fileParams.append('file', this.shopLogoFile)
      fileParams.append('fileType', 'LOGO')
      let { data: fileID } = await axios.post(`/api/shop/files`, fileParams)
      console.log(fileID)
      // this.shopForm.fileId = fileID

      // let params = this.shopForm
      // let addShop = await axios.post(`/api/shop/shops`, params)
      // console.log(addShop)
      // if (addShop) {
      //   this.$message({
      //     message: '添加成功',
      //     type: 'success'
      //   })
      // }
      // setTimeout(() => {
      //   this.$router.push('/')
      // }, 1000)
    }

    // 获取经纬度弹框
    dialogMapVisible = true
    center = {lng: 120.9909, lat: 31.403685}
    zoom = 3
    addKeyword = ''
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = this.shopForm.lng
      this.center.lat = this.shopForm.lat
      this.zoom = 15
    }
    getPoint (e) { // 点击地图获取一些信息，
      this.show = true
      this.center.lng = this.addData.lng
      this.center.lat = this.addData.lat
      this.zoom = e.target.getZoom()
      // let geocoder = new BMap.Geocoder() // 创建地址解析器的实例
      // geocoder.getLocation(e.point, rs => {
      //   console.log(rs)
      //   this.addData.lng = e.point.lng
      //   this.addData.lat = e.point.lat
      // })
    }
    getLngLat () {

    }

    //
  }
</script>

<style lang="scss" scoped>
  .select-btn{
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
  .bm-view {
    width: 100%;
    height: 280px;
  }
  /deep/.common {
    &-wrap {
      padding: 0 10px;
      margin-bottom: 30px;
    }
    &-list{
      /*min-height: 850px;*/
      background: #FFF;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .h3-title{
        border-bottom: 1px solid #E9E9E9;
        padding: 0 15px 15px 15px;
        margin: 15px 0;
      }

      .check-form{
        padding-right: 100px;
        .el-form {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: repeat(9, 50px) 200px;
          .el-form-item {
            &:nth-child(2n-1) {
              grid-column: 1 / 3;
            }
            &:nth-child(2n) {
              grid-column: 3 / 5;
            }
            &.el-form-item-textarea {
              grid-column: 1 / 5;
            }
          }

        }

        .div-upload{
          margin-left: 150px;
          clear: both;
          zoom: 1;
          overflow: hidden;

          .img-title{
            font-size: 14px;
            line-height: 3;
          }

          &-item1{
            float: left;
          }
          &-item2{
            width: 70%;
            float: left;
          }
          &-item3{
            width: 100%;
            float: left;
          }

        }



        /*图片上传*/
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
            font-size: 14px;
          }
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 148px;
          height: 148px;
          line-height: 148px;
          text-align: center;
        }
        .avatar {
          width: 148px;
          height: 148px;
          display: block;
        }

        .check-form-btn{
          display: flex;
          justify-content: center;
          padding: 50px;
        }


      }
    }



  }
</style>
