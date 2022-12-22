'use strict'

const usernameEle = document.getElementById('input-username');
const firstnameEle = document.getElementById('input-firstname');
const lastnameEle = document.getElementById('input-lastname');
const passwordEle = document.getElementById('input-password');
const confirmpasswordEle = document.getElementById('input-password-confirm');
const btnSubmit = document.getElementById('btn-submit');


// Hàm validate thông tin đăng ký của user nhập vào form
// Hàm này trả về true nếu hợp lệ và false nếu không hợp lệ
  function validate(user) {
    let isValid = true;
// Không có trường nào được bỏ trống
    if(user.firstname.trim().length === 0){
        alert("Vui lòng nhập FirstName !");
        isValid = false;
    }

    if(user.lastname.trim().length === 0){
        alert("Vui lòng nhập LastName !");
        isValid = false;
    }

    if(user.username.trim().length === 0){
        alert("Vui lòng nhập UserName !");
        isValid = false;
    }

    if(user.password.trim().length === 0){
        alert("Vui lòng nhập Password !");
        isValid = false;
    }

    if(confirmpasswordEle.value.trim().length === 0){
        alert("Vui lòng nhập confirmpassword !");
        isValid = false;
    }

    // Username không được trùng với Username của người dùng trước đó
    if(!userArr.every((item) => (item.username !== usernameEle.value ? true : false))){
        alert("User Name đã tồn tại!");
        isValid = false;
    }

    //Password và Confirm password phải giống nhau
    if(user.password !== confirmpasswordEle.value){
        alert("Password và Confirm password phải giống nhau !");
        isValid = false;
    }
    //Password phải có nhiều hơn hoặc bằng 8 ký tự
    if(user.password.length <= 8){
        alert("Password phải có nhiều hơn hoặc bằng 8 ký tự!");
        isValid = false;
    }

    return isValid;

}

// Bắt sự kiện ấn nút Register
btnSubmit.addEventListener('click', function () {

    const user = new User(
        // Lấy dữ liệu user từ form
        usernameEle.value,
        firstnameEle.value,
        lastnameEle.value,
        passwordEle.value
    );
        // Check validate
    const isValid = validate(user);

    if(isValid){
        // thêm user vào mảng userArr
        userArr.push(user);
        // Lưu dữ liệu lại xuống localStorage
        saveToStorage("userArr", userArr);

        alert("Đăng ký thành công!");
        // Điều hướng sang trang login
        window.location.href = "../pages/login.html";
    }

});