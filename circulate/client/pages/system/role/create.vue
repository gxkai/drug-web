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
        check-on-click-node
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>
    <div class="role-btn">
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
  export default class RoleCreate extends Vue {
    form = {
      roleName: '',
      roleDescription: ''
    }
    treeData = []
    defaultProps = {
      children: 'children',
      label: 'name'
    }
    beforeMount () {
      this.initData()
    }
    async initData () {
      let roleTree = await axios.get(`/api/supervise/roles/tree`)
      let newArr = roleTree.data.treeList
      if (newArr.length > 0) {
        newArr.forEach(item => {
          const pid = item.pid
          if (pid !== '') {
            newArr.forEach(ele => {
              if (ele.id === pid) {
                let childArray = ele.children
                if (!childArray) {
                  childArray = []
                }
                childArray.push(item)
                ele.children = childArray
              }
            })
          }
        })
      }
      this.treeData = newArr.filter(item => item.pid === null)
    }
    async submit () {
      // 被选中的节点组成的数组
      let treeList = this.$refs.tree.getCheckedNodes()
      for (let i = 0; i < treeList.length; i++) {
        treeList[i].checked = true
      }
      console.log(treeList)
      let roleDTO = {
        name: this.form.roleName,
        description: this.form.roleDescription,
        treeList: treeList,
        type: 'ROLE_ADMIN'
      }
      await axios.post(`/api/supervise/roles`, roleDTO)
      this.$router.push('/system/role')
    }
    goback () {
      this.$router.go(-1)
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
