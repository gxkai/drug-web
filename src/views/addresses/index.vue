<template>
  <div class="address-body">
    <new-header title="地址管理">
      <i class="icon-font ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
    </new-header>
    <div class="address-content" v-for="(address,index) in addressList" :key="index">
      <div class="address-content-lineOne">
        <span>{{address.consignee}}</span>
        <span>{{address.phone}}</span>
      </div>
      <div class="address-content-lineTwo">
        <img v-if="address.defaulted" src="../../assets/image/defaulPic.png"/>
        <span>{{address.address}}</span>
        <router-link :to="{path:'/addresses/edit',query:{id:address.id}}" class="address-content-edit">
          <img src="../../assets/image/edit.png"/>
        </router-link>
        <button @click="del(address.id,index)">删除</button>
      </div>
    </div>
    <router-link tag="button" to="/addresses/create" class="address-footer">+ 新增地址</router-link>
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
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-family: HiraginoSansGB-W3;
  }

  .address-body {
    width: 720px;
    height: 100vh;
  }

  .address-content {
    width: 720px;
    height: 100px;
    margin-top: 31px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .address-content-lineOne {
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 18px;
  }

  .address-content-lineOne span {
    margin-right: 22px;
  }

  .address-content-lineTwo {
    width: 720px;
    height: 42px;
    display: flex;
  }

  .address-content-lineTwo img {
    width: 48px;
    height: 30px;
    margin-top: 8px;
    margin-right: 30px;
  }

  .address-content-lineTwo span {
    width: 475px;
    height: 42px;
    font-size: 28px;
    color: rgba(153, 153, 153, 1);
    margin-right: 50px;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .address-content-edit img {
    width: 33px;
    height: 36px;
    position: absolute;
    right: 80px;
  }

  .address-content-lineTwo button {
    width: 60px;
    height: 36px;
    position: absolute;
    right: 30px;
    margin-top: 8px;
  }

  .address-footer {
    width: 720px;
    height: 100px;
    background: rgba(19, 193, 254, 1);
    border: 0;
    outline: none;
    font-size: 32px;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
    position: fixed;
    bottom: 0;
  }

</style>
