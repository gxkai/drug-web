webpackJsonp([60],{Wb7g:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("new-layout",{staticClass:"orders"},[s("div",{staticClass:"orders__header",attrs:{slot:"top"},slot:"top"},[s("van-nav-bar",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}],attrs:{title:e.title,"left-arrow":""},on:{"click-left":function(t){e.$router.go(-1)},"click-right":function(t){e.show=!0}}},[s("van-icon",{attrs:{slot:"right",name:"search"},slot:"right"})],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"orders__header__search"},[s("span",{staticClass:"orders__header__search--left",on:{click:e.onCancel}},[e._v("取消")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],staticClass:"orders__header__search-input",attrs:{placeholder:"输入药品名称"},domProps:{value:e.keyword},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onRefresh(t):null},input:function(t){t.target.composing||(e.keyword=t.target.value)}}}),e._v(" "),s("span",{staticClass:"orders__header__search--right",on:{click:e.onRefresh}},[e._v("搜索")])]),e._v(" "),s("new-order-tab",{attrs:{state:e.state},on:{"update:state":function(t){e.state=t}}})],1),e._v(" "),s("div",{attrs:{slot:"center"},slot:"center"},[s("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[s("van-list",{attrs:{finished:e.finished},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[e._l(e.list,function(t,o){return s("new-order-item",{key:o,attrs:{order:t},on:{"update:order":function(e){t=e},onQrcode:e.onQrcode}})}),e._v(" "),s("new-no-data",{directives:[{name:"show",rawName:"v-show",value:!0===e.finished,expression:"finished === true"}]})],2)],1),e._v(" "),s("van-popup",{attrs:{position:"top"},model:{value:e.popupVisible,callback:function(t){e.popupVisible=t},expression:"popupVisible"}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.popupUrl,expression:"popupUrl"}],staticClass:"orders-qr_code"})])],1)])},staticRenderFns:[]};var n=s("VU/8")({name:"orderIndex",data:function(){return{loading:!1,finished:!1,isLoading:!1,pageNum:0,pageSize:15,list:[],show:!1,popupUrl:"",popupVisible:!1,keyword:"",state:this.$route.query.state||""}},watch:{state:function(){this.onRefresh()}},computed:{title:function(){switch(this.state){case"TO_PAY":return"待付款";case"TO_APPRAISE":return"待评价";case"TO_DELIVERY":return"待发货";case"TO_RECEIVED":return"待收货";default:return"全部订单"}}},created:function(){},mounted:function(){},methods:{onQrcode:function(e){this.popupUrl=this.getQrCodeURL(e.id),this.popupVisible=!0},onCancel:function(){this.keyword="",this.show=!1,this.onRefresh()},onRefresh:function(){this.finished=!1,this.list=[],this.pageNum=0,this.onLoad()},onLoad:function(){var e=this;this.pageNum++,this.$http.get("/orders/",{params:{pageNum:this.pageNum,pageSize:this.pageSize,orderState:this.state,keyword:this.keyword}}).then(function(t){e.isLoading=!1,e.loading=!1,e.list=e.list.concat(t.data.list),0===t.data.list.length&&(e.finished=!0)}).catch(function(t){e.exception(t)})}}},o,!1,function(e){s("mfbO")},"data-v-3eb6f44d",null);t.default=n.exports},mfbO:function(e,t){}});