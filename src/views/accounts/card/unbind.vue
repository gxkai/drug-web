<template>
  <div class="f_body">
    <mt-header title="医保卡绑定">
      <router-link to="/accounts" slot="left" style="color:white;">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="f_medical_card_bin_lists">
      <div class="f_medical_card_bin_list">
        <!-- <img src="static/img/order/user.png"/> -->
         <i class="icon iconfont ic-xingming" id="ic_xingming"></i>
        <span>{{this.account.name}}</span>
      </div>

      <div class="f_medical_card_bin_list">
        <!-- <img src="static/img/order/card1.png"/> -->
        <i class="icon iconfont ic-Id" id="ic_Id"></i>
        <span>{{this.account.identityNumber}}</span>
      </div>

      <div class="f_medical_card_bin_list">
       <!--  <img src="static/img/order/phone.png"/> -->
       <i class="icon iconfont ic-shouji" id="ic_shouji"></i>
        <span>{{this.account.username}}</span>
      </div>

      <div class="f_medical_card_bin_list">
        <!-- <img src="static/img/order/card2.png"/> -->
          <i class="icon iconfont ic-Id" id="ic_yibaocard"></i>
        <span>{{this.account.medicalNumber}}</span>
      </div>
    </div>

    <div class="f_medical_card_bin_button">
      <button @click="unbind">解除绑定</button>
    </div>
  </div>
</template>

<script>
  import exception from 'static/js/exception';

  export default {
    data() {
      return {
        account: {}
      };
    },
    created() {
      if (this.$store.getters.account) {
        this.account = this.$store.getters.account;
      }
    },
    methods: {
      unbind: function () {
        this.account.medicalNumber = null;
        this.$http.put(this.URL_PATH + '/accounts', this.account, {
          headers: {
            'Authorization': this.$store.getters.token
          }
        })
          .then((res) => {
            this.$store.commit('setAccount', this.account);
            this.$router.push({name: '/accounts/bind/success'});
          })
          .catch((error) => {
            exception.message(error);
          });
      }
    }
  };
</script>

<style scoped>
   .mint-header {
    background: #1AB6FD;
    color: white
  }

  .mint-button--primary {
    background: #1AB6FD;
    color: #e2e2e2;
  }

  .f_body {
    background: #f5f5f5;
    text-align: left;
    height: 100vh;
  }

  .f_medical_card_bin_list {
    background: white;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 0.5rem;
    height:4rem;
    line-height:4rem;
  }

  .f_medical_card_bin_list > img {
    margin-right: 15%;
  }

  .f_medical_card_bin_list > span {
    width: 50%;
    margin-right: 2rem;
  }

  .f_medical_card_bin_button {
    width: 100%;
    margin-top: 2rem;
    text-align: center;
  }

  .f_medical_card_bin_button button {
    letter-spacing: 2px;
    border-radius: 20px;
    color: white;
    border: 0;
    outline: none;
    padding: 0.7rem 5rem;
    background: #1AB6FD;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #d3d3d3;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #d3d3d3;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #d3d3d3;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #d3d3d3;
  }
  .router-link-active i{color:white!important;}
  .mint-button--normal i{color:white!important;}
  .mintui-back i{color:white;}
  #ic_xingming,#ic_Id,#ic_shouji,#ic_yibaocard{color: #1AB6FD;margin-right: 10%;font-size:2rem;}
</style>
