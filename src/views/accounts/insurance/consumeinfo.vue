<!-- FIXME 字体大小 -->
<template>
  <div class="insurance-container">
   <mt-header title="账户信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <router-link class="a-content-list flex-stream-sb padding-10" to="/faqs">
      <span>姓名</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>社保编号</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>身份证号码</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>历史账户余额</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>本年预划额度</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>本年账户划入</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
    <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>本年消费累计</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>医保账户余额</span>
      <i class="iconfont ic-youjiantou" />
    </router-link>
     <router-link class="a-content-list flex-stream-sb padding-10" to="/feedbacks/create">
      <span>累计月数</span>
      <i class="iconfont ic-youjiantou" />
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
