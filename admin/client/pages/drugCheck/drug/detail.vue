<template>
  <div class="drug-detail">
    <bread-crumb :path="$route.path"/>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="药品名称">
        <el-input v-model="form.drugName" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="通用名称">
        <el-input v-model="form.commonName" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="批准文号">
        <el-input v-model="form.drugApproval" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="厂商简称">
        <el-input v-model="form.firmName" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="otc非处方药">
        <el-input v-model="form.otcValue" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="是否医保">
        <el-input v-model="form.insuranceValue" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="药品大类">
        <el-input v-model="form.drugClass" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="药品小类">
        <el-input v-model="form.drugClass2" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="适应性/功能主治">
        <el-input
          disabled
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="暂无"
          v-model="form.drugIntroduce">
        </el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.drugPrice" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="form.drugStock" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="库存预警量">
        <el-input v-model="form.drugWarning" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="商品推荐">
        <el-input v-model="form.drugRecommend" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="剂型">
        <el-input v-model="form.drugForm" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <el-form-item label="最小计量">
        <el-input v-model="form.minDose" disabled placeholder="暂无"></el-input>
      </el-form-item>
      <!--<el-form-item label="药品图片">-->
        <!--<img :src="form.drugImage" style="max-width: 200px;height: auto;">-->
      <!--</el-form-item>-->
    </el-form>


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
    <div class="back-btn">
      <el-button @click="goBack">返回</el-button>
      <el-button type="primary" @click="goBack">提交</el-button>
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
  export default class DrugDetail extends Vue {
    form = {
      drugName: '裸花紫珠颗粒',
      commonName: '裸花紫珠颗粒',
      drugApproval: 'Z20060378',
      firmName: '江西普正制药有限公司',
      otcValue: '否',
      insuranceValue: '否',
      drugClass: '',
      drugClass2: '',
      drugIntroduce: '',
      drugPrice: '22',
      drugStock: '22',
      drugWarning: '22',
      drugRecommend: '否',
      drugForm: '颗粒剂',
      minDose: ''
      // drugImage: require(`~/assets/img/hospital/img1.png`)
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
    goBack () {
      this.$router.push('/drugCheck/drug')
    }
  }
</script>

<style scoped lang="scss">
  /deep/.drug-detail{
    padding: 10px;
    .el-form{
      margin-right: 100px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 50px) 150px repeat(3, 50px);
      .el-form-item{
        &:nth-child(9){
          grid-column: 1 / 3;
        }

      }
    }
    .back-btn{
      display: flex;
      justify-content: center;
      padding: 50px;
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
</style>
