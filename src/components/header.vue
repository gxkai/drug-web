<template>
    <header :style="{background:bgColor,color:color}">
      <span class="left" :style="{color:leftColor}">
       <slot name="left"></slot>
      </span>
      {{title}}
      <span class="right" :style="{color:rightColor}">
        <slot name="right"></slot>
      </span>
    </header>
</template>

<script>
  export default {
    name: 'newHeader',
    props: {
      title: {
        type: String,
        default: ''
      },
      bgColor: {
        type: String,
        default: 'rgba(19,193,254,1)'
      },
      color: {
        type: String,
        default: 'rgba(254, 254, 254, 1)'
      },
      leftColor: {
        type: String,
        default: 'rgba(254, 254, 254, 1)'
      },
      rightColor: {
        type: String,
        default: 'rgba(254, 254, 254, 1)'
      }
    }
  };
</script>

<style scoped>
  header {
    width: 720px;
    height: 130px;
    font-size: 36px;
    font-family: HiraginoSansGB-W3;
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
    right: 10px;
  }
  .right {
    font-size: 30px;
    position: absolute;
    right: 10px;
  }
</style>
