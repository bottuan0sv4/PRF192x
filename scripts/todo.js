"use strict";
// Nếu đã đăng nhập
if (userActive) {
    const todoList = document.getElementById("todo-list");
    const btnAdd = document.getElementById("btn-add");
    const inputTask = document.getElementById("input-task");

    displayTodoList();

    // Hàm hiển thị thông tin todolist
    function displayTodoList() {
        let html = "";

        // Từ mảng todoArr lọc ra cá todo(task) là của user đang đăng nhập
        todoArr.filter((todo) => todo.owner === userActive.username).forEach(function (todo) {
            html += `
            <li class=${(todo.isDone ? "checked" : "")}> ${todo.task}<span class="close">x</span></li>
            `;
        });

        todoList.innerHTML = html;

        // Bắt các sự kiện
        eventToggleTasks();
        eventDeleteTasks();
    }

    // Bắt sự kiện ấn nút Add
    btnAdd.addEventListener("click", function () {
        // Kiểm tra người dùng đã nhập 
        if (inputTask.value.trim().length === 0) {
            alert("Vui lòng nhập nhiệm vụ !");
        } else {
            const todo = new Task(inputTask.value, userActive.username, false);

            // thêm task mới vào mảng todoArr
            todoArr.push(todo);

            // Lưu dữ liệu xuống localStorage
            saveToStorage("todoArr", todoArr);

            // Hiển thị list
            displayTodoList();

            // Reset dữ liệu từ form nhập
            inputTask.value = "";
        }
    });


    // Hàm bắt sự kiện toggletask
    function eventToggleTasks() {
        // Lấy tất cả các phần tử li chứa thông tin của các task và bắt sự kiện
        document.querySelectorAll("#todo-list li").forEach(function (liEl) {
            liEl.addEventListener("click", function (e) {
                // tránh nút delete => để không bị trùng sự kueenj
                if (e.target !== liEl.children[0]) {
                    liEl.classList.toggle("checked");

                    const todo = todoArr.find(
                        (todoItem) => todoItem.owner === userActive.username && todoItem.task === liEl.textContent.slice(0, -1)
                        // Lấy nội dung
                    );

                    // Sau đó thay đổi thuộc tính isDone của có
                    todo.isDone = liEl.classList.contains("checked") ? true : false;
                    // Lưu dữ liệu
                    saveToStorage("todoArr", todoArr);

                }
            });

        });
    }

    // Bắt sự kiện xóa
    function eventDeleteTasks() {
        // Lấy tất cả các phần tử nút delete bắt sự kiên click
        document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {

            closeEl.addEventListener("click", function () {
                // Hỏi xác nhận xóa
                const isDelete = confirm("Bạn xác nhận xóa?");

                if (isDelete) {
                    // tìm kiếm vị trí của task xóa trong mảng todoArr
                    const index = todoArr.findIndex(
                        (item) =>
                            item.owner === userActive.username &&
                            item.task === closeEl.textContent.slice(0, -1)
                    );
                    // xóa task ra khỏi mảng todoArr
                    todoArr.splice(index - 1, 1);
                    // Lưu (cập nhật lại) dữ liệu
                    saveToStorage("todoArr", todoArr);
                    // Hiển thị lại todo list
                    displayTodoList();
                }
            });

        });
    }
}
else {
    // Nếu chưa đăng nhập yc cầu đăng nhập
    alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng !");
    window.location.href = "../index.html";
}