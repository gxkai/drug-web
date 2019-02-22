<template>
  <new-layout class="address-edit">
    <template slot="top">
      <van-nav-bar
        :title="address.id === undefined ? '地址创建' : '地址编辑'"
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
          placeholder="请输入姓名"/>
        <van-field
          v-model="address.phone"
          label="手机号码"
          type="tel"
          placeholder="请输入手机号码"/>
        <van-field
          value="昆山市"
          label="地区"
          disabled/>
        <van-field
          v-model="address.address"
          label="定位"
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
    </template>
  </new-layout>
</template>
<style scoped type="text/less" lang="less">
  /deep/.van-field .van-cell__title {
    max-width: 160px!important;
  }
  /deep/ input {
    margin: 20px auto!important;
    line-height: normal!important;
    color: black!important;
  }
</style>
<script>
  export default {
    name: 'addressUpdate',
    data() {
      return {
        address: {
          id: this.$route.params.id,
          consignee: undefined,
          phone: undefined,
          address: undefined,
          lat: undefined,
          lng: undefined,
          room: undefined
        }
      };
    },
    created() {
      if (this.address.id !== undefined) {
        this.initData();
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        let position = vm.$route.params.position;
        if (position !== undefined) {
          vm.address.lat = position.lat;
          vm.address.lng = position.lng;
          vm.address.address = position.name;
        }
      });
    },
    beforeRouteLeave(to, from, next) {
      if (this.address.lat !== undefined) {
        let location = { lat: this.address.lat, lng: this.address.lng };
        to.query.location = location;
      }
      next();
    },
    mounted() {
    },
    methods: {
      setPosition() {
        this.$router.push('/addresses/confirm');
      },
      async initData() {
        this.$toast.loading();
        this.address = await this.$http.get('/addresses/' + this.address.id);
        this.$toast.clear();
      },
      async save() {
        this.$toast.loading();
        if (this.address.id !== undefined) {
          await this.$http.put('/addresses/' + this.address.id, this.address);
        } else {
          this.address = await this.$http.post('/addresses/', this.address);
        }
        this.$toast('保存成功');
        setTimeout(() => {
          this.$router.go(-1);
        }, 3000);
      }
    }
  };
</script>
