// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking
        navMenu.classList.remove('active');
    });
});

$(document).ready(function () {
    // Toggle menu on mobile
    $('.mobile-menu-toggle').click(function () {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // Close menu when clicking a nav link on mobile
    $('.nav-link').click(function () {
        if ($(window).width() <= 768) {
            $('.nav-menu').removeClass('active');
            $('.mobile-menu-toggle').removeClass('active');
        }
    });

    // Handle window resize to ensure menu displays correctly
    $(window).resize(function () {
        if ($(window).width() > 768) {
            $('.nav-menu').removeClass('active');
            $('.mobile-menu-toggle').removeClass('active');
        }
    });
});

