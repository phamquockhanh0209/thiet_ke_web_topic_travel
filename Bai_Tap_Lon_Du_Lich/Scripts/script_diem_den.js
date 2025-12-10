
// Navigation buttons for slide
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const buttonsContainer = document.querySelector('.buttons');

if (nextBtn) {
    nextBtn.onclick = function(){
        let lists = document.querySelectorAll('.item');
        document.getElementById('slide').appendChild(lists[0]);
    }
}

if (prevBtn) {
    prevBtn.onclick = function(){
        let lists = document.querySelectorAll('.item');
        document.getElementById('slide').prepend(lists[lists.length - 1]);
    }
}

// Hide buttons when scrolling out of section1 or when header overlaps
if (buttonsContainer && document.getElementById('section1')) {
    const section1 = document.getElementById('section1');
    const header = document.querySelector('.header');
    
    function checkButtonVisibility() {
        if (!buttonsContainer || !header) return;
        
        const section1Rect = section1.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const buttonsRect = buttonsContainer.getBoundingClientRect();
        
        // Check if section1 is visible
        const isSection1Visible = section1Rect.top < window.innerHeight && section1Rect.bottom > 0;
        
        // Check if header overlaps with buttons
        const isHeaderOverlapping = headerRect.bottom > buttonsRect.top && headerRect.top < buttonsRect.bottom;
        
        if (isSection1Visible && !isHeaderOverlapping) {
            // Section1 is visible and header doesn't overlap, show buttons
            buttonsContainer.style.opacity = '1';
            buttonsContainer.style.pointerEvents = 'auto';
        } else {
            // Section1 is not visible or header overlaps, hide buttons
            buttonsContainer.style.opacity = '0';
            buttonsContainer.style.pointerEvents = 'none';
        }
    }
    
    // Use IntersectionObserver for section1 visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            checkButtonVisibility();
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(section1);
    
    // Also check on scroll to handle header overlap
    window.addEventListener('scroll', checkButtonVisibility);
    window.addEventListener('resize', checkButtonVisibility);
    
    // Initial check
    checkButtonVisibility();
}
document.querySelectorAll('.see-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('section2').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
});


function openPopup() {
    document.getElementById("popupForm").style.display = "block";
}

function closePopup() {
    document.getElementById("popupForm").style.display = "none";
}

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const people = document.getElementById("people").value;
    const agree = document.getElementById("agree").checked;

    if (name === "") {
        alert("Vui lòng nhập họ và tên!");
        document.getElementById("name").focus();
        return false;
    }

    if (phone === "") {
        alert("Vui lòng nhập số điện thoại!");
        document.getElementById("phone").focus();
        return false;
    }

    // Validate phone number (Vietnamese format)
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng (VD: 0912345678 hoặc +84912345678)");
        document.getElementById("phone").focus();
        return false;
    }

    if (email === "") {
        alert("Vui lòng nhập địa chỉ email!");
        document.getElementById("email").focus();
        return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Địa chỉ email không hợp lệ!");
        document.getElementById("email").focus();
        return false;
    }

    if (people === "") {
        alert("Vui lòng chọn số lượng người!");
        document.getElementById("people").focus();
        return false;
    }

    if (!agree) {
        alert("Vui lòng đồng ý với chính sách bảo mật và điều khoản sử dụng!");
        return false;
    }

    alert("Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.");
    closePopup();
    return false; // Ngăn form reload trang
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking on "Đăng ký" link that opens popup
    document.querySelectorAll('.nav-link[onclick*="openPopup"]').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Dropdown menu toggle for mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    if (dropdownLink) {
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 960) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Smooth Scrolling for anchor links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle links that point to sections on the same page
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Get header height (approximately 80px, adjust if needed)
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        }
    });
});

// ========== DESTINATION SEARCH FUNCTIONALITY ==========
const destinations = [
    { name: 'Hạ Long', file: 'ha_long.html', type: 'Trong Nước', keywords: ['hạ long', 'halong', 'vịnh hạ long', 'vinh ha long'] },
    { name: 'Sapa', file: 'sa_pa.html', type: 'Trong Nước', keywords: ['sapa', 'sa pa', 'sapa lào cai'] },
    { name: 'Phú Quốc', file: 'phu_quoc.html', type: 'Trong Nước', keywords: ['phú quốc', 'phu quoc', 'đảo phú quốc'] },
    { name: 'Hội An', file: 'hoi_an.html', type: 'Trong Nước', keywords: ['hội an', 'hoi an', 'phố cổ hội an'] },
    { name: 'Đà Lạt', file: 'da_lat.html', type: 'Trong Nước', keywords: ['đà lạt', 'da lat', 'dalat'] },
    { name: 'Nha Trang', file: 'nha_trang.html', type: 'Trong Nước', keywords: ['nha trang', 'nhatrang'] },
    { name: 'Nhật Bản', file: 'nhat_ban.html', type: 'Quốc Tế', keywords: ['nhật bản', 'nhat ban', 'japan', 'tokyo', 'kyoto'] },
    { name: 'Hàn Quốc', file: 'han_quoc.html', type: 'Quốc Tế', keywords: ['hàn quốc', 'han quoc', 'korea', 'seoul', 'busan'] },
    { name: 'Trung Quốc', file: 'trung_quoc.html', type: 'Quốc Tế', keywords: ['trung quốc', 'trung quoc', 'china', 'beijing', 'shanghai'] },
    { name: 'Ấn Độ', file: 'an_do.html', type: 'Quốc Tế', keywords: ['ấn độ', 'an do', 'india', 'delhi', 'mumbai'] },
    { name: 'Nga', file: 'nga.html', type: 'Quốc Tế', keywords: ['nga', 'russia', 'moscow', 'saint petersburg'] },
    { name: 'Châu Phi', file: 'chau_phi.html', type: 'Quốc Tế', keywords: ['châu phi', 'chau phi', 'africa', 'safari'] }
];

const searchInput = document.getElementById('destinationSearch');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchResults.classList.remove('active');
            return;
        }
        
        // Tìm kiếm địa danh
        const results = destinations.filter(dest => {
            const nameMatch = dest.name.toLowerCase().includes(query);
            const keywordMatch = dest.keywords.some(keyword => keyword.toLowerCase().includes(query));
            return nameMatch || keywordMatch;
        });
        
        if (results.length > 0) {
            displaySearchResults(results);
            searchResults.classList.add('active');
        } else {
            searchResults.classList.remove('active');
        }
    });
    
    // Đóng kết quả khi click bên ngoài
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Xử lý khi nhấn Enter
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim().toLowerCase();
            if (query.length > 0) {
                const result = destinations.find(dest => {
                    const nameMatch = dest.name.toLowerCase().includes(query);
                    const keywordMatch = dest.keywords.some(keyword => keyword.toLowerCase().includes(query));
                    return nameMatch || keywordMatch;
                });
                
                if (result) {
                    window.location.href = result.file;
                }
            }
        }
    });
}

function displaySearchResults(results) {
    searchResults.innerHTML = results.map(dest => `
        <div class="search-result-item" onclick="window.location.href='${dest.file}'">
            <i class="fas fa-map-marker-alt"></i>
            <span class="result-name">${dest.name}</span>
            <span class="result-type">${dest.type}</span>
        </div>
    `).join('');
}
