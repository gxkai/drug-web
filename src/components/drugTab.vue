<template>
  <div class="drug_tab">
    <div :class="{active:state == 0}" @click.stop="$emit('update:state',0);">
      <p class="text-l-30">详情</p>
      <div class="drug_tab-bar" v-show="state === 0"></div>
    </div>
    <div :class="{active:state == 1}" @click.stop="$emit('update:state',1);">
      <p class="text-l-30">评价</p>
      <div class="drug_tab-bar" v-show="state === 1"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'drugTab',
    props: ['state']
  };
</script>

<style scoped type="text/scss" lang="scss">
  .drug_tab {
    display: flex;
    justify-content: space-around;
    height: 100px;
    font-family: HiraginoSansGB-W3;
    color: rgba(102, 102, 102, 1);
    line-height: 88px;
    background-color: white;
    &>div {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
     }
    &-bar {
      width: 66px;
      height: 6px;
      background: #F5453E;
    }
  }
</style>
