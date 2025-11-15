/**
 * Optimierte Scroll-Animationen mit Intersection Observer
 * Performance-optimiert für mobile Geräte
 */

(function() {
  'use strict';

  // Prüfe ob Intersection Observer unterstützt wird
  if (!('IntersectionObserver' in window)) {
    // Fallback: Alle Elemente sofort sichtbar machen
    document.addEventListener('DOMContentLoaded', function() {
      var elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .fade-in');
      elements.forEach(function(el) {
        el.classList.add('animated');
      });
    });
    return;
  }

  // Intersection Observer Options
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Animation startet etwas früher
    threshold: 0.1 // Element muss zu 10% sichtbar sein
  };

  // Mobile: Angepasste Optionen für bessere Performance
  if (window.innerWidth <= 991) {
    observerOptions.rootMargin = '0px 0px -100px 0px';
    observerOptions.threshold = 0.05;
  }

  // Callback für Intersection Observer
  var observerCallback = function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Entferne Observer nach Animation (Performance)
        observer.unobserve(entry.target);
      }
    });
  };

  // Erstelle Intersection Observer
  var observer = new IntersectionObserver(observerCallback, observerOptions);

  // Initialisiere nach DOM-Ready
  function initScrollAnimations() {
    // Finde alle Elemente mit Animation-Klassen
    var animatedElements = document.querySelectorAll(
      '.slide-in-left, .slide-in-right, .slide-in-up, .fade-in'
    );

    // Beobachte alle Elemente
    animatedElements.forEach(function(element) {
      // Auf Mobile: Überspringe service-item, um Blinken zu vermeiden
      if (window.innerWidth <= 991 && element.classList.contains('service-item')) {
        // Mache service-item sofort sichtbar ohne Animation
        element.classList.add('animated');
        return;
      }
      
      // Überspringe wenn bereits animiert (z.B. bei Page-Reload)
      if (!element.classList.contains('animated')) {
        observer.observe(element);
      }
    });
  }

  // Initialisiere wenn DOM bereit ist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

  // Re-initialisiere bei dynamisch hinzugefügten Elementen (z.B. AJAX)
  window.reinitScrollAnimations = function() {
    initScrollAnimations();
  };

  // Performance: Debounce für Resize-Events
  var resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Aktualisiere Observer-Optionen bei Größenänderung
      if (window.innerWidth <= 991) {
        observerOptions.rootMargin = '0px 0px -100px 0px';
        observerOptions.threshold = 0.05;
      } else {
        observerOptions.rootMargin = '0px 0px -50px 0px';
        observerOptions.threshold = 0.1;
      }
    }, 250);
  });

})();


