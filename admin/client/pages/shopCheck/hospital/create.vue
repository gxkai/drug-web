<template>
  <div class="hospital-detail">
    <bread-crumb :path="$route.path"/>
    <div class="hospital-form">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="医院编码：">
          <el-input v-model="form.hospitalId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="医院趣医编码：">
          <el-input v-model="form.hospitalQyid" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="医院名称：">
          <el-input v-model="form.hospitalName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="医院电话：">
          <el-input v-model="form.hospitalPhone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="医院地址：">
          <el-input v-model="form.hospitalAdd" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="form.hospitalLng" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input v-model="form.hospitalLat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-map">
          <baidu-map :center="center" :zoom="zoom" @ready="handler" @click="getPoint" class="bm-view">
            <!--<bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>-->
            <!--<bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>-->
            <bm-local-search :keyword="form.hospitalAdd" :auto-viewport="true" :zoom="zoom" style="display: none"></bm-local-search>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          </baidu-map>
        </el-form-item>
        <el-form-item label="医院照片：" class="hospitalImg">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="form.hospitalImage" :src="form.hospitalImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="医院介绍：" class="hospitalIntro">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8}"
            placeholder="请输入"
            v-model="form.hospitalIntroduce">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <el-button type="primary" @click="submit">提交</el-button>
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
  export default class HospitalCreat extends Vue {
    show = true
    form = {
      hospitalId: '',
      hospitalQyid: '',
      hospitalName: '',
      hospitalPhone: '',
      hospitalAdd: '昆山',
      hospitalLng: '',
      hospitalLat: '',
      hospitalIntroduce: '',
      hospitalImage: ''
    }
    center = {lng: 120.9909, lat: 31.403685}
    zoom = 3
    handleAvatarSuccess (res, file) {
      this.form.hospitalImage = URL.createObjectURL(file.raw)
    }
    submit () {
      this.$router.push('/shopCheck/hospital')
    }
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = this.form.hospitalLng
      this.center.lat = this.form.hospitalLat
      this.zoom = 15
    }
    getPoint (e) { // 点击地图获取一些信息，
      this.show = true
      this.center.lng = this.form.hospitalLng
      this.center.lat = this.form.hospitalLat
      // this.zoom = 15
      this.zoom = e.target.getZoom()
      /* global BMap */
      let geocoder = new BMap.Geocoder() // 创建地址解析器的实例
      geocoder.getLocation(e.point, rs => {
        console.log(rs)
        this.form.hospitalLng = e.point.lng
        this.form.hospitalLat = e.point.lat
      })
    }
    infoWindowClose () {
      this.show = false
    }
    infoWindowOpen () {
      setInterval(() => {
        this.show = true
      }, 100)
    }
  }
</script>


<style scoped lang="scss">
  .hospital-detail{
    padding: 10px;
    .hospital-form{
      padding-right: 100px;
      form.el-form{
        display: grid;
        grid-template-columns: 40% 60%;
        grid-template-rows: repeat(7, 50px) 300px 200px;
        .el-form-item{
          grid-column: 1 / 2;
          &.hospitalImg{
            grid-column: 2 / 3;
            grid-row: 1 / 8;
          }
          &.hospitalIntro{
            grid-column: 1 / 3;
          }
          &.el-form-item-map{
            grid-column: 1 / 3;
            .bm-view {
              width: 100%;
              height: 280px;
            }
          }
        }
      }
    }
  }
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
    width: 448px;
    height: 296px;
    line-height: 296px;
    text-align: center;
  }
  /deep/.avatar {
    width: 448px;
    height: 296px;
    display: block;
  }
  .submit-btn{
    display: flex;
    justify-content: center;
  }
</style>
