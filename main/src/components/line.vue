<template>
    <span
    :style="{backgroundColor: color, width: width, height: height}"
    ></span>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    props: {
      width: {
        default: '1px'
      },
      height: {
        default: '2em'
      },
      color: {
        default: 'black'
      }
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

<style scoped>

</style>
