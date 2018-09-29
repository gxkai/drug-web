<template>
  <div class="address">
    <van-nav-bar
    :title="$route.name"
    left-arrow
    @click-left="$router.go(-1)"
    ref="header"
    />
    <div class="address__content"
    ref="content">
      <div class="address__content__item"
           v-for="(address,index) in addressList" :key="index">
        <div class="address__content__item__top">
          <span class="address__content__item__top-consignee">
            {{address.consignee}}
          </span>
          <span class="address__content__item__top-phone">
            {{address.phone}}
          </span>
        </div>
        <div class="address__content__item__bottom">
          <van-icon name="moren" size="4em" color="#FF0000"></van-icon>
          <span class="address__content__item__bottom-address">{{address.address}}</span>
          <van-icon name="edit" size="3em"
                    @click="$router.push({path:'/addresses/edit',query:{id:address.id}})"></van-icon>
          <van-icon name="delete" size="3em"
                    @click="del(address.id,index)"></van-icon>
        </div>
      </div>

    </div>
    <div class="address__footer"
         ref="footer"
    @click="$router.push('/addresses/create')">
      +新增地址
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .address {
    position: relative;
    background-color: #f5f5f5;
    &__content {
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
          padding: 0 20px;
          display: flex;
          align-items: center;
          span {
            display: inline-block;
          }
          &-address {
            width: 500px;
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
              margin-bottom: 10px;
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
      background:rgba(19,193,254,1);
      line-height: 100px;
      font-size:32px;
      font-family:HiraginoSansGB-W3;
      font-weight:normal;
      color:rgba(255,255,255,1);
      text-align: center;
      position: fixed;
      bottom: 0;
    }
  }
</style>
<script>
  import {MessageBox, Toast} from 'mint-ui';

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
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight -
        this.$refs.footer.clientHeight) + 'px';
      this.$refs.content.style.overflow = 'auto';
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
              let instance = Toast('删除成功');
              setTimeout(() => {
                instance.close();
                this.addressList.splice(index, 1);
              }, 2000);
            })
            .catch((error) => {
              this.exception(error);
            });
        });
      }
    }
  };
</script>
