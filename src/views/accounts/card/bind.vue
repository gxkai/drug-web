<template>
  <!--<div class="f_body">-->
    <!--<mt-header title="医保卡绑定">-->
      <!--<router-link to="/accounts" slot="left">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
    <!--</mt-header>-->

    <!--<div class="f_medical_card_bin_lists">-->
      <!--<div class="f_medical_card_bin_list">-->
        <!--<i class="icon iconfont ic-xingming" id="ic_xingming"></i>-->
        <!--<input type="text" v-model="account.name" placeholder="请先维护账户信息" disabled/>-->
      <!--</div>-->

      <!--<div class="f_medical_card_bin_list">-->
      <!--<i class="icon iconfont ic-Id" id="ic_Id"></i>-->
        <!--<input type="number" v-model="account.identityNumber" placeholder="请先维护账户信息" disabled/>-->
      <!--</div>-->

      <!--<div class="f_medical_card_bin_list">-->
      <!--<i class="icon iconfont ic-shouji" id="ic_shouji"></i>-->
        <!--<input type="number" v-model="account.username" placeholder="请输入手机号码" disabled/>-->
      <!--</div>-->

      <!--<div class="f_medical_card_bin_list">-->
          <!--<i class="icon iconfont ic-Id" id="ic_yibaocard"></i>-->
        <!--<input type="number" v-model="account.medicalNumber" placeholder="请输入医保卡编号"/>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="f_medical_card_bin_button">-->
      <!--<button @click="bind()">确认绑定</button>-->
    <!--</div>-->
  <!--</div>-->

  <div class="content">
    <mt-header title="医保卡绑定">
      <router-link to="/accounts" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <nav class="panel is-mobile">
      <p class="panel-heading">
        repositories
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search">
          <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
        </p>
      </div>
      <p class="panel-tabs">
        <a class="is-active">all</a>
        <a>public</a>
        <a>private</a>
        <a>sources</a>
        <a>forks</a>
      </p>
      <a class="panel-block is-active">
    <span class="panel-icon">
      <i class="fas fa-book"></i>
    </span>
        bulma
      </a>
      <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-book"></i>
    </span>
        marksheet
      </a>
      <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-book"></i>
    </span>
        minireset.css
      </a>
      <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-book"></i>
    </span>
        jgthms.github.io
      </a>
      <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-code-branch"></i>
    </span>
        daniellowtw/infboard
      </a>
      <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-code-branch"></i>
    </span>
        mojs
      </a>
      <label class="panel-block">
        <input type="checkbox">
        remember me
      </label>
      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth">
          reset all filters
        </button>
      </div>
    </nav>


  </div>

</template>

<script>
// import {MessageBox} from 'mint-ui';
// import exception from 'static/js/exception';

export default {
  data() {
    return {
      account: {}
    };
  }
  // created() {
  //   this.account = this.$store.getters.account;
  // },
  // methods: {
  //   bind: function () {
  //     if (this.account.medicalNumber === '' || this.account.medicalNumber == null) {
  //       MessageBox('提示', '医保不能为空');
  //       return;
  //     }
  //     this.$http.put(this.URL_PATH + '/accounts', this.account, {
  //       headers: {
  //         'Authorization': this.$store.getters.token
  //       }
  //     })
  //       .then((res) => {
  //         this.$store.commit('setAccount', this.account);
  //         this.$router.push({
  //           name: '/accounts/bind/success',
  //           params: {
  //             bind: 1
  //           }
  //         });
  //       })
  //       .catch((error) => {
  //         exception.message(error);
  //       });
  //   }
  // }
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
    height: 100%;
  }

  .f_medical_card_bin_list {
    background: white;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 0.5rem;
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
    #ic_xingming,#ic_Id,#ic_shouji,#ic_yibaocard{color: #1AB6FD;margin-right: 10%;font-size:2rem;}
</style>
