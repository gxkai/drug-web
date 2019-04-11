<template>
    <div class="wrapper hairline-bottom">
      <div class="left">
        <van-icon name="dizhi-" color="#d7000e"/>
      </div>
      <div class="right">
        <div class="line1">
          {{item.room}}
        </div>
        <div class="line2">
          {{item.address}}
        </div>
        <div class="line3">
          {{`${item.consignee}    ${item.phone}`}}
        </div>
      </div>
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
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    padding: 10px 15px;
    background-color: white;
    .right {
      .line2, .line3 {
        margin-top: 15px;
        font-size: $size-mini;
        color: $gray;
      }
    }
  }
</style>
