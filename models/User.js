'use strict'
// class User để đại diện cho thông tin người dùng
class User {
    constructor(
        firstname,
        lastname,
        username,
        password,
        // Mặc định nếu không khai báo thì giá trị của 2 thuộc tính có sẵn là:
        pageSize = 10,
        category = "Sports"
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        // 2 thuộc tính cho trang news setting search..
        this.pageSize = pageSize;
        this.category = category;
    }
}
//Clas task chưa các thông tin về task trong todo list
class Task {
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}
