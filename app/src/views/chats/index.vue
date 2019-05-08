<template>
  <new-layout>
    <template slot="center">
      <div v-for="(item, key) in list" :key="key" @click="onConsult(item)">
        <new-white-space />
        <chat-wrapper :item="item" />
      </div>
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
import chatWrapper from '@/components/chats/chatWrapper';
export default {
  name: '',
  components: {
    chatWrapper
  },
  mixins: [],
  data() {
    return {
      list: [],
      type: this.$route.query.type
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      let url =
        this.type === 'PHARMACIST'
          ? '/api/app/chats/pharmacists'
          : '/api/app/chats/customerServices';
      this.list = await this.$http.get(url);
    },
    async onConsult(user) {
      let data = {
        accountId: this.account.id,
        userId: user.id,
        type: this.type,
        chatId: this.$route.query.chatId
      };
      let chat = await this.$http.post(`/api/app/chats`, data);
      this.loadPageChatsView(user, chat.id);
    }
  }
};
</script>
