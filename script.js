// 註冊功能
function register() {
    let user = document.getElementById("registerUser").value;
    let pass = document.getElementById("registerPass").value;

    if (user === "" || pass === "") {
        alert("請填寫帳號和密碼！");
        return;
    }

    if (localStorage.getItem(user)) {
        alert("帳號已存在！");
    } else {
        localStorage.setItem(user, pass);
        alert("註冊成功！請登入。");
        window.location.href = "index.html";  // 註冊成功後跳轉到登入頁面
    }
}

// 登入功能
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    if (user === "" || pass === "") {
        alert("請填寫帳號和密碼！");
        return;
    }

    let storedPass = localStorage.getItem(user);
    if (storedPass && storedPass === pass) {
        alert("登入成功！");
        window.location.href = "welcome.html";  // 登入後跳轉（需自行建立）
    } else {
        alert("帳號或密碼錯誤！");
    }
}
