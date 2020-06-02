class Header {

  constructor(element) {
    this._element = element;

    this._elements = {
      header: document.querySelector('.header-wrapper'),
      nav: document.querySelector('nav')
    };
    this._expandOnScroll();
  }

  _expandOnScroll() {
    const header = document.querySelector('.header-wrapper');
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
      const scrollPos = this.pageYOffset;
      if (scrollPos >= header.clientHeight - 100) {
        nav.className = 'animate';
      } else {
        nav.classList.remove('animate');
      }
    });
  }
}

export default Header;
