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
// 密碼強度檢測
function checkPasswordStrength(password) {
    let strength = 0;
    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;
    
    const meter = document.querySelector('.strength-meter');
    const text = document.querySelector('.strength-text');
    
    switch(strength) {
        case 0:
            text.textContent = '密碼強度：弱';
            meter.style.width = '25%';
            meter.style.backgroundColor = '#ff4444';
            break;
        case 2:
            text.textContent = '密碼強度：中';
            meter.style.width = '50%';
            meter.style.backgroundColor = '#ffbb33';
            break;
        case 3:
            text.textContent = '密碼強度：強';
            meter.style.width = '75%';
            meter.style.backgroundColor = '#00C851';
            break;
        case 4:
            text.textContent = '密碼強度：極強';
            meter.style.width = '100%';
            meter.style.backgroundColor = '#007E33';
            break;
    }
}

// 確認密碼匹配
function checkPasswordMatch() {
    const password = document.getElementById('registerPass').value;
    const confirmPassword = document.getElementById('confirmPass').value;
    const matchDiv = document.getElementById('passwordMatch');
    
    if (password !== confirmPassword) {
        matchDiv.style.display = 'block';
        return false;
    } else {
        matchDiv.style.display = 'none';
        return true;
    }
}

// 發送郵件驗證碼
function sendVerificationCode() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert('請輸入電子郵件地址');
        return;
    }
    // 這裡添加發送驗證碼的邏輯
    alert('驗證碼已發送到您的郵箱');
}

// 刷新驗證碼
function refreshCaptcha(imageId) {
    const img = document.getElementById(imageId);
    img.src = 'captcha.php?' + new Date().getTime();
}

// 顯示用戶協議
function showTerms() {
    document.getElementById('termsModal').style.display = 'block';
}

// 顯示隱私政策
function showPrivacy() {
    document.getElementById('privacyModal').style.display = 'block';
}

// 關閉模態框
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 表單驗證
function validateForm() {
    const password = document.getElementById('registerPass').value;
    const confirmPassword = document.getElementById('confirmPass').value;
    const email = document.getElementById('email').value;
    const emailCode = document.getElementById('emailCode').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const captcha = document.getElementById('registerCaptcha').value;

    if (!checkPasswordMatch()) {
        alert('密碼不匹配');
        return false;
    }

    if (!emailCode) {
        alert('請輸入郵件驗證碼');
        return false;
    }

    if (!agreeTerms) {
        alert('請同意用戶協議和隱私政策');
        return false;
    }

    if (!captcha) {
        alert('請輸入驗證碼');
        return false;
    }

    return true;
}
