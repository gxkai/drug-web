<!-- FIXME 字体大小 -->
<template>
  <div class="insurance-container">
   <mt-header title="消费信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <router-link class="a-content-list flex-stream-sb padding-10" to="/faqs">
      <span>2017年度</span>
      <i class="icon-font ic-youjiantou"></i>
    </router-link>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>2018年度</span>
      <i class="icon-font ic-youjiantou"></i>
    </router-link>

  </div>
</template>
<style scoped>

  .insurance-container{
    width: 720px;
    height: 100vh;
    background: #f5f5f5;
  }

  .a-content-list{
    display: block;
    width:720px;
    height:80px;
    background:rgba(255,255,255,1);
    margin-bottom: 15px;
  }
  .a-content-list span{
    color: #535353;
  }
  .flex-stream-sb{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .padding-10{
    padding:0 10px;
    box-sizing: border-box;
  }

</style>
