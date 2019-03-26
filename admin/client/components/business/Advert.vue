<template>
  <div class="advert-wrap">
    <div class="advert">
      <bread-crumb :path="$route.path"/>

      <div class="title">
        <h3>广告位管理</h3>
        <el-button type="primary" @click="addDialogVisible = true" style="background: #169bd5;">新增</el-button>
      </div>

      <div class="list">
        <el-table
          :data="advertsList"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号">

            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="模块">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="url"
            label="链接地址">
          </el-table-column>
          <el-table-column
            prop="imgURL"
            label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.imgURL" :src="scope.row.imgURL" style="width: 50px;height: 50px">
              <img v-else src="../../assets/img/hospital/img1.png" style="width: 50px;height: 50px">
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="viewAdvert(scope.$index, scope.row)" type="text">查看</el-button>
              <el-button @click="editAdvert(scope.$index, scope.row)" type="text">编辑</el-button>
              <el-button @click="removeAdvert(scope.$index, scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper, total"
            :total="advertsList.length">
          </el-pagination>
        </div>
      </div>

      <!--查看广告-->
      <el-dialog
        title="查看"
        :visible.sync="viewDialogVisible"
        width="30%"
        :close-on-click-modal='isClickModal'>
        <div class="main">
          <el-form :model="viewData" label-width="100px">
            <el-form-item label="序号">
              <el-input v-model="viewData.index + 1" readonly placeholder="请输入"></el-input>
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
              <img :src="viewData.imgURL"/>
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
                action=""
                :show-file-list="false"
                :on-success="editAvatarSuccess"
                :before-upload="editBeforeUpload">
                <img v-if="editData.imgURL" :src="editData.imgURL" class="avatar">
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
        title="新增"
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
                action=""
                :show-file-list="false"
                :on-success="addAvatarSuccess"
                :before-upload="addBeforeUpload">
                <img v-if="addData.imgURL" :src="addData.imgURL" class="avatar">
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
    currentPage = 1; // 当前页
    pageSize = 15; // 每页显示条数
    totalPages = 0;

    // 所有列表数据
    advertsList = [];

    handleCurrentChange (page) {
      this.currentPage = page
      this.getAdverts()
    }

    // 实时更新操作行数据
    updateLineData (index, data) {
      this.$set(this.advertsList, index, data)
      this.totalPages = this.advertsList.length
    }

    // 新增广告
    addData = {}
    setAddData () {
      this.addData = {
        index: '',
        id: '',
        type: '',
        sort: '',
        url: '',
        fileId: '',
        imgURL: ''
      }
    }
    addDialogVisible = false;

    // 新增图片上传
    addFile = {}

    addBeforeUpload (file) {
      // // console.log(file)
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      //
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    }

    addAvatarSuccess (res, file) {
      this.addData.imgURL = URL.createObjectURL(file.raw)
      this.addFile = file.raw
    }

    async addAdvert () {
      // 上传图片
      let fileParams = new FormData()
      fileParams.append('file', this.addFile)
      fileParams.append('fileType', 'LOGO')
      let {data: fileID} = await axios.post(`/api/supervise/files`, fileParams)

      this.addData.fileId = fileID
      let params = this.addData
      let addRes = await axios.post(`/api/supervise/adverts`, params)
      console.log(addRes)
      if (addRes) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.advertsList.push(this.addData)
        this.addDialogVisible = false
        // this.setAddData()
        this.totalPages = this.advertsList.length
      }
    }

    // 查看广告
    viewDialogVisible = false;
    isClickModal = false;
    viewData = {};

    viewAdvert (index, row) {
      this.viewDialogVisible = true
      this.viewData.index = index
      this.viewData.type = row.type
      this.viewData.sort = row.sort
      this.viewData.url = row.url
      this.viewData.imgURL = row.imgURL
    }

    // 编辑广告
    editBeforeUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      //
      // if (!isJPG) {
      //   this.$message.error('图片只能是 JPG 格式!')
      // }
      // return isJPG
    }

    editFile = {} // 存放file
    editAvatarSuccess (res, file) {
      this.editData.imgURL = URL.createObjectURL(file.raw)
      this.editFile = file.raw
    }

    editDialogVisible = false;
    editData = {}
    setEditData () {
      this.editData = {
        index: '',
        id: '',
        type: '',
        sort: '',
        url: '',
        fileId: '',
        imgURL: ''
      }
    }

    editAdvert (index, row) {
      // console.log(index)
      this.editDialogVisible = true
      this.editData.index = index
      this.editData.id = row.id
      this.editData.type = row.type
      this.editData.sort = row.sort
      this.editData.url = row.url
      this.editData.imgURL = row.imgURL
    }

    async confirmEdit () {
      // 上传图片
      let fileParams = new FormData()
      fileParams.append('file', this.editFile)
      fileParams.append('fileType', 'LOGO')
      let {data: fileID} = await axios.post(`/api/supervise/files`, fileParams)
      this.editData.fileId = fileID // 图片上传成功后更新fileId

      let params = this.editData
      let editRes = await axios.put(`/api/supervise/adverts/${this.editData.id}`, params)
      if (editRes) {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.updateLineData(this.editData.index, this.editData)
        this.editDialogVisible = false
        this.setEditData() // 清空表单数据
      }
    }

    // 删除广告
    removeAdvert (index, row) {
      // this.$confirm('确定删除吗？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   let delRes = axios.post(`/api/supervise/adverts/${row.id}`)
      //   console.log(delRes)
      //   if (delRes) {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //     this.advertsList.splice(index, 1)
      //     console.log(this.advertsList)
      //     this.totalPages = this.advertsList.length
      //   }
      // }).catch(() => {})
    }

    async getAdverts () {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      let {data: adverts} = await axios.get(`/api/supervise/adverts`, {params})
      console.log(adverts.list)
      this.advertsList = adverts.list
      this.totalPages = adverts.total
      this.advertsList.forEach(item => {
        this.getImgURL(item.fileId, data => {
          if (data.substring(data.lastIndexOf('/') + 1, data.length) === 'null') {
            item.imgURL = ''
          } else {
            item.imgURL = data
          }
        })
      })
    }

    // 获取图片路径
    async getImgURL (id, post) {
      let params = {
        resolution: 'SMALL_LOGO'
      }
      let {data: imgRes} = await axios.get(`/api/supervise/files/${id}`, {params})
      let url = imgRes.replace('redirect:', '')
      post(url)
    }

    mounted () {
      this.getAdverts()
      this.setEditData()
      this.setAddData()
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

      .avatar-uploader{
        img{
          width: 100%;
        }
      }

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
        padding: 0 20px 10px;
        margin: 0 10px 20px;
        border-bottom: 1px solid #E9E9E9;

        h3{
          margin-bottom: 10px;
        }
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

        .pagination{
          margin: 30px 0;
          .el-pagination__total{
            float: right;
          }
        }
      }

      .cell{
        .el-button+.el-button{
          &:before{
            content: '|';
            color: #EEE;
            position: relative;
            left: -6px;
            top: -1px;
          }
        }
      }
    }
  }
</style>
