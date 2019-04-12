<template>
  <div class="add-wrap">
    <div class="add-form">
      <bread-crumb :path="$route.path"/>
      <div class="add-search">
        <h3>添加药品</h3>
        <div class="action">
          <!--选择药品-->
          <el-button class="select-btn value-btn" v-if="drugValue.drugName" size="small" @click="drugDialog = true">{{ drugValue.drugName }}</el-button>
          <el-button class="select-btn" v-else size="small" @click="drugDialog = true">请选择药品</el-button>
          <el-button type="primary" size="small" @click="getDrugInfo">确定</el-button>
        </div>
      </div>
      <el-form ref="form" :model="drugInfoForm" label-width="150px">
        <!--<el-form-item label="药品名称：">-->
          <!--<el-input v-model="detailForm.name" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="通用名称：">-->
          <!--<el-button class="select-btn" v-if="detailForm.commonName" type="middle" @click="commonDialogVisible = true">{{ detailForm.commonName }}</el-button>-->
          <!--<el-button class="select-btn" v-else type="middle" @click="commonDialogVisible = true" style="color: #C0C4CC">请选择通用名称</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="厂商简称：">-->
          <!--<el-button class="select-btn" v-if="detailForm.originName" type="middle" @click="originDialogVisible = true">{{ detailForm.originName }}</el-button>-->
          <!--<el-button class="select-btn" v-else type="middle" @click="originDialogVisible = true" style="color: #C0C4CC">请选择厂商</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="批准文号：">-->
          <!--<el-input v-model="detailForm.sfda" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="药品大类：">-->
          <!--<el-button class="select-btn" v-if="parentTypeNameString" type="middle" @click="parentTypeDialogVisible = true">{{ parentTypeNameString }}</el-button>-->
          <!--<el-button class="select-btn" v-else type="middle" @click="parentTypeDialogVisible = true" style="color: #C0C4CC">请选择药品大类</el-button>-->
          <!--<p style="display: none;">{{ parentTypeIdString }}</p>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="药品小类：">-->
          <!--<el-button class="select-btn child-type" v-if="childTypeNameString" type="middle" @click="childTypeDialogVisible = true">{{ childTypeNameString }}</el-button>-->
          <!--<el-button class="select-btn" v-else type="middle" @click="childTypeDialogVisible = true" style="color: #C0C4CC">请选择药品大类</el-button>-->
          <!--<p style="display: none;">{{ childTypeIdString }}</p>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="药品类型：">-->
          <!--<el-radio-group v-model="detailForm.otc">-->
            <!--<el-radio :label="false">处方药</el-radio>-->
            <!--<el-radio :label="true">OTC</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="规格：">-->
          <!--<el-button class="select-btn" v-if="detailForm.spec" type="middle" @click="specDialogVisible = true">{{ detailForm.spec }}</el-button>-->
          <!--<el-button class="select-btn" v-else type="middle" @click="specDialogVisible = true" style="color: #C0C4CC">请选择规格</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="剂型：">-->
          <!--<el-button class="select-btn" v-if="detailForm.form" type="middle" @click="formDialogVisible = true">{{ detailForm.form }}</el-button>-->
          <!--<el-button class="select-btn" v-else type="middle" @click="formDialogVisible = true" style="color: #C0C4CC">请选择剂型</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="是否医保：">-->
          <!--<el-radio-group v-model="detailForm.medicaid">-->
            <!--<el-radio :label="true">是</el-radio>-->
            <!--<el-radio :label="false">否</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="注意事项：">-->
          <!--<el-input v-model="detailForm.drugNotice" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="条形码：">-->
          <!--<el-input v-model="detailForm.barCode" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="功能主治：">-->
          <!--<el-input-->
            <!--type="textarea"-->
            <!--:rows="5"-->
            <!--placeholder="请输入内容"-->
            <!--v-model="detailForm.introduce">-->
          <!--</el-input>-->
        <!--</el-form-item>-->
      </el-form>

      <div class="check-image">
        <section>
          <strong>药品封面照</strong>
          <div>
            <img v-if="coverURL" :src="coverURL">
            <img v-else :src="emptyUrl">
          </div>
        </section>
        <section>
          <strong>展示图</strong>
          <div>
            <span v-for="(item, index) in drugImgList" :key="index">
              <img v-if="item.imgURL !== 'null'" :src="item.imgURL">
              <img v-else :src="emptyUrl">
            </span>
          </div>
        </section>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submitAdd">提交</el-button>
      </div>
    </div>

    <!--选择药品-->
    <el-dialog
      title="药房名称"
      :close-on-click-modal='isCloseOnClickModal'
      :visible.sync="drugDialog"
      width="50%">
      <Drug v-on:listenToChildEvent="getSelectedInfo"></Drug>
      <span slot="footer" class="dialog-footer">
          <el-button @click="drugDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmSelect">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import Drug from '@/components/drugCheck/drugRadio/index'
  // import axios from 'axios'

  @Component({
    components: {
      BreadCrumb,
      Drug
    }
  })
  export default class DrugDetail extends Vue {
    drugInfoForm = {}
    selectedInfo = ''
    childData = ''
    drugValue = ''
    isCloseOnClickModal = false
    drugDialog = false

    emptyUrl = require('../../../assets/img/hospital/img1.png')
    coverURL = ''
    drugImgList = [
      {
        imgURL: require('../../../assets/img/hospital/img1.png')
      },
      {
        imgURL: require('../../../assets/img/hospital/img1.png')
      },
      {
        imgURL: require('../../../assets/img/hospital/img1.png')
      }
    ]

    getSelectedInfo (data) {
      console.log(data)
      this.selectedInfo = data
    }

    confirmSelect () {
      if (!this.selectedInfo) {
        this.shopNameDialog = false
        return
      }
      this.childData = this.selectedInfo
      this.drugValue = this.childData
      this.drugDialog = false
    }

    getDrugInfo () {
      console.log(this.drugValue)
      this.drugInfoForm = this.drugValue
      console.log(this.drugInfoForm)
    }

    submitAdd () {

    }

    // async getDetailInfo (id) {
    //   let {data: detail} = await axios.get(`/api/supervise/shopDrugs/${id}`)
    //   console.log(detail)
    //   this.detailForm = detail
    //   if (this.detailForm.medicaided !== null) {
    //     if (this.detailForm.medicaided) {
    //       this.detailForm.medicaided = '否'
    //     } else {
    //       this.detailForm.medicaided = '是'
    //     }
    //   }
    //
    //   let params = {
    //     resolution: 'LARGE_LOGO'
    //   }
    //
    //   // 获取封面图片
    //   if (this.detailForm.fileId) {
    //     let {data: cover} = await axios.get(`/api/supervise/files/${this.detailForm.fileId}`, {params})
    //     let imgURL = cover.replace('redirect:', '')
    //     let nullURL = imgURL.substring(imgURL.lastIndexOf('/') + 1, imgURL.length)
    //     if (nullURL !== 'null') {
    //       this.coverURL = imgURL
    //     } else {
    //       this.coverURL = nullURL
    //     }
    //   }
    //
    //   // 获取展示图
    //   if (this.detailForm.imgs) {
    //     this.drugImgList = []
    //     let childImgs = this.detailForm.imgs.split(',')
    //     for (let i = 0, len = childImgs.length; i < len; i++) {
    //       let {data: detailImg} = await axios.get(`/api/supervise/files/${childImgs[i]}`, {params})
    //       let url = detailImg.replace('redirect:', '')
    //       let empty = url.substring(url.lastIndexOf('/') + 1, url.length)
    //       if (empty !== 'null') {
    //         this.drugImgList.push({
    //           imgURL: url
    //         })
    //       } else {
    //         this.drugImgList.push({
    //           imgURL: empty
    //         })
    //       }
    //     }
    //   }
    // }

    beforeMount () {
    }
  }
</script>

<style scoped lang="scss">
  /deep/.add{
    &-wrap{
      padding: 0 10px;
      margin-bottom: 30px;
    }

    &-form{
      min-height: 850px;
      padding: 10px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      .el-form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(6, 55px) 120px;
        margin-right: 100px;

        .el-form-item{
          &:last-child{
            grid-column: 1/3;
          }

          .select-btn{
            width: 100%;
            color: #606266;
            text-align: left;
            padding-left: 15px;
            border-color: #DCDFE6;
            background-color: #FFF;

            &:hover{
              border-color: #C0C4CC;
            }
          }

          .el-select{
            width: 100%;
          }
        }
      }
    }

    &-search{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #E9E9E9;

      .select-btn{
        width: 200px;
        height: 32px;
        line-height: inherit;
        margin-right: 10px;
        color: #c0c4cc;
        text-align: left;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .value-btn{
        color: #606266;
      }
    }
  }
  .check-image{
    margin: 20px 50px 0;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 250px;
    section{
      img{
        max-width: 70%;
        height: auto;
      }
      strong{
        display: block;
        line-height: 3;
        font-size: 16px;
      }
      &:nth-child(2){
        >div{
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 200px;
        }
      }
    }
  }

  .submit{
    text-align: center;
    margin: 30px auto;
  }
</style>

<style lang="scss">
  .child-type{
    height: 40px;
    span {
      width: 40%;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: absolute;
      top: 13px;
    }
  }
</style>
