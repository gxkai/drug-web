<template>
  <div class="wrapper hairline-bottom"
  >
    <div class="left van-ellipsis">
      <div class="line1 van-ellipsis">
                <span>
                  {{item.title}}
                </span>
      </div>
      <div class="line2 van-ellipsis">
                <span class="van-ellipsis">
                  {{delHtmlTag(item.content)}}
                </span>
      </div>
    </div>
    <div class="right">
      <van-icon name="arrow"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {}
    },
    name: '',
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
    padding: 23px 39px;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 10px;
    align-items: center;
    .line2 {
      margin-top: 10px;
      span {
        font-size: 20px;
        color: $gray-light;
      }
    }
  }
</style>
