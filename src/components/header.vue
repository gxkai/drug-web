<template>
    <header>
      <span class="left">
       <slot name="left"></slot>
      </span>
      {{title}}
      <span class="right">
        <slot name="right"></slot>
      </span>
    </header>
</template>

<script>
  export default {
    name: 'header',
    props: ['title']
  };
</script>

<style scoped>
  header {
    width: 720px;
    height: 130px;
    font-size: 36px;
    background: rgba(19, 193, 254, 1);
    font-family: HiraginoSansGB-W3;
    color: rgba(254, 254, 254, 1);
    text-align: center;
    line-height: 120px;
  }

  .left .iconfont:before{
    font-size: 50px;
    position: absolute;
    left: 0;
  }

  .right .iconfont:before{
    font-size: 50px;
    position: absolute;
    right: 0;
  }
  .right {
    font-size: 30px;
    position: absolute;
    right: 0;
  }
</style>
