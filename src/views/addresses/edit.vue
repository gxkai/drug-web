<template>
  <div class="body">
    <mt-header title="地址修改">
      <router-link to="#" slot="left">
        <mt-button icon="back" @click="$router.go(-1)"></mt-button>
      </router-link>
      <mt-button slot="right" @click="save()" class="mint-button-text">保存</mt-button>
    </mt-header>
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
          <input type="number" v-model="address.tel">
        </div>
      </div>
      <div class="line1"></div>
      <div class="input1">
        <div class="left">
          <span class="span1">所在地区</span>
        </div>
        <div class="right">
          <input type="text" v-model="address.area">
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
        <input type="checkbox" v-model="isDefault" @click="changeState()">
        <i></i>
        <span>设为默认地址 </span>
      </label>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  export default {
    name: 'addressesUpdate',
    data() {
      return {
        address: {},
        id: this.$route.query.id,
        isDefault: false
      };
    },
    created() {
      this.getList();
    },
    methods: {
      changeState() {
        this.isDefault = !this.isDefault;
      },
      getList() {
        this.$http.get('/addresses/' + this.id)
          .then((res) => {
            this.address = res.data;
            this.isDefault = this.address.isDefault;
          })
          .catch((error) => {
            this.exception(error);
          });
      },
      save() {
        this.$http.put('/addresses/' + this.id, this.address)
          .then((res) => {
            MessageBox('提示', '保存成功');
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped>
  .body {
    background-color: whitesmoke;
    height: 100vh;
    width: 100%;
  }

  .body1 {
    width: 720px;
    height: 300px;
    background: rgba(255, 255, 255, 1);
    margin-top: 10px;
  }

  .input1 {
    width: 720px;
    height: 60px;
    display: inline-flex;
  }

  .input1 .left {
    width: 150px;
    height: 60px;
  }

  .input1 .left .span1 {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
    line-height: 50px;
    margin-left: 16px;
  }

  .input1 .right {
    width: 570px;
    height: 60px;
  }

  .input1 .right input {
    width: 570px;
    height: 60px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    line-height: 40px;
    outline: none;
    border: 0;
  }

  .input2 {
    width: 720px;
    height: 100px;
    display: inline-flex;
  }

  .input1 .left {
    width: 150px;
    height: 100px;
  }

  .input2 .left .span1 {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
    line-height: 50px;
    margin-left: 16px;
  }

  .input2 .right {
    width: 570px;
    height: 100px;
  }

  .input2 .right textarea {
    width: 570px;
    height: 100px;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    outline: none;
    border: 0;
    resize: none;
    margin-left: 19px;
    margin-top: 6px;
  }

  .line1 {
    width: 681px;
    height: 2px;
    background: rgba(229, 229, 229, 1);
    opacity: 0.58;
    margin: 1px auto;
  }

  .body2 {
    width: 720px;
    height: 58px;
    background: rgba(255, 255, 255, 1);
    margin-top: 10px;
    display: inline-flex;
  }

  label {
    width: 100%;
    font-size: 24px;
    cursor: pointer;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 55px;
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
    border: rgba(191, 191, 191, 1) 1px solid;
    border-radius: 50%;
  }

  input[type="checkbox"],
  input[type="radio"] {
    display: none;
  }

  input[type="checkbox"]:checked + i,
  input[type="radio"]:checked + i {
    background: #1AB6FD;
  }

  input[type="checkbox"]:disabled + i,
  input[type="radio"]:disabled + i {
    border-color: #1AB6FD;
  }

  input[type="checkbox"]:checked:disabled + i,
  input[type="radio"]:checked:disabled + i {
    background: #1AB6FD;
  }

  .mint-button-text {
    font-size: 13px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }
</style>
