<template>
  <div class="shop-edit">
    <bread-crumb :path="$route.path"/>
    <div class="check-form">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="药店名称：">
          <el-input v-model="form.shopName" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="店内电话：">
          <el-input v-model="form.shopPhone" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名：">
          <el-input v-model="form.legalName" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="form.idNumber" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.shopEmail" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="法人手机号：">
          <el-input v-model="form.legalPhone" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="税务登记号：">
        <el-input v-model="form.taxNumber" disabled placeholder="暂无"></el-input>
      </el-form-item>
        <el-form-item label="经营许可证号：">
          <el-input v-model="form.shopLicence" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="form.shopLng" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item label="纬度：">
          <el-input v-model="form.shopLat" disabled placeholder="暂无"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-map">
          <baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>
          </baidu-map>
        </el-form-item>
        <el-form-item label="是否支持医保：">
          <el-input v-model="form.orMedicine" disabled placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="是否支持统筹：">
          <el-input v-model="form.orOverall" disabled placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="是否配送：">
          <el-input v-model="form.orDelivery" disabled placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="配送距离：">
          <el-input v-model="form.delDistance" placeholder="3公里 默认 监管可以修改"></el-input>
        </el-form-item>
        <el-form-item label="商家介绍：" class="el-form-item-textarea">
          <el-input
            disabled
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8}"
            placeholder="暂无"
            v-model="form.shopIntroduce">
          </el-input>
        </el-form-item>
      </el-form>

      <div class="shop-check-img">
        <section>
          <strong>药品封面照</strong>
          <div><img :src="imageUrl"></div>
        </section>
        <section>
          <strong>店内照片</strong>
          <div>
            <span v-for="item in shopImg" :key="item.id">
              <img :src="item.imageUrl">
            </span>
          </div>
        </section>
        <section>
          <strong>上传证件资料</strong>
          <div>
            <span v-for="item in cardImg" :key="item.id">
              <img :src="item.imageUrl">
              <i>{{ item.text }}</i>
            </span>
          </div>
        </section>
      </div>
      <div class="check-form-btn">
        <el-button @click="goback">返回</el-button>
      </div>
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
  export default class ShopDetail extends Vue {
    form = {
      shopName: '百家惠',
      shopPhone: '17789563214',
      legalName: '百家惠',
      idNumber: '111',
      shopEmail: '12345@qq.com',
      legalPhone: '17774123658',
      taxNumber: '1234568555',
      shopLicence: 'qwer1234',
      shopLng: '120.897081',
      shopLat: '31.405473',
      orMedicine: '是',
      orOverall: '是',
      orDelivery: '是',
      delDistance: '',
      shopIntroduce: ''
    }
    center = {lng: 0, lat: 0}
    zoom = 3
    imageUrl = require(`~/assets/img/hospital/img1.png`)
    shopImg = [
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
    cardImg = [
      {
        id: '0',
        imageUrl: require(`~/assets/img/hospital/img1.png`),
        text: '经营许可证'
      },
      {
        id: '1',
        imageUrl: require(`~/assets/img/hospital/img1.png`),
        text: '营业执照'
      },
      {
        id: '2',
        imageUrl: require(`~/assets/img/hospital/img1.png`),
        text: 'GSP证书'
      },
      {
        id: '3',
        imageUrl: require(`~/assets/img/hospital/img1.png`),
        text: '手持身份证照片'
      }
    ]
    goback () {
      this.$router.push('/shopCheck/shop')
    }
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 120.897081
      this.center.lat = 31.405473
      this.zoom = 15
    }
  }
</script>


<style scoped lang="scss">
.shop-edit{
  padding: 10px;
  .check-form{
    padding:0 100px 0 0;
    .el-form{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: repeat(5, 50px) 300px repeat(2, 50px) 200px;
      .el-form-item{
        &:nth-child(1),&:nth-child(3),&:nth-child(5),&:nth-child(7),&:nth-child(9),&:nth-child(12),&:nth-child(14){
          grid-column: 1 / 3;
        }
        &:nth-child(2),&:nth-child(4),&:nth-child(6),&:nth-child(8),&:nth-child(10),&:nth-child(13),&:nth-child(15){
          grid-column: 3 / 5;
        }
        &.el-form-item-textarea{
          grid-column: 1 / 5;
        }
        &.el-form-item-map{
          grid-column: 1 / 5;
          .bm-view {
            width: 100%;
            height: 260px;
          }
        }
      }
    }
  }
  .shop-check-img{
    margin-left: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 220px 220px;
    section{
      img{
        max-width: 100%;
        height: 160px;
      }
      strong{
        display: block;
        line-height: 3;
        font-size: 16px;
        text-indent: 50px;
      }
      &:nth-child(1){
         grid-column: 1 / 2;
        >div{
          text-align: center;
        }
       }
      &:nth-child(2){
        grid-column: 2 / 5;
        >div{
          display: flex;
          span{
            flex: 0 0 33.33%;
            text-align: center;
          }
        }
      }
      &:nth-child(3){
        grid-column: 1 / 5;
        >div{
          display: flex;
          span{
            position: relative;
            width: 25%;
            text-align: center;
            i{
              width: 100%;
              position: absolute;
              left: 0;
              bottom: 30%;
              z-index: 99;
              font-size: 16px;
              color: #333333;
              font-style: normal;
            }
          }
        }
      }
    }
  }
}

.check-form-btn{
  display: flex;
  justify-content: center;
  padding: 50px;
}

</style>
