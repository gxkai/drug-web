<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="role-create">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="用户名称：">
          <el-input v-model="form.roleName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input v-model="form.roleDescription" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="role-tree">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>
    <div class="role-btn">
      <el-button @click="goback">返回</el-button>
      <el-button type="primary" @click="goback">提交</el-button>
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
  export default class RoleCreate extends Vue {
    form = {
      roleName: '',
      roleDescription: ''
    }
    treeData = [{
      id: 1,
      label: '药店审核',
      children: [{
        id: 6,
        label: '药房审核'
      },
      {
        id: 7,
        label: '药师管理'
      },
      {
        id: 8,
        label: '配送员管理'
      }]
    },
    {
      id: 2,
      label: '药品审核',
      children: [{
        id: 9,
        label: '通用名管理'
      },
      {
        id: 10,
        label: '厂商管理'
      },
      {
        id: 11,
        label: '剂型管理'
      },
      {
        id: 12,
        label: '规格管理'
      },
      {
        id: 13,
        label: '类型管理'
      },
      {
        id: 14,
        label: '药品库管理'
      },
      {
        id: 15,
        label: '药品列表管理'
      },
      {
        id: 16,
        label: '库存流水列表'
      },
      {
        id: 17,
        label: '药品修正列表'
      }]
    },
    {
      id: 3,
      label: '订单管理',
      children: [{
        id: 18,
        label: '订单管理'
      },
      {
        id: 19,
        label: '评价管理'
      }]
    },
    {
      id: 4,
      label: '处方管理',
      children: [{
        id: 20,
        label: '处方管理'
      }]
    },
    {
      id: 5,
      label: '系统设置',
      children: [{
        id: 21,
        label: '会员管理'
      },
      {
        id: 22,
        label: '用户管理'
      }]
    }]
    defaultProps = {
      children: 'children',
      label: 'label'
    }
    goback () {
      this.$router.push('/system/role')
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .role-create{
    margin-right: 200px;
  }
  .role-tree{
    margin-left: 50px;
  }
  .role-btn{
    display: flex;
    justify-content: center;
    padding: 50px;
  }
</style>
