webpackJsonp([43],{K6Hc:function(t,e){},kJ1K:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("mvHQ"),_=s.n(o),p={data:function(){return{shopDrugSpec:{shopTotalAppraise:{},drugAppraises:{}},show:!1,type:0,number:1,collected:!1,loading:!1}},created:function(){var t=this;this.$http.get("/shopDrugSpecs/"+this.$route.query.shopDrugSpecId).then(function(e){t.shopDrugSpec=e.data,t.$http.get("/collects/drug/one?shopDrugSpecId="+t.shopDrugSpec.id).then(function(e){t.collected=e.data,console.log(e.data)}).catch(function(e){t.exception(e)})}).catch(function(e){t.exception(e)})},mounted:function(){this.$refs.content.style.height=document.documentElement.clientHeight-this.$refs.header.$el.clientHeight-this.$refs.footer.$el.clientHeight+"px",this.$refs.content.style.overflow="auto"},methods:{onCollect:function(){var t=this,e={shopId:this.shopDrugSpec.shopId,drugSpecId:this.shopDrugSpec.drugSpecId,shopDrugSpecId:this.shopDrugSpec.id,collected:!this.collected};this.$http.post("/collects/drug",e).then(function(e){t.collected=!t.collected,console.log(t.collected),t.collected?t.$toast("收藏成功"):t.$toast("取消收藏成功")}).catch(function(e){t.exception(e)})},onConfirm:function(){var t=this;if(this.loading=!0,0===this.type)this.$http.post("/carts",[{shopId:this.shopDrugSpec.shopId,drugSpecId:this.shopDrugSpec.drugSpecId,shopDrugSpecId:this.shopDrugSpec.id,quantity:this.number}]).then(function(e){t.loading=!1,t.$toast("加入购物车成功"),t.show=!1}).catch(function(e){t.loading=!1,t.exception(e)});else{var e=[];e.push({shopDrugSpecId:this.shopDrugSpec.id,quantity:this.number});var s={shopId:this.shopDrugSpec.shopId,shopName:this.shopDrugSpec.shopName,orderShopDrugSpecInfoDTOList:e,type:"SIMPLE"};this.$http.post("orders/shop/get",s).then(function(e){t.$router.push("/orders/create/fromShop?orderShopDrugSpecDTO="+_()(s))}).catch(function(e){t.loading=!1,t.exception(e)})}}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"shopDrugSpec"},[s("van-nav-bar",{ref:"header",attrs:{title:t.$route.name,"left-arrow":""},on:{"click-left":function(e){t.$router.go(-1)}}}),t._v(" "),s("div",{ref:"content",staticClass:"shopDrugSpec__content"},[s("van-swipe",{attrs:{autoplay:3e3}},t._l(t.shopDrugSpec.fileIds,function(e,o){return s("van-swipe-item",{key:o},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.getImgURL(e,"LARGE_PIC"),expression:"getImgURL(fileId,'LARGE_PIC')"}]})])})),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-1"},[s("div",{staticClass:"shopDrugSpec__content__part-1__front"},[s("div",{staticClass:"shopDrugSpec__content__part-1__front-name"},[t._v("\n          "+t._s(t.shopDrugSpec.name)+"\n        ")]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-1__front-introduce"},[t._v("\n          "+t._s(t.shopDrugSpec.introduce)+"\n        ")]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-1__front-price"},[t._v("\n          ¥"+t._s(t.shopDrugSpec.price)+"\n        ")])]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-1__behind"})]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-2"},[s("div",{staticClass:"shopDrugSpec__content__part-2__item"},[s("span",[t._v("国药准字")]),t._v(" "),s("span",[t._v(t._s(t.shopDrugSpec.sfda))])]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-2__dividing"}),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-2__item"},[s("span",[t._v("库存")]),t._v(" "),s("span",[t._v(t._s(t.shopDrugSpec.stock))])]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-2__dividing"}),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-2__item"},[s("span",[t._v("包装规格")]),t._v(" "),s("span",[t._v(t._s(t.shopDrugSpec.spec))])])]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-3"},[s("div",{staticClass:"shopDrugSpec__content__part-3__item",on:{click:function(e){t.$router.push({path:"/shopDrugSpecs/view",query:{state:0,shopDrugSpec:JSON.stringify(t.shopDrugSpec)}})}}},[s("div",{staticClass:"shopDrugSpec__content__part-3__item__left"},[s("van-icon",{attrs:{name:"liwu-copy"}}),t._v(" "),s("span",[t._v("商品详情")])],1),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-3__item__right"},[s("van-icon",{attrs:{name:"arrow"}})],1)]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-3__item",on:{click:function(e){t.$router.push({path:"/shopDrugSpecs/view",query:{state:1,shopDrugSpec:JSON.stringify(t.shopDrugSpec)}})}}},[s("div",{staticClass:"shopDrugSpec__content__part-3__item__left"},[s("van-icon",{attrs:{name:"pingjia"}}),t._v(" "),s("span",[t._v("商品评价")])],1),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-3__item__right"},[s("van-icon",{attrs:{name:"arrow"}})],1)])]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-4"},[s("div",{staticClass:"shopDrugSpec__content__part-4__header"},[s("div",{staticClass:"shopDrugSpec__content__part-4__header__left"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.getImgURL(t.shopDrugSpec.shopLogo,"LARGE_LOGO"),expression:"getImgURL(shopDrugSpec.shopLogo,'LARGE_LOGO')"}],staticClass:"shopDrugSpec__content__part-4__header__left-logo"})]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-4__header__center"},[s("div",{staticClass:"shopDrugSpec__content__part-4__header__center-shopName"},[t._v("\n            "+t._s(t.shopDrugSpec.shopName)+"\n          ")]),t._v(" "),s("div",[s("van-rate",{attrs:{disabled:"","disabled-color":"red",size:15},model:{value:t.shopDrugSpec.shopTotalAppraise.score,callback:function(e){t.$set(t.shopDrugSpec.shopTotalAppraise,"score",e)},expression:"shopDrugSpec.shopTotalAppraise.score"}})],1)]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-4__header__right"},[s("van-icon",{attrs:{name:"peisong-",color:"#13C1FE",size:"5em"}}),t._v(" "),s("van-icon",{attrs:{name:"anquan",color:"#13C1FE",size:"5em"}})],1)]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-4__content"},[s("van-row",{attrs:{gutter:"20"}},[s("van-col",{staticClass:"shopDrugSpec__content__part-4__content__item",attrs:{span:"6"}},[s("div",[t._v("客户服务")]),t._v(" "),s("div",[t._v(t._s(t.toFixedOne(t.shopDrugSpec.shopTotalAppraise.serviceScore))+"分")])]),t._v(" "),s("van-col",{staticClass:"shopDrugSpec__content__part-4__content__item",attrs:{span:"6"}},[s("div",[t._v("发货速度")]),t._v(" "),s("div",[t._v(t._s(t.toFixedOne(t.shopDrugSpec.shopTotalAppraise.deliveryScore))+"分")])]),t._v(" "),s("van-col",{staticClass:"shopDrugSpec__content__part-4__content__item",attrs:{span:"6"}},[s("div",[t._v("商品包装")]),t._v(" "),s("div",[t._v(t._s(t.toFixedOne(t.shopDrugSpec.shopTotalAppraise.packageScore))+"分")])]),t._v(" "),s("van-col",{staticClass:"shopDrugSpec__content__part-4__content__item",attrs:{span:"6"}},[s("div",[t._v("商品描述")]),t._v(" "),s("div",[t._v(t._s(t.toFixedOne(t.shopDrugSpec.shopTotalAppraise.describeScore))+"分")])])],1)],1),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-4__footer"},[s("div",{staticClass:"shopDrugSpec__content__part-4__footer-button",on:{click:function(e){t.$router.push({path:"/shops/view",query:{shopId:t.shopDrugSpec.shopId}})}}},[t._v("\n          进入店铺\n        ")])])]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-5"},[s("div",{staticClass:"shopDrugSpec__content__part-5__header van-hairline--bottom"},[s("div",{staticClass:"shopDrugSpec__content__part-5__header__left"},[t._v("\n          顾客评论("+t._s(t.shopDrugSpec.drugAppraises.total)+")\n        ")]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-5__header__right",on:{click:function(e){t.$router.push({path:"/shopDrugSpecs/view",query:{state:1,shopDrugSpec:JSON.stringify(t.shopDrugSpec)}})}}},[t._v("\n          全部评价>\n        ")])]),t._v(" "),t._l(t.shopDrugSpec.drugAppraises.list,function(e){return s("div",{staticClass:"shopDrugSpec__content__part-5__item van-hairline--bottom"},[s("div",{staticClass:"shopDrugSpec__content__part-5__item__header"},[s("van-rate",{attrs:{disabled:"","disabled-color":"red",size:15},model:{value:e.score,callback:function(s){t.$set(e,"score",s)},expression:"drugAppraise.score"}}),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-5__item__header--right"},[t._v(t._s(t._f("asterisk")(e.username)))])],1),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-5__item__content"},[t._v("\n          "+t._s(e.content||"没有评论内容")+"\n        ")]),t._v(" "),s("div",{staticClass:"shopDrugSpec__content__part-5__item__footer"},[t._v("\n          "+t._s(t.timeConvert(e.createdDate))+"\n        ")])])})],2)],1),t._v(" "),s("van-goods-action",{ref:"footer"},[s("van-goods-action-mini-btn",{attrs:{icon:"cart",text:"购物车",to:"/carts"}}),t._v(" "),s("van-goods-action-mini-btn",{style:{color:!0===t.collected?"red":""},attrs:{icon:"shoucang",text:"收藏"},on:{click:t.onCollect}}),t._v(" "),s("van-goods-action-big-btn",{style:{backgroundColor:!1===t.shopDrugSpec.otc?"gray":"#f85"},attrs:{text:"加入购物车"},on:{click:function(e){!1!==t.shopDrugSpec.otc&&(t.show=!0),t.type=0}}}),t._v(" "),s("van-goods-action-big-btn",{style:{backgroundColor:!1===t.shopDrugSpec.otc?"gray":"#f44"},attrs:{text:"立即购买",primary:""},on:{click:function(e){!1!==t.shopDrugSpec.otc&&(t.show=!0),t.type=1}}})],1),t._v(" "),s("van-popup",{attrs:{position:"bottom"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[s("div",{staticClass:"shopDrugSpec__popup"},[s("div",{staticClass:"shopDrugSpec__popup__part-1 van-hairline--bottom"},[s("div",{staticClass:"shopDrugSpec__popup__part-1__close-icon"},[s("van-icon",{attrs:{name:"close",size:"3em",color:"#13C1FE"},on:{click:function(e){t.show=!1}}})],1),t._v(" "),s("div",{staticClass:"shopDrugSpec__popup__part-1__left"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.getImgURL(t.shopDrugSpec.drugLogo,"LARGE_LOGO"),expression:"getImgURL(shopDrugSpec.drugLogo,'LARGE_LOGO')"}],staticClass:"shopDrugSpec__popup__part-1__left-logo"})]),t._v(" "),s("div",{staticClass:"shopDrugSpec__popup__part-1__right"},[s("div",{staticClass:"shopDrugSpec__popup__part-1__right-name"},[t._v("\n            "+t._s(t.shopDrugSpec.name)+"\n          ")]),t._v(" "),s("div",{staticClass:"shopDrugSpec__popup__part-1__right-price"},[t._v("\n            ¥"+t._s(t.shopDrugSpec.price)+"\n          ")])])]),t._v(" "),s("div",{staticClass:"shopDrugSpec__popup__part-2"},[s("div",{staticClass:"shopDrugSpec__popup__part-2__left"},[t._v("\n          购买数量\n        ")]),t._v(" "),s("div",{staticClass:"shopDrugSpec__popup__part-2__right"},[s("new-stepper",{attrs:{min:1,step:1},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1)]),t._v(" "),s("div",{staticClass:"shopDrugSpec__popup__part-3"},[s("van-button",{attrs:{size:"large",loading:t.loading},on:{click:t.onConfirm}},[t._v("确定")])],1)])])],1)},staticRenderFns:[]};var a=s("VU/8")(p,c,!1,function(t){s("K6Hc")},"data-v-65f60fc0",null);e.default=a.exports}});