webpackJsonp([36],{"D7+J":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={name:"drug-shops",props:["item"],created:function(){console.log(this.item)}},a={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"drug_item",on:{click:function(i){t.linkToDrugShop(t.item.id,t.item.drugId)}}},[e("div",{staticClass:"drug_item-left"},[e("div",{staticClass:"rx_mark"},[t._v("处")]),t._v(" "),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.getImgURL(t.item.fileId,"LARGE_LOGO"),expression:"getImgURL(item.fileId, 'LARGE_LOGO')"}]})]),t._v(" "),e("div",{staticClass:"drug_item-right"},[e("div",{staticClass:"drug_item-right-info"},[e("div",{staticClass:"drug_item-right-info_name"},[t._v("\n        "+t._s(t.item.name)+"\n      ")]),t._v(" "),e("div",{staticClass:"drug_item-right-info_sfda"},[t._v("\n        "+t._s(t.item.sfda)+"\n      ")])]),t._v(" "),e("div",{staticClass:"drug_item-right-sale"},[e("div",{staticClass:"drug_item-right-sale_price"},[e("span",[t._v("¥"+t._s(t.toFixedTwo(t.item.price)))]),t._v(" "),e("span",[t._v("起")])]),t._v(" "),e("div",{staticClass:"drug_item-right-sale_count"},[e("span",[t._v(t._s(t.item.shopCount)+"个")]),t._v(" "),e("span",[t._v("商家在售")])])])])])},staticRenderFns:[]};var n=e("VU/8")(s,a,!1,function(t){e("SHd3")},"data-v-7603705e",null);i.default=n.exports},SHd3:function(t,i){}});