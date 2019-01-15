<template>
  <new-layout class="card_bind">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="card_bind-list">
        <div class="card_bind-list-item">
          <div class="card_bind-list-item-left">
            <i class="iconfont ic-xingming"></i>
          </div>
          <div class="card_bind-list-item-right">
            <input type="text" v-model="account.name" readonly/>
          </div>
        </div>
        <div class="card_bind-list-item">
          <div class="card_bind-list-item-left">
            <i class="iconfont ic-Id"></i>
          </div>
          <div class="card_bind-list-item-right">
            <input type="text" v-model="account.identityNumber" readonly/>
          </div>
        </div>
        <div class="card_bind-list-item">
          <div class="card_bind-list-item-left">
            <i class="iconfont ic-shouji"></i>
          </div>
          <div class="card_bind-list-item-right">
            <input type="text" v-model="account.username" readonly/>
          </div>
        </div>
        <div class="card_bind-list-item">
          <div class="card_bind-list-item-left">
            <i class="iconfont ic-yibaoqia"></i>
          </div>
          <div class="card_bind-list-item-right">
            <input type="text" v-model="account.medicaidNumber" readonly />
          </div>
        </div>
      </div>
    </template>
    <!--<div class="card_bind-footer">-->
      <!--<span @click="bind()">-->
        <!--确认绑定-->
      <!--</span>-->
    <!--</div>-->
  </new-layout>

</template>

<script>
  import {getAccount, setAccount} from '@/storage';

  export default {
    data() {
      return {
        account: getAccount(),
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
      async bind() {
        await this.$http.put('/accounts', this.account);
        setAccount(this.account);
        if (this.fromPath.includes('/orders/create')) {
          this.$router.go(-1);
        } else {
          this.$router.push({
            path: '/accounts/card/bind/success'
          });
        }
      }
    }
  };
</script>

<style scoped type="text/scss" lang="scss">
  .card_bind {
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
            color: $themeColor;
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
