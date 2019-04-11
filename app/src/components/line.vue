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
        default: '4px'
      },
      height: {
        default: '.5rem'
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
