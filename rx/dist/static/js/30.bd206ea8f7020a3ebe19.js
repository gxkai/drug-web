webpackJsonp([30],{"6y2z":function(t,a){},jaSq:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={data:function(){return{accountInfo:[]}},created:function(){var t=this;this.$http.get("/accounts/medicaid").then(function(a){t.accountInfo=a.data,console.log(a.data)}).catch(function(a){t.exception(a)})},mounted:function(){this.$refs.content.style.height=document.documentElement.clientHeight-this.$refs.header.$el.clientHeight+"px",this.$refs.content.style.overflow="auto"}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"insurance-account"},[e("van-nav-bar",{ref:"header",attrs:{title:t.$route.name,"left-arrow":""},on:{"click-left":function(a){t.$router.go(-1)}}}),t._v(" "),e("div",{ref:"content",staticClass:"insurance-account__content"},[e("van-cell",{staticClass:"mt-l-20",attrs:{title:"姓名",value:t.accountInfo.name}}),t._v(" "),e("van-cell",{staticClass:"mt-l-20",attrs:{title:"医保编号",value:t.accountInfo.medicaidNumber}}),t._v(" "),e("van-cell",{staticClass:"mt-l-20",attrs:{title:"历史账户余额",value:t.accountInfo.allBalance}}),t._v(" "),e("van-cell",{staticClass:"mt-l-20",attrs:{title:"本年预划额度",value:t.accountInfo.limit}}),t._v(" "),e("van-cell",{staticClass:"mt-l-20",attrs:{title:"本年账户划入",value:Number(t.accountInfo.shift)}}),t._v(" "),e("van-cell",{staticClass:"mt-l-20",attrs:{title:"本年消费累计",value:t.accountInfo.consume}}),t._v(" "),e("van-cell",{staticClass:"mt-l-20",attrs:{title:"医保账户余额",value:t.accountInfo.balance}}),t._v(" "),e("van-cell",{staticClass:"mt-l-20",attrs:{title:"累计月数",value:t.accountInfo.month}})],1)],1)},staticRenderFns:[]};var l=e("VU/8")(n,c,!1,function(t){e("6y2z")},"data-v-878a918e",null);a.default=l.exports}});