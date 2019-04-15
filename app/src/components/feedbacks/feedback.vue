<template>
  <div class="wrapper" @click="$emit('click')">
    <header>
      <span class="date">
        {{ item.date }}
      </span>
      <span v-if="item.reply" class="tag reply">
        已回复
      </span>
      <span v-else class="tag no-reply">
        未回复
      </span>
    </header>
    <article>
      {{ item.content }}
    </article>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    item: {}
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped type="text/scss" lang="scss">
.wrapper {
  background-color: white;
  padding: 10px 15px;
  header {
    .tag {
      display: inline-block;
      font-size: 18px;
      line-height: 30px;
      color: #ffffff;
      width: 90px;
      height: 30px;
      border-radius: 10px;
      text-align: center;
    }
    .reply {
      background-color: #d7000e;
    }
    .no-reply {
      background-color: #dcdcdc;
    }
  }
  article {
    font-size: $size-mini;
    color: $gray;
    margin: 20px 0;
    line-height: 35px;
  }
}
</style>
