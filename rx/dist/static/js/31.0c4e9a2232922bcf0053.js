webpackJsonp([31],{p1Lq:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=n("Au9i"),i=null;mui.init({keyEventBind:{backbutton:!0}});var r=null;mui.back=function(){r?(new Date).getTime()-r<1e3&&plus.runtime.quit():(r=(new Date).getTime(),i.close(),history.go(-1),setTimeout(function(){r=null},1e3))};var a={data:function(){return{}},created:function(){},mounted:function(){this.startRecognize()},methods:{startRecognize:function(){if(window.plus){(i=new plus.barcode.Barcode("bcid")).onmarked=function(t,n,r){switch(t){case plus.barcode.QR:t="QR";break;case plus.barcode.EAN13:t="EAN13";break;case plus.barcode.EAN8:t="EAN8";break;default:t="其它"+t}n=n.replace(/\n/g,""),e.$http.put(n).then(function(t){Object(c.Toast)("收货成功"),i.close(),e.$router.replace("/orders")}).catch(function(t){e.exception(t),i.close(),e.$router.go(-1)})},i.start();var e=this}}}},s={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"qr"},[t("div",{staticClass:"qr__content",attrs:{id:"bcid"}})])}]};var u=n("VU/8")(a,s,!1,function(e){n("qBJA")},null,null);t.default=u.exports},qBJA:function(e,t){}});