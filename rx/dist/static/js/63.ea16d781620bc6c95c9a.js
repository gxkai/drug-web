webpackJsonp([63],{"9ezY":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={name:"faqs",data:function(){return{loading:!1,finished:!1,isLoading:!1,pageNum:0,pageSize:15,list:[]}},created:function(){},mounted:function(){},methods:{onRefresh:function(){this.finished=!1,this.list=[],this.pageNum=0,this.onLoad()},onLoad:function(){var t=this;this.pageNum++,this.$http.get("/faqs",{params:{pageNum:this.pageNum,pageSize:this.pageSize}}).then(function(n){t.isLoading=!1,t.loading=!1,t.list=t.list.concat(n.data.list),console.log(t.list),0===n.data.list.length&&(t.finished=!0)}).catch(function(n){t.exception(n)})}}},s={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("new-layout",{staticClass:"faqs"},[e("van-nav-bar",{attrs:{slot:"top",title:t.$route.name,"left-arrow":""},on:{"click-left":function(n){t.$router.go(-1)}},slot:"top"}),t._v(" "),e("div",{attrs:{slot:"center"},slot:"center"},[e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(n){t.isLoading=n},expression:"isLoading"}},[e("van-list",{attrs:{finished:t.finished},on:{load:t.onLoad},model:{value:t.loading,callback:function(n){t.loading=n},expression:"loading"}},[t._l(t.list,function(n,i){return e("div",{staticClass:"faqs__content__item"},[e("div",{staticClass:"faqs__content__item__question"},[t._v("\n            "+t._s(i+1)+"、"+t._s(n.question)+"\n          ")]),t._v(" "),e("div",{staticClass:"faqs__content__item__answer"},[t._v("\n            "+t._s(n.answer)+"\n          ")])])}),t._v(" "),t.finished?e("new-no-data"):t._e()],2)],1)],1)],1)},staticRenderFns:[]};var a=e("VU/8")(i,s,!1,function(t){e("vTzw")},"data-v-39cbb676",null);n.default=a.exports},vTzw:function(t,n){}});