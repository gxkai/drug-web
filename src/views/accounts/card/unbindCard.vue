<template>
  <div class="bind-container box-center flex-row">
    <img src="../../../assets/image/unbindCard.png" />
    <p class="unbind-message">您还没有绑定医保卡哦</p>
    <router-link to="/" class="">去绑定</router-link>
  </div>
</template>


<style scoped>
  .bind-container{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }
  .box-center{
    display: flex;
    align-items: center;
   }
  .flex-row{
    flex-direction: column;
  }
  .bind-container img{
    width:385px;
    margin-top: 135px;
    display: block;
  }

  .unbind-message{
    width:720px;
    height:34px;
    font-size:36px;
    font-family:HiraginoSansGB-W3;
    color:rgba(19,193,254,1);
    line-height:0px;
    display: block;
    text-align: center;
    margin-top: 52px;
  }

  .bind-container a{
    width:145px;
    height:56px;
    background:rgba(19,193,254,1);
    border-radius:20px;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
   }


</style>
