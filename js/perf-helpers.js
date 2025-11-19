(function () {
  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function enhanceImages() {
    var images = document.querySelectorAll('img:not([loading])');
    images.forEach(function (img) {
      if (img.closest('.brand-panel') || img.closest('.brand') || img.classList.contains('brand-logo')) {
        return;
      }
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }

  onReady(function () {
    enhanceImages();
  });
})();

