webpackJsonp([73],{"Bc/7":function(e,t){},STZi:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={data:function(){return{consumeInfo:JSON.parse(this.$route.query.consumeInfo)}},created:function(){},mounted:function(){this.$refs.content.style.height=document.documentElement.clientHeight-this.$refs.header.$el.clientHeight+"px",this.$refs.content.style.overflow="auto"}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"insurance-consumeInfo"},[n("van-nav-bar",{ref:"header",attrs:{title:e.$route.name,"left-arrow":""},on:{"click-left":function(t){e.$router.go(-1)}}}),e._v(" "),n("div",{ref:"content",staticClass:"insurance-consumeInfo__content"},e._l(e.consumeInfo.list,function(t,o){return n("van-cell",{key:o,staticClass:"mt-l-20",attrs:{title:t.hospital,value:e.dateConvert(t.date),"is-link":""},on:{click:function(n){e.linkToConsumeInfoMore(t)}}})}))],1)},staticRenderFns:[]};var r=n("VU/8")(o,c,!1,function(e){n("Bc/7")},"data-v-213cc523",null);t.default=r.exports}});