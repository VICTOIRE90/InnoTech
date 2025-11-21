// Fonction pour gérer le menu mobile
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  
  // Ouvrir le menu mobile
  mobileMenuButton.addEventListener('click', function() {
    // Afficher le bouton de fermeture et cacher le bouton hamburger
    mobileMenuButton.classList.add('hidden');
    closeMobileMenuButton.classList.remove('hidden');
    
    // Afficher le menu
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.remove('opacity-0', 'scale-95');
    mobileMenu.classList.add('opacity-100', 'scale-100');
  });
  
  // Fermer le menu mobile
  closeMobileMenuButton.addEventListener('click', function() {
    // Cacher le bouton de fermeture et afficher le bouton hamburger
    closeMobileMenuButton.classList.add('hidden');
    mobileMenuButton.classList.remove('hidden');
    
    // Fermer le menu
    mobileMenu.classList.remove('opacity-100', 'scale-100');
    mobileMenu.classList.add('opacity-0', 'scale-95');
    // Cacher le menu après la transition
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
  });
  
  // Fermer le menu mobile en cliquant sur un lien
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Cacher le bouton de fermeture et afficher le bouton hamburger
      closeMobileMenuButton.classList.add('hidden');
      mobileMenuButton.classList.remove('hidden');
      
      // Fermer le menu
      mobileMenu.classList.remove('opacity-100', 'scale-100');
      mobileMenu.classList.add('opacity-0', 'scale-95');
      // Cacher le menu après la transition
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    });
  });
}

// Ajouter l'événement au bouton du menu mobile
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser le menu mobile
  initMobileMenu();
});

// Fonction pour gérer les animations de défilement
function initScrollAnimations() {
  // Animation d'apparition au scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        entry.target.classList.remove('opacity-0', 'translate-y-10');
      }
    });
  }, observerOptions);
  
  // Observer tous les éléments avec la classe animate-on-scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Fonction pour gérer les cartes avec effet de survol
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.group');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('shadow-xl');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('shadow-xl');
    });
  });
}

// Fonction pour gérer les animations de compteur (si nécessaire)
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              setTimeout(updateCounter, 16);
            } else {
              counter.innerText = target;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
}

// Fonction pour basculer entre les thèmes
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const sunIconMobile = document.getElementById('sun-icon-mobile');
  const moonIconMobile = document.getElementById('moon-icon-mobile');
  
  // Vérifier si un thème est déjà enregistré dans le localStorage
  const currentTheme = localStorage.getItem('theme');
  
  // Appliquer le thème enregistré ou le thème par défaut (clair)
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
    sunIconMobile.classList.remove('hidden');
    moonIconMobile.classList.add('hidden');
  }
  
  // Fonction pour basculer le thème
  function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Mettre à jour les icônes
    if (document.body.classList.contains('dark-theme')) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
      sunIconMobile.classList.remove('hidden');
      moonIconMobile.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      sunIconMobile.classList.add('hidden');
      moonIconMobile.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Ajouter les écouteurs d'événements
  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);
}

// Initialisation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser le menu mobile
  initMobileMenu();
  
  // Initialiser les effets de scroll
  initScrollAnimations();
  
  // Initialiser les effets de survol sur les cartes
  initCardHoverEffects();
  
  // Initialiser les animations de compteur
  initCounterAnimations();
  
  // Initialiser le basculement de thème
  initThemeToggle();
  
  // Effet de scroll pour le header
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('bg-opacity-90', 'py-2');
      header.classList.remove('py-4');
    } else {
      header.classList.remove('bg-opacity-90', 'py-2');
      header.classList.add('py-4');
    }
  });
  
  // Fermer le menu mobile lors du redimensionnement de la fenêtre
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) { // Taille md en Tailwind
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('opacity-100', 'scale-100');
        mobileMenu.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
      }
    }
  });
});
