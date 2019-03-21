<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="account-detail">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="手机号：">
          <el-input v-model="form.phone" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.name" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="form.sex" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="form.idCard" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="医保卡：">
          <el-input v-model="form.medicareCard" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="最后登录时间：">
          <el-input v-model="form.lastLogin" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input v-model="form.curState" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="form.headPhone" :src="form.headPhone" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="account-detail-btn">
        <el-button @click="goBack">返回</el-button>
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
  export default class AccountDetail extends Vue {
    form = {
      phone: '13300000000',
      sex: '男',
      idCard: '33333333333333333',
      medicareCard: '',
      lastLogin: '2019-03-15 16:09:11',
      curState: '正常',
      headPhone: require(`~/assets/img/hospital/img1.png`)
    }
    handleAvatarSuccess (res, file) {
      this.form.headPhone = URL.createObjectURL(file.raw)
    }
    goBack () {
      this.$router.push('/system/account')
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .account-detail{
    padding-right: 100px;
    .el-form{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 50px) 200px;
      .el-form-item{
        &:nth-child(2n){
          grid-column: 1 / 2;
        }
        &:nth-child(2n-1){
          grid-column: 2 / 3;
        }
        &:nth-child(1){
          grid-column: 1 / 3;
        }
        &:last-child{
          grid-column: 1 / 3;
        }
      }
    }
    &-btn{
      display: flex;
      justify-content: center;
      padding: 50px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
