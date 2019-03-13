<template>
  <div class="stock--content">
    <bread-crumb :path="$route.path"/>
edit
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class StockEdit extends Vue {

  }
</script>
