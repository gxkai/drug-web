<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="pharm-create">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名：">
          <el-input v-model="form.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="药师名：">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-input v-model="form.roleName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评分：">
          <el-rate
            v-model="form.score"
            class="rate-score"
            >
          </el-rate>
        </el-form-item>
      </el-form>
    </div>

    <div class="pharm-btn">
      <el-button @click="goback">返回</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
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
  export default class PharmacistCreate extends Vue {
    form = {
      name: '',
      username: '',
      password: '123456',
      roleId: 'ROLE_ADMIN_PHARMACIST',
      roleName: '药师',
      status: '',
      activated: false,
      score: 0
    }
    stateOptions = [
      {
        value: '启用',
        label: '启用'
      },
      {
        value: '停用',
        label: '停用'
      }
    ]
    goback () {
      this.$router.push('/system/pharmacist')
    }

    async submit () {
      if (this.form.status) {
        if (this.form.status === '启用') {
          this.form.activated = true
        } else {
          this.form.activated = false
        }
      }

      await axios.post(`/api/supervise/admins`, this.form)
      this.$message({
        message: '提交成功！',
        type: 'success'
      })
      setTimeout(() => {
        this.$router.push('/system/pharmacist')
      }, 1500)
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .pharm-create{
    margin-right: 100px;
    .el-form{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 50px);
      .el-form-item{
        &:nth-child(1){
          grid-column: 1 / 3;
        }
        .el-select{
          width: 100%;
        }
        .rate-score{
          margin-top: 10px;
        }
      }
    }
  }
  .pharm-btn{
    display: flex;
    justify-content: center;
    padding: 50px;
  }
</style>
