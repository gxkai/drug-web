<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="admin-edit">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="名字：">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="form.account" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-input v-model="form.role" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.curState" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介：">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="form.introduce">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="admin-edit-btn">
        <el-button @click="goBack">返回</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
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
  export default class AdminCreate extends Vue {
    form = {
      name: '',
      account: '',
      role: '',
      curState: '',
      introduce: ''
    }
    stateOptions = [
      {
        value: true,
        label: '在用'
      },
      {
        value: false,
        label: '停用'
      }
    ]
    goBack () {
      this.$router.go(-1)
    }
    async submit () {
      let getUserName = await axios.get(`/api/supervise/admins/count`, {params: {username: this.form.account}})
      if (getUserName.data >= 1) {
        this.$message({
          message: '账号已存在!',
          type: 'warning'
        })
        return false
      }
      let admin = {
        name: this.form.name,
        username: this.form.account,
        roleId: this.form.role,
        activated: this.form.curState,
        introduce: this.form.introduce || '',
        fileId: '',
        password: '123456'
      }
      await axios.post(`/api/supervise/admins`, admin)
      this.$router.push('/system/admin')
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .admin-edit{
    margin-right: 150px;
    &-btn{
      display: flex;
      justify-content: center;
      padding: 50px;
    }
  }
</style>
