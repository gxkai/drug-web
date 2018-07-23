<template>
  <div style="background:white;">

    <div class="header1">
        <i class="iconfont ic-arrow-right" @click="$router.go(-1)"></i>
        <span> 地址管理</span>
    </div>
    <div class="body1">
      <div class="item" v-for="address in addressList">
        <div class="line1">
          <span class="span1">{{address.consignee}}</span>
          <span class="span2">{{address.tel}}</span>
        </div>
        <div class="line2">
          <img src="../../assets/image/defaulPic.png"  v-if="address.isDefault"/>
          <span class="span1">{{address.area.concat(address.address).substring(0,17)}}</span>
          <span v-if="address.area.concat(address.address).length > 20">...</span>
          <router-link :to="{path:'/addresses/edit',query:{id:address.id}}">
            <i class="iconfont ic-icon6"></i>
          </router-link>
          <button  @click="del(address.id,index)">删除</button>
        </div>
      </div>
    </div>

    <router-link tag="button" to="/addresses/create" class="footer1">+ 新增地址</router-link>

    <!--<div class="f_address_edit_lists" >-->
      <!--<div class="f_address_edit_list" v-for="(item,index) in addressList">-->
        <!--<div class="f_address_username">-->
          <!--<span>{{item.consignee}}</span>-->
          <!--<div class="f_address_default" v-if="item.isDefault">-->
            <!--<img src="static/img/address/default.png"/>-->
          <!--</div>-->
        <!--</div>-->

        <!--<div class="f_address_info">-->
          <!--<span>{{item.tel}}</span>-->
          <!--<span>{{item.area}}{{item.address}}</span>-->
        <!--</div>-->

        <!--<div class="f_address_edit_right">-->
          <!--<router-link :to="{path:'/addresses/edit',query:{id:item.id}}">-->
            <!--<img src="static/img/address/edit.png"/>-->
          <!--</router-link>-->
          <!--<button type="default" size="small" @click="del(item.id,index)">删除</button>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->
      <!--<router-link to="/addresses/create" class="f_footer_btn">-->
        <!--<button>+ 新增地址</button>-->
      <!--</router-link>-->
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'addressesEdit',
    data() {
      return {
        addressList: [
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': false,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          },
          {
            'consignee': '黄先生',
            'isDefault': true,
            'tel': '18890238780',
            'area': '江苏省昆山市发发发沙发发顺丰阿发沙试试',
            'address': 'as',
            'id': 1
          }
        ]
      };
    },
    created() {
      // this.getList();
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
              MessageBox('提示', '删除成功');
              this.addressList.splice(index, 1);
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
    color:rgba(153,153,153,1);
  }
  /*.mint-header {*/
    /*background: #1AB6FD;*/
    /*color: white;*/
  /*}*/

  /*.f_address_edit_right button{*/
    /*background: transparent;*/
    /*outline: none;*/
    /*border: 1px #f5f5f5 solid;*/
    /*border-radius: 5px;*/
    /*padding: 0.1rem 0.2rem;*/
    /*margin-left: 0.5rem;*/
  /*}*/
  /*.f_footer_btn {*/
    /*width: 100%;*/
    /*position: fixed;*/
    /*bottom: 0;*/
    /*text-align: center;*/
  /*}*/
  /*.f_footer_btn > button {*/
    /*width: 100%;*/
    /*padding: 1rem;*/
    /*box-sizing: border-box;*/
    /*background: #1AB6FD;*/
    /*color: #d6eeef;*/
    /*outline: none;*/
    /*border: none;*/
  /*}*/

  /*.f_address_edit_list {*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*padding: 0.5rem;*/
    /*border-bottom: 1px solid #e5e5e5;*/
    /*height: 5rem;*/
  /*}*/
  /*.f_address_username,*/
  /*.f_address_info{*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*text-align: left;*/
  /*}*/
  /*.f_address_username{*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*margin-top: 10px;*/
  /*}*/
  /*.f_address_username span{*/
    /*width: 3rem;*/
    /*text-align: center;*/
    /*padding-bottom: 0.3rem;*/
    /*box-sizing: border-box;*/
  /*}*/
  /*.f_address_info span{*/
    /*width: 18rem;*/
  /*}*/
  /*.f_address_edit_right{*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  /*}*/

</style>
