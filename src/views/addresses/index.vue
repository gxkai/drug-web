<template>
  <div style="background:white;">

    <div class="header1">
        <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
        <span> 地址管理</span>
    </div>
    <div class="body1">
      <div class="item" v-for="(address,index) in addressList" :key="index">
        <div class="line1">
          <span class="span1">{{address.consignee}}</span>
          <span class="span2">{{address.phone}}</span>
        </div>
        <div class="line2">
          <img src="../../assets/image/defaulPic.png"  v-if="address.defaulted"/>
          <span class="span1">{{address.address.substring(0,17)}}</span>
          <span v-if="address.address.length > 20">...</span>
          <router-link :to="{path:'/addresses/edit',query:{id:address.id}}">
            <i class="iconfont ic-icon6"></i>
          </router-link>
          <button  @click="del(address.id,index)">删除</button>
        </div>
      </div>
    </div>
    <router-link tag="button" to="/addresses/create" class="footer1">+ 新增地址</router-link>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'addressesEdit',
    data() {
      return {
        addressList: []
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('/addresses')
          .then((res) => {
            this.addressList = res.data;
          });
      },
      del(id, index) {
        MessageBox.confirm('确定删除？').then(action => {
          this.$http.delete('/addresses/' + id)
            .then((res) => {
              MessageBox('提示', '删除成功').then(action => {
                this.addressList.splice(index, 1);
              });
            })
            .catch((error) => {
              this.exception(error);
            });
        });
      }
    }
  };
</script>

<style scoped>

  .header1 {
    width:720px;
    height:130px;
    background:rgba(19,193,254,1);
    font-size:36px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    display: inline-flex;
    align-items: center;
  }
  .header1 i {
    margin-left: 22px;
  }

  .ic-arrow-right:before{
    font-size: 50px;
  }

  .header1 span {
    margin-left: 200px;
  }

  .footer1 {
    width:720px;
    height:100px;
    background:rgba(19,193,254,1);
    border: 0;
    outline: none;
    font-size:32px;
    font-family:HiraginoSansGB-W3;
    color:rgba(255,255,255,1);
    line-height:30px;
    position: fixed;
    bottom:0;
  }
  .body1 {
    height: calc(100vh - 230px);
    overflow: scroll;
  }

  .item .line1 {
    display: inline-flex;
    font-size:28px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    line-height:30px;
    margin-top: 22px;
  }
  .item .line1 .span1 {
    margin-left: 22px;
  }

  .item .line1 .span2 {
    margin-left: 22px;
  }

  .item .line2{
    font-size:28px;
    font-family:HiraginoSansGB-W3;
    color:rgba(51,51,51,1);
    margin-top: 22px;
    width: 720px;
    height: 60px;
  }

  .item .line2 img {
    width: 48px;
    margin-left: 22px;
  }

  .item .line2 .span1 {
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:30px;
    margin-left: 22px;
  }

  .item .line2 button {
    float: right
  }

  item i {
    float: right;
  }

  .ic-icon6:before {
    float: right;
    font-size: 40px;
    color:rgba(51,51,51,1);
  }

</style>
