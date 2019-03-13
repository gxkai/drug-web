<template>
  <div class="stock--content">
    <bread-crumb :path="$route.path"/>
create
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
  export default class StockCreate extends Vue {

  }
</script>
