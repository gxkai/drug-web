<template>
  <div class="card_bind">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="card_bind-list">
      <div class="card_bind-list-item">
        <div class="card_bind-list-item-left">
          <i class="iconfont ic-xingming"></i>
        </div>
        <div class="card_bind-list-item-right">
          <input type="text" v-model="account.name" placeholder="请输入姓名" />
        </div>
      </div>
      <div class="card_bind-list-item">
        <div class="card_bind-list-item-left">
          <i class="iconfont ic-Id"></i>
        </div>
        <div class="card_bind-list-item-right">
          <input type="text" v-model="account.identityNumber" placeholder="请输入身份证号码" />
        </div>
      </div>
      <div class="card_bind-list-item">
        <div class="card_bind-list-item-left">
          <i class="iconfont ic-shouji"></i>
        </div>
        <div class="card_bind-list-item-right">
          <input type="text" v-model="account.username" placeholder="请输入手机号码"/>
        </div>
      </div>
      <div class="card_bind-list-item">
        <div class="card_bind-list-item-left">
          <i class="iconfont ic-yibaoqia"></i>
        </div>
        <div class="card_bind-list-item-right">
          <input type="text" v-model="account.medicaidNumber" placeholder="请输入医保卡编号" />
        </div>
      </div>
    </div>
    <div class="card_bind-footer">
      <span @click="bind()">
        确认绑定
      </span>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        account: this.$store.getters.account,
        fromPath: ''
      };
    },
    created() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fromPath = from.path;
      });
    },
    methods: {
      bind() {
        this.$http.put('/accounts', this.account)
          .then(res => {
            this.$store.commit('SET_ACCOUNT', this.account);
            if (this.fromPath.includes('/orders/create')) {
              this.$router.go(-1);
            } else {
              this.$router.push({
                path: '/accounts/card/bind/success'
              });
            }
          })
          .catch((error) => {
            this.exception(error);
          });
      }
    }
  };
</script>

<style scoped type="text/less" lang="less">
  .card_bind {
    height: 100vh;
    overflow: auto;
    background-color: #f5f5f5;
    &-list {
      &-item {
        padding: 15px 30px;
        display: flex;
        align-items: center;
        background-color: white;
        margin-top: 20px;
        &-right {
          input {
            width: 400px;
            margin-left: 150px;
            font-size: 28px;
            &::placeholder{
              text-align: left;
              color: #CCCCCC;
            }
            outline: none;
            border: none;
          }
        }
        &-left {
          .iconfont {
            color: #1AB6FD;
            font-size: 60px;
          }
        }
      }
    }
    &-footer {
      width: 100%;
      text-align: center;
      margin-top: 50px;
      span {
        font-size: 30px;
        padding: 15px 130px;
        border: 1PX solid white;
        color: white;
        font-weight: normal;
        border-radius: 20PX;
        background:linear-gradient(0deg,rgba(19,193,254,1),rgba(82,210,255,1));
      }
    }
  }
</style>
