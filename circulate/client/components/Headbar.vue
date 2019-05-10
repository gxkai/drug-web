<template>
  <div class="headbar">
    <header class="header" ref="header">
      <el-row>
        <el-col :span="5">
          <div class="nav-icon" :class="{hide: !isMenuHidden}" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </el-col>
        <el-col :offset="11" :span="3">
          <p v-if="!!displayName" class="userIcon"  @click="changeIcon">
            <el-tooltip :content="displayName">
              <img :src="iconURL" />
            </el-tooltip>
            <span> {{displayName}}</span>
          </p>
        </el-col>
        <el-col :span="3">
          <p @click="$router.push('/account/editPwd')">
            <el-tooltip :content="$t('head.pwd')">
              <img src="~/assets/img/pwd.svg">
            </el-tooltip>
            <span> {{$t("head.pwd")}}</span>
          </p>
        </el-col>
        <el-col :span="2">
          <p @click="logout">
            <img src="~/assets/img/exit.svg"></img>
            <span> {{$t("head.exit")}}</span>
          </p>
        </el-col>
      </el-row>
    </header>

    <el-dialog
      title="更换头像"
      :visible.sync="iconDialogVisible"
      width="30%"
    >
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="iconURL" :src="iconURL" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="iconDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import Component, { Getter } from 'class-component'
  import {setUser, getUser} from '@/mixins'
  import axios from 'axios'

  @Component({
    methods: {
      ...mapActions(['toggleMenu'])
    }
  })
  export default class Headbar extends Vue {
    @Getter isMenuHidden
    iconDialogVisible = false
    authUser = ''
    displayName = ''
    emptyIcon = require('~/assets/img/avatar.svg')
    iconURL = ''
    iconFile = ''
    userInfo = ''

    handleAvatarSuccess (res, file) {
      this.iconURL = URL.createObjectURL(file.raw)
      this.iconFile = file.raw
    }

    // 更换头像弹框
    changeIcon () {
      this.iconDialogVisible = true
    }

    // 上传头像
    async confirmUpload () {
      const fileParams = new FormData()
      fileParams.append('file', this.iconFile)
      fileParams.append('fileType', 'LOGO')
      let {data: fileId} = await axios.post(`/api/shop/files`, fileParams)
      // console.log('fileId:', fileId)
      const params = new FormData()
      params.append('fileId', fileId)
      await axios.put(`/api/shop/users/fileId`, params)
      this.userInfo.userFileId = fileId
      this.iconDialogVisible = false
      this.$message.success('头像更换成功!')

      setUser(this.userInfo)
    }

    async created () {
      this.userInfo = await getUser()
      this.displayName = this.userInfo.name
      this.authUser = this.userInfo

      let {data} = await axios.get(`/api/shop/files/${this.userInfo.userFileId}`, {params: {resolution: 'SMALL_LOGO'}})
      // console.log(data)
      let iconURL = data.replace('redirect:', '')
      let isNull = iconURL.substring(iconURL.lastIndexOf('/') + 1, iconURL.length)

      if (isNull === 'null') {
        this.iconURL = this.emptyIcon
      } else {
        this.iconURL = iconURL
      }
    }
    async logout () {
      await this.$store.dispatch('logout', async () => {
        await this.$router.push('/login')
      })
    }
  }
</script>

<style lang="scss" scoped>
  .headbar {
    height: 60px;
    position: relative;
    .header {
      @media (max-width: 768px) {
        .el-col p span {
          display: none;
        }
      }
      .el-col:nth-child(2),
      .el-col:nth-child(3),
      .el-col:nth-child(4) {
        cursor: pointer;
        color: #5e6d82;
        border-left: 1px solid #c0ccda;
        p {
          margin: 0 auto;
          padding: 0 10px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis ;
          img {
            vertical-align:middle
          }
        }
      }
      width: 100%;
      height: 60px;
      z-index: 100;
      line-height: 60px;
      border-bottom: 1px solid #c0ccda;
      transition: all 0.5s ease;

      .userIcon{
        img{
          width: 45px;
          height: 45px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }
  }

  /deep/ .avatar-uploader{
    img{
      width: 70px;
      height: 70px;
    }
  }
</style>
