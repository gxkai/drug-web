<template>
  <div class="hospital-detail">
    <bread-crumb :path="$route.path"/>
    <div class="hospital-form">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="医院编码：">
          <el-input v-model="form.hospitalId" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="医院趣医编码：">
          <el-input v-model="form.hospitalQyid" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="医院名称：">
          <el-input v-model="form.hospitalName" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="医院电话：">
          <el-input v-model="form.hospitalPhone" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="医院地址：">
          <el-input v-model="form.hospitalAdd" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="form.hospitalLng" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input v-model="form.hospitalLat" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-map">
          <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>
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
            disabled
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8}"
            placeholder="暂无介绍"
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
  export default class HospitalDetail extends Vue {
    form = {
      hospitalId: '123',
      hospitalQyid: '123456',
      hospitalName: '第一人民医院',
      hospitalPhone: '0512-8888 0000',
      hospitalAdd: '昆山市xxxx',
      hospitalLng: '120.897081',
      hospitalLat: '31.405473',
      hospitalIntroduce: '',
      hospitalImage: require(`~/assets/img/hospital/img1.png`)
    }
    center = {lng: 0, lat: 0}
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
  }
</script>


<style scoped lang="scss">
.hospital-detail{
  padding: 10px;
  .hospital-form{
    padding-right: 200px;
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
