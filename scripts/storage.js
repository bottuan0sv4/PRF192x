'use strict'

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu userArr từ Localstorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

// Chuyển đổi về dạng class instance
const userArr = users.map((user) => parseUser(user));

// Sẽ trả về 1 mảng chứa các instance của class user

// Lấy dữ liệu User đang đăng nhập
let userActive = getFromStorage("userActive") ? parseUser(getFromStorage("userActive")) : null;

// Lấy dữ liệu todoArr từ localstorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// Chuyển đổi về dạng class instance
const todoArr = todos.map((todo) => parseTask(todo));

// Hàm chuyển đổi js object dang class instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  )

  return user
}

// Hàm chuyển đổi js object dang class instance
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
