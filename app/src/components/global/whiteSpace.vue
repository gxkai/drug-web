<template>
  <div :style="styleObject" class="white-space"></div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    size: {
      default: '.2rem'
    },
    color: {
      default: '#f5f5f5'
    }
  },
  data() {
    return {
      styleObject: {
        marginTop: `${this.size}`,
        backgroundColor: `${this.color}`
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
