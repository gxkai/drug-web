<template>
  <new-layout class="address">
    <template slot="top">
      <van-nav-bar
        :title="$route.name"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </template>
    <template slot="center">
      <div class="address__content"
      >
        <div class="address__content__item"
             v-for="(address,index) in list" :key="index">
          <div class="address__content__item__top">
          <span class="address__content__item__top-consignee">
            {{address.consignee}}
          </span>
            <span class="address__content__item__top-phone">
            {{address.phone}}
          </span>
          </div>
          <div class="address__content__item__bottom">
            <!--<div class="address__content__item__bottom-default">-->
              <!--<van-icon name="moren" size="4em" color="#FF0000" v-show="address.defaulted"></van-icon>-->
            <!--</div>-->
            <span class="address__content__item__bottom-address">{{`${address.address}  ${address.room}`}}</span>
            <van-icon name="edit" size="3em"
                      @click="$router.push({path:'/addresses/edit',query:{id:address.id}})"></van-icon>
            <van-icon name="delete" size="3em"
                      @click="del(address.id,index)"></van-icon>
          </div>
        </div>
      </div>
    </template>
    <template slot="bottom">
      <div class="address__footer"
           @click="$router.push('/addresses/edit')">
        +新增地址
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  .address {
    &__content {
      flex: 1;
      &__item {
        background-color: white;
        &:first-child {
          margin-top: 20px;
        }
        margin-bottom: 20px;
        &__top {
          padding: 20px;
          &-consignee {
            font-size:28px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(51,51,51,1);
          }
          &-phone {
            font-size:28px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(51,51,51,1);
          }
        }
        &__bottom {
          padding: 10px 20px;
          display: flex;
          align-items: center;
          &-default {
            width: 100px;
          }
          &-address {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            font-size:28px;
            font-family:HiraginoSansGB-W3;
            font-weight:normal;
            color:rgba(153,153,153,1);
            padding-left: 30px;
          }
          .van-icon {
            &-moren {
            }
            &-delete {
              margin-left: 10px;
            }
          }
        }
      }
    }
    &__footer {
      width:720px;
      height:100px;
      background:$themeColor;
      line-height: 100px;
      font-size:32px;
      font-family:HiraginoSansGB-W3;
      font-weight:normal;
      color:rgba(255,255,255,1);
      text-align: center;
    }
  }
</style>
<script>
  export default {
    name: 'addressesEdit',
    data() {
      return {
        list: []
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/addresses');
      },
      del(id, index) {
        this.$dialog.confirm({ message: '确定删除？' }).then(async () => {
          await this.$http.delete('/addresses/' + id);
          this.list.splice(index, 1);
          this.$toast.success('成功');
        });
      }
    }
  };
</script>
