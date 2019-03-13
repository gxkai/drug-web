<template>
  <div class="hospital-main-content2">
    <h3 class="h3-tit">详情页面</h3>
    <div class="hospital-form">
      <el-form ref="form" :model="form" label-width="160px">
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
          <img :src="hospitalImage" style="max-width: 100%;height: auto;">
        </el-form-item>
        <el-form-item label="医院介绍：" class="hospitalIntro">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8}"
            placeholder="请输入内容"
            v-model="form.hospitalIntroduce">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'

  @Component
  export default class HospitalDetail extends Vue {
    hospitalImage = require(`~/assets/img/hospital/img1.png`)
    form = {
      hospitalId: '',
      hospitalQyid: '',
      hospitalName: '',
      hospitalPhone: '',
      hospitalAdd: '',
      hospitalLng: '',
      hospitalLat: '',
      hospitalIntroduce: ''
    }
  }
</script>


<style scoped lang="scss">
.hospital-main-content2{
  padding: 10px;
  .h3-tit{
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    text-indent: 20px;
  }
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

</style>
