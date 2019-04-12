<template>
  <div class="attention-wrapper">
    {{content}}
  </div>
</template>

<script>
  export default {
    props: {
      content: {}
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
  .attention-wrapper {
    font-size: $size-mini;
    color: $gray-light;
    background-color: white;
    padding: 24px 40px;
  }
</style>
