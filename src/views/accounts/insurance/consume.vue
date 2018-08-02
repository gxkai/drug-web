<template>
  <div class="insurance-container">
   <mt-header title="消费信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/faqs">
      <span class="elips">第一人民医院第一人民医院第一人民医院第一人民医院第一人民医院</span>
      2018-6-11
      <i class="icon-font ic-youjiantou" />
    </router-link>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span class="elips">第一人民医院</span>
      2018-6-11
      <i class="icon-font ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span class="elips">第一人民医院</span>
      2018-6-11
       <i class="icon-font ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span class="elips">第一人民医院</span>
      2018-6-11
       <i class="icon-font ic-youjiantou" />
    </router-link>
  </div>
</template>
<style scoped>
  .elips{overflow: hidden;white-space:nowrap;text-overflow:ellipsis;display:block;width:71%;}

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
