<template>
 <mt-header :title="headTitle">
     <router-link to="/" slot="left">
       <mt-button icon="back"></mt-button>
     </router-link>
       <mt-button slot="right">确定</mt-button>
 </mt-header>
 </template>

<script>
export default {
  name: 'allBottom',
  data () {
    return {}
  },
  props: {
    headTitle: {
      type: String,
      required: true
    }
  },
  components: {

  },
  created: function () {

  }
}
</script>

<style scoped>
 .mint-header{background: white;color: #333333}
 .mint-button--primary{background: #1AB6FD;color: #e2e2e2;}
</style>
