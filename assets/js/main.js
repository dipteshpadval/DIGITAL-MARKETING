function bindAnimatedButtons() {
  // Opt-in only: moving spotlight disabled by default
  document.querySelectorAll('[data-spotlight="on"]').forEach(function(button) {
    button.addEventListener('pointermove', function(e) {
      var rect = button.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      button.style.setProperty('--x', x + 'px');
      button.style.setProperty('--y', y + 'px');
    });
  });
}

function bindMobileMenu() {
  var btn = document.querySelector('.menu-btn');
  var panel = document.querySelector('.mobile-panel');
  if (!btn || !panel) return;
  var isOpen = false;
  function setState(open) {
    isOpen = open;
    panel.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-panel');
  panel.setAttribute('id', 'mobile-panel');
  btn.addEventListener('click', function() { setState(!isOpen); });
  // Close menu on escape
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && isOpen) setState(false); });
  // Close when clicking a link
  panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setState(false); }); });
}

function bindHeaderScroll() {
  var header = document.querySelector('header');
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll);
}

function bindHeroParallax() {
  var orbs = document.querySelectorAll('.hero .orb');
  if (!orbs.length) return;
  var strength = [0.15, 0.25, 0.35];
  function update() {
    var y = window.scrollY || window.pageYOffset;
    orbs.forEach(function(orb, i) {
      var s = strength[i % strength.length];
      orb.style.transform = 'translateY(' + (y * -s) + 'px)';
    });
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function bindNavUnderline() {
  var nav = document.querySelector('.nav-links');
  if (!nav) return;
  var set = function(el) {
    var r = el.getBoundingClientRect();
    var nr = nav.getBoundingClientRect();
    var left = r.left - nr.left;
    nav.style.setProperty('--u-left', left + 'px');
    nav.style.setProperty('--u-width', r.width + 'px');
    nav.style.setProperty('--u-opacity', 1);
  };
  nav.addEventListener('mouseleave', function(){
    nav.style.setProperty('--u-opacity', 0);
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('mouseenter', function(){ set(a); });
    // If current page link has aria-current or matches URL, set on load
    if (a.getAttribute('aria-current') === 'page' || a.href === window.location.href) {
      set(a);
    }
  });
}

// initialize after DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  bindAnimatedButtons();
  bindMobileMenu();
  bindHeaderScroll();
  bindHeroParallax();
  bindThreeDTilt();
  bindNavUnderline();
  // Scroll reveal
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  // Contact form submit - removed to allow natural form submission
});

function bindThreeDTilt() {
  // Opt-in only: elements must declare data-tilt="on"
  var elements = document.querySelectorAll('[data-tilt="on"]');
  if (!elements.length) return;
  var maxTilt = 8; // degrees
  elements.forEach(function(el) {
    el.addEventListener('pointermove', function(e) {
      var rect = el.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var tiltX = (py - 0.5) * -2 * maxTilt;
      var tiltY = (px - 0.5) * 2 * maxTilt;
      el.style.transform = 'perspective(800px) translateY(-2px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg)';
    });
    el.addEventListener('pointerleave', function() {
      el.style.transform = '';
    });
  });
}


