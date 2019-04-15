<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <feedback
        v-for="(item, index) in list"
        :item="item"
        :key="index"
        class="hairline-bottom"
        @click="loadPageFeedbacksView"
      />
    </template>
    <template slot="bottom">
      <new-submit-button name="新增" @click.native="add" />
    </template>
  </new-layout>
</template>
<style scoped type="text/scss" lang="scss"></style>
<script>
import feedback from '@/components/feedbacks/feedback';
export default {
  name: '',
  components: {
    feedback
  },
  mixins: [],
  data() {
    return {
      list: [
        {
          date: '2019-10-10',
          reply: true,
          content: `          什么什么什么什么什么什么什么什么事没事没理财，是互联网金融行什么什么什么事没什么台。
`
        },
        {
          date: '2019-10-10',
          reply: false,
          content: `          什么什么什么什么什么什么什么什么事没事没理财，是互联网金融行什么什么什么事没什么台。
`
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    add() {
      this.loadPageFeedbackCreate();
    }
  }
};
</script>
