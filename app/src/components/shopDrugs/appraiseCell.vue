<template>
    <div class="wrapper hairline-bottom">
      <header>
        <new-star :score="item.score" disabled size="0.3rem"/>
        <span>
          {{item.username|asterisk}}
        </span>
      </header>
      <article>
        {{item.content||'默认好评'}}
      </article>
      <footer>
        {{item.createdDate|dateFmt("YYYY-MM-DD hh:mm:ss")}}
      </footer>
    </div>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    props: {
      item: {}
    },
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
    padding: 10px 41px;
    background-color: white;
    header {
      display: flex;
      justify-content: space-between;
      span {
        font-size: $size-mini;
      }
    }
    article {
      padding: 20px 0;
      font-size: $size-small;
    }
    footer {
      font-size: $size-mini;
      color: $gray-light;
    }
  }
</style>
