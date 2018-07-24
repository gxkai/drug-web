<template>
  <div class="insurance-container">
   <mt-header title="账户信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <router-link class="a-content-list flex-stream-sb padding-10" to="/faqs">
      <span>类型</span>
      <span>普通门诊</span>
    </router-link>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>就诊医院</span>
      <span>昆山第一人民医院</span>
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>就诊时间</span>
      <span>2018-4-26</span>
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>就诊金额</span>
      <span class="red">10</span>
    </router-link>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>统筹支付</span>
      <span class="red">10</span>
    </router-link>
       <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>大病支付</span>
      <span class="red">10</span>
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>救助支付</span>
      <span class="red">10</span>
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>账户支付</span>
      <span class="red">10</span>
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
