<template>
  <div class="address-edit">
    <van-nav-bar
    :title="id === undefined ? '地址创建' : '地址编辑'"
    left-arrow
    right-text="保存"
    @click-left="$router.go(-1)"
    @click-right="save()"
    ref="header"
    />

    <div ref="content">
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
        type="textarea"
        placeholder="请输入详细地址"
        rows="1"
        />
      </van-cell-group>

      <van-cell-group class="mt-l-20 address-edit__checkbox">
        <van-checkbox v-model="address.defaulted">设为默认地址</van-checkbox>
      </van-cell-group>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-checkbox {
    &__label {
      font-size: 25px!important;
    }
  }
  .address-edit {
    background-color: #f5f5f5;
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
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight) + 'px';
      this.$refs.content.style.overflow = 'auto';
    },
    methods: {
      getList() {
        this.$http.get('/addresses/' + this.id)
          .then((res) => {
            this.address = res.data;
          })
          .catch((error) => {
            this.exception(error);
          });
      },
      save() {
        if (this.id !== undefined) {
          this.$http.put('/addresses/' + this.id, this.address)
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
          this.$http.post('/addresses/', this.address)
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
