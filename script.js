// 顯示/隱藏登入表單
function toggleLoginForm() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    // 切換顯示與隱藏
    if (loginForm.style.display === "none" || loginForm.style.display === "") {
        loginForm.style.display = "block";  // 顯示登入表單
        registerForm.style.display = "none"; // 隱藏註冊表單
    } else {
        loginForm.style.display = "none";   // 隱藏登入表單
    }
}

// 顯示/隱藏註冊表單
function toggleRegisterForm() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    // 切換顯示與隱藏
    if (registerForm.style.display === "none" || registerForm.style.display === "") {
        registerForm.style.display = "block"; // 顯示註冊表單
        loginForm.style.display = "none";     // 隱藏登入表單
    } else {
        registerForm.style.display = "none";  // 隱藏註冊表單
    }
}

// 註冊功能
function register() {
    let user = document.getElementById("registerUser").value;
    let pass = document.getElementById("registerPass").value;

    if (user === "" || pass === "") {
        alert("請填寫帳號和密碼！");
        return;
    }

    // 檢查帳號是否已存在
    if (localStorage.getItem(user)) {
        alert("帳號已存在！");
        return;
    }

    // 儲存帳號和密碼到 localStorage
    localStorage.setItem(user, pass);
    alert("註冊成功，請登入");
    toggleRegisterForm(); // 註冊後隱藏註冊表單
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

    // 檢查帳號密碼是否匹配
    if (storedPass && storedPass === pass) {
        alert("登入成功！");
        window.location.href = "home.html";  // 登入成功後跳轉
    } else {
        alert("帳號或密碼錯誤！");
    }
}
