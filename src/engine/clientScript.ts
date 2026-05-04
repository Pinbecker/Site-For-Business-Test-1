/**
 * Vanilla JS bundled into every generated site.
 * Handles: mobile nav toggle, header scroll state, lightbox, scroll reveals with stagger.
 * No dependencies. Self-contained.
 */
export const CLIENT_JS = `(function(){
  'use strict';

  /* ── Mobile nav toggle ── */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Header scroll state ── */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.setAttribute('data-scrolled', window.scrollY > 40 ? 'true' : 'false');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Smooth scroll for in-page anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ── Lightbox ── */
  var galleryImgs = document.querySelectorAll('[data-lightbox] img');
  if (galleryImgs.length) {
    var overlay = document.createElement('div');
    overlay.className = 'sf-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML =
      '<button type="button" class="sf-lightbox__close" aria-label="Close">&times;</button>' +
      '<button type="button" class="sf-lightbox__prev" aria-label="Previous image">&#8249;</button>' +
      '<figure class="sf-lightbox__figure"><img alt="" /><figcaption></figcaption></figure>' +
      '<button type="button" class="sf-lightbox__next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(overlay);
    var imgEl = overlay.querySelector('img');
    var capEl = overlay.querySelector('figcaption');
    var index = 0;
    var items = Array.prototype.slice.call(galleryImgs);

    function show(i) {
      index = (i + items.length) % items.length;
      var src = items[index];
      imgEl.src = src.getAttribute('data-full') || src.src;
      imgEl.alt = src.alt || '';
      capEl.textContent = src.alt || '';
      overlay.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
    }
    items.forEach(function (img, i) {
      img.addEventListener('click', function () { show(i); });
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.style.cursor = 'zoom-in';
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); }
      });
    });
    overlay.querySelector('.sf-lightbox__close').addEventListener('click', close);
    overlay.querySelector('.sf-lightbox__prev').addEventListener('click', function(){ show(index - 1); });
    overlay.querySelector('.sf-lightbox__next').addEventListener('click', function(){ show(index + 1); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (overlay.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ── Scroll reveal with stagger ── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = el.getAttribute('data-delay') || '0';
        if (delay && delay !== '0') {
          setTimeout(function () { el.setAttribute('data-revealed', 'true'); }, parseInt(delay, 10));
        } else {
          el.setAttribute('data-revealed', 'true');
        }
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.setAttribute('data-revealed', 'true');
    });
  }

  /* ── Year in footer ── */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

})();
`;
