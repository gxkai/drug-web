<template>
    <div class="wrapper" @click="$emit('click')">
      <header>
          <span class="date">
            {{item.date}}
          </span>
        <span class="tag reply" v-if="item.reply">
            已回复
          </span>
        <span class="tag no-reply" v-else>
            未回复
          </span>
      </header>
      <article>
        {{item.content}}
      </article>
    </div>
</template>

<script>
  export default {
    name: '',
    props: {
      item: {}
    },
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
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
