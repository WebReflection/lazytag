/*! (c) 2019, Andrea Giammarchi, (ISC) */
var lazyTag=function(c,o){"use strict";function a(e,t){var n,r,s,o=(e.getAttribute("is")||e.nodeName).toLowerCase();if(0<o.indexOf("-")&&c.indexOf(o)<0&&t.consider(o)){c.push(o),n=(r=e.ownerDocument).documentElement,t.css&&((s=r.createElement("link")).onerror=l,s.href=t.css+"/"+o+".css",s.rel="styleSheet",n.insertBefore(s,n.lastChild));var i=t.js||t.mjs;i&&((s=r.createElement("script")).onerror=l,s.src=i+"/"+o+(i==t.js?".js":".mjs"),s.type="text/javascript",n.insertBefore(s,n.lastChild))}}function i(e){return"string"==typeof e?e==this:e.test(this)}function l(){var e=this.parentNode;e&&e.removeChild(this)}function d(e,t){for(var n,r,s,o,i,c=0;c<e.length;c++)for(n=e[c].addedNodes,o=0;o<n.length;o++)if(1==(s=n[o]).nodeType&&s.parentNode)for(a(s,t),r=s.querySelectorAll("*"),i=0;i<r.length;i++)a(r[i],t)}return function(e){var t=new MutationObserver(d),n=e.document||document,r=[].concat(e.only||[]),s=r.length?r:[o].concat(e.ignore||[]);return t.observe(n,{childList:!0,subtree:!0}),t.js=e.js,t.mjs=e.mjs,t.css=e.css,t.consider=r==s?r.some.bind(r,i):function(e){return!s.some(i,e)},d([{addedNodes:[n.documentElement]}],t),t}}([],/^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/);
