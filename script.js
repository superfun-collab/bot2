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
        window.location.href = "home.html";
    } else {
        alert("帳號或密碼錯誤！");
    }
}

function googleLogin() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID'
        }).then(function(auth2) {
            auth2.signIn().then(function(googleUser) {
                const profile = googleUser.getBasicProfile();
                console.log('Google 登入成功：', profile.getName());
                window.location.href = 'home.html';
            });
        });
    });
}
