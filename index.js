var lazyTag = (function (cache, re) {'use strict';
  /*! (c) 2019, Andrea Giammarchi, (ISC) */
  function load(el, mo) {
    var
      detail = (el.getAttribute('is') || el.nodeName).toLowerCase(),
      documentElement,
      ownerDocument,
      node
    ;
    if (
      detail.indexOf('-') > 0 &&
      cache.indexOf(detail) < 0 &&
      mo.consider(detail)
    ) {
      cache.push(detail);
      ownerDocument = el.ownerDocument;
      documentElement = ownerDocument.documentElement;
      if (mo.css) {
        node = ownerDocument.createElement('link');
        node.onerror = remove;
        node.href = mo.css + '/' + detail + '.css';
        node.rel = 'styleSheet';
        documentElement.insertBefore(node, documentElement.lastChild);
      }
      var js = mo.js || mo.mjs;
      if (js) {
        node = ownerDocument.createElement('script');
        node.onerror = remove;
        node.src = js + '/' + detail + (js == mo.js ? '.js' : '.mjs');
        node.type = 'text/javascript';
        documentElement.insertBefore(node, documentElement.lastChild);
      }
    }
  }
  function match(ignore) {
    return typeof ignore == 'string' ? ignore == this : ignore.test(this);
  }
  function remove() {
    var parentNode = this.parentNode;
    if (parentNode)
      parentNode.removeChild(this);
  }
  function scanner(records, mo) {
    for (var
      addedNodes,
      nodes, node,
      j, k, i = 0; i < records.length; i++
    ) {
      addedNodes = records[i].addedNodes;
      for (j = 0; j < addedNodes.length; j++) {
        node = addedNodes[j];
        if (node.nodeType == 1 && node.parentNode) {
          load(node, mo);
          nodes = node.querySelectorAll('*');
          for (k = 0; k < nodes.length; k++) {
            load(nodes[k], mo);
          }
        }
      }
    }
  }
  return function (settings) {
    var
      mo = new MutationObserver(scanner),
      ownerDocument = settings.document || document,
      only = [].concat(settings.only || []),
      ignore = only.length ? only : [re].concat(settings.ignore || [])
    ;
    mo.observe(ownerDocument, {childList: true, subtree: true});
    mo.js = settings.js;
    mo.mjs = settings.mjs;
    mo.css = settings.css;
    mo.consider = only == ignore ?
      only.some.bind(only, match) :
      function (detail) {
        return !ignore.some(match, detail);
      };
    scanner([{addedNodes: [ownerDocument.documentElement]}], mo);
    return mo;
  };
}(
  [],
  // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
  /^(?:annotation-xml|color-profile|font-face(?:|-format|-name|-src|-uri)|missing-glyph)$/
));
