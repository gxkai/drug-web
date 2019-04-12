<template>
  <div>
    <new-layout>
      <template slot="center">
        <info-cell label="收货人" v-model="address.consignee" placeholder="请输入姓名"/>
        <info-cell label="电话" v-model="address.phone" placeholder="请输入手机号码" />
        <info-cell label="地区" value="昆山" disabled />
        <info-cell label="地址" v-model="address.address" placeholder="选择收货地址" disabled @click.native="setPosition"/>
        <info-cell label="详细地址" v-model="address.room" placeholder="例：8号楼404室" />
      </template>
      <template slot="bottom">
        <new-submit-button name="保存" @click.native="save"/>
      </template>
    </new-layout>
  </div>
</template>
<style scoped type="text/less" lang="less">
</style>
<script>
  import infoCell from '@/components/addresses/infoCell';
  export default {
    name: '',
    components: {
      infoCell
    },
    data() {
      return {
        address: {
          id: this.$route.query.id,
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
        let position = { lat: this.address.lat, lng: this.address.lng, name: this.address.address };
        to.params.position = position;
      }
      next();
    },
    mounted() {
    },
    methods: {
      setPosition() {
        this.loadPageAddressesConfirm();
      },
      async initData() {
        this.address = await this.$http.get(`/api/addresses/${this.address.id}`);
      },
      async save() {
        if (this.address.id !== undefined) {
          await this.$http.put(`/api/addresses/${this.address.id}`, this.address);
        } else {
          this.address = await this.$http.post('/api/addresses/', this.address);
        }
        this.$toast('保存成功');
        setTimeout(() => {
          this.$router.go(-1);
        }, 3000);
      }
    }
  };
</script>
