<template>
  <new-layout class="address-edit">
    <template slot="top">
      <van-nav-bar
        :title="id === undefined ? '地址创建' : '地址编辑'"
        left-arrow
        right-text="保存"
        @click-left="$router.go(-1)"
        @click-right="save()"
      />
    </template>

    <template slot="center">
      <van-cell-group>
        <van-field
          v-model="address.consignee"
          label="姓名"
          placeholder="请输入姓名" />
        <van-field
          v-model="address.phone"
          label="手机号码"
          type="tel"
          placeholder="请输入手机号码" />
        <van-field
          value="昆山市"
          label="地区"
          disabled/>
        <van-field
        v-model="address.address"
        label="地址"
        type="text"
        placeholder="选择收货地址"
        @click="$router.push('/addresses/confirm')"
        />
        <van-field
          v-model="address.detail"
          label="门牌号"
          type="text"
          placeholder="例：8号楼404室"
        />
      </van-cell-group>

      <van-cell-group class="mt-l-20 address-edit__checkbox">
        <van-checkbox v-model="address.defaulted">设为默认地址</van-checkbox>
      </van-cell-group>
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-checkbox {
    &__label {
      font-size: 25px!important;
    }
  }
  .address-edit {
    &__checkbox {
      padding: 20px;
    }
  }
</style>
<script>
  export default {
    name: 'addressesUpdate',
    data() {
      return {
        address: {},
        id: this.$route.query.id
      };
    },
    created() {
      if (this.id !== undefined) {
        this.getList();
      }
    },
    mounted() {
    },
    methods: {
      getList() {
        this.$axios.get('/addresses/' + this.id)
          .then((res) => {
            this.address = res.data;
          })
          .catch((error) => {
            this.exception(error);
          });
      },
      save() {
        if (this.id !== undefined) {
          this.$axios.put('/addresses/' + this.id, this.address)
            .then((res) => {
              let instance = this.$toast('保存成功');
              setTimeout(() => {
                instance.close();
                this.$router.go(-1);
              }, 2000);
            })
            .catch((error) => {
              this.exception(error);
            });
        } else {
          this.$axios.post('/addresses/', this.address)
            .then((res) => {
              let instance = this.$toast('保存成功');
              setTimeout(() => {
                instance.close();
                this.$router.go(-1);
              }, 2000);
            })
            .catch((error) => {
              this.exception(error);
            });
        }
      }
    }
  };
</script>
