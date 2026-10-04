/* ==========================================================================
   ISHAK — script.js
   --------------------------------------------------------------------------
   Everything here is an enhancement. If this file is removed the page still
   works: the navigation falls back to a stacked list and every section stays
   visible.

   Five small, independent tasks:
     1. Footer year
     2. Mobile navigation toggle
     3. Scroll spy (highlights the current section in the nav)
     4. Reveal on scroll
     5. Contact form validation
   ========================================================================== */

(function () {
  'use strict';

  var supportsObserver = 'IntersectionObserver' in window;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     1. FOOTER YEAR
     Keeps the copyright date correct without editing the HTML every year.
     ---------------------------------------------------------------------- */
  var yearSlot = document.querySelector('[data-current-year]');
  if (yearSlot) {
    yearSlot.textContent = String(new Date().getFullYear());
  }

  /* ----------------------------------------------------------------------
     2. MOBILE NAVIGATION TOGGLE
     aria-expanded tells screen readers whether the menu is open or closed.
     ---------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function setMenu(open) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMenu(!isOpen);
    });

    // Close the menu after choosing a destination.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        navToggle.focus();
      }
    });

    // Returning to a wide screen removes the panel, so reset its state.
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) setMenu(false);
    });
  }

  /* ----------------------------------------------------------------------
     3. SCROLL SPY
     A thin horizontal band across the middle of the viewport decides which
     section is "current". rootMargin shrinks the observed root so only the
     section crossing that band counts.
     ---------------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  var watchedSections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  function markActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  if (supportsObserver && watchedSections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markActive(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });

    watchedSections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ----------------------------------------------------------------------
     4. REVEAL ON SCROLL
     The hidden state lives in CSS behind the .js class, so nothing is lost
     when this observer cannot run.
     ---------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll('[data-reveal]');

  function revealAll() {
    Array.prototype.forEach.call(revealTargets, function (element) {
      element.classList.add('is-visible');
    });
  }

  if (supportsObserver && !prefersReducedMotion) {
    var revealer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // one animation is enough
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealTargets, function (element) {
      revealer.observe(element);
    });
  } else {
    revealAll();
  }

  /* ----------------------------------------------------------------------
     5. CONTACT FORM
     There is no backend, so the form demonstrates the structure and the
     validation flow only. Point action="#" at a real endpoint to go live.
     ---------------------------------------------------------------------- */
  var form = document.querySelector('.form');
  var formStatus = document.querySelector('[data-form-status]');

  if (form && formStatus) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      formStatus.textContent = '';

      if (!form.checkValidity()) {
        // reportValidity() shows the browser's native messages on each field.
        form.reportValidity();
        formStatus.textContent = 'Please add your name, a valid email address and a message.';
        return;
      }

      formStatus.textContent =
        'Thanks for reading. This is a static demo, so nothing was sent — connect the form to a real endpoint to receive messages.';
      form.reset();
    });
  }
})();
