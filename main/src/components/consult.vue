<template>
  <new-move class="consult">
    <img
      v-lazy="image"
      @click="show = !show"
    />
    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    >
    </van-actionsheet>
  </new-move>
</template>

<script>
  export default {
    name: 'Consult',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        show: false,
        image: require('../assets/image/chat.png'),
        actions: [
          {
            name: '药师咨询',
            url: { name: '/chats', params: { type: 'PHARMACIST' } }
          },
          {
            name: '客服咨询',
            url: { name: '/chats', params: { type: 'CUSTOMER_SERVICE' } }
          }
        ]
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onSelect(item) {
        this.show = false;
        this.$router.push(item.url);
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
