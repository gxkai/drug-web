<template>
  <span
    :style="{ backgroundColor: color, width: width, height: height }"
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

<style scoped></style>
