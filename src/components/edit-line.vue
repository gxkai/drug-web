<template>
  <div>
    <span>{{name}}</span>
  </div>
</template>

<script>
  export default {
    name: 'editLine',
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style scoped>
  div {
    padding: 20px;
    height: 20px;
  }

  div span {
    display: block;
    position: relative;
    color: rgba(153, 153, 153, 1);
    font-size: 16px;
    font-family: MicrosoftYaHei;
    text-align: center;
  }

  div span:before, div span:after {
    content: '';
    position: absolute;
    top: 50%;
    background: rgba(220, 220, 220, 1);
    width: 190px;
    height: 1px;
  }

  div span:before {
    left: 10px;
  }

  div span:after {
    right: 10px;
  }
</style>
