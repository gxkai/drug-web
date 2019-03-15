<template>
  <div class="type--create">
    <bread-crumb :path="$route.path"/>
    <div>
      <el-form ref="form" class="type--create__form" :model="form" label-width="150px">
        <el-form-item label="LOGO">
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
        <el-form-item label="分类名称">
          <el-input v-model="form.typeName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="父类名称">
          <el-select v-model="form.fatherTypeName" placeholder="请选择父类名称" style="width:100%;">
            <el-option
              v-for="item in form.fatherType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-select v-model="form.isShow" placeholder="请选择是否显示" style="width:100%;">
            <el-option
              v-for="item in form.selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.typeSort" placeholder="请输入排序"></el-input>
          <div>（序号越小，分类显示越靠前）</div>
        </el-form-item>
      </el-form>
      <div class="type-form-btn">
        <el-button size="small" @click="back()">返回</el-button>
        <el-button type="primary" size="small" @click="back()">提交</el-button>
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
  export default class TypeChildEdit extends Vue {
    // imageUrl = require(`~/assets/img/hospital/img1.png`)
    form = {
      imageUrl: require(`~/assets/img/hospital/img1.png`),
      typeName: '小儿消化不良',
      fatherTypeName: '儿科用药',
      isShow: '是',
      typeSort: '3',
      fatherType: [
        {
          value: '选项1',
          label: '家庭常用'
        },
        {
          value: '选项2',
          label: '儿科用药'
        }
      ],
      selectOptions: [
        {
          value: '选项1',
          label: '是'
        },
        {
          value: '选项2',
          label: '否'
        }
      ]
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
    back () {
      this.$router.push('/drugCheck/type/typeChild')
    }
  }
</script>

<style lang="scss" scoped>
  .type--create{
    padding:0 10px;
    &__form{
      padding-right: 100px;
    }
    .type-form-btn{
      display: flex;
      justify-content: center;
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
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  /deep/.avatar {
    width: 178px;
    height: 148px;
    display: block;
  }
  /deep/.type--create--form{
    margin-top: 10px;
    .el-form-item{
      &__label{
        padding-right: 30px;
      }
    }
  }

</style>
