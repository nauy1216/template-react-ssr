!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=20)}([function(t,e){t.exports=require("react")},function(t,e){t.exports=require("react-redux")},function(t,e){t.exports=require("react-router-dom")},function(t,e){t.exports=require("redux")},function(t,e){t.exports=require("react-router-config")},function(t,e){t.exports=require("react-helmet")},function(t,e){t.exports=require("axios")},function(t,e,n){var r=n(15),o=n(12);"string"==typeof r&&(r=[[t.i,r,""]]),t.exports=r.locals||{},t.exports._getContent=function(){return r},t.exports._getCss=function(){return r.toString()},t.exports._insertCss=function(t){return o(r,t)}},function(t,e,n){var r=n(18),o=n(12);"string"==typeof r&&(r=[[t.i,r,""]]),t.exports=r.locals||{},t.exports._getContent=function(){return r},t.exports._getCss=function(){return r.toString()},t.exports._insertCss=function(t){return o(r,t)}},function(t,e){t.exports=require("redux-thunk")},function(t,e){t.exports=require("redux-logger")},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=(i=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),u=r.sources.map((function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"}));return[n].concat(u).concat([o]).join("\n")}var i;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var u=this[o][0];null!=u&&(r[u]=!0)}for(o=0;o<t.length;o++){var i=t[o];null!=i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(t,e,n){"use strict";var r=u(n(16)),o=u(n(17));function u(t){return t&&t.__esModule?t:{default:t}}var i="s",c={};function a(t){t.forEach((function(t){if(--c[t]<=0){var e=document.getElementById(i+t);e&&e.parentNode.removeChild(e)}}))}t.exports=function(t){for(var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=n.replace,l=void 0!==u&&u,f=n.prepend,s=void 0!==f&&f,p=[],y=0;y<t.length;y++){var b=(0,o.default)(t[y],4),m=b[0],d=b[1],h=b[2],v=b[3],g=m+"-"+y;if(p.push(g),!c[g]||l){c[g]=1;var O=document.getElementById(i+g),S=!1;O||(S=!0,(O=document.createElement("style")).setAttribute("type","text/css"),O.id=i+g,h&&O.setAttribute("media",h));var E=d;v&&"function"==typeof btoa&&(E+="\n/*# sourceMappingURL=data:application/json;base64,"+(e=(0,r.default)(v),btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(function(t,e){return String.fromCharCode("0x"+e)}))))+"*/",E+="\n/*# sourceURL="+v.file+"?"+g+"*/"),"textContent"in O?O.textContent=E:O.styleSheet.cssText=E,S&&(s?document.head.insertBefore(O,document.head.childNodes[0]):document.head.appendChild(O))}else c[g]++}return a.bind(null,p)}},function(t,e){t.exports=require("react-dom/server")},function(t,e){t.exports=require("express-http-proxy")},function(t,e,n){(e=t.exports=n(11)(!1)).push([t.i,"._1BLwWlMVEZXJ3op-h7VSxc{\n    color:red;\n}",""]),e.locals={user:"_1BLwWlMVEZXJ3op-h7VSxc"}},function(t,e){t.exports=require("babel-runtime/core-js/json/stringify")},function(t,e){t.exports=require("babel-runtime/helpers/slicedToArray")},function(t,e,n){(e=t.exports=n(11)(!1)).push([t.i,"._3n8CzmHXQMKSnrldadT4RJ{\n    margin-top:70px;\n}",""]),e.locals={app:"_3n8CzmHXQMKSnrldadT4RJ"}},function(t,e){t.exports=require("express")},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),u=n(2),i=n(5),c=n(1),a={getHomeList:function(){return function(t,e,n){return n.get("/api/users").then((function(e){var n=e.data;t({type:"SET_HOME_LIST",payload:n})}))}}};function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var b=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),s(this,p(e).apply(this,arguments))}var n,r,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(e,t),n=e,(r=[{key:"componentWillMount",value:function(){console.log("Home 组件即将挂载"),this.props.list&&this.props.list.length||this.props.getHomeList()}},{key:"componentDidMount",value:function(){console.log("你看我在服务端执不执行")}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.Helmet,null,o.a.createElement("title",null,"React-SSR"),o.a.createElement("meta",{name:"description",content:"首页描述"})),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6 col-md-offset-3"},o.a.createElement("ul",{className:"list-group"},this.props.list.map((function(t){return o.a.createElement("li",{key:t.id,className:"list-group-item"},t.name)}))))))}}])&&f(n.prototype,r),u&&f(n,u),e}(r.Component);(b=Object(c.connect)((function(t){return t.home}),a)(b)).loadData=function(t){return t.dispatch(a.getHomeList())};var m=b,d={increment:function(){return{type:"INCREMENT"}}};function h(t){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function g(t,e){return!e||"object"!==h(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function O(t){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function S(t,e){return(S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var E=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),g(this,O(e).apply(this,arguments))}var n,r,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&S(t,e)}(e,t),n=e,(r=[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("p",null,this.props.number),o.a.createElement("button",{onClick:this.props.increment},"+"))}}])&&v(n.prototype,r),u&&v(n,u),e}(r.Component),_=E=Object(c.connect)((function(t){return t.counter}),d)(E),j={login:function(t){return function(e,n,r){return r.post("/api/login",t).then((function(t){var n=t.data;e({type:"SET_SESSION",payload:n.data})}))}},logout:function(){return function(t,e,n){return n.get("/api/logout").then((function(e){var n=e.data;t({type:"SET_SESSION",payload:n.data})}))}},getUser:function(){return function(t,e,n){return n.get("/api/user").then((function(e){var n=e.data;t({type:"SET_SESSION",payload:n.data})}))}}};function w(t){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function P(t){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function C(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function N(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var T=function(t){function e(){var t,n,r,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var u=arguments.length,i=new Array(u),c=0;c<u;c++)i[c]=arguments[c];return r=this,o=(t=P(e)).call.apply(t,[this].concat(i)),n=!o||"object"!==w(o)&&"function"!=typeof o?C(r):o,N(C(n),"state",{username:""}),N(C(n),"handleSubmit",(function(t){t.preventDefault(),n.props.login({username:n.state.username})})),n}var n,r,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(e,t),n=e,(r=[{key:"render",value:function(){var t=this;return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6 col-md-offset-3"},o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("div",{className:"form-group"},o.a.createElement("label",{htmlFor:"username"},"用户名"),o.a.createElement("input",{type:"text",className:"form-control",value:this.state.username,onChange:function(e){return t.setState({username:e.target.value})}})),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{type:"submit",className:"btn btn-primary"})))))}}])&&x(n.prototype,r),u&&x(n,u),e}(r.Component),R=T=Object(c.connect)((function(t){return t.session}),j)(T);function M(t){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function L(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function q(t,e){return!e||"object"!==M(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function I(t){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function A(t,e){return(A=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var D=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),q(this,I(e).apply(this,arguments))}var n,r,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&A(t,e)}(e,t),n=e,(r=[{key:"render",value:function(){return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6 col-md-offset-6"},o.a.createElement("button",{onClick:this.props.logout,type:"submit",className:"btn btn-primary"},"退出")))}}])&&L(n.prototype,r),u&&L(n,u),e}(r.Component),H=D=Object(c.connect)((function(t){return t.session}),j)(D);function U(t){return(U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function J(t,e){return!e||"object"!==U(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function B(t){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function W(t,e){return(W=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var V=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),J(this,B(e).apply(this,arguments))}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&W(t,e)}(e,t),n=e,(r=[{key:"render",value:function(){return this.props.user?o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6 col-md-offset-6"},"个人中心")):o.a.createElement(u.Redirect,{to:"/login"})}}])&&F(n.prototype,r),i&&F(n,i),e}(r.Component),X=V=Object(c.connect)((function(t){return t.session}))(V);function z(t){return(z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function K(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Q(t,e){return!e||"object"!==z(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function Z(t){return(Z=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function G(t,e){return(G=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var Y=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),Q(this,Z(e).apply(this,arguments))}var n,r,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&G(t,e)}(e,t),n=e,(r=[{key:"componentWillMount",value:function(){this.props.staticContext&&(this.props.staticContext.notFound=!0)}},{key:"render",value:function(){return o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6 col-md-offset-6"},"你的页面飞了"))}}])&&K(n.prototype,r),u&&K(n,u),e}(r.Component),$=n(7),tt=n.n($);function et(t){return(et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function nt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function rt(t,e){return!e||"object"!==et(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function ot(t){return(ot=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ut(t,e){return(ut=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function it(t,e){return function(n){function r(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),rt(this,ot(r).apply(this,arguments))}var u,i,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&ut(t,e)}(r,n),u=r,(i=[{key:"componentWillMount",value:function(){this.props.staticContext&&this.props.staticContext.cssArr.push(e._getCss())}},{key:"render",value:function(){return o.a.createElement(t,this.props)}}])&&nt(u.prototype,i),c&&nt(u,c),r}(r.Component)}function ct(t){return(ct="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function at(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function lt(t,e){return!e||"object"!==ct(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function ft(t){return(ft=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function st(t,e){return(st=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var pt=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),lt(this,ft(e).apply(this,arguments))}var n,i,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&st(t,e)}(e,t),n=e,(i=[{key:"render",value:function(){return o.a.createElement("nav",{className:"navbar navbar-inverse navbar-fixed-top"},o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{className:"navbar-header"},o.a.createElement("a",{className:"navbar-brand"},"SSR")),o.a.createElement("div",null,o.a.createElement("ul",{className:"nav navbar-nav"},o.a.createElement("li",null,o.a.createElement(u.Link,{to:"/"},"首页")),this.props.user&&o.a.createElement(r.Fragment,null,o.a.createElement("li",null,o.a.createElement(u.Link,{to:"/logout"},"退出")),o.a.createElement("li",null,o.a.createElement(u.Link,{to:"/profile"},"个人中心"))),!this.props.user&&o.a.createElement("li",null,o.a.createElement(u.Link,{to:"/login"},"登录"))),this.props.user&&o.a.createElement("ul",{className:"nav navbar-nav navbar-right"},o.a.createElement("li",null,o.a.createElement("a",{className:tt.a.user},this.props.user.username))))))}}])&&at(n.prototype,i),c&&at(n,c),e}(r.Component),yt=it(pt=Object(c.connect)((function(t){return t.session}))(pt),tt.a),bt=n(4),mt=n(8),dt=n.n(mt);function ht(t){return(ht="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function vt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function gt(t,e){return!e||"object"!==ht(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function Ot(t){return(Ot=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function St(t,e){return(St=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var Et=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),gt(this,Ot(e).apply(this,arguments))}var n,u,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&St(t,e)}(e,t),n=e,(u=[{key:"render",value:function(){return o.a.createElement(r.Fragment,null,o.a.createElement(yt,{staticContext:this.props.staticContext}),o.a.createElement("div",(t={className:"container"},e="className",n=dt.a.app,e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t),Object(bt.renderRoutes)(this.props.route.routes)));var t,e,n}}])&&vt(n.prototype,u),i&&vt(n,i),e}(r.Component);Et.loadData=function(t){return t.dispatch(j.getUser())};var _t=it(Et,dt.a),jt=[{path:"/",component:_t,loadData:_t.loadData,routes:[{path:"/",component:m,exact:!0,key:"/",loadData:m.loadData},{path:"/counter",component:_,key:"/counter"},{path:"/login",component:R,key:"/login"},{path:"/logout",component:H,key:"/logout"},{path:"/profile",component:X,key:"/profile"},{component:Y,key:"/notfound"}]}],wt=n(13),xt=n(3),Pt=n(9),Ct=n.n(Pt),kt=n(10),Nt=n.n(kt),Tt=n(6),Rt=n.n(Tt),Mt=(Rt.a.create({baseURL:"/"}),function(t){return Rt.a.create({baseURL:"http://localhost:4000",headers:{cookie:t.get("cookie")||""}})}),Lt={number:0},qt={list:[]},It={user:null,success:null,error:null},At=Object(xt.combineReducers)({counter:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Lt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"INCREMENT":return{number:t.number+1};default:return t}},home:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:qt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_HOME_LIST":return{list:e.payload};default:return t}},session:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:It,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_SESSION":return e.payload;default:return t}}});var Dt=i.Helmet.renderStatic(),Ht=function(t,e){var n={cssArr:[]},r=function(t){return Object(xt.createStore)(At,Object(xt.applyMiddleware)(Ct.a.withExtraArgument(Mt(t)),Nt.a))}(t),i=Object(bt.matchRoutes)(jt,t.path),a=[];i.forEach((function(t){t.route.loadData&&a.push(new Promise((function(e){return t.route.loadData(r).then(e,e)})))})),Promise.all(a).then((function(){var i=Object(wt.renderToString)(o.a.createElement(c.Provider,{store:r},o.a.createElement(u.StaticRouter,{context:n,location:t.path},Object(bt.renderRoutes)(jt)))),a=n.cssArr.join("\n");if("REPLACE"===n.action)return e.redirect(302,n.url);n.notFound&&(e.statusCode=404),e.send("\n            <html>\n                <head>\n                ".concat(Dt.title.toString(),"\n                ").concat(Dt.meta.toString(),'\n                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />\n                <style>').concat(a,'</style>\n                </head>\n                <body>\n                <div id="root">').concat(i,"</div>\n                <script>\n                  // 服务端：组件初始化时会请求数据，请求的数据会存到服务端仓库中，然后组件使用数据显示相应内容\n                  // 客户端：为了避免组件挂载时又一次的请求数据（当服务器端已经请求过数据并返回了有数据的内容） \n                  // 所以这里要获取下存在服务端仓库中的数据并作为初始值存到 window 中\n                  // 俗称：数据的脱水\n                  window.context = {\n                      state:").concat(JSON.stringify(r.getState()),'\n                  }\n                <\/script>\n                <script src="/client.js"><\/script>\n                </body>\n            </html>'))}))},Ut=n(14),Ft=n.n(Ut),Jt=n(19),Bt=Jt();Bt.use(Jt.static("public")),Bt.use("/api",Ft()("http://127.0.0.1:4000",{proxyReqPathResolver:function(t){return"/api".concat(t.url)}})),Bt.get("*",(function(t,e){Ht(t,e)})),Bt.listen(3e3,(function(){console.log("server started at port 3000")}))}]);