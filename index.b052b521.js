!function(){function n(n){return n&&n.__esModule?n.default:n}var t,e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(n){return n&&n.constructor===Symbol?"symbol":typeof n};var i=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,c=/^0o[0-7]+$/i,u=parseInt,f="object"==typeof e&&e&&e.Object===Object&&e,l="object"==typeof self&&self&&self.Object===Object&&self,s=f||l||Function("return this")(),d=Object.prototype.toString,p=Math.max,v=Math.min,g=function(){return s.Date.now()};function m(t){var e=void 0===t?"undefined":n(o)(t);return!!t&&("object"==e||"function"==e)}function h(t){if("number"==typeof t)return t;if(function(t){return"symbol"==(void 0===t?"undefined":n(o)(t))||function(n){return!!n&&"object"==typeof n}(t)&&"[object Symbol]"==d.call(t)}(t))return NaN;if(m(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=m(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var f=a.test(t);return f||c.test(t)?u(t.slice(2),f?2:8):r.test(t)?NaN:+t}t=function(n,t,e){var o,i,r,a,c,u,f=0,l=!1,s=!1,d=!0;if("function"!=typeof n)throw new TypeError("Expected a function");function y(t){var e=o,r=i;return o=i=void 0,f=t,a=n.apply(r,e)}function b(n){return f=n,c=setTimeout(j,t),l?y(n):a}function T(n){var e=n-u;return void 0===u||e>=t||e<0||s&&n-f>=r}function j(){var n=g();if(T(n))return x(n);c=setTimeout(j,function(n){var e=t-(n-u);return s?v(e,r-(n-f)):e}(n))}function x(n){return c=void 0,d&&o?y(n):(o=i=void 0,a)}function M(){var n=g(),e=T(n);if(o=arguments,i=this,u=n,e){if(void 0===c)return b(u);if(s)return c=setTimeout(j,t),y(u)}return void 0===c&&(c=setTimeout(j,t)),a}return t=h(t)||0,m(e)&&(l=!!e.leading,r=(s="maxWait"in e)?p(h(e.maxWait)||0,t):r,d="trailing"in e?!!e.trailing:d),M.cancel=function(){void 0!==c&&clearTimeout(c),f=0,o=u=i=c=void 0},M.flush=function(){return void 0===c?a:x(g())},M};var y=document.getElementById("search-box"),b=document.querySelector(".country-list"),T=document.querySelector(".country-info"),j="https://restcountries.com/v3.1/name/aruba?fullText=true".concat(y);function x(){b.innerHTML="",T.innerHTML=""}function M(n){var t=n.target.closest("li");if(t){var e=t.querySelector("span").textContent;fetch("".concat(j).concat(e,"?fields=name.official;capital;population;flags.svg;languages")).then((function(n){return n.json()})).then((function(n){return w(n[0])})).catch((function(n){return console.log(n)}))}}function w(n){b.innerHTML="",T.innerHTML="\n    <h2>".concat(n.name.official,"</h2>\n    <p>Capital: ").concat(n.capital,"</p>\n    <p>Population: ").concat(n.population,"</p>\n    <p>Language: ").concat(languages,'</p>\n    <img src="').concat(n.flags.svg,'" alt="').concat(n.name.official,'" width="128px" height="128px"/>\n    ')}y.addEventListener("input",n(t)((function(n){var t=n.target.value.trim();if(!t)return void x();fetch("".concat(j).concat(t,"?fields=name.official;capital;population;flags.svg;languages")).then((function(n){return n.json()})).then((function(n){return n.length>10?(Notiflix.Notify.info("Too many matches found. Please enter a more specific name."),void x()):n.length>=2&&n.length<=10?(t=n,T.innerHTML="",b.innerHTML=t.map((function(n){return'\n    <li>\n      <img src="'.concat(n.flags.svg,'" alt="').concat(n.name.official,'" width="32px" height="20px">\n      <span>').concat(n.name.official,"</span>\n    </li>\n  ")})).join(""),void b.addEventListener("click",M)):void(1!==n.length?x():w(n[0]));var t})).catch((function(n){return console.log(n)}))}),300))}();
//# sourceMappingURL=index.b052b521.js.map
