/**
 * Created by guoyueting on 2017/7/4.
 */

var route=function(){"use strict";var e=function(e){e=e||{};var t={},r=Array.prototype.slice;Object.defineProperties(e,{on:{value:function(r,n){if(typeof n=="function"){(t[r]=t[r]||[]).push(n)}return e},enumerable:false,writable:false,configurable:false},off:{value:function(r,n){if(r=="*"&&!n){t={}}else{if(n){var i=t[r];for(var a=0,f;f=i&&i[a];++a){if(f==n){i.splice(a--,1)}}}else{delete t[r]}}return e},enumerable:false,writable:false,configurable:false},one:{value:function(t,r){function n(){e.off(t,n);r.apply(e,arguments)}return e.on(t,n)},enumerable:false,writable:false,configurable:false},trigger:{value:function(n){var i=arguments;var a=arguments.length-1,f=new Array(a),u,o,c;for(c=0;c<a;c++){f[c]=i[c+1]}u=r.call(t[n]||[],0);for(c=0;o=u[c];++c){o.apply(e,f)}if(t["*"]&&n!="*"){e.trigger.apply(e,["*",n].concat(f))}return e},enumerable:false,writable:false,configurable:false}});return e};var t=/^.+?\/\/+[^\/]+/;var r="EventListener";var n="remove"+r;var i="add"+r;var a="hasAttribute";var f="popstate";var u="hashchange";var o="trigger";var c=3;var l=typeof window!="undefined"&&window;var s=typeof document!="undefined"&&document;var v=l&&history;var h=l&&(v.location||l.location);var p=P.prototype;var d=s&&s.ontouchstart?"touchstart":"click";var m=e();var y=false;var b=false;var g;var w;var $;var A;var S;var x=[];var K=0;function N(e){return e.split(/[\/?#]/)}function O(e,t){var r=t.replace(/\?/g,"\\?").replace(/\*/g,"([^/?#]+?)").replace(/\.\./,".*");var n=new RegExp("^"+r+"$");var i=e.match(n);if(i){return i.slice(1)}}function T(e,t){var r;return function(){clearTimeout(r);r=setTimeout(e,t)}}function E(e){g=T(L,1);l[i](f,g);l[i](u,g);s[i](d,R);if(e){L(true)}}function P(){this.$=[];e(this);m.on("stop",this.s.bind(this));m.on("emit",this.e.bind(this))}function j(e){return e.replace(/^\/|\/$/,"")}function k(e){return typeof e=="string"}function q(e){return(e||h.href).replace(t,"")}function D(e){return w[0]==="#"?(e||h.href||"").split(w)[1]||"":(h?q(e):e||"").replace(w,"")}function L(e){var t=K===0;if(c<=K){return}K++;x.push(function(){var t=D();if(e||t!==$){m[o]("emit",t);$=t}});if(t){var r;while(r=x.shift()){r()}K=0}}function R(e){if(e.which!==1||e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented){return}var r=e.target;while(r&&r.nodeName!=="A"){r=r.parentNode}if(!r||r.nodeName!=="A"||r[a]("download")||!r[a]("href")||r.target&&r.target!=="_self"||r.href.indexOf(h.href.match(t)[0])===-1){return}if(r.href!==h.href&&(r.href.split("#")[0]===h.href.split("#")[0]||w[0]!=="#"&&q(r.href).indexOf(w)!==0||w[0]==="#"&&r.href.split(w)[0]!==h.href.split(w)[0]||!_(D(r.href),r.title||s.title))){return}e.preventDefault()}function _(e,t,r){if(!v){return m[o]("emit",D(e))}e=w+j(e);t=t||s.title;r?v.replaceState(null,t,e):v.pushState(null,t,e);s.title=t;b=false;L();return b}p.m=function(e,t,r){if(k(e)&&(!t||k(t))){_(e,t,r||false)}else if(t){this.r(e,t)}else{this.r("@",e)}};p.s=function(){this.off("*");this.$=[]};p.e=function(e){this.$.concat("@").some(function(t){var r=(t==="@"?A:S)(j(e),j(t));if(typeof r!="undefined"){this[o].apply(null,[t].concat(r));return b=true}},this)};p.r=function(e,t){if(e!=="@"){e="/"+j(e);this.$.push(e)}this.on(e,t)};var z=new P;var B=z.m.bind(z);B.create=function(){var e=new P;var t=e.m.bind(e);t.stop=e.s.bind(e);return t};B.base=function(e){w=e||"#";$=D()};B.exec=function(){L(true)};B.parser=function(e,t){if(!e&&!t){A=N;S=O}if(e){A=e}if(t){S=t}};B.query=function(){var e={};var t=h.href||$;t.replace(/[?&](.+?)=([^&]*)/g,function(t,r,n){e[r]=n});return e};B.stop=function(){if(y){if(l){l[n](f,g);l[n](u,g);s[n](d,R)}m[o]("stop");y=false}};B.start=function(e){if(!y){if(l){if(document.readyState==="interactive"||document.readyState==="complete"){E(e)}else{document.onreadystatechange=function(){if(document.readyState==="interactive"){setTimeout(function(){E(e)},1)}}}}y=true}};B.base();B.parser();return B}();

riot.route = route;