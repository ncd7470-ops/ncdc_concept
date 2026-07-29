// Loads the shared header and footer into every page, then wires up
// the mobile menu, active-link highlighting, footer year, and scroll reveal.
(function () {
  function initPage() {
    // year
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // mobile menu
    var menuBtn = document.getElementById('menuBtn');
    var navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', function () { navLinks.classList.toggle('open'); });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { navLinks.classList.remove('open'); });
      });
    }

    // active nav link, based on <body data-nav="...">
    var current = document.body.getAttribute('data-nav');
    if (current && navLinks) {
      var link = navLinks.querySelector('[data-nav="' + current + '"]');
      if (link) link.classList.add('active');
    }

    // scroll reveal
    var revealEls = document.querySelectorAll(
      '.section-head, .service-card, .case, .about-points, .news-card, .contact-grid > div, .step-list, .info-card, .cta-strip'
    );
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  function include(id, url, cb) {
    var el = document.getElementById(id);
    if (!el) { if (cb) cb(); return; }
    fetch(url)
      .then(function (res) { return res.text(); })
      .then(function (html) { el.innerHTML = html; if (cb) cb(); })
      .catch(function () { el.innerHTML = '<p style="color:#900;padding:16px;">Could not load ' + url + '</p>'; if (cb) cb(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var pending = 2;
    function done() { pending -= 1; if (pending === 0) initPage(); }
    include('header-placeholder', 'header.html', done);
    include('footer-placeholder', 'footer.html', done);
  });
})();
