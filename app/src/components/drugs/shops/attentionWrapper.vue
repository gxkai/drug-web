<template>
  <div class="attention-wrapper">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    content: {}
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
.attention-wrapper {
  font-size: $size-small;
  color: $gray-light;
  background-color: white;
  padding: 24px 40px;
}
</style>
