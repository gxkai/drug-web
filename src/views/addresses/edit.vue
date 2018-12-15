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
        @click="setPosition()"
        />
        <van-field
          v-model="address.lat"
          label="经度"
          style="display: none"
          disabled/>
        <van-field
          v-model="address.lng"
          label="纬度"
          style="display: none"
          disabled/>
        <van-field
          v-model="address.room"
          label="详细地址"
          type="text"
          placeholder="例：8号楼404室"
        />
      </van-cell-group>

      <van-cell-group class="mt-l-20 address-edit__checkbox">
        <van-checkbox v-model="address.defaulted" >设为默认地址</van-checkbox>
      </van-cell-group>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss">
  #{'/deep/'}.van-checkbox {
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
    name: 'addressUpdate',
    data() {
      return {
        address: {
          consignee: '',
          phone: '',
          address: '',
          lat: '',
          lng: '',
          room: '',
          defaulted: false
        },
        id: this.$route.query.id
      };
    },
    created() {
      if (this.id !== undefined) {
        this.getList();
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$route.meta.keepAlive = false;
      next();
    },
    activated() {
      if (this.$route.query.position !== undefined) {
        const position = JSON.parse(this.$route.query.position);
        this.address.lat = position.location.lat;
        this.address.lng = position.location.lng;
        this.address.address = position.name;
      }
    },
    methods: {
      setPosition() {
        if (this.address.lat !== '') {
          const location = {
            lat: this.address.lat,
            lng: this.address.lng
          };
          this.$router.push({ path: '/addresses/confirm', query: { location: JSON.stringify(location) } });
        } else {
          this.$router.push('/addresses/confirm');
        }
      },
      async getList() {
        this.address = await this.$http.get('/addresses/' + this.id);
      },
      async save() {
        if (this.id !== undefined) {
          await this.$http.put('/addresses/' + this.id, this.address);
        } else {
          await this.$http.post('/addresses/', this.address);
        }
        this.$toast('保存成功');
      }
    }
  };
</script>
