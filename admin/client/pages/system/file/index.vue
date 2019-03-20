<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="file-search">
      <el-select v-model="fileType" placeholder="文件类型" size="small">
        <el-option
          v-for="item in fileOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input-number size="small" v-model="fileNum" controls-position="right" @change="handleChange" :min="0" :max="100"></el-input-number>
      <el-button type="primary" size="small">搜索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
    </div>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :options="options"
      :rowHandle="rowHandle"
      @emit-download="handleDownload"
      @row-remove="handleRowRemove"
      class="drug-table"
    />
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
  export default class File extends Vue {
    fileType = ''
    fileNum = 0
    columns= [
      {
        title: '名称',
        key: 'fileName',
        width: 320
      },
      {
        title: '类型',
        key: 'fileType'
      },
      {
        title: '拓展名',
        key: 'expandName'
      },
      {
        title: '大小',
        key: 'fileSize'
      },
      {
        title: '浏览次数',
        key: 'fileViews'
      }
    ]
    data= [
      {
        fileName: '450H6SVnRdiYaMRaxatDtA.jpeg',
        fileType: 'LOGO',
        expandName: 'jpeg',
        fileSize: '3013',
        fileViews: '1'
      },
      {
        fileName: 'WExPmwOVTz-FpjInh6Jy9A.jpeg',
        fileType: 'LOGO',
        expandName: 'jpeg',
        fileSize: '3013',
        fileViews: '10'
      }
    ]
    loading= false;
    pagination= {
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
    options= {
      border: true
    }
    rowHandle= {
      custom: [
        {
          text: '下载',
          type: 'text',
          emit: 'emit-download'
        }
      ],
      remove: {
        type: 'text',
        size: 'small',
        confirm: true
      }
    }
    fileOptions = [
      {
        value: 'LOGO',
        label: 'LOGO'
      },
      {
        value: 'PIC',
        label: 'PIC'
      },
      {
        value: 'ADVERT',
        label: 'ADVERT'
      },
      {
        value: 'FILE',
        label: 'FILE'
      }
    ]
    mounted () {
    }
    handleChange (value) {
      console.log(value)
    }
    handleDownload ({index, row}) {
      // this.$message.success(index.toString())
      console.log(index)
      console.log(row)
    }
    clear () {
      this.fileType = ''
      this.fileNum = 0
    }
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        // console.log(index)
        // console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  /deep/.file-search{
    display: flex;
    justify-content: Flex-start;
    align-items: center;
    .el-select{
      width: 150px;
      margin-right: 10px;
    }
    .el-input-number{
      margin-right: 10px;
    }
  }
  /deep/.drug-table{
    margin-top: 10px;
    .d2-crud-body{
      padding: 0 !important;
      .el-table{
        th{
          background-color: #F4F4F4 !important;
          color: #555 !important;
        }
        td{
          .cell{
            /deep/.el-button+.el-button{
              margin-left: 5px;
              &::before{
                content: '|';
                padding-right: 5px;
                color: #eee;
              }
            }
          }
        }
      }
    }
  }
</style>
