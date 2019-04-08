<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <el-form ref="form" :model="form" label-width="180px" style="margin-right: 200px;">
      <el-form-item label="距离显示（KM）">
        <el-input v-model="form.distant"></el-input>
      </el-form-item>
    </el-form>
    <div class="sys-btn">
      <el-button type="primary">保存</el-button>
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
  export default class System extends Vue {
    form = {
      distant: ''
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  .sys-btn{
    display: flex;
    margin-right: 200px;
    justify-content: center;
  }
</style>
