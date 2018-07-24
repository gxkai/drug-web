<template>
  <div style="background:#f5f5f5;">
   <mt-header title="账户信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <router-link class="f_account_center_questions" to="/faqs">
      <span>类型</span>
      <span>普通门诊</span>
    </router-link>
    <router-link class="f_account_center_questions" to="/feedbacks/create">
      <span>就诊医院</span>
      <span>昆山第一人民医院</span>
    </router-link>
     <router-link class="f_account_center_questions" to="/feedbacks/create">
      <span>就诊时间</span>
      <span>2018-4-26</span>
    </router-link>
     <router-link class="f_account_center_questions" to="/feedbacks/create">
      <span>就诊金额</span>
      <span class="red">10</span>
    </router-link>
    <router-link class="f_account_center_questions" to="/feedbacks/create">
      <span>统筹支付</span>
      <span class="red">10</span>
    </router-link>
       <router-link class="f_account_center_questions" to="/feedbacks/create">
      <span>大病支付</span>
      <span class="red">10</span>
    </router-link>
     <router-link class="f_account_center_questions" to="/feedbacks/create">
      <span>救助支付</span>
      <span class="red">10</span>
    </router-link>
     <router-link class="f_account_center_questions" to="/feedbacks/create">
      <span>账户支付</span>
      <span class="red">10</span>
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
  .red{color: red;}
  .f_account_center_questions span:nth-child(2){padding-right: 1rem;}
</style>
 