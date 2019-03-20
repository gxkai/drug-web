<template>
  <new-recommend></new-recommend>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import NewRecommend from '@/components/business/Recommend'

  @Component({
    components: {
      'new-recommend': NewRecommend
    }
  })
  export default class Recommend extends Vue {

  }
</script>


