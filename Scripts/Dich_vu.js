// ========== MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ========== ACCORDION FAQ ==========
const accBtns = document.querySelectorAll('.acc-btn');
accBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('active');
  });
});

// ========== FADE-IN EFFECT ==========
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fade => {
  appearOnScroll.observe(fade);
});
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn hành vi mặc định (nhảy đột ngột)
        const target = document.querySelector(this.getAttribute('href')); // Lấy phần tử đích (VD: #contact)
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // ✅ Cuộn mượt xuống phần đó
                block: 'start'      // Căn phần đầu của mục đích lên trên
            });
        }
        // Close mobile menu after clicking
        navMenu.classList.remove('active');
    });
});