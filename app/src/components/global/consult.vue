<template>
  <new-move class="consult">
    <img v-lazy="image" @click="show = !show" />
    <van-actionsheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    >
    </van-actionsheet>
  </new-move>
</template>

<script>
export default {
  name: 'Consult',
  mixins: [],
  data() {
    return {
      show: false,
      image: require('@/assets/img/home/chatMan.png'),
      actions: [
        {
          name: '药师咨询',
          type: 'PHARMACIST'
        },
        {
          name: '客服咨询',
          type: 'CUSTOMER_SERVICE'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    onSelect(item) {
      this.show = false;
      this.loadPageChats(item.type);
    }
  }
};
</script>

<style scoped type="text/scss" lang="scss">
.consult {
  img {
    width: 60px;
    height: auto;
  }
}
</style>
