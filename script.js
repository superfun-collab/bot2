// 登入功能
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    // 檢查帳號和密碼是否輸入
    if (user === "" || pass === "") {
        alert("請填寫帳號和密碼！");
        return;
    }

    // 從 localStorage 中獲取帳號的密碼
    let storedPass = localStorage.getItem(user);

    // 檢查帳號密碼是否匹配
    if (storedPass && storedPass === pass) {
        alert("登入成功！");
        // 登入成功後，可以跳轉到首頁或用戶帳戶頁面
        window.location.href = "home.html";  // 或者是 "user_profile.html" 或其他頁面
    } else {
        alert("帳號或密碼錯誤！");
    }
}
