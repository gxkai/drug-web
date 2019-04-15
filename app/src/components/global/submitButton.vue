<template>
  <footer :style="{ backgroundColor: backgroundColor }" @click="$emit('click')">
    <span>
      {{ name }}
    </span>
  </footer>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    name: {},
    backgroundColor: {
      default: '#f02b2b'
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

<style scoped type="text/scss" lang="scss">
footer {
  margin-bottom: 20px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: white;
  }
}
</style>
