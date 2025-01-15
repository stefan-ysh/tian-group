// Back to top functionality
const backToTop = document.getElementById('backToTop');
let lastScrollPosition = 0;
const scrollThreshold = 400; // Show button after scrolling this many pixels

function handleScroll() {
  const currentScrollPosition = window.pageYOffset;

  // Show/hide button based on scroll position
  if (currentScrollPosition > scrollThreshold) {
    backToTop.classList.remove('opacity-0', 'invisible');
    backToTop.classList.add('opacity-100', 'visible');
  } else {
    backToTop.classList.add('opacity-0', 'invisible');
    backToTop.classList.remove('opacity-100', 'visible');
  }

  lastScrollPosition = currentScrollPosition;
}

// Smooth scroll to top when clicking the button
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Add scroll event listener with debouncing
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(handleScroll);
});
