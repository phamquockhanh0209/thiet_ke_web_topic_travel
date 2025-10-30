
document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
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

    if (name === "" || phone === "") {
        alert("Vui lòng nhập đầy đủ họ tên và số điện thoại!");
        return false;
    }

    alert("Đã gửi thông tin thành công!");
    closePopup();
    return false; // Ngăn form reload trang
}
