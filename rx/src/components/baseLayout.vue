<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .container {
    display: flex;
    flex-flow: column;
    height: 100vh;
    main {
      flex: 1;
      overflow: auto;
    }
  }
</style>
<script>
	export default {
	  name: 'baseLayout',
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
