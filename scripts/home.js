'use strict'


const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");


displayHome();

// Hàm hiển thị nội dung trên trang Home 1 cách hợp lý tùy vào trường hợp có người đăng nhập hay không

function displayHome(){
  if(userActive){
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // Thêm thông báo welcome
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;

    // Nếu không có ai đang đăng nhập thì ẩn mainContent và hiển thị loginModal
  }else{
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

// Bắt sự kiện nút logout
btnLogout.addEventListener("click", function(){
  const isLogout = confirm("Bạn chắc chắn muốn Logout chứ?");
  if(isLogout){
    // Gán giá trị userActive về null để biểu hiện là không có ai đag đăng nhập
    userActive = null;
    // Lưu dữ liệu
    saveToStorage("userActive", userActive);
    // Hiển thị trang home ở dạng chưa có ai đăng nhập
    displayHome();
  }
});