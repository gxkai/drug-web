<template>
  <new-layout>
    <template slot="center">
      <iframe :src="url" height="100%" width="100%"> </iframe>
    </template>
  </new-layout>
</template>

<script>
export default {
  name: '',
  mixins: [],
  data() {
    return {
      url: this.$route.query.url,
      name: this.$route.query.name
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
