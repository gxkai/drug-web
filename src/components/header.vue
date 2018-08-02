<template>
    <header :style="{background:bgColor,color:color}" :class="height">
      <div class="left" :style="{color:leftColor}" :class="leftSize">
       <slot name="left"></slot>
      </div>
      <div>
        <slot name="center"></slot>
        {{title}}
      </div>
      <div class="right" :style="{color:rightColor}" :class="rightSize">
        <slot name="right"></slot>
      </div>
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
      },
      leftSize: {
        type: String,
        default: 'medium'
      },
      rightSize: {
        type: String,
        default: 'small'
      },
      height: {
        type: String,
        default: 'middle'
      }
    }
  };
</script>

<style scoped>
  header {
    width: 720px;
    font-size: 36px;
    font-family: HiraginoSansGB-W3;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .smaller {
    font-size: 20px;
  }
  .small {
    font-size: 30px;
  }
  .medium {
    font-size: 50px;
  }
  .large {
    font-size: 70px;
  }
  .left .icon-font:before{
    font-size: 50px;
  }

  .right .icon-font:before{
    font-size: 50px;
  }
  .lower {
    height: 50px!important;
  }
  .low {
    height: 80px!important;
  }
  .high {
    height: 150px!important;
  }
  .middle {
    height: 130px;
  }
</style>
