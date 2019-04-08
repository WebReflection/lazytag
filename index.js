var lazyTag = (function (cache, options) {'use strict';
  /*! (c) Andrea Giammarchi */
  function load(el, mo) {
    var
      detail = (el.getAttribute('is') || el.nodeName).toLowerCase(),
      documentElement,
      ownerDocument,
      node
    ;
    if (cache.indexOf(detail) < 0 && 0 < detail.indexOf('-')) {
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
      if (mo.js) {
        node = ownerDocument.createElement('script');
        node.onerror = node.onload = remove;
        node.src = mo.js + '/' + detail + '.js';
        node.type = 'text/javascript';
        documentElement.insertBefore(node, documentElement.lastChild);
      }
    }
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
        if (node.nodeType === 1 && node.parentNode) {
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
      ownerDocument = settings.document || document
    ;
    mo.observe(ownerDocument, options);
    mo.js = settings.js;
    mo.css = settings.css;
    scanner([{addedNodes: [ownerDocument.documentElement]}], mo);
    return mo;
  };
}([], {childList: true, subtree: true}));
