<template>
    <div>
      <new-layout>
        <template slot="center">
          <nav-bar
            :item="item"
            v-for="(item, index) in list"
            :key="index"
            @click.native="
                clickItem(item)
              "
          />
        </template>
      </new-layout>
    </div>
</template>
<style scoped type="text/scss" lang="scss">
</style>
<script>
  import navBar from '@/components/repositories/navBar';
  export default {
    components: {
      navBar
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        list: []
      };
    },
    created() {
      this.initData();
    },
    mounted() {
    },
    methods: {
      async initData() {
        this.list = await this.$http.get('/api/repositories/home');
        console.log(this.list);
      },
      clickItem(item) {
        this.loadPageRepositoriesView(item.id);
      }
    }
  };
</script>
