<template>
  <div style="background:#f5f5f5;">
   <mt-header title="消费信息">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <router-link class="f_account_center_questions" to="/faqs">
      <span class="elips">第一人民医院第一人民医院第一人民医院第一人民医院第一人民医院</span>
      2018-6-11
      <img src="static/img/order/rightt.png">
    </router-link>
    <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span class="elips">第一人民医院</span>
      2018-6-11
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span class="elips">第一人民医院</span>
      2018-6-11
      <img src="static/img/order/rightt.png">
    </router-link>
     <router-link class="f_account_center_feedback" to="/feedbacks/create">
      <span class="elips">第一人民医院</span>
      2018-6-11
      <img src="static/img/order/rightt.png">
    </router-link>
  </div>
</template>
<style scoped>
  .elips{overflow: hidden;white-space:nowrap;text-overflow:ellipsis;display:block;width:71%;}
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
