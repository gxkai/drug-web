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
    form = {
      hospitalId: '',
      hospitalQyid: '',
      hospitalName: '',
      hospitalPhone: '',
      hospitalAdd: '',
      hospitalLng: '',
      hospitalLat: '',
      hospitalIntroduce: '',
      hospitalImage: ''
    }
    handleAvatarSuccess (res, file) {
      this.form.hospitalImage = URL.createObjectURL(file.raw)
    }
    submit () {
      this.$router.push('/shopCheck/hospital')
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
        grid-template-rows: repeat(7, 50px) 200px;
        .el-form-item{
          grid-column: 1 / 2;
          &.hospitalImg{
            grid-column: 2 / 3;
            grid-row: 1 / 8;
          }
          &.hospitalIntro{
            grid-column: 1 / 3;
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
