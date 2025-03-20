// 登入表單切換
function toggleLoginForm() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    
    if (loginForm.style.display === "none" || loginForm.style.display === "") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
    }
}

// 註冊表單切換
function toggleRegisterForm() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    
    if (registerForm.style.display === "none" || registerForm.style.display === "") {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
    } else {
        registerForm.style.display = "none";
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

    if (localStorage.getItem(user)) {
        alert("帳號已存在！");
        return;
    }

    localStorage.setItem(user, pass);
    alert("註冊成功，請登入");
    toggleRegisterForm();
}

// 登入功能
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    // 管理員帳號驗證
    if (user === "a0909033258@gmail.com" && pass === "love369258") {
        alert("管理員登入成功！");
        window.location.href = "admin.html";
        return;
    }

    if (user === "" || pass === "") {
        alert("請填寫帳號和密碼！");
        return;
    }

    let storedPass = localStorage.getItem(user);

    if (storedPass && storedPass === pass) {
        alert("登入成功！");
        window.location.href = "home.html";
    } else {
        alert("帳號或密碼錯誤！");
    }
}

// 管理員後台功能
function loadUserList() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== "a0909033258@gmail.com") {
            users.push({
                id: key,
                registerTime: new Date().toLocaleDateString()
            });
        }
    }
    return users;
}

function updateUserTable() {
    const users = loadUserList();
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.registerTime}</td>
            <td>正常</td>
            <td>
                <button onclick="banUser('${user.id}')" class="ban-btn">封禁</button>
                <button onclick="deleteUser('${user.id}')" class="delete-btn">刪除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function banUser(userId) {
    if(confirm(`確定要封禁用戶 ${userId} 嗎？`)) {
        alert('用戶已被封禁');
        updateUserTable();
    }
}

function deleteUser(userId) {
    if(confirm(`確定要刪除用戶 ${userId} 嗎？`)) {
        localStorage.removeItem(userId);
        alert('用戶已被刪除');
        updateUserTable();
    }
}

// 數據統計功能
function updateStats() {
    const totalUsers = localStorage.length - 1;
    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('activeToday').textContent = Math.floor(totalUsers * 0.6);
    document.getElementById('newThisMonth').textContent = Math.floor(totalUsers * 0.3);
}

// 系統日誌功能
function addLog(level, message) {
    const logContent = document.getElementById('logContent');
    const timestamp = new Date().toLocaleString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${level}`;
    logEntry.innerHTML = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    logContent.appendChild(logEntry);
}

// 備份功能
function backupData() {
    const data = {
        users: {},
        timestamp: new Date().toISOString()
    };
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data.users[key] = localStorage.getItem(key);
    }
    
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addLog('info', '系統數據已備份');
}

// 頁面初始化
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin.html')) {
        updateUserTable();
        updateStats();
        addLog('info', '管理員登入系統');
    }
});
