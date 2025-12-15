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
// =======================================================
// === FORM VALIDATION VÀ SUBMISSION CHUNG CHO 3 FORMS ===
// =======================================================

// Khai báo các ID Form bạn đang sử dụng (Dựa trên hướng dẫn chuẩn hóa)
const formIds = ['bookingForm', 'adviceForm', 'visaForm']; 

// ------------------------------------------------
// HÀM HỖ TRỢ HIỂN THỊ VÀ XÓA LỖI
// ------------------------------------------------

// Hàm để hiển thị lỗi cụ thể bên dưới input
function displayError(inputElement, message) {
    // 1. Xóa lỗi cũ trước (đảm bảo không bị lặp)
    clearError(inputElement); 
    
    // 2. Tạo phần tử hiển thị lỗi
    let errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // 3. Chèn vào sau input
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    inputElement.classList.add('input-error'); 
}

// Hàm để xóa thông báo lỗi
function clearError(inputElement) {
    let errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    inputElement.classList.remove('input-error');
}

// Hàm kiểm tra định dạng số điện thoại (10 chữ số)
function isValidPhone(phone) {
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/; // Bắt đầu bằng 0 hoặc +84, theo sau là 9 hoặc 10 chữ số
    return phoneRegex.test(phone);
}

// ------------------------------------------------
// HÀM VALIDATION CHÍNH (Được gọi khi submit)
// ------------------------------------------------

function handleFormSubmission(e) {
    e.preventDefault(); 

    const form = e.target;
    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required], select[required]');
    
    // Xóa tất cả các lỗi hiện tại trước khi kiểm tra lại
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    
    // Lấy ID của form hiện tại để áp dụng logic riêng biệt
    const formId = form.id; 

    // 1. Kiểm tra các trường bắt buộc chung
    requiredInputs.forEach(input => {
        if (!input.value.trim() || (input.tagName === 'SELECT' && !input.value)) {
            let labelElement = input.closest('label');
            let labelText = labelElement ? labelElement.textContent.trim().split('\n')[0] : input.name;
            
            displayError(input, `Vui lòng nhập/chọn ${labelText.toLowerCase()}.`);
            isValid = false;
        }
    });

    // 2. Kiểm tra định dạng số điện thoại
    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput && phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
        displayError(phoneInput, 'Số điện thoại không hợp lệ (VD: 0901234567).');
        isValid = false;
    }

    // 3. Logic validation RIÊNG theo từng Form ID
    if (formId === 'bookingForm') {
        const startDateInput = form.querySelector('input[name="startDate"]');
        const endDateInput = form.querySelector('input[name="endDate"]');
        
        if (isValid && startDateInput && endDateInput && startDateInput.value && endDateInput.value) {
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);

            // So sánh ngày (chỉ so sánh ngày, bỏ qua thời gian)
            if (endDate.setHours(0,0,0,0) < startDate.setHours(0,0,0,0)) {
                displayError(endDateInput, 'Ngày về không được trước Ngày đi.');
                isValid = false;
            }
        }
    }
    
    // 4. Xử lý Gửi Form và Thông báo
    if (isValid) {
        
        // --- GIẢ ĐỊNH GỬI THÀNH CÔNG ---
        
        // 🚨 HIỂN THỊ ALERT THÀNH CÔNG
        alert(`✅ Yêu cầu ${formId} thành công! Chúng tôi sẽ liên hệ với bạn sớm.`); 
        
        form.reset(); // Xóa dữ liệu
        
    } else {
        // 🚨 HIỂN THỊ ALERT THẤT BẠI
        alert('❌ Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra trong biểu mẫu.');
        
        // Scroll đến trường lỗi đầu tiên để người dùng thấy
        const firstErrorInput = form.querySelector('.input-error');
        if (firstErrorInput) {
            firstErrorInput.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// ------------------------------------------------
// ÁP DỤNG HÀM VALIDATION CHO TẤT CẢ CÁC FORM
// ------------------------------------------------

formIds.forEach(id => {
    const form = document.getElementById(id);
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Thêm event listener cho các input để xóa lỗi khi người dùng gõ
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => clearError(input));
        });
    }
});
