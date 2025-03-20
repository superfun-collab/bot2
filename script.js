// 登入表单显示/隐藏
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

// 注册表单显示/隐藏
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

// 注册功能
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

    // 检查是否为管理员账号
    if (user === "a0909033258@gmail.com" && pass === "love369258") {
        alert("管理員登入成功！");
        window.location.href = "admin.html";
        return;
    }

    // 普通用户登录验证
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

// 登出功能
function logout() {
    if(confirm('確定要登出嗎？')) {
        window.location.href = 'index.html';
    }
}

// 管理员后台功能
function showUsers() {
    document.querySelector('.admin-content').innerHTML = `
        <h2>用戶列表</h2>
        <table>
            <thead>
                <tr>
                    <th>用戶ID</th>
                    <th>註冊時間</th>
                    <th>狀態</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="userTable">
                <tr>
                    <td>user001</td>
                    <td>2024-01-20</td>
                    <td>正常</td>
                    <td><button onclick="editUser('user001')">編輯</button></td>
                </tr>
            </tbody>
        </table>
    `;
}

function showStats() {
    document.querySelector('.admin-content').innerHTML = `
        <h2>數據統計</h2>
        <div>
            <p>總用戶數：100</p>
            <p>今日活躍：25</p>
            <p>本月新增：45</p>
        </div>
    `;
}

function showSettings() {
    document.querySelector('.admin-content').innerHTML = `
        <h2>系統設置</h2>
        <div>
            <h3>基本設置</h3>
            <input type="text" placeholder="網站名稱">
            <button onclick="saveSettings()">保存設置</button>
        </div>
    `;
}

function editUser(userId) {
    alert('編輯用戶：' + userId);
}

function saveSettings() {
    alert('設置已保存');
}
