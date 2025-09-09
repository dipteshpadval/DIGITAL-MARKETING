function bindAnimatedButtons() {
  document.querySelectorAll('.btn').forEach(function(button) {
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
  btn.addEventListener('click', function() {
    panel.classList.toggle('open');
  });
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

document.addEventListener('DOMContentLoaded', function() {
  bindAnimatedButtons();
  bindMobileMenu();
  bindHeaderScroll();
  bindHeroParallax();
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
});


