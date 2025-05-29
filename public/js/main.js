// Aos initialized
AOS.init({ duration: 800, once: true });

const scrollBtn = document.getElementById('scrollBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});
// Generic function to fetch and inject HTML component into placeholder by ID
async function loadComponent(placeholderId, url) {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const html = await response.text();
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) placeholder.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// Load all components you want on the page
async function loadAllComponents() {
  await Promise.all([
    loadComponent('navbar-placeholder', '/components/navbar.html'),
    loadComponent('home-section-placeholder', '/sections/home-section.html'),
    loadComponent('footer-placeholder', '/components/footer.html'),
    // Add more components here as needed
  ]);

  // Initialize interactive scripts after components are loaded
  initNavbarInteractivity();
  initOtherComponents();
}

function initNavbarInteractivity() {
  const navLinks = document.querySelectorAll(
    '#navbar-placeholder .navbar-nav .nav-link, #navbar-placeholder .dropdown-menu .dropdown-item'
  );

  function setActiveLink(link) {
    navLinks.forEach((navLink) => navLink.classList.remove('active'));
    link.classList.add('active');
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetPath = link.getAttribute('href');
      sessionStorage.setItem('activeLink', targetPath);
      setActiveLink(link);
      // Collapse navbar on mobile after clicking link
      const navbarCollapse = document.querySelector(
        '#navbar-placeholder .navbar-collapse'
      );
      if (
        navbarCollapse &&
        navbarCollapse.classList.contains('show') &&
        targetPath &&
        !targetPath.startsWith('#')
      ) {
        new bootstrap.Collapse(navbarCollapse, { toggle: true });
      }
    });
  });

  // Restore active link on page load
  const savedPath = sessionStorage.getItem('activeLink');
  if (savedPath) {
    const activeLink = Array.from(navLinks).find(
      (link) => link.getAttribute('href') === savedPath
    );
    if (activeLink) {
      setActiveLink(activeLink);
    }
  }

  // Click outside navbar closes collapse
  document.addEventListener('click', (event) => {
    const navbarCollapse = document.querySelector(
      '#navbar-placeholder .navbar-collapse'
    );
    const isNavbarOpen = navbarCollapse?.classList.contains('show');
    const clickedInsideNavbar = event.target.closest(
      '#navbar-placeholder .navbar'
    );
    if (isNavbarOpen && !clickedInsideNavbar) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
}

// Initialize other components such as carousel, animations, etc.
function initOtherComponents() {
  // Initialize Bootstrap Carousel if exists
  const carouselElement = document.querySelector(
    '#main-content-placeholder #myCarousel'
  );
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 5000,
      ride: 'carousel',
    });
  }

  // Initialize AOS animations if used
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }

  // Add more initializations for other components here...
}

// Run everything on DOM ready
document.addEventListener('DOMContentLoaded', loadAllComponents);
