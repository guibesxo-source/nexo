(function () {
  class ImageSlot extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute('src') || 'Imagens/fundosite01.jpg';
      this.style.backgroundImage = `url("${src}")`;
      this.setAttribute('role', 'img');
      if (!this.getAttribute('aria-label')) {
        this.setAttribute('aria-label', this.getAttribute('placeholder') || 'Imagem Nexo');
      }
    }
  }

  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
