(function () {
  var root = document.documentElement;
  var langToggle = document.getElementById('lang-toggle');
  var langLabel = document.getElementById('lang-label');
  var langSelect = document.querySelector('.lang-select');
  var langMenu = document.querySelector('.lang-menu');

  var translations = {
    pt: {
      bio: 'Vôlei, trilhas, filmes e viagens.',
      igAction: 'Seguir',
      ttAction: 'Seguir',
      ytAction: 'Inscrever-se'
    },
    en: {
      bio: 'Volleyball, hiking, movies, and travel.',
      igAction: 'Follow',
      ttAction: 'Follow',
      ytAction: 'Subscribe'
    }
  };

  var currentLang = localStorage.getItem('lang') || (navigator.language && navigator.language.indexOf('pt') === 0 ? 'pt' : 'en');

  function applyLang(lang) {
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    var dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.innerHTML = dict[key];
    });
    langLabel.textContent = lang === 'pt' ? 'BR' : 'EN';
    localStorage.setItem('lang', lang);
    currentLang = lang;
  }

  function openMenu() {
    langMenu.hidden = false;
    langToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    langMenu.hidden = true;
    langToggle.setAttribute('aria-expanded', 'false');
  }

  applyLang(currentLang);

  langToggle.addEventListener('click', function () {
    if (langMenu.hidden) openMenu();
    else closeMenu();
  });

  langMenu.querySelectorAll('.lang-option').forEach(function (option) {
    option.addEventListener('click', function () {
      applyLang(option.getAttribute('data-lang'));
      closeMenu();
      langToggle.focus();
    });
  });

  document.addEventListener('click', function (event) {
    if (!langSelect.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
})();
