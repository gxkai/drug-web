<template>
    <span :style="{
    fontSize:fontSize,
    color: color,
    borderColor: borderColor,
     borderWidth:borderWidth,
     borderStyle:borderStyle,
     backgroundColor: backgroundColor,
     borderRadius: borderRadius,
     fontWeight: fontWeight
     }">
      {{name}}
    </span>
</template>

<script>
  export default {
    name: '',
    props: {
      name: {
        default: '我是按钮'
      },
      color: {
        default: 'red'
      },
      borderWidth: {
        default: '1px'
      },
      borderColor: {
        default: 'red'
      },
      borderStyle: {
        default: 'solid'
      },
      backgroundColor: {
        default: 'white'
      },
      fontSize: {
        default: '.4rem'
      },
      borderRadius: {
        default: ''
      },
      fontWeight: {
        default: ''
      }
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
  span {
    padding: 10px 20px;
  }
</style>
