// 切換登入 & 註冊彈出視窗
function toggleLogin() {
    let authBox = document.getElementById("authBox");
    authBox.style.display = (authBox.style.display === "none" || authBox.style.display === "") ? "block" : "none";
}

// 切換到註冊表單
function switchToRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

// 切換到登入表單
function switchToLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

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
        switchToLogin();
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
