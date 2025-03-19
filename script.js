// 註冊功能
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("reg-username").value;
    const account = document.getElementById("reg-account").value;
    const confirmAccount = document.getElementById("confirm-account").value;
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // 確認帳號和密碼一致
    if (account !== confirmAccount) {
        alert("帳號不一致！");
        return;
    }
    if (password !== confirmPassword) {
        alert("密碼不一致！");
        return;
    }

    // 儲存帳號和密碼到 localStorage
    localStorage.setItem("account", account);
    localStorage.setItem("password", password);

    alert("註冊成功！請登入。");
    window.location.href = "login.html";
});

// 登入功能
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedAccount = localStorage.getItem("account");
    const storedPassword = localStorage.getItem("password");

    if (username === storedAccount && password === storedPassword) {
        alert("登入成功！");
        localStorage.setItem("loggedIn", "true");  // 記錄登入狀態
        window.location.href = "index.html";  // 進入首頁
    } else {
        alert("帳號或密碼錯誤，請註冊新帳號。");
    }
});

// 檢查是否已登入
window.onload = function() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
        alert("請先登入");
        window.location.href = "login.html";  // 轉到登入頁
    }
};

// 防止未登入用戶訪問
const downloadButton = document.querySelector('.download-button');
if (downloadButton) {
    downloadButton.addEventListener('click', function() {
        if (localStorage.getItem("loggedIn") !== "true") {
            alert("請先登入");
            window.location.href = "login.html";  // 轉到登入頁
        }
    });
}
