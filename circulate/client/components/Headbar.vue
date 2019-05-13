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
          <p @click="editPwd">
            <el-tooltip :content="$t('head.pwd')">
              <img src="~/assets/img/pwd.svg">
            </el-tooltip>
            <span> {{$t("head.pwd")}}</span>
          </p>
        </el-col>
        <el-col :span="2">
          <p @click="logout">
            <img src="~/assets/img/exit.svg">
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
      <user-icon :imgURL="iconURL"
                 v-on:iconFile="getFileObj"
                 v-on:renderURL="getURL"
      >
      </user-icon>
      <span slot="footer" class="dialog-footer">
        <el-button @click="iconDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="pwdDialogVisible"
      width="30%"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="当前密码" prop="currentPwd">
          <el-input
            v-model="ruleForm.currentPwd"
            minlength="6"
            maxlength="16"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="ruleForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="enterPwd">
          <el-input type="password"  v-model="ruleForm.enterPwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pwdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import Component, { Getter } from 'class-component'
  import UserIcon from '@/components/account/userIcon'
  import { setUser, getUser } from '@/mixins'
  import axios from 'axios'

  @Component({
    methods: {
      ...mapActions(['toggleMenu'])
    },
    components: {
      UserIcon
    }
  })
  export default class Headbar extends Vue {
    @Getter isMenuHidden
    pwdDialogVisible = false
    iconDialogVisible = false
    authUser = ''
    displayName = ''
    emptyIcon = require('~/assets/img/avatar.svg')
    iconURL = ''
    iconFile = ''
    userInfo = ''
    formName = 'ruleForm'

    rules = {
      currentPwd: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
      newPwd: [
        { required: true, message: '请输入新密码（6 到 16 个字符）', trigger: 'blur' },
        { min: 6, max: 16, message: '请输入新密码（6 到 16 个字符）', trigger: 'blur' }
      ],
      enterPwd: [
        { required: true, message: '请确认新密码（6 到 16 个字符）', trigger: 'blur' },
        { min: 6, max: 16, message: '请确认新密码（6 到 16 个字符）', trigger: 'blur' }
      ]
    }

    ruleForm = {
      currentPwd: '',
      newPwd: '',
      enterPwd: ''
    }

    editPwd () {
      this.pwdDialogVisible = true
    }

    // 更换头像弹框
    changeIcon () {
      this.iconDialogVisible = true
    }

    getURL (url) {
      this.iconURL = url
    }

    getFileObj (data) {
      this.iconFile = data
    }

    // 修改密码
    confirmEdit () {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          let PassWordDTO = {
            newPassword: this.ruleForm.newPwd,
            rePassword: this.ruleForm.enterPwd
          }
          console.log(PassWordDTO)
          if (this.ruleForm.newPwd !== this.ruleForm.enterPwd) {
            this.$message.warning('输入密码不一致')
            return false
          }
          axios.put(`/api/shop/users/password`, PassWordDTO)
          this.pwdDialogVisible = false
          this.$message({
            message: '修改成功,请重新登录！',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      setUser(this.userInfo)
      this.iconDialogVisible = false
      this.$message.success('头像更换成功!')
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
