webpackJsonp([78],{CKP5:function(t,s){},n7XB:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={name:"NewCloseNormal",props:["shopInfo"],created:function(){console.log(this.shopInfo)},methods:{onShop:function(){switch(this.shopInfo.type){case"HOSPITAL":this.$router.push({path:"/hospital/view",query:{shopId:this.shopInfo.shopId}});break;default:this.$router.push({path:"/shops/view",query:{shopId:this.shopInfo.shopId}})}}}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"close_shop_item"},[e("div",{staticClass:"close_shop_item-header"},[e("div",{staticClass:"close_shop_item-header-shop"},[e("div",{staticClass:"close_shop_item-header-shop_left",on:{click:function(s){t.onShop()}}},[t._m(0),t._v(" "),e("div",[t._v("\n          "+t._s(t.shopInfo.shopName)+"\n        ")])])]),t._v(" "),t.shopInfo.rxId?e("div",{staticClass:"close_shop_item-header-rx"},[t._m(1),t._v(" "),e("div",{staticClass:"close_shop_item-header-rx_right text-red"},[e("div",{on:{click:function(s){t.linkToRxView(t.shopInfo.rxId)}}},[t._v("查看处方")]),t._v(" "),t._m(2)])]):t._e()]),t._v(" "),e("div",{staticClass:"close_shop_item-content"},t._l(t.shopInfo.shopDrugSpecOrderInfoDTOList,function(s,i){return e("div",{key:i,staticClass:"close_shop_item-content-item",on:{click:function(e){t.linkToShopDrugSpec(s.shopDrugSpecId)}}},[e("div",{staticClass:"close_shop_item-content-item_left"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.getImgURL(s.fileId,"LARGE_LOGO"),expression:"getImgURL(item.fileId,'LARGE_LOGO')"}]})]),t._v(" "),e("div",{staticClass:"close_shop_item-content-item_right"},[e("div",{staticClass:"close_shop_item-content-item_right_1 text-l-30 elps"},[t._v(t._s(s.drugName))]),t._v(" "),e("div",{staticClass:"close_shop_item-content-item_right_2 text-l-25 text-999999"},[t._v(t._s(s.specName))]),t._v(" "),e("div",{staticClass:"close_shop_item-content-item_right_3"},[e("div",{staticClass:"text-l-30 text-red"},[t._v("\n            ¥"+t._s(t.toFixedTwo(s.price))+"\n          ")]),t._v(" "),e("div",{staticClass:"text-l-30 text-999999"},[t._v("\n            ×"+t._s(s.quantity)+"\n          ")])])])])}))])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("i",{staticClass:"iconfont ic-yaodian"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"close_shop_item-header-rx_left"},[s("div",[s("i",{staticClass:"iconfont ic-chufangdanluru"})]),this._v(" "),s("div",{staticClass:"text-blue"},[this._v("\n          处方单\n        ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("i",{staticClass:"iconfont ic-youjiantou"})])}]};var n=e("VU/8")(i,o,!1,function(t){e("CKP5")},"data-v-10332fa8",null);s.default=n.exports}});