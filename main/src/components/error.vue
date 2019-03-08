<template>
  <div class="container">
    <div class="error-div">
      <img src="../assets/image/error.png" class="error"/>
      <p class="text-center width-percent-100 mt-l-30">网络竟然奔溃了</p>
      <p class="text-center width-percent-100 mt-l-30">别紧张,试试看刷新页面</p>
      <p class="text-center mt-l-30">
        <span class="refresh d-inline-block" @click="$router.go(0)">刷新</span>
      </p>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'newAllData'
  };
</script>

<style scoped>
  .container {
    width: 720px;
    background: #f8f8f8;
    height: 100vh;
  }

  .error-div {
    width: 750px;
    height: 180px;
    position: absolute;
    top: 40%;
    margin-top: -78px;
  }

  .error {
    width: 303px;
    margin-left: 212px;
  }
  .refresh{
    border: 2px solid #e8e3e3;
    border-radius: 5px;
    width: 84px;
    height: 50px;
    line-height: 50px;
  }
</style>
