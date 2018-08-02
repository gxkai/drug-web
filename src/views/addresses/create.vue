<template>
  <div class="body">
    <new-header title="新增收货地址">
      <i class="icon-font ic-arrow-right" slot="left" @click="$router.go(-1)"></i>
      <span slot="right" @click="save()">保存</span>
    </new-header>
    <div class="body1">
      <div class="input1">
        <div class="left">
          <span class="span1">姓名</span>
        </div>
        <div class="right">
          <input type="text" v-model="address.consignee">
        </div>
      </div>
      <div class="line1"></div>
      <div class="input1">
        <div class="left">
          <span class="span1">手机号码</span>
        </div>
        <div class="right">
          <input type="number" v-model="address.phone">
        </div>
      </div>
      <div class="line1"></div>
      <div class="input1">
        <div class="left">
          <span class="span1">所在地区</span>
        </div>
        <div class="right">
          <input type="text" value="江苏省昆山市" readonly>
        </div>
      </div>
      <div class="line1"></div>
      <div class="input2">
        <div class="left">
          <span class="span1">详细地址</span>
        </div>
        <div class="right">
          <textarea v-model="address.address"/>
        </div>
      </div>
    </div>
    <div class="body2">
      <label>
        <input type="checkbox"   v-model="address.defaulted">
        <i></i>
        <span>设为默认地址 </span>
      </label>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'addressesCreate',
    data() {
      return {
        address: {
          defaulted: false,
          checkboxState: false,
          phone: '',
          consignee: ''
        }
      };
    },
    methods: {
      save() {
        this.$http.post('/addresses', this.address)
          .then((res) => {
            MessageBox('提示', '保存成功').then(action => {
              this.$router.go(-1);
            });
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .ic-arrow-right:before{
    font-size: 50px;
  }

  .body {
    background-color: whitesmoke;
    height: 100vh;
    width: 100%;
  }

  .body1 {
    width:720px;
    height:300px;
    background:rgba(255,255,255,1);
    margin-top: 10px;
  }

  .input1 {
    width:720px;
    height: 60px;
    display: inline-flex;
  }

  .input1 .left {
    width: 150px;
    height: 60px;
  }

  .input1 .left .span1 {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:50px;
    margin-left: 16px;
  }

  .input1 .right {
    width: 570px;
    height: 60px;
  }

  .input1 .right input {
    width: 570px;
    height: 60px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    line-height:40px;
    outline: none;
    border: 0;
  }

  .input2 {
    width:720px;
    height: 100px;
    display: inline-flex;
  }

  .input1 .left {
    width: 150px;
    height: 100px;
  }
  .input2 .left .span1 {
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    color:rgba(153,153,153,1);
    line-height:50px;
    margin-left: 16px;
  }

  .input2 .right {
    width: 570px;
    height: 100px;
  }

  .input2 .right textarea {
    width: 570px;
    height: 100px;
    font-size:24px;
    font-family:HiraginoSansGB-W3;
    outline: none;
    border: 0;
    resize:none;
    margin-left: 19px;
    margin-top: 6px;
  }

  .line1 {
    width:681px;
    height:2px;
    background:rgba(229,229,229,1);
    opacity: 0.58;
    margin: 1px auto;
  }

  .body2 {
    width:720px;
    height:58px;
    background:rgba(255,255,255,1);
    margin-top: 10px;
    display: inline-flex;
  }


  label {
    width: 100%;
    font-size:24px;
    cursor: pointer;
    font-family:HiraginoSansGB-W3;
    color:rgba(102,102,102,1);
    line-height:55px;
    display: block;
  }

  label i {
    display: inline-block;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #fff;
    vertical-align: middle;
    margin: -2px 2px 1px 21px;
    border: rgba(191,191,191,1) 1px solid;
    border-radius: 50%;
  }

  input[type="checkbox"],
  input[type="radio"] {
    display: none;
  }

  input[type="checkbox"]:checked+ i,
  input[type="radio"]:checked+ i {
    background: #1AB6FD;
  }

  input[type="checkbox"]:disabled+ i,
  input[type="radio"]:disabled+ i {
    border-color: #1AB6FD;
  }

  input[type="checkbox"]:checked:disabled+ i,
  input[type="radio"]:checked:disabled+ i {
    background: #1AB6FD;
  }

</style>
