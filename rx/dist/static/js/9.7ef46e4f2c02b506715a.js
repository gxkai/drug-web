webpackJsonp([9],{Lrsq:function(e,t){},Uhxv:function(e,t){},"f+o6":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"collectDrugs",data:function(){return{loading:!1,finished:!1,isLoading:!1,pageNum:0,pageSize:15,list:[]}},created:function(){},mounted:function(){},methods:{onRefresh:function(){this.finished=!1,this.list=[],this.pageNum=0,this.onLoad()},onLoad:function(){var e=this;this.pageNum++,this.$http.get("/collects/drug",{params:{pageNum:this.pageNum,pageSize:this.pageSize}}).then(function(t){e.isLoading=!1,e.loading=!1,e.list=e.list.concat(t.data.list),console.log(e.list),0===t.data.list.length&&(e.finished=!0)}).catch(function(t){e.exception(t)})}}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"collect-drugs"},[i("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[i("van-list",{attrs:{finished:e.finished},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[e._l(e.list,function(t){return i("div",{key:t.shopDrugSpecId,staticClass:"collect-drugs--item",on:{click:function(i){e.linkToShopDrugSpec(t.shopDrugSpecId)}}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.getImgURL(t.fileId,"LARGE_LOGO"),expression:"getImgURL(item.fileId, 'LARGE_LOGO')"}],staticClass:"collect-drugs--item--logo"}),e._v(" "),i("div",{staticClass:"collect-drugs--item__right"},[i("div",[i("span",[e._v("["+e._s(t.name)+"]")]),e._v(" "),i("span",[e._v("("+e._s(t.spec)+")")])]),e._v(" "),i("div",[i("span",[e._v("商家:"+e._s(t.shopName))])]),e._v(" "),i("div",[i("span",[e._v("¥"+e._s(e.toFixedTwo(t.price)))])])])])}),e._v(" "),i("new-no-data",{directives:[{name:"show",rawName:"v-show",value:!0===e.finished,expression:"finished === true"}]})],2)],1)],1)},staticRenderFns:[]};var a=i("VU/8")(n,s,!1,function(e){i("Lrsq")},"data-v-2a4ea9aa",null).exports,o={name:"collectDrugs",data:function(){return{loading:!1,finished:!1,isLoading:!1,pageNum:0,pageSize:15,list:[]}},created:function(){},mounted:function(){},methods:{onRefresh:function(){this.finished=!1,this.list=[],this.pageNum=0,this.onLoad()},onLoad:function(){var e=this;this.pageNum++,this.$http.get("/collects/shop",{params:{pageNum:this.pageNum,pageSize:this.pageSize}}).then(function(t){e.isLoading=!1,e.loading=!1,e.list=e.list.concat(t.data.list),console.log(e.list),0===t.data.list.length&&(e.finished=!0)}).catch(function(t){e.exception(t)})}}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"collect-shops"},[i("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[i("van-list",{attrs:{finished:e.finished},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[e._l(e.list,function(t){return i("div",{key:t.id,staticClass:"collect-shops--item",on:{click:function(i){e.linkToShopView(t.id)}}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.getImgURL(t.fileId,"LARGE_LOGO"),expression:"getImgURL(item.fileId, 'LARGE_LOGO')"}],staticClass:"collect-shops--item--logo"}),e._v(" "),i("div",{staticClass:"collect-shops--item__right"},[i("div",[i("span",[e._v(e._s(t.name))])]),e._v(" "),i("div",[i("span",[e._v(e._s(t.area)+" "+e._s(t.address))])])])])}),e._v(" "),i("new-no-data",{directives:[{name:"show",rawName:"v-show",value:!0===e.finished,expression:"finished === true"}]})],2)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(o,l,!1,function(e){i("jth7")},"data-v-e0f83976",null).exports,r={name:"collects",components:{drugs:a,shops:c},computed:{component:function(){switch(this.state){case 1:return c;default:return a}}},data:function(){return{state:0}},created:function(){},mounted:function(){},methods:{}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("new-layout",{staticClass:"collects"},[i("div",{attrs:{slot:"top"},slot:"top"},[i("van-nav-bar",{attrs:{title:e.$route.name,"left-arrow":""},on:{"click-left":function(t){e.$router.go(-1)}}}),e._v(" "),i("new-collect-tab",{attrs:{state:e.state},on:{"update:state":function(t){e.state=t}}})],1),e._v(" "),i("div",{attrs:{slot:"center"},slot:"center"},[i("keep-alive",[i(e.component,{tag:"component"})],1)],1)])},staticRenderFns:[]};var u=i("VU/8")(r,d,!1,function(e){i("Uhxv")},"data-v-f5195c20",null);t.default=u.exports},jth7:function(e,t){}});