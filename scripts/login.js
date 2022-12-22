"use strict";

const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const btnSubmit = document.getElementById("btn-submit");

// Bắt sự kiện click nút login
btnSubmit.addEventListener("click", function(){
    // kiểm tra đã nhập đủ username và password chưa
    const isValidate = validate();
    if(isValidate){
        // Tìm kiếm trong userArr thông tin user nhập vào có đúng hay không
        const user = userArr.find(
            (item) =>
            item.username === inputUsername.value && item.password === inputPassword.value
        );

        if(user){
            alert("Đăng nhập thành công !");
            // Lưu thông tin user hiện tại đang đăng nhập
            saveToStorage("userActive", user);
            // Chuyển hướng về trang chủ
            window.location.href = "../index.html";
        }else{
            alert("Thông tin đăng nhập không đúng, Vui lòng nhập lại !");
        }
    }
});

// Hàm validate dữ liệu nhập vào của người dùng
function validate() {

    let isValidate = true;
    
    if(inputUsername.value === "") {
    alert("Vui lòng nhập Username !");
    isValidate =  false;
    }
    if(inputPassword === "") {
    alert("Vui lòng nhập Password!");
    isValidate =  false;
    }

    return isValidate;
}




