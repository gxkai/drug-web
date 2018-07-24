<template>
  <div style="background:#f5f5f5;">
   <mt-header title="账户信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <router-link class="f_account_center_questions" to="/faqs">
      <span>姓名</span>
      <img src="static/img/order/rightt.png">
    </router-link>
    <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>社保编号</span>
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>身份证号码</span>
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>历史账户余额</span>
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>本年预划额度</span>
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>本年账户划入</span>
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>本年消费累计</span>
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>医保账户余额</span>
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span>累计月数</span>
      <img src="static/img/order/rightt.png">
    </router-link>
  
  </div>
</template>
<style scoped>
  .f_account_center_questions, .f_account_center_feedback {
    background: white;
    margin-bottom:0.75rem;
    box-sizing: border-box;
    display: flex;
    color: #333333;
    font-size: 1rem;
    justify-content: space-between;
    height: 4rem;
    line-height: 4rem;
    padding-left: 1rem;
  }
  img{
    width: 0.65rem;height: 1.15rem;
    margin: 1.45rem 0.85rem 1.45rem 0rem;
  }
  .mint-header{background: #13c1fe;}
</style>
 