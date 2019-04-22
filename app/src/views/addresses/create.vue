<template>
  <div>
    <new-layout>
      <template slot="center">
        <info-cell
          v-model="item.consignee"
          label="收货人"
          placeholder="请输入姓名"
        />
        <info-cell
          v-model="item.phone"
          label="电话"
          placeholder="请输入手机号码"
        />
        <info-cell label="地区" value="昆山" disabled />
        <info-cell
          v-model="item.address"
          label="地址"
          placeholder="选择收货地址"
          disabled
          @click.native="setPosition"
        />
        <info-cell
          v-model="item.room"
          label="详细地址"
          placeholder="例：8号楼404室"
        />
      </template>
      <template slot="bottom">
        <new-submit-button name="保存" @click.native="save" />
      </template>
    </new-layout>
  </div>
</template>
<script>
import infoCell from '@/components/addresses/infoCell';
export default {
  name: '',
  components: {
    infoCell
  },
  data() {
    return {
      item: {}
    };
  },
  created() {
    this.initData();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let position = vm.$route.params.position;
      if (position !== undefined) {
        vm.$set(vm.item, 'lat', position.lat);
        vm.$set(vm.item, 'lng', position.lng);
        vm.$set(vm.item, 'address', position.name);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.item.lat !== undefined) {
      let position = {
        lat: this.item.lat,
        lng: this.item.lng,
        name: this.item.address
      };
      to.params.position = position;
    }
    next();
  },
  methods: {
    setPosition() {
      this.loadPageAddressesConfirm();
    },
    async initData() {
    },
    async save() {
      this.item = await this.$http.post('/api/addresses/', this.item);
      this.$toast('保存成功');
      setTimeout(() => {
        this.$router.go(-1);
      }, 3000);
    }
  }
};
</script>
