// 顯示/隱藏登入表單
function toggleLoginForm() {
    const loginForm = document.getElementById("loginForm");
    // 切換顯示與隱藏
    if (loginForm.style.display === "none" || loginForm.style.display === "") {
        loginForm.style.display = "block";  // 顯示登入表單
    } else {
        loginForm.style.display = "none";   // 隱藏登入表單
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
        window.location.href = "welcome.html";  // 登入成功後跳轉
    } else {
        alert("帳號或密碼錯誤！");
    }
}
