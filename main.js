const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu');
    });
  }
};

const hideMenu = (navMenuId, navCloseId) => {
  const navMenu = document.getElementById(navMenuId);
  const navClose = document.getElementById(navCloseId);

  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }
};

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });
};

const scrollHeader = () => {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  });
};

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute('id');
    const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass?.classList.add('active-link');
    } else {
      sectionsClass?.classList.remove('active-link');
    }
  });
};

const qualificationTabs = () => {
  const tabs = document.querySelectorAll('.qualification__button');
  const contents = document.querySelectorAll('.qualification__content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');

      tabs.forEach(t => t.classList.remove('qualification__active'));
      tab.classList.add('qualification__active');

      contents.forEach(content => {
        content.classList.remove('qualification__content-active');
        if (content.id === target.replace('#', '')) {
          content.classList.add('qualification__content-active');
        }
      });
    });
  });
};

const testimonialSlider = () => {
  const cards = document.querySelectorAll('.testimonial__card');
  const prevBtn = document.querySelector('.testimonial__prev');
  const nextBtn = document.querySelector('.testimonial__next');
  const dotsContainer = document.querySelector('.testimonial__dots');

  if (!cards.length || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentSlide = 0;

  cards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('testimonial__dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.testimonial__dot');

  const updateSlider = () => {
    cards.forEach((card, index) => {
      card.style.display = index === currentSlide ? 'block' : 'none';
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  };

  const goToSlide = (index) => {
    currentSlide = index;
    updateSlider();
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider();
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + cards.length) % cards.length;
    updateSlider();
  };

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  updateSlider();

  setInterval(nextSlide, 5000);
};

const contactForm = () => {
  const form = document.getElementById('contact-form');
  const contactMessage = document.getElementById('contact-message');

  if (!form || !contactMessage) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const project = formData.get('user_project');

    if (name && email && project) {
      contactMessage.textContent = 'Message sent successfully!';
      contactMessage.style.color = 'hsl(207, 90%, 54%)';

      setTimeout(() => {
        contactMessage.textContent = '';
      }, 5000);

      form.reset();
    } else {
      contactMessage.textContent = 'Please fill all the fields';
      contactMessage.style.color = 'hsl(4, 71%, 50%)';
    }
  });
};

const scrollUp = () => {
  const scrollUpBtn = document.getElementById('scroll-up');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 350) {
      scrollUpBtn.classList.add('show-scroll');
    } else {
      scrollUpBtn.classList.remove('show-scroll');
    }
  });
};

const scrollAnimation = () => {
  const animatedElements = document.querySelectorAll('.skills__content, .services__card, .projects__card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-animation', 'show');
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
};

const themeToggle = () => {
  const themeButton = document.getElementById('theme-button');
  const darkTheme = 'dark-theme';

  if (!themeButton) {
    console.error('Theme button not found');
    return;
  }

  // Check for saved theme preference
  const currentTheme = localStorage.getItem('selected-theme');
  if (currentTheme === darkTheme) {
    document.documentElement.classList.add(darkTheme);
    themeButton.innerHTML = '<i class="ri-moon-line"></i>';
  }

  // Toggle theme on click
  themeButton.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked, current theme:', document.documentElement.classList.contains(darkTheme) ? 'dark' : 'light');
    document.documentElement.classList.toggle(darkTheme);
    
    if (document.documentElement.classList.contains(darkTheme)) {
      localStorage.setItem('selected-theme', darkTheme);
      themeButton.innerHTML = '<i class="ri-moon-line"></i>';
      console.log('Switched to dark mode');
    } else {
      localStorage.setItem('selected-theme', 'light-theme');
      themeButton.innerHTML = '<i class="ri-sun-line"></i>';
      console.log('Switched to light mode');
    }
  };
};

const init = () => {
  showMenu('nav-toggle', 'nav-menu');
  hideMenu('nav-menu', 'nav-close');
  linkAction();
  scrollHeader();
  window.addEventListener('scroll', scrollActive);
  qualificationTabs();
  testimonialSlider();
  contactForm();
  scrollUp();
  scrollAnimation();
  themeToggle();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
