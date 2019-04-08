customElements.define('what-ever', class extends HTMLElement {
  connectedCallback() {
    this.appendChild(
      this.ownerDocument.createElement('p')
    ).textContent = '<' + this.nodeName.toLowerCase() + '> is connected';
  }
});
