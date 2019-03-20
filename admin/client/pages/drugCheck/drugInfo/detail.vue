<template>
  <div class="p10">
    <bread-crumb :path="$route.path"/>
    <div class="check-form">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="药品名称：">
          <el-input v-model="form.drugName" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="通用名称：">
          <el-input v-model="form.commonName" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="厂商简称：">
          <el-input v-model="form.firmName" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="批准文号：">
          <el-input v-model="form.drugApproval" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="药品大类：">
          <el-button class="drug-class" disabled>{{ form.drugClass }}</el-button>
        </el-form-item>
        <el-form-item label="药品小类：">
          <el-button class="drug-class" disabled>{{ form.drugClass2 }}</el-button>
        </el-form-item>
        <el-form-item label="药品类型：">
          <el-radio-group v-model="form.drugType" disabled>
            <el-radio :label="1">处方药</el-radio>
            <el-radio :label="2">OTC</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格：">
          <el-input v-model="form.drugSpec" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="剂型：">
          <el-input v-model="form.drugForm" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否医保：">
          <el-radio-group v-model="form.drugCare" disabled>
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="注意事项：">
          <el-input v-model="form.drugNotice" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="条形码：">
          <el-input v-model="form.drugCode" disabled placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="功能主治：">
          <el-input
            disabled
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.drugFunction">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="check-image">
      <section>
        <strong>药品封面照</strong>
        <div><img :src="imageUrl"></div>
      </section>
      <section>
        <strong>展示图</strong>
        <div>
            <span v-for="item in drugImg" :key="item.id">
              <img :src="item.imageUrl">
            </span>
        </div>
      </section>
    </div>
    <div class="check-btn">
      <el-button @click="submitSuccess">返回</el-button>
      <el-button type="primary" @click="submitSuccess">提交</el-button>
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
  export default class DrugInfoDetail extends Vue {
    form = {
      drugName: '制霉素片(糖衣)',
      commonName: '制霉素片(糖衣)',
      firmName: '浙江震元制药有限公司',
      drugApproval: 'H33021393',
      drugClass: '儿科用药',
      drugClass2: '小儿营养滋补',
      drugType: 2,
      drugSpec: '50万IU*100',
      drugForm: '糖衣片',
      drugCare: 1,
      drugFunction: '',
      drugCode: '210009231',
      drugNotice: ''
    }
    imageUrl = require(`~/assets/img/hospital/img1.png`)
    drugImg = [
      {
        id: '0',
        imageUrl: require(`~/assets/img/hospital/img1.png`)
      },
      {
        id: '1',
        imageUrl: require(`~/assets/img/hospital/img1.png`)
      },
      {
        id: '2',
        imageUrl: require(`~/assets/img/hospital/img1.png`)
      }
    ]
    mounted () {
    }
    submitSuccess () {
      this.$router.push('/drugCheck/drugInfo')
    }
  }
</script>

<style scoped lang="scss">
  .p10{
    padding: 0 10px;
  }
  /deep/.check-form{
    margin-right: 150px;
    .el-form{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(6, 50px) 120px;
      .el-form-item{
        &:last-child{
          grid-column: 1/3;
        }
      }
      .drug-class{
        width: 100%;
        height: 40px;
        text-align: left;
        padding: 12px 15px;
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
        max-width: 80%;
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
  .check-btn{
    display: flex;
    justify-content: center;
    padding: 50px;
  }
</style>
