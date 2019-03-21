<template>
  <div class="advert-wrap">
    <div class="advert">
      <bread-crumb :path="$route.path"/>
      <div class="title">
        <h3>广告位管理</h3>
        <el-button type="primary" @click="addDialogVisible = true" style="background: #169bd5;">新增</el-button>
      </div>

      <div class="list">
        <d2-crud
          ref='d2Crud'
          :columns="columns"
          :data="advertsList"
          :loading="loading"
          :pagination="pagination"
          :options="options"
          :rowHandle="rowHandle"
          @view-emit="viewAdvert"
          @row-remove="removeAdvert"
          @edit-emit="editAdvert"/>
      </div>

      <!--查看广告-->
      <el-dialog
        title="查看"
        :visible.sync="viewDialogVisible"
        width="30%"
        :close-on-click-modal = 'isClickModal'>
        <div class="main">
          <el-form :model="viewData" label-width="100px">
            <el-form-item label="序号">
              <el-input v-model="viewData.id" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模块">
              <el-input v-model="viewData.type" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="viewData.sort" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="链接地址">
              <el-input v-model="viewData.url" readonly placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <img :src="viewData.fileId"/>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="viewDialogVisible = false" type="primary">关 闭</el-button>
        </div>
      </el-dialog>

      <!--编辑广告-->
      <el-dialog
        title="编辑"
        :visible.sync="editDialogVisible"
        width="30%"
        :close-on-click-modal='isClickModal'>
        <div class="edit-con">
          <el-form :model="editData" label-width="100px">
            <el-form-item label="模块">
              <el-input v-model="editData.type" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="editData.sort" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="链接地址">
              <el-input v-model="editData.url" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <!--<el-input v-model="editData.fileId" placeholder="请输入"></el-input>-->
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="editAvatarSuccess"
                :before-upload="editBeforeUpload">
                <img v-if="editData.imageUrl" :src="editData.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmEdit" type="primary">确 定</el-button>
        </div>
      </el-dialog>

      <!--新增广告-->
      <el-dialog
        title="编辑"
        :visible.sync="addDialogVisible"
        width="30%"
        :close-on-click-modal='isClickModal'>
        <div class="edit-con">
          <el-form :model="addData" label-width="100px">
            <el-form-item label="模块">
              <el-input v-model="addData.type" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="addData.sort" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="链接地址">
              <el-input v-model="addData.url" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <!--<el-input v-model="editData.fileId" placeholder="请输入"></el-input>-->
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="addAvatarSuccess"
                :before-upload="addBeforeUpload">
                <img v-if="addData.imageUrl" :src="addData.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addAdvert" type="primary">确 定</el-button>
        </div>
      </el-dialog>
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
  export default class Advert extends Vue {
    columns= [
      {
        title: '序号',
        key: 'id'
      },
      {
        title: '模块',
        key: 'type'
      },
      {
        title: '排序',
        key: 'sort'
      },
      {
        title: '链接地址',
        key: 'url'
      },
      {
        title: '图片',
        key: 'fileId'
      }
    ];

    advertsList = [];

    loading= false;
    pagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    };

    options = {
      border: true
    };

    rowHandle= {
      custom: [
        {
          text: '查看',
          type: 'text',
          emit: 'view-emit'
        },
        {
          text: '编辑',
          type: 'text',
          emit: 'edit-emit'
        }
      ],
      remove: {
        text: '删除',
        type: 'text',
        confirm: true
      }
    };

    // 新增广告
    addData = {
      type: '',
      sort: '',
      url: ''
      // fileId: '',
      // imageUrl: ''
    }
    addDialogVisible = false;

    // 新增图片上传
    addAvatarSuccess (res, file) {
      // console.log(res)
      // console.log(file)
      this.addData.imageUrl = URL.createObjectURL(file.raw)
    }

    addBeforeUpload (file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

    async addAdvert () {
      console.log(this.addData)

      let params = this.addData
      let addRes = await axios.post(`/api/supervise/adverts`, params)
      // console.log(addRes)
      if (addRes) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addDialogVisible = false
        this.getAdverts()
      }
    }

    // 删除广告
    async removeAdvert ({row}, done) {
      let delRes = await axios.post(`/api/supervise/adverts/${row.id}`)
      // console.log(delRes)
      if (delRes) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
        this.getAdverts()
      }
    }

    // 查看广告
    viewDialogVisible = false;
    isClickModal = false;
    viewData = {};
    viewAdvert ({row}) {
      this.viewDialogVisible = true
      this.viewData.id = row.id
      this.viewData.type = row.type
      this.viewData.sort = row.sort
      this.viewData.url = row.url
      this.viewData.fileId = row.fileId
    }

    // 编辑图片
    editAvatarSuccess (res, file) {
      // console.log(res)
      // console.log(file)
      this.editData.imageUrl = URL.createObjectURL(file.raw)
    }

    editBeforeUpload (file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

    // 编辑广告
    editDialogVisible = false;
    editData = {}
    editAdvert ({row}) {
      this.editDialogVisible = true
      this.editData.id = row.id
      this.editData.type = row.type
      this.editData.sort = row.sort
      this.editData.url = row.url
      this.editData.fileId = row.fileId
      this.editData.imageUrl = ''
    }

    confirmEdit () {
      this.editDialogVisible = false
    }

    // 获取所有广告
    async getAdverts () {
      let params = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      let {data: adverts} = await axios.get(`/api/supervise/adverts`, {params})
      console.log(adverts)

      this.advertsList = adverts.list
      this.pagination.total = adverts.total

      this.advertsList.forEach(item => {
        this.getImgUrl(data => {
          console.log(data)
          item.fileId = data
        })
      })
    }

    async getImgUrl (post) {
      let id = '--QzQzlXQ0qgUtsUbsp5iA'
      let {data: imgRes} = await axios.get(`/api/supervise/files/${id}`)
      let imgURL = imgRes.replace('redirect:', '')
      post(imgURL)
    }

    mounted () {
      this.getAdverts()
    }
  }
</script>

<style lang="scss">
  .advert-wrap{
    padding: 20px;

    .advert{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .el-dialog__body{
        padding: 20px;
        border:{
          top: 1px solid #e9e9e9;
          bottom: 1px solid #e9e9e9;
        }
      }

      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        margin: 0 10px;
        border-bottom: 1px solid #E9E9E9;
      }

      .list {
        padding: 0 30px;

        .el-table{
          th{
            background-color: #F4F4F4;
            color: #555;
          }
          &__body {
            td{
              padding: 6px 0;
            }
          }
        }
      }

      .cell{
        button:not(:nth-child(2)):before{
          content: '|';
          color: #EEE;
          position: relative;
          left: -4px;
          top: -1px;
        }

        .el-button+.el-button{
          float: left;
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }
</style>
