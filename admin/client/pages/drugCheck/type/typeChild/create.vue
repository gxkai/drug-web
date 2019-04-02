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
            :on-success="handleAvatarSuccess">
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
              v-for="item in fatherType"
              :key="item.type"
              :label="item.type"
              :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-select v-model="form.isShow" placeholder="请选择是否显示" style="width:100%;">
            <el-option
              v-for="item in selectOptions"
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
        <el-button type="primary" size="small" @click="submit()">提交</el-button>
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
  export default class TypeChildCreate extends Vue {
    form = {
      id: '',
      imageUrl: '',
      typeName: '',
      fatherTypeName: '',
      isShow: '',
      typeSort: ''
    }
    fatherType = []
    selectOptions = [
      {
        value: true,
        label: '是'
      },
      {
        value: false,
        label: '否'
      }
    ]
    beforeMount () {
      this.initData()
    }
    async initData () {
      await axios.get(`/api/supervise/drugTypes/father`).then(res => {
        this.fatherType = res.data
      })
    }

    filePath = {} // 存放file
    handleAvatarSuccess (res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
      this.filePath = file.raw
    }

    fileId = ''
    async submit () {
      let fileParams = new FormData()
      fileParams.append('file', this.filePath)
      fileParams.append('fileType', 'LOGO')
      let imgres = await axios.post('/api/supervise/files', fileParams)
      this.fileId = imgres.data // 图片上传成功后更新fileId

      let pid = this.$route.query.pid
      // 子类判重
      // let getName = await axios.post(`/api/supervise/drugTypes/${pid}/children/exists`, {id: '', type: this.form.typeName})
      // if (getName.data >= 1) {
      //   this.$message({
      //     message: '子类名称已存在!',
      //     type: 'warning'
      //   })
      //   return false
      // }

      let drugType = {
        file: '',
        fileId: this.fileId,
        id: '',
        pid: pid,
        ptype: this.form.fatherTypeName,
        showed: this.form.isShow,
        sort: this.form.typeSort,
        type: this.form.typeName
      }
      await axios.post(`/api/supervise/child/drugTypes`, drugType)
      this.$router.push({
        path: '/drugCheck/type/typeChild',
        query: {
          id: pid
        }
      })
    }
    back () {
      this.$router.go(-1)
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
