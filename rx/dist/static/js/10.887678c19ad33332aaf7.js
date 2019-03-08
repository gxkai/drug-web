webpackJsonp([10],{"Rsu/":function(e,t){},VjkC:function(e,t){},"k/4K":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"drugAppraise",props:["shopDrugSpec"],data:function(){return{loading:!1,finished:!1,isLoading:!1,pageNum:0,pageSize:15,list:[]}},created:function(){},mounted:function(){},methods:{onRefresh:function(){this.finished=!1,this.list=[],this.pageNum=0,this.onLoad()},onLoad:function(){var e=this;this.pageNum++,this.$http.get("/drugAppraises",{params:{pageNum:this.pageNum,pageSize:this.pageSize,shopDrugSpecId:this.shopDrugSpec.id}}).then(function(t){e.isLoading=!1,e.loading=!1,e.list=e.list.concat(t.data.list),console.log(e.list),0===t.data.list.length&&(e.finished=!0)}).catch(function(t){e.exception(t)})}}},a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"appraise"},[s("div",{staticClass:"appraise-title"},[s("div",{staticClass:"appraise-title-left"},[s("div",{staticClass:"text-l-25"},[e._v("总评分 "+e._s(e.shopDrugSpec.shopTotalAppraise.score)+"分")]),e._v(" "),s("div",[s("van-rate",{attrs:{disabled:"","disabled-color":"red",size:15},model:{value:e.shopDrugSpec.shopTotalAppraise.score,callback:function(t){e.$set(e.shopDrugSpec.shopTotalAppraise,"score",t)},expression:"shopDrugSpec.shopTotalAppraise.score"}})],1)]),e._v(" "),s("div",{staticClass:"appraise-title-right"},[s("div",{staticClass:"text-l-25"},[e._v("\n        共有"+e._s(e.list.length)+"位网友评论\n      ")])])]),e._v(" "),s("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[s("van-list",{attrs:{finished:e.finished},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[e._l(e.list,function(e,t){return s("new-appraise-item",{key:t,attrs:{item:e}})}),e._v(" "),e.finished?s("new-no-data"):e._e()],2)],1)],1)},staticRenderFns:[]};var i=s("VU/8")(n,a,!1,function(e){s("VjkC")},"data-v-034ffe20",null).exports,o={name:"drugInfo",props:["shopDrugSpec"],data:function(){return{}},created:function(){console.log(this.shopDrugSpec)}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"drug-info"},[s("div",{staticClass:"drug-info--text"},[s("div",[s("span",[e._v("通用名：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.name||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("商品品牌：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.origin.brand||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("批准文号：")]),e._v(" "),s("span",[e._v("国药准字"+e._s(e.shopDrugSpec.sfda||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("包装规格：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.spec||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("剂型/型号：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.form||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("英文名称：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.enName||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("汉语拼音：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.pinyinName||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("有效期：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.validity||"暂无"))])]),e._v(" "),s("div",[s("span",[e._v("生产企业：")]),e._v(" "),s("span",[e._v(e._s(e.shopDrugSpec.origin.company||"暂无"))])])]),e._v(" "),e._l(e.shopDrugSpec.fileIds,function(t){return s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.getImgURL(t,"LARGE_PIC"),expression:"getImgURL(fileId,'LARGE_PIC')"}],staticClass:"drug-info--pic"})})],2)},staticRenderFns:[]};var p=s("VU/8")(o,r,!1,function(e){s("Rsu/")},"data-v-5b61ea6c",null).exports,c={name:"shop-drug-spec",components:{appraise:i,info:p},computed:{component:function(){switch(this.state){case 1:return i;default:return p}}},data:function(){return{shopDrugSpec:JSON.parse(this.$route.query.shopDrugSpec),state:this.$route.query.state||0}},created:function(){},mounted:function(){},methods:{}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("new-layout",{staticClass:"shop-drug-spec"},[s("div",{attrs:{slot:"top"},slot:"top"},[s("van-nav-bar",{attrs:{title:e.$route.name,"left-arrow":""},on:{"click-left":function(t){e.$router.go(-1)}}}),e._v(" "),s("new-drug-tab",{attrs:{state:e.state},on:{"update:state":function(t){e.state=t}}})],1),e._v(" "),s("div",{attrs:{slot:"center"},slot:"center"},[s("keep-alive",[s(e.component,{tag:"component",attrs:{shopDrugSpec:e.shopDrugSpec}})],1)],1)])},staticRenderFns:[]};var d=s("VU/8")(c,u,!1,function(e){s("nY6L")},"data-v-5836db01",null);t.default=d.exports},nY6L:function(e,t){}});